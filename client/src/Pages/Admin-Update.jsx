import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authorizationToken } = useAuth();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    role: "",
  });
  const [loading, setLoading] = useState(false); // for page load
  const [updating, setUpdating] = useState(false); // for update button

  useEffect(() => {
    if (!id || !authorizationToken) return;
    const getUser = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://excel-analytics-project.onrender.com/api/admin/users/${id}`,
          {
            headers: { Authorization: authorizationToken },
          }
        );
        const json = await res.json();
        const payload = json?.data ?? json;
        setUserData({
          username: payload?.username ?? "",
          email: payload?.email ?? "",
          phone: payload?.phone ?? "",
          role: payload?.role ?? "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load user");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [id, authorizationToken]);

  const handleChange = (e) =>
    setUserData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authorizationToken) {
      toast.error("Not authorized");
      return;
    }
    setUpdating(true);
    try {
      const res = await fetch(
        `https://excel-analytics-project.onrender.com/api/admin/users/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(userData),
        }
      );
      if (res.ok) {
        toast.success("User updated");
        navigate("/admin/users");
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Update error");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="py-8 text-center">Loading user…</div>;

  return (
    <section className="max-w-2xl mx-auto mt-6 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Update User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full px-4 py-2 border rounded"
        />

        <input
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
        />

        <input
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full px-4 py-2 border rounded"
        />

        <select
          name="role"
          value={userData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">Select role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={updating}
            className={`w-full sm:w-52 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-full ${
              updating ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {updating && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {updating ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </section>
  );
};
