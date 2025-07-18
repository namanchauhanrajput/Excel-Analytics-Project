const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// --------------------------------------------
// 🧱 Define User Schema using Mongoose
// --------------------------------------------
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },       // 👤 User's name
  email: { type: String, required: true },          // 📧 Email (must be unique ideally)
  phone: { type: String, required: true },          // 📱 Phone number
  password: { type: String, required: true },       // 🔐 Password (plain text for now)
  isAdmin: { type: Boolean, default: false },       // 🛡️ Is this user an admin?
});

// --------------------------------------------
// 🔐 Password Hashing (Commented out for testing)
// --------------------------------------------
// ❌ FOR TESTING ONLY: You can enable this for secure password storage
/*
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();  // 🛑 Skip if password not modified

  try {
    const salt = await bcrypt.genSalt(10);                  // 🧂 Generate salt
    const hash_password = await bcrypt.hash(user.password, salt); // 🔐 Hash password
    user.password = hash_password;                          // 💾 Save hashed password
    next();
  } catch (error) {
    next(error);  // ❌ Pass error to middleware
  }
});
*/

// --------------------------------------------
// 🔄 Password Comparison Method (Plain text version)
// --------------------------------------------
// 🧪 Only for development — compares directly without bcrypt
userSchema.methods.comparePassword = async function (password) {
  return password === this.password;  // 🔁 Simple string comparison
};

// --------------------------------------------
// 🔐 JWT Token Generator Method
// --------------------------------------------
// 🎟️ Creates a signed token with userId, email, isAdmin
userSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),  // 🆔 Unique MongoDB user ID
        email: this.email,            // 📧 Email
        isAdmin: this.isAdmin,        // 🛡️ Admin flag
      },
      process.env.JWT_KEY,            // 🔐 Secret key from .env
      {
        expiresIn: "30d",             // ⏳ Token expiry (30 days)
      }
    );
  } catch (error) {
    console.error("Token error:", error);  // ❌ Log token generation error
  }
};

// --------------------------------------------
// 🏁 Create and Export the User Model
// --------------------------------------------
const User = new mongoose.model("User", userSchema);
module.exports = User;
