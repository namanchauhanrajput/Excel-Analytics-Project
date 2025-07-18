const mongoose = require("mongoose");

// Connect to MongoDB using mongoose

const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using URI from .env file
    await mongoose.connect(process.env.MONGO_URI);

    // If successful, log the success message
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    // If connection fails, log the error and exit the process
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(); // Stop the server if DB connection fails
  }
};

// Export the function so it can be used in server.js or app.js
module.exports = connectDB;
