// ------------------------------------
// 🔁 Express Router Setup
// ------------------------------------
const express = require("express");
const router = express.Router(); // 🔁 Create router instance from Express

// ------------------------------------
// 📦 Import Controllers & Middlewares
// ------------------------------------
const authController = require("../controllers/auth-controllers");  // 👤 Auth controller (register, login, get user)
const { signupSchema, loginSchema } = require("../validators/auth-validator"); // 📋 Joi Schemas for validation
const validate = require("../middlewares/validate-middleware");     // ✅ Middleware to validate request body
const authMiddleware = require("../middlewares/auth-middleware");   // 🔐 JWT token validation middleware

// ------------------------------------
// 🔐 Route: POST /api/auth/register
// ------------------------------------
// 🧾 Validates input using signupSchema
// 📦 Calls register function from authController
router.route("/register")
  .post(validate(signupSchema), authController.register);

// ------------------------------------
// 🔐 Route: POST /api/auth/login
// ------------------------------------
// 🧾 Validates input using loginSchema
// 📦 Calls login function from authController
router.route("/login")
  .post(validate(loginSchema), authController.login);

// ------------------------------------
// 🔐 Route: GET /api/auth/user
// ------------------------------------
// 🧠 Uses authMiddleware to verify JWT token
// 📦 Calls user function from authController
router.route("/user")
  .get(authMiddleware, authController.user);

// ------------------------------------
// 🚀 Export Router
// ------------------------------------
module.exports = router;
