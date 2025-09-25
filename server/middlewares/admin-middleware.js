// --------------------------------------------
// Middleware to allow only Admin users
// --------------------------------------------
const adminMiddleware = async (req, res, next) => {
  try {
    console.log(req.user); // User info is already attached by authMiddleware

    const adminRole = req.user.isAdmin; // 🔍 Check isAdmin flag from user object

    if (!adminRole) {
      // ❌ If not admin, deny access
      return res.status(403).json({ message: "Access denied. User is not an admin." });
    }

    next(); // ✅ If admin, pass control to next middleware/route

  } catch (error) {
    next(error); // ❌ Pass error to global error middleware
  }
};

// --------------------------------------------
// Export the middleware
// --------------------------------------------
module.exports = adminMiddleware;
