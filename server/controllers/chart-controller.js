const Chart = require("../models/chart-model");

const saveChart = async (req, res) => {
  const { labels, values } = req.body;

  if (!labels || !values) {
    return res.status(400).json({ message: "Missing chart data" });
  }

  try {
    const chart = new Chart({
      user: req.userID,
      labels,
      values,
    });
    await chart.save();
    res.status(201).json({ message: "Chart saved", chart });
  } catch (err) {
    res.status(500).json({ message: "Error saving chart", error: err.message });
  }
};

const getUserCharts = async (req, res) => {
  try {
    const charts = await Chart.find({ user: req.userID });
    res.status(200).json(charts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching charts", error: err.message });
  }
};

const getAllCharts = async (req, res) => {
  try {
    const charts = await Chart.find().populate("user", "username email");
    res.status(200).json(charts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching all charts", error: err.message });
  }
};

module.exports = { saveChart, getUserCharts, getAllCharts };
