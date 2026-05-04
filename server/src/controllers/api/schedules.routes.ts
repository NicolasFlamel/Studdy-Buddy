import { Router } from 'express';

export const scheduleRouter = Router();

// scheduleRouter.get('/', async (req, res) => {
//   try {
//     const scheduleData = await Schedules.findAll();
//     res.json(scheduleData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// scheduleRouter.post('/', withAuth, async (req, res) => {
//   const { userId } = req.session;
//   const { date } = req.body;
//   try {
//     const scheduleData = Schedules.create({ userId, date });
//     res.json(scheduleData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// scheduleRouter.delete('/:id', withAuth, async (req, res) => {
//   const { userId } = req.session;
//   const { id } = req.params;

//   try {
//     const scheduleData = Schedules.destroy({ where: { id, userId } });
//     res.json(scheduleData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
