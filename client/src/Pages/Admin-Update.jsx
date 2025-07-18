import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminUpdate = () => {
  // ✅ Hooks
  const { id } = useParams(); // get user ID from URL
  const navigate = useNavigate(); // for redirection
  const { authorizationToken } = useAuth(); // token for authorization header

  // ✅ User form state
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
  });

  // ✅ Fetch user data by ID from backend (for update form)
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch(`https://excel-analytics-project.onrender.com/api/admin/users/${id}`, {
          headers: {
            Authorization: authorizationToken,
          },
        });
        const result = await response.json();
        setUserData(result.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, [id, authorizationToken]);

  // ✅ Handle input field changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // ✅ Submit updated user data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://excel-analytics-project.onrender.com/api/admin/users/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        toast.success("✅ User updated successfully");
        navigate("/admin/users"); // redirect back to user list
      } else {
        toast.error("❌ Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // ✅ JSX layout
  return (
    <section className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">✏️ Update User Info</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full px-4 py-2 border rounded"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
        />

        {/* Phone */}
        <input
          type="number"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full px-4 py-2 border rounded"
        />
        {/* Submit button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-52 bg-gradient-to-r from-blue-700 to-purple-700 text-white py-2 rounded-full hover:bg-blue-800 transition"
          >
            Update
          </button>
        </div>
      </form>
    </section>
  );
};
