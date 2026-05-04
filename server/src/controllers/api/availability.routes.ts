import { Router } from 'express';

export const availabilityRouter = Router();

// router.post('/', async (req, res) => {
//   const userId = req.session.userId || 4;
//   const loggedIn = req.session.loggedIn;
//   const userData = await User.findByPk(userId, {
//     attributes: { exclude: 'password' },
//     raw: true,
//     nest: true,
//   });
//   req.log.log(userData);
//   Availability.create({
//     userId,
//     date: req.body.date,
//     time: req.body.time,
//   });
//   res.send('availability created');
// });

// router.get('/', (req, res) => {
//   // const userId = req.session.userId || 2;
//   // const loggedIn= req.session.loggedIn;
//   // const userData = await User.findByPk(userId, {
//   //   attributes: { exclude: 'password' },
//   //   raw: true,
//   //   nest: true,
//   //    });
//   //    req.log.log(userData)
//   Availability.findAll({})
//     .then((data) => res.status(200).json(data))
//     .catch((err) => res.json(err));
//   // res.render('profile',{
//   //   test, loggedIn
//   // });
// });
