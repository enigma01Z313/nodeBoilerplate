const CronJob = require("node-cron");
const deleteOffPrices = require("./deleteOffPrices");

exports.initScheduledJobs = () => {
  const removeOffprices = CronJob.schedule("0 0 0 */1 * *", async () => {
    await deleteOffPrices();
  });

  removeOffprices.start();
};
