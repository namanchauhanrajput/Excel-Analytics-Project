import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Register = () => {
  // 📌 State for storing user input
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  // 🔄 Handle form input changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // 🚀 Form submission handler
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
        // ✅ Save JWT token in localStorage via auth context
        storeTokenInLS(res_data.token);

        // ✅ Clear form fields
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
    <section className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center px-4 py-6">
      <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl w-full">

        {/* 🖼️ Left Image Section */}
        <div className="flex-1 flex justify-center">
          <img
            src="/images/register.png"
            alt="Register"
            className="w-72 md:w-96 object-contain drop-shadow-lg"
          />
        </div>

        {/* 📝 Right Form Section */}
        <div className="flex-1 w-full max-w-md bg-white shadow-2xl rounded-2xl px-8 py-10">
          <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleInput}
                placeholder="Enter username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInput}
                placeholder="Enter email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone</label>
              <input
                type="number"
                name="phone"
                value={user.phone}
                onChange={handleInput}
                placeholder="Enter phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                placeholder="Create a password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
            >
              Register Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
