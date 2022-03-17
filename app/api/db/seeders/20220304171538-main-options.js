'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('options', [
      {
        key: 'permissions',
        value: '[{"name":"مدیرت کاربران","permissions":[{"lable":"نمایش کابران","permission":"SEE_USERS"},{"lable":"افزودن کابر","permission":"ADD_USERS"},{"lable":"ویرایش کابران","permission":"EDIT_USERS"},{"lable":"حذف کابر","permission":"DELETE_USERS"}]},{"name":"مدیرت فیش های حقوقی","permissions":[{"lable":"آپلود فیش های حقوقی","permission":"UPLOAD_RECEIPTS"},{"lable":"نمایش همه فیشهای حقوقی","permission":"SEE_ALL_RECEIPTS"},{"lable":"حذف فیش حقوقی","permission":"DELETE_RECEIPTS"},{"lable":"نمایش فیش حقوقی خود","permission":"SEE_OWN_RECEIPTS"}]},{"name":"مدیرت پنل پامک","permissions":[{"lable":"ارسال پیام همگانی","permission":"SEND_BROADCAST_SMS"}]}]',
        createdAt: new Date(), 
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('options', null, {});
  }
};

