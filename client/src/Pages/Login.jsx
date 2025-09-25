import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai"; //New Icon for Logo
import { motion } from "framer-motion";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
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
      const response = await fetch("https://excel-analytics-project.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("Login Successful");
        storeTokenInLS(res_data.token);
        setUser({ email: "", password: "" });
        navigate("/dashboard");
      } else {
        toast.error(res_data.exteraDetails || res_data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
    <section className="relative  flex flex-col items-center justify-center px-4 py-6 overflow-hidden">
      {/*  Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('public/images/bg-login-blur.png')",
          filter: "blur(12px)",
        }}
      />

      {/*  Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-purple-200 to-blue-300 opacity-70 z-0" />

      {/*  Back to Home */}
      <Link
        to="/"
        className="absolute top-4 left-4 text-purple-700 text-sm hover:underline z-10"
      >
        ← Back to Home
      </Link>

      {/*  Logo + Title */}
      <motion.div
        className="z-10 text-center mb-6 "
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex flex-col items-center ">
          <div className="flex items-center gap-2 mt-8 sm:mt-0">
            {/*  Icon with Title */}
            <AiOutlineBarChart className="text-purple-700 text-3xl" />
            <h1 className="text-2xl font-bold text-purple-700">
              ExcelAnalyzer
            </h1>
          </div>
          <p className="text-sm text-gray-800">
            Powerful Excel analysis and visualization platform
          </p>
        </div>
      </motion.div>

      {/* Login Card */}
      <motion.div
        className="relative z-10 w-full max-w-md bg-white bg-opacity-30 backdrop-blur-xl rounded-2xl shadow-2xl px-8 py-10 mb-16"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2 className="text-xl font-bold text-center text-black mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-700 text-sm mb-6">
          Sign in to your account or create a new one to get started
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <button className="px-4 py-2 bg-white rounded-l-lg border border-gray-300 text-sm font-medium shadow-inner">
            Sign In
          </button>
          <Link
            to="/register"
            className="px-4 py-2 bg-transparent rounded-r-lg border border-gray-300 border-l-0 text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="relative">
            <label className="block text-sm text-gray-800 mb-1">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <FaEnvelope size={14} />
              </span>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInput}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block text-sm text-gray-800 mb-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <FaLock size={14} />
              </span>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          </div>

          {/* Submit with Loader */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-lg shadow-md transition ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:from-purple-600 hover:to-purple-800"
            }`}
          >
            {loading ? (
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            ) : (
              "Sign In to Dashboard"
            )}
          </button>
        </form>
      </motion.div>
    </section>
    </>
  );
};
