import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
    <section
      className="min-h-screen relative flex items-center justify-center px-4 py-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg-login-blur.png')" }}
    >
      {/* Overlay gradient for soft blur effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 opacity-70 backdrop-blur-md z-0" />

      {/* Back to home */}
      <Link
        to="/"
        className="absolute top-4 left-4 text-purple-700 text-sm hover:underline z-10"
      >
        ← Back to Home
      </Link>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-xl px-8 py-10">
        <div className="flex flex-col items-center">
          <img src="/images/logo.svg" alt="Logo" className="w-12 h-12 mb-2" />
          <h1 className="text-2xl font-bold text-purple-700 mb-1">ExcelAnalyzer</h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            Powerful Excel analysis and visualization platform
          </p>
        </div>

        <h2 className="text-xl font-semibold text-center text-black mb-4">Welcome Back</h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          Sign in to your account or create a new one to get started
        </p>

        {/* Tabs (just visuals) */}
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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInput}
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold rounded-lg shadow-md transition"
          >
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </section>
  );
};
