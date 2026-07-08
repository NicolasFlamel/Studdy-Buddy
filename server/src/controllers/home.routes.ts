import path from 'path';
import { Router } from 'express';
import { CLIENT_DIST } from '@/utils/paths';

export const homeRouter = Router();

homeRouter.get('/*', async (_, res) => {
  res.sendFile(path.join(CLIENT_DIST, './index.html'));
});

// homeRouter.get('/', async (req, res) => {
//   const { userId } = req.session;

//   let userData;

//   try {
//     if (loggedIn) {
//       userData = await User.findByPk(userId, {
//         attributes: { exclude: 'password' },
//         include: { model: Score, attributes: { exclude: ['id', 'userId'] } },
//         nest: true,
//         raw: true,
//       });
//     }

//     res.render('homepage', {
//       loggedIn,
//       userData,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// homeRouter.get('/assessment', withAuth, async (req, res) => {
//   const { userId } = req.session;

//   try {
//     const userData = await User.findByPk(userId, {
//       include: [{ model: Score }],
//       nest: true,
//       raw: true,
//     });

//     res.render('assessment', {
//       loggedIn: req.session.loggedIn,
//       userScores: userData.score,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// homeRouter.get('/chat', withAuth, async (req, res) => {
//   const { userId } = req.session;
//   let chatData, roomStatus;

//   try {
//     const userData = await User.findByPk(userId, {
//       attributes: { exclude: 'password' },
//       include: [{ model: Score }, { model: Chat }],
//       raw: true,
//       nest: true,
//     });

//     if (userData.isActive) {
//       const chatDataArr = await searchChat(userData);
//       chatData = chatDataArr[Math.floor(Math.random() * chatDataArr.length)];
//       roomStatus = 'joined';
//       if (!chatData) {
//         // if no rooms open then join their own room
//         chatData = { id: userData.chat.id };
//         roomStatus = 'searching';
//       }
//     } else {
//       await Chat.update({ isOpen: true }, { where: { userId } });
//       chatData = await Chat.findOne({
//         attributes: ['id', 'subject'],
//         where: { userId: userData.id },
//         raw: true,
//       });
//       roomStatus = 'created';
//     }

//     res.render('chat', {
//       loggedIn: req.session.loggedIn,
//       // update values
//       ...userData,
//       chatData,
//       roomStatus,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// homeRouter.get('/login', (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }

//   res.render('login');
// });

// homeRouter.get('/profile', withAuth, async (req, res) => {
//   const { loggedIn, userId } = req.session;

//   try {
//     const userData = await User.findByPk(userId, {
//       attributes: { exclude: 'password' },
//       include: { model: Score, attributes: { exclude: ['id', 'userId'] } },
//       nest: true,
//       raw: true,
//     });
//     const scheduleData = await Schedule.findAll({
//       where: { userId },
//       order: [['date', 'ASC']],
//       raw: true,
//     });

//     res.render('profile', {
//       loggedIn,
//       userData,
//       scheduleData,
//       ownProfile: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// homeRouter.get('/user/:username', async (req, res) => {
//   const { loggedIn } = req.session;
//   const { username } = req.params;

//   try {
//     const userData = await User.findOne({ where: { username }, raw: true });

//     if (!userData) throw 'User not found';

//     const scheduleData = await Schedule.findAll({
//       where: { userId: userData.id },
//       order: [['date', 'ASC']],
//       raw: true,
//     });

//     res.render('profile', {
//       loggedIn,
//       userData,
//       scheduleData,
//       ownProfile: false,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
