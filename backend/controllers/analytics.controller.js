const mongoose = require("mongoose");
const InstitutionAdmin = require("../models/InstituteAdmin");
const asyncHandler = require("express-async-handler");

exports.getInstitutionAnalytics = asyncHandler(async (req, res) => {
  const { metric, type } = req.body;
  const userId = req.userId;

  // Validate inputs
  if (!metric || !["views", "comparisons", "leads"].includes(metric)) {
    return res.status(400).json({ success: false, message: "Invalid metric" });
  }

  if (!type || !["weekly", "monthly", "yearly"].includes(type)) {
    return res.status(400).json({ success: false, message: "Invalid analytics type" });
  }

  // Set Date Range
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let groupFormat = "%Y-%m-%d"; // default (daily)
  let rangeStart = new Date(today);

  if (type === "weekly") {
    rangeStart.setDate(today.getDate() - 7);
  } else if (type === "monthly") {
    groupFormat = "%Y-%m";
    rangeStart.setMonth(today.getMonth() - 1);
  } else if (type === "yearly") {
    groupFormat = "%Y";
    rangeStart.setFullYear(today.getFullYear() - 1);
  }

  const result = await InstitutionAdmin.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },

    { $project: { institutionId: 1 } },

    {
      $lookup: {
        from: "analyticsdailies",
        let: { instId: "$institutionId" },
        pipeline: [
          {
            $match: {
              metric,
              $expr: { $eq: ["$institutionId", "$$instId"] },
              day: { $gte: rangeStart, $lte: today } // DIRECT DATE FILTER ⚡
            }
          },
          {
            $group: {
              _id: {
                label: { $dateToString: { format: groupFormat, date: "$day" } }
              },
              totalCount: { $sum: "$count" }
            }
          },
          {
            $project: {
              _id: 0,
              label: "$_id.label",
              count: "$totalCount"
            }
          },
          { $sort: { label: 1 } }
        ],
        as: "analytics"
      }
    },

    { $limit: 1 }
  ]);


  if (!result.length) {
    return res.status(404).json({
      success: false,
      message: "Institution not found for this admin"
    });
  }

  const analytics = result[0].analytics;
  const totalCount = analytics.reduce((sum, item) => sum + item.count, 0);

  return res.status(200).json({
    success: true,
    metric,
    type,
    dateRange: {
      from: rangeStart.toISOString().split("T")[0],
      to: today.toISOString().split("T")[0]
    },
    totalCount,
    analytics
  });
});
