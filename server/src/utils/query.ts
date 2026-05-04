// // searches open chat rooms where the userData has a higher score
// export const searchChats = async (userData: Users) => {
//   const chatData = await Chats.findAll({
//     attributes: [
//       'id',
//       'subject',
//       'subjectScore',
//       'isOpen',
//       'userId',
//       'user.username',
//     ],
//     include: { model: Users, attributes: [] },
//     where: {
//       [Op.and]: [
//         { isOpen: true },
//         {
//           [Op.or]: [
//             { [Op.and]: [{ subject: 'vanillaJs' }] },
//             { [Op.and]: [{ subject: 'mySql' }] },
//             { [Op.and]: [{ subject: 'nodeJs' }] },
//             { [Op.and]: [{ subject: 'express' }] },
//             { [Op.and]: [{ subject: 'oop' }] },
//           ],
//         },
//       ],
//     },
//     raw: true,
//   });

//   return chatData;
// };
