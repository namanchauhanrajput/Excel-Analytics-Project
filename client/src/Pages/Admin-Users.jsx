import { useEffect, useCallback, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { MoreVertical } from "lucide-react";

/**
 * AdminUsers
 * - Fetches users
 * - Search
 * - Desktop table + mobile cards
 * - Actions dropdown per row (Edit / Delete)
 */

export const AdminUsers = () => {
  const { authorizationToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  const getAllUsersData = useCallback(async () => {
    if (!authorizationToken) return;
    setLoading(true);
    try {
      const response = await fetch(
        "https://excel-analytics-project.onrender.com/api/admin/users",
        {
          method: "GET",
          headers: { Authorization: authorizationToken },
        }
      );
      if (!response.ok) {
        console.error("Failed to fetch users");
        setLoading(false);
        return;
      }
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : data?.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [authorizationToken]);

  useEffect(() => {
    getAllUsersData();
  }, [getAllUsersData]);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(
        `https://excel-analytics-project.onrender.com/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: authorizationToken },
        }
      );
      if (res.ok) getAllUsersData();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = useMemo(() => {
    if (!q) return users;
    const low = q.toLowerCase();
    return users.filter(
      (u) =>
        (u.username || "").toLowerCase().includes(low) ||
        (u.email || "").toLowerCase().includes(low) ||
        (u.phone || "").toLowerCase().includes(low)
    );
  }, [users, q]);

  // helper function for safe date display
  const formatDate = (val) => {
    if (!val) return "—";
    const d = new Date(val);
    return isNaN(d.getTime()) ? "—" : d.toLocaleString();
  };

  // small actions dropdown component
  const RowActions = ({ u }) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="relative inline-block text-left">
        <button
          onClick={() => setOpen((s) => !s)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <MoreVertical size={18} />
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-20">
            <Link
              to={`/admin/users/${u._id}/edit`}
              className="block px-3 py-2 text-sm hover:bg-gray-50"
            >
              Edit
            </Link>
            <button
              onClick={() => deleteUser(u._id)}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="min-h-[60vh]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search users..."
            className="px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16">Loading users…</div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-lg shadow overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-left">Contact</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  {/* <th className="px-4 py-3 text-left">Activity</th> */}
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((u) => (
                  <tr
                    key={u._id}
                    className="border-t last:border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-4">
                      <div className="font-semibold">
                        {u.username || "—"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {u.designation || ""}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">{u.email || "—"}</div>
                      <div className="text-xs text-gray-500">
                        {u.phone || "—"}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700">
                        {u.isAdmin ? "Admin" : "User"}
                      </span>
                    </td>
                    
                    <td className="px-4 py-4">
                      <RowActions u={u} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {filtered.map((u) => (
              <div key={u._id} className="bg-white rounded-lg p-4 shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-base">{u.username}</div>
                    <div className="text-xs text-gray-500">{u.email}</div>
                    <div className="text-xs mt-1">
                      Role: {u.isAdmin ? "Admin" : "User"}
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-600">
                  <div>Last: {formatDate(u.lastLogin)}</div>
                  <div>Joined: {formatDate(u.createdAt)}</div>
                </div>

                <div className="mt-3 flex gap-2">
                  <Link
                    to={`/admin/users/${u._id}/edit`}
                    className="flex-1 text-center px-3 py-2 border rounded-md"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="flex-1 text-center px-3 py-2 bg-red-600 text-white rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};
