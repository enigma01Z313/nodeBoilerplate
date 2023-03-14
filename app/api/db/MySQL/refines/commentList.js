const rfineComment = require("./comment");

module.exports = (data) => data.map((comment) => rfineComment(comment));

// const refinedData = require("./comment");

// module.exports = (items) => {
//   const refinedItems = [];

//   let index = 0;
//   const refined = [];
//   for (let item of items) {
//     const { dataValues: data } = item;

//     if (!data.repliesTo) refinedItems.push(data);
//     else {
//       const replyIndex = refinedItems.findIndex(
//         (item) => item.id === data.repliesTo
//       );
//       const replyItem = refinedItems[replyIndex];
//       const commentReplies = replyItem.replies ?? [];
//       commentReplies.push(refinedData(data));
//       replyItem.replies = commentReplies;
//     }
//     index++;
//   }
//   for (let refinedItem of refinedItems) {
//     refined.push(refinedData(refinedItem));
//   }

//   return refined;
// };
