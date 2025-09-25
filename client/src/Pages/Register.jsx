import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaChartBar } from "react-icons/fa";
import { motion } from "framer-motion";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://excel-analytics-project.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      const res_data = await response.json();
      console.log("Server Response:", res_data);

      if (response.ok) {
        storeTokenInLS(res_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration Successful 🎉");
        navigate("/dashboard");
      } else {
        toast.error(res_data.exteraDetails || res_data.message);
      }
    } catch (error) {
      console.error("Register Error:", error);
      toast.error("Server error during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen pt-16 sm:pt-6 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 flex flex-col items-center justify-center px-4 py-6 relative overflow-hidden">
      
      {/* Icon + Title outside card (bahar) */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1">
            <FaChartBar className="text-purple-700 text-3xl" />
            <h1 className="text-3xl font-bold text-purple-700">
              ExcelAnalyzer
            </h1>
          </div>
          <p className="text-sm text-gray-800">
            Powerful Excel analysis and visualization platform
          </p>
        </div>
      </motion.div>
      {/* Back to Home */}
            <Link
              to="/"
              className="absolute top-4 left-4 text-purple-700 text-sm hover:underline z-10"
            >
              ← Back to Home
            </Link>

      {/* Registration Card with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md bg-white bg-opacity-30 backdrop-blur-md shadow-2xl rounded-2xl px-8 py-10 z-10"
      >
        <h2 className="text-xl font-bold text-center text-black mb-6">
          Create an Account
        </h2>

        {/* Tabs (Visual only) */}
        <div className="flex justify-center mb-6">
          <Link
            to="/login"
            className="px-4 py-2 rounded-l-lg border border-gray-300 text-sm font-medium shadow-inner hover:bg-gray-100 transition"
          >
            Sign In
          </Link>
          <button className="px-4 py-2 bg-white bg-transparent rounded-r-lg border border-gray-300 border-l-0 text-sm font-medium text-gray-600">
            Sign Up
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Username
            </label>
            <div className="relative">
              <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleInput}
                placeholder="Enter username"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInput}
                placeholder="Enter email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Phone
            </label>
            <div className="relative">
              <FaPhone className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 rotate-90" />
              <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleInput}
                placeholder="Enter phone number"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                placeholder="Create a password"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          </div>

          {/* Submit Button with Loader */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-70"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Register Now"
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
};
