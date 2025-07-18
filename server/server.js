// Importing Required Modules
const express = require("express");
const app = express();
const cors = require("cors");

// Importing Routes
const authRoute = require("./router/auth-router");         // 🔐 Handles Auth Routes (Login, Register)
const uploadRoutes = require("./router/file-router.js");   // 📁 Handles File Upload (Excel)
const adminRoute = require("./router/admin-router.js");    // 🧑‍💻 Handles Admin-Specific APIs
const chartRouter = require("./router/chart-router");      // 📊 Handles Chart Save / History APIs

// Importing Database & Middleware
const connectDB = require("./config/db.js");                      // 🔗 MongoDB Connection Function
const errorMiddleware = require("./middlewares/error-middleware.js");  // ❌ Global Error Handler

// Load environment variables
require("dotenv").config();  // 🔐 Load .env configuration (like PORT, DB_URL)

// -----------------------------
// CORS Setup
// -----------------------------
const corsOptions = {
  origin: "https://excel-analytics-project-1.onrender.com",      // 🌐 Allow frontend (React) to access backend
  methods: "GET, POST, DELETE, PUT, PATCH, HEAD",  // ✅ Allowed HTTP Methods
  credentials: true,                    // 🔐 Allow cookies & headers like Authorization
};
app.use(cors(corsOptions));

// -----------------------------
// Built-in Middleware
// -----------------------------
app.use(express.json());  // 🧠 Parse incoming JSON bodies

// -----------------------------
// API Routes
// -----------------------------
app.use("/api/auth", authRoute);        // 🔐 Auth APIs (Login/Register)
app.use("/api/files", uploadRoutes);    // 📁 Excel Upload APIs
app.use("/api/admin", adminRoute);      // 🛠️ Admin APIs (Users/Contacts)
app.use("/api/charts", chartRouter);    // 📊 Chart Save/View APIs

// -----------------------------
// (Optional) Placeholder Routes
// -----------------------------
app.get("/api/charts", (req, res) => {
  res.status(200).json({ message: "Charts fetched (placeholder)" });
});

app.post("/api/charts/save", (req, res) => {
  res.status(201).json({ message: "Chart saved (placeholder)" });
});

app.delete("/api/file/:id", (req, res) => {
  res.status(200).json({ message: `File with ID ${req.params.id} deleted (placeholder)` });
});

// -----------------------------
// Database Connection
// -----------------------------
connectDB(); // 🔌 Connect to MongoDB

// -----------------------------
// Global Error Middleware
// -----------------------------
app.use(errorMiddleware);  // ❌ Handles errors from anywhere in app

// -----------------------------
// Server Listener
// -----------------------------
const PORT = process.env.PORT || 5000;  // ⚙️ Use .env PORT or default 5000
app.listen(PORT, () => {
  console.log(`🚀 Server is running at port: ${PORT}`);
});
