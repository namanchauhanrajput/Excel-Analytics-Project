const express = require("express");
const router = express.Router();
const Chart = require("../models/chart-model"); // 📊 Chart model
const authMiddleware = require("../middlewares/auth-middleware"); // ✅ Verify logged-in user
const adminMiddleware = require("../middlewares/admin-middleware"); // 🔐 Verify admin only

// ✅ [GET] Get all charts (Admin only)
// ➤ Used to show all users' charts with their username/email
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const charts = await Chart.find().populate("createdBy", "username email"); // 🔄 populate user info
    res.status(200).json(charts); // 📤 send all charts
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch charts" }); // ❌ server error
  }
});

// ✅ [POST] Save a new chart (Only logged-in user can do this)
// ➤ Save chart data to DB with user ID
router.post("/save", authMiddleware, async (req, res) => {
  const { labels, values, title, type } = req.body;

  try {
    const chart = new Chart({
      title: title || "Untitled", // 📛 fallback title
      labels,                     // 📈 x-axis labels
      values,                     // 📉 y-axis values
      type,                       // 📊 chart type (bar, pie, etc.)
      createdBy: req.user._id,    // 👤 user who created this chart
    });

    await chart.save(); // 💾 save to MongoDB
    res.status(201).json({ message: "Chart saved", chart });
  } catch (err) {
    res.status(400).json({ message: "Failed to save chart" });
  }
});

// ✅ [DELETE] Delete chart by ID (Admin only)
// ➤ Admin can delete any chart by its _id
router.delete("/delete/:id", authMiddleware, adminMiddleware, async (req, res) => {
  const chartId = req.params.id;

  try {
    const deletedChart = await Chart.findByIdAndDelete(chartId); // ❌ delete from DB
    if (!deletedChart) {
      return res.status(404).json({ message: "Chart not found" });
    }
    res.status(200).json({ message: "Chart deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete chart" });
  }
});

// ✅ [GET] Get user-specific chart history
// ➤ Returns all charts created by the logged-in user (sorted by date)
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const charts = await Chart.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(charts); // 📤 send user's own chart history
  } catch (error) {
    res.status(500).json({ message: "Error fetching history" });
  }
});

module.exports = router;
