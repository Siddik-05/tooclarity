const mongoose = require('mongoose');

const analyticsDailySchema = new mongoose.Schema({
  scope: { type: String, enum: ['COURSE', 'INSTITUTION'], index: true },
  institutionId: { type: mongoose.Schema.Types.ObjectId, index: true },
//   studentId : {type : mongoose.Schema.Types.ObjectId, index: true},
  courseId: {type: mongoose.Schema.Types.ObjectId, index: true},
  metric: { type: String, enum: ['views', 'comparisons', 'leads'], index: true },

  day: { type: Date, required: true, index: true }, // YYYY-MM-DD
  count: { type: Number, default: 0 }
}, { timestamps: true });

analyticsDailySchema.index(
  { scope: 1, institutionId: 1, metric: 1, day: 1, courseId: 1 },
  { unique: true }
);

module.exports = mongoose.model('AnalyticsDaily', analyticsDailySchema);
