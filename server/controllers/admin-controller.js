const User = require("../models/user-model"); // 👤 User model from MongoDB

// --------------------------------------------
// ✅ Get All Users (GET /api/admin/users)
// --------------------------------------------
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password"); // 🔍 Fetch all users without password

    console.log(users); // 🧪 Debug log (optional)

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users Found" }); // ❌ No users case
    }

    return res.status(200).json(users); // ✅ Return all users
  } catch (error) {
    next(error); // ❌ Pass error to global error handler
  }
};

// --------------------------------------------
// ✅ Get Single User by ID (GET /api/admin/users/:id)
// --------------------------------------------
const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id; // 🆔 Extract user ID from URL
    const data = await User.findOne({ _id: id }, { password: 0 }); // 🔍 Find user without password field

    return res.status(200).json({ data }); // ✅ Return user data
  } catch (error) {
    next(error); // ❌ Pass error to middleware
  }
};

// --------------------------------------------
// ✅ Update User by ID (PATCH /api/admin/users/update/:id)
// --------------------------------------------
const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;              // 🆔 User ID from URL
    const updateUserdata = req.body;       // 📝 Updated fields from request body

    const updatedData = await User.updateOne(
      { _id: id },
      { $set: updateUserdata }             // 🔄 Apply updates using $set
    );

    return res.status(200).json({ updatedData }); // ✅ Return result
  } catch (error) {
    next(error); // ❌ Error handling
  }
};

// --------------------------------------------
// ✅ Delete User by ID (DELETE /api/admin/users/delete/:id)
// --------------------------------------------
const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;           // 🆔 Get user ID from URL
    await User.deleteOne({ _id: id });  // 🗑️ Delete user from DB

    return res.status(200).json({ message: "User Deleted Successfully" }); // ✅ Success message
  } catch (error) {
    next(error); // ❌ Forward to error middleware
  }
};

// --------------------------------------------
// 🚀 Export All Admin Controller Methods
// --------------------------------------------
module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
