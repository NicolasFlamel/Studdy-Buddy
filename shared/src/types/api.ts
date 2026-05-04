import { ChatsSchemaType, GetChatMetadataSchemaType } from '../schemas/chats';
import {
  CreateScoresSchemaType,
  ScoresSchemaType,
  UsersSchemaType,
} from '../schemas';

export type ApiSuccess<T> = { data: T; error: null };
export type ApiError = { data: null; error: { message: string } };
export type ApiResult<T> = ApiSuccess<T> | ApiError;

// users route
export type UserMeAPIData = Omit<UsersSchemaType, 'password'>;

// scores route
export type GetScoresData = ScoresSchemaType[];
export type PostScoresData = CreateScoresSchemaType[];

// chats route
export type GetChatMetadataData = GetChatMetadataSchemaType;
export type PostChatsData = Pick<ChatsSchemaType, 'id'>;
export type MatchPostChatsData = Pick<ChatsSchemaType, 'id'>;

// auth routes
export type RegisterData = Omit<UsersSchemaType, 'password'>;
export type LoginData = Omit<UsersSchemaType, 'password'>;
export type LogoutData = { success: boolean };
