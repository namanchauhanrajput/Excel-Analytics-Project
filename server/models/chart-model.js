const mongoose = require("mongoose");

// 📊 Chart Schema
const chartSchema = new mongoose.Schema(
  {
    // Chart Title (e.g., "Sales Report")
    title: {
      type: String,
      required: true,
    },

    // X-Axis Labels (e.g., ["Jan", "Feb", "Mar"])
    labels: [String],

    // Y-Axis Values (e.g., [100, 200, 150])
    values: [Number],

    // Chart Type (e.g., "bar", "line", "pie")
    type: {
      type: String,
      default: "bar", // fallback chart type
    },

    // 👤 Reference to User who created the chart
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt automatically
  }
);

// Exporting the model to use in routes
module.exports = mongoose.model("Chart", chartSchema);
