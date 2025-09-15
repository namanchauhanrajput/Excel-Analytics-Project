import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
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
      const response = await fetch("https://excel-analytics-project.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      console.log("Server Response:", res_data);

      if (response.ok) {
        storeTokenInLS(res_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration Successful 🎉");
        navigate("/dashboard");
      } else {
        toast.error(res_data.exteraDetails ? res_data.exteraDetails : res_data.message);
      }
    } catch (error) {
      console.error("Register Error:", error);
      toast.error("Server error during registration.");
    }
  };

  return (
    <section className="min-h-screen pt-28 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center px-4 py-6">
      <div className="text-center absolute top-16">
        <h1 className="text-3xl font-bold text-purple-700">ExcelAnalyzer</h1>
        <p className="text-sm text-gray-800 mt-1">
          Powerful Excel analysis and visualization platform
        </p>
      </div>

      {/* Registration Card */}
      <div className="w-full max-w-md bg-white bg-opacity-30 backdrop-blur-md shadow-2xl rounded-2xl px-8 py-10">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">Username</label>
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
            <label className="block text-gray-800 font-medium mb-1">Email</label>
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
            <label className="block text-gray-800 font-medium mb-1">Phone</label>
            <div className="relative">
              <FaPhone className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
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
            <label className="block text-gray-800 font-medium mb-1">Password</label>
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold rounded-lg shadow-md transition"
          >
            Register Now
          </button>
        </form>
      </div>
    </section>
  );
};
