const express = require("express");
const router = express.Router();

// --------------------------------------------
// 📦 Import Controllers & Middlewares
// --------------------------------------------
const adminControllers = require("../controllers/admin-controller");    // 🧠 Admin-related controller methods
const authMiddleware = require("../middlewares/auth-middleware");       // 🔐 JWT Auth check
const adminMiddleware = require("../middlewares/admin-middleware");     // 🛡️ Check if user is Admin

// --------------------------------------------
//  GET: All Users (Admin only)
// Route: /api/admin/users
// --------------------------------------------
//  Use case: Admin can view all users
router.route("/users")
  .get(authMiddleware, adminMiddleware, adminControllers.getAllUsers);

// --------------------------------------------
//  GET: Single User by ID
// Route: /api/admin/users/:id
// --------------------------------------------
//  Use case: Admin can view individual user details
router.route("/users/:id")
  .get(authMiddleware, adminMiddleware, adminControllers.getUserById);

// --------------------------------------------
//  PATCH: Update User by ID
// Route: /api/admin/users/update/:id
// --------------------------------------------
//  Use case: Admin can update user info
router.route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, adminControllers.updateUserById);

// --------------------------------------------
//  DELETE: Remove User by ID
// Route: /api/admin/users/delete/:id
// --------------------------------------------
// Use case: Admin can delete any user
router.route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminControllers.deleteUserById);

// --------------------------------------------
// Export Router
// --------------------------------------------
module.exports = router;
