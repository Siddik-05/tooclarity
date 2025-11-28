const cron = require("node-cron");
const mongoose = require("mongoose");
const redisClient = require("../config/redisConfig");
const AnalyticsDaily = require("../models/AnalyticsDaily");

function getISTMidnight() {
  const ist = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  ist.setHours(0, 0, 0, 0); // Set to midnight IST
  return ist;
}


cron.schedule("*/10 * * * *", async () => {
  console.log("⏳ [Worker] Syncing analytics (views + impressions)...");

  try {
    const [viewKeys, leadKeys] = await Promise.all([
      redisClient.keys("viewCourse:*"),
      redisClient.keys("leadImpression:*"),
    ]);

    const keys = [...viewKeys, ...leadKeys];
    console.log(`📦 Found ${keys.length} analytics keys.`);

    if (!keys.length) return;

    const day = getISTMidnight();

    // 🔹 Pipeline for SCARD
    const pipeline = redisClient.multi();
    keys.forEach(key => pipeline.scard(key));
    const counts = await pipeline.exec();

    const bulkOps = [];

    keys.forEach((key, idx) => {
      const [primaryKey, courseId, institutionId] = key.split(":");
      const userCount = counts[idx][1]; // [error, count]

      if (!userCount || !courseId || !institutionId) return;

      const metric = primaryKey === "leadImpression" ? "leads" : "views";

      bulkOps.push({
        updateOne: {
          filter: {
            scope: "COURSE",
            metric,
            courseId: new mongoose.Types.ObjectId(courseId),
            institutionId: new mongoose.Types.ObjectId(institutionId),
            day,
          },
          update: {
            $inc: { count: userCount },
            $setOnInsert: {
              scope: "COURSE",
              metric,
              courseId,
              institutionId,
              day,
            },
          },
          upsert: true,
        },
      });
    });

    if (bulkOps.length) {
      await AnalyticsDaily.bulkWrite(bulkOps, { ordered: false });
    }

    await redisClient.del(keys);
    console.log("🧹 Deleted processed Redis analytics keys.");

  } catch (err) {
    console.error("❌ Analytics Worker Error:", err);
  }
});
