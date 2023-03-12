const refinedData = require("./comment");

module.exports = (items) => {
  const refinedItems = [];
  const refined = [];
  for (let item of items) {
    const { dataValues: data } = item;

    if (!data.repliesTo) refinedItems.push(data);
    else {
      const replyIndex = refinedItems.findIndex(
        (item) => item.id === data.repliesTo
      );

      const replyItem = refinedItems[replyIndex];
      const commentReplies = replyItem.replies ?? [];
      commentReplies.push(refinedData(data));
      replyItem.replies = commentReplies;
    }
  }
  for (let refinedItem of refinedItems) {
    refined.push(refinedData(refinedItem));
  }

  return refined;
};
