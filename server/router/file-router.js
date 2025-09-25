const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");

const router = express.Router();

// 📦 Multer config: Store file in memory (no need to save on disk)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📥 Route: Upload and parse Excel file
router.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 🧠 Read uploaded Excel buffer
    const buffer = req.file.buffer;
    const workbook = xlsx.read(buffer, { type: "buffer" });

    // 🧾 Get first sheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    //  Convert sheet to JSON
    const data = xlsx.utils.sheet_to_json(sheet);

    // 🧱 Extract column names from first row (keys)
    const columns = Object.keys(data[0] || {});

    //  Respond with columns and rows
    res.status(200).json({ message: "File parsed", columns, rows: data });
  } catch (error) {
    console.error("Excel parse error:", error);
    res.status(500).json({ message: "Error parsing file" });
  }
});

module.exports = router;
