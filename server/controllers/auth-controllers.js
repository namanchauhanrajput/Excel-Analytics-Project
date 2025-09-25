const User = require("../models/user-model");  // 🧑‍💻 User model (MongoDB)
const bcrypt = require("bcryptjs");            // 🔐 For password hashing (if used)

// --------------------------------------------
// Register Controller (POST /api/auth/register)
// --------------------------------------------
const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;  // 📝 Extract data from request

    const userExist = await User.findOne({ email });         // 🔍 Check if email already exists

    if (userExist) {
      return res.status(400).json({ message: "Email already exists" }); // ❌ Duplicate email
    }

    const newUser = await User.create({ username, email, phone, password }); // 🧑 Create new user in DB

    res.status(201).json({
      message: "successful",
      token: await newUser.generateToken(),     // 🔐 Generate JWT token from user model method
      userId: newUser._id.toString(),           // 🆔 Return user ID as string
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });  // ❌ Server-side error
  }
};

// --------------------------------------------
// ✅ Login Controller (POST /api/auth/login)
// --------------------------------------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;  // 📝 Extract login credentials

    const userExist = await User.findOne({ email }); // 🔍 Check user by email

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" }); // ❌ If no user found
    }

    // ✅ NOTE: This is plain text password comparison (not secure for production)
    if (password === userExist.password) {
      const token = userExist.generateToken(); // 🔐 Generate token

      return res.status(200).json({
        message: "Login successful",
        token: token,
        userId: userExist._id.toString(), // 🆔 Return user ID
      });
    } else {
      return res.status(401).json({ message: "Invalid Email or Password" }); // ❌ Incorrect password
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" }); // ❌ Server error
  }
};

// --------------------------------------------
// ✅ Get User Controller (GET /api/auth/user)
// --------------------------------------------
// 👉 Returns user data from verified JWT (authMiddleware puts it in req.user)

const user = async (req, res) => {
  try {
    const userData = req.user;         // 🧠 Extracted from token by middleware
    console.log(userData);
    res.status(200).json({ userData }); // ✅ Send user data
  } catch (error) {
    res.status(500).json({ message: "Server error from user route" }); // ❌ Server error
  }
};

// ---------------------------------------------------
// 📝 Export all controller functions
// ---------------------------------------------------
module.exports = { register, login, user };




// ✅ SECURE LOGIN (Using bcrypt):
/*
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // 🔐 Compare entered password with hashed password from DB
    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (isPasswordValid) {
      res.status(200).json({
        message: "Login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString()
      });
    } else {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
*/
