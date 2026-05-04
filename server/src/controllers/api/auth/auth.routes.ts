import { Request, Response, Router } from 'express';
import { DatabaseError } from 'pg';
import { reply } from '@/utils/helpers';
import { DrizzleQueryError } from 'drizzle-orm';
import { checkPassword } from '@/db/utils';
import { createInitialScores } from '@/db/queries/scores';
import { CreateUserSchema, LoginSchema } from '@shared/schemas/users';
import { createUser, getUserByUsername } from '@/db/queries/users';
import {
  ApiResult,
  LoginData,
  LogoutData,
  RegisterData,
} from '@shared/types/api';

export const authRouter = Router();

type RegisterResType = Response<ApiResult<RegisterData>>;
authRouter.post('/register', async (req: Request, res: RegisterResType) => {
  const { username, password } = req.body;
  const parse = CreateUserSchema.safeParse({ username, password });

  if (!parse.success) {
    return res.status(400).json(reply(null, parse.error.message));
  }

  try {
    const user = await createUser(parse.data);
    await createInitialScores(user.id);

    req.session.userId = user.id;

    return res.status(200).json(reply(user));
  } catch (error) {
    if (error instanceof DrizzleQueryError) {
      if (error.cause instanceof DatabaseError) {
        if (error.cause.code === '23505') {
          if (error.cause.constraint === 'users_username_key') {
            return res
              .status(409)
              .json(reply(null, 'Username already exists.'));
          }
        }
      }
    }
    req.log.error(error);
    return res.status(500).json(reply(null, 'Server error.'));
  }
});

type LoginResType = Response<ApiResult<LoginData>>;
authRouter.post('/login', async (req: Request, res: LoginResType) => {
  const { username, password } = req.body;

  const parse = LoginSchema.safeParse({ username, password });

  if (!parse.success) {
    return res.status(400).json(reply(null, parse.error.message));
  }

  const validData = parse.data;

  try {
    const userData = await getUserByUsername(validData.username);

    if (!userData) {
      return res.status(401).json(reply(null, 'Incorrect Username/Password'));
    }

    const validPassword = checkPassword(validData.password, userData.password);

    if (!validPassword) {
      return res.status(401).json(reply(null, 'Incorrect Username/Password'));
    }

    await new Promise<void>((resolve, reject) => {
      req.session.regenerate((err) => (err ? reject(err) : resolve()));
    });

    req.session.userId = userData.id;

    await new Promise<void>((resolve, reject) => {
      req.session.save((err) => (err ? reject(err) : resolve()));
    });

    const { password: removedPassword, ...data } = userData;

    return res.status(200).json(reply(data));
  } catch (error) {
    req.log.error(error);
    return res.status(500).json(reply(null, 'Server error.'));
  }
});

type LogoutResType = Response<ApiResult<LogoutData>>;
authRouter.post('/logout', async (req: Request, res: LogoutResType) => {
  try {
    await new Promise<void>((resolve, reject) => {
      req.session.destroy((err) => (err ? reject(err) : resolve()));
    });

    return res.status(200).json(reply({ success: true }));
  } catch (error) {
    req.log.error(error);
    return res.status(400).json(reply(null, 'Failed to logout.'));
  }
});
