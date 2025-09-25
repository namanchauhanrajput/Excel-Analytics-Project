const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

// --------------------------------------------
// 🔐 Auth Middleware to verify JWT token
// --------------------------------------------
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization"); // 📥 Extract token from header

    if (!token) {
      return res.status(401).json({ message: "Unauthorized. Token missing." }); // ❌ No token found
    }

    // --------------------------------------------
    //  Clean token: Remove "Bearer" prefix if present
    // --------------------------------------------
    const jwtToken = token.replace("Bearer", "").trim();
    console.log("Token from middleware:", jwtToken);

    // --------------------------------------------
    // ✅ Verify token using secret key
    // --------------------------------------------
    const isVerified = jwt.verify(jwtToken, process.env.JWT_KEY); // 🔍 Decode token

    // --------------------------------------------
    // 🧑 Get user from DB based on token payload (email)
    // --------------------------------------------
    const userData = await User.findOne({ email: isVerified.email }).select("-password"); // 🙈 Don't include password

    if (!userData) {
      return res.status(401).json({ message: "Unauthorized. User not found." }); // ❌ If user not found
    }

    // --------------------------------------------
    //  Attach user info to request object
    // --------------------------------------------
    req.user = userData;         // 🧠 Full user object (without password)
    req.token = jwtToken;        // 🎟️ Original token
    req.userID = userData._id;   // 🆔 MongoDB User ID

    next(); //  Pass control to next middleware or route

  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ message: "Unauthorized. Invalid token." }); // ❌ Invalid or expired token
  }
};

// --------------------------------------------
// Export middleware function
// --------------------------------------------
module.exports = authMiddleware;
