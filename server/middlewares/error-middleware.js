// ✅ Global error handling middleware
const errorMiddleware = (err, req, res, next) => {
  // 🔍 Use custom error status if provided, else fallback to 500 (server error)
  const status = err.status || 500;

  // 🧾 Use provided message or default
  const message = err.message || "BACKEND ERROR";

  // 🧠 Additional error detail (e.g., from validation)
  const extraDetails = err.extraDetails || "Error from Backend";

  // 📤 Send structured error response
  return res.status(status).json({ message, extraDetails });
};

module.exports = errorMiddleware;
