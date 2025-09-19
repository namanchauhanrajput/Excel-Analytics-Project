import { useState, useEffect } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../store/auth";

export const AdminLayout = () => {
  const { user, isLoading, authorizationToken } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeAdmins: 0,
    uptime: "0s",
  });

  // uptime tracking
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - start) / 1000);
      const hrs = Math.floor(diff / 3600);
      const mins = Math.floor((diff % 3600) / 60);
      const secs = diff % 60;
      setStats((prev) => ({
        ...prev,
        uptime: `${hrs}h ${mins}m ${secs}s`,
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // fetch users & stats
  useEffect(() => {
    const fetchUsers = async () => {
      if (!authorizationToken) return;
      try {
        const response = await fetch(
          "https://excel-analytics-project.onrender.com/api/admin/users",
          { headers: { Authorization: authorizationToken } }
        );
        if (!response.ok) {
          console.error("Failed to fetch users");
          return;
        }
        const data = await response.json();
        const users = Array.isArray(data) ? data : data?.data ?? [];

        const totalUsers = users.length;
        const activeAdmins = users.filter((u) => u.isAdmin).length;

        setStats((prev) => ({
          ...prev,
          totalUsers,
          activeAdmins,
        }));
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, [authorizationToken]);

  if (isLoading)
    return <h1 className="text-center text-lg mt-8">⏳ Loading...</h1>;
  if (!user?.isAdmin) return <Navigate to="/" />;

  const toggleSidebar = () => setIsSidebarOpen((s) => !s);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top bar for mobile */}
      <div className="md:hidden flex items-center justify-between p-3 bg-white shadow-sm">
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white"
        >
          {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          <span className="text-sm">{isSidebarOpen ? "Close" : "Menu"}</span>
        </button>
        <h1 className="text-lg font-semibold text-gray-800">
          Admin Dashboard
        </h1>
      </div>

      <div className="flex flex-1">
        {/* Sidebar (Fixed on Desktop) */}
        <aside className="hidden md:flex fixed left-0 top-0 h-screen w-72 bg-white text-gray-800 p-6 border-r flex-col">
          <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/admin/dashboard"
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "hover:bg-gray-100"
                    }`
                  }
                >
                  <MdHome /> <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "hover:bg-gray-100"
                    }`
                  }
                >
                  <FaUser /> <span>Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/charts"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "hover:bg-gray-100"
                    }`
                  }
                >
                  <span className="text-lg">📊</span> <span>Analytics</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Mobile sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white p-6 transform transition-transform duration-200 md:hidden
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Admin Panel</h3>
            <button onClick={toggleSidebar} className="p-1">
              <X size={18} />
            </button>
          </div>

          <nav>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/admin/dashboard"
                  end
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "hover:bg-gray-100"
                    }`
                  }
                >
                  <MdHome /> <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/users"
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "hover:bg-gray-100"
                    }`
                  }
                >
                  <FaUser /> <span>Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/charts"
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "hover:bg-gray-100"
                    }`
                  }
                >
                  <span className="text-lg">📊</span> <span>Analytics</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6 md:ml-72">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-indigo-700">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage users, monitor system performance, and oversee platform
                operations
              </p>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-xs text-gray-500">Total Users</p>
              <h3 className="text-2xl font-semibold">{stats.totalUsers}</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-xs text-gray-500">Active Admins</p>
              <h3 className="text-2xl font-semibold">{stats.activeAdmins}</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-xs text-gray-500">System Uptime</p>
              <h3 className="text-2xl font-semibold">{stats.uptime}</h3>
            </div>
          </div>

          {/* Outlet */}
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center gap-3 mb-4">
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                User Management
              </NavLink>
              <NavLink
                to="/admin/charts"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                Analytics
              </NavLink>
            </div>

            <div className="mt-2">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
