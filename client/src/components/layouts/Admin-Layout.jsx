import { useState, useEffect } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../store/auth";

export const AdminLayout = () => {
  const { user, isLoading, authorizationToken } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // stats for top cards (fetched from backend if available)
  const [stats, setStats] = useState({
    totalUsers: null,
    activeUsers: null,
    totalFiles: null,
    uptime: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!authorizationToken) return;
      try {
        // try fetch from a stats endpoint if present (fallback safely)
        const res = await fetch(
          "https://excel-analytics-project.onrender.com/api/admin/stats",
          { headers: { Authorization: authorizationToken } }
        );
        if (!res.ok) return;
        const json = await res.json();
        setStats({
          totalUsers: json.totalUsers ?? null,
          activeUsers: json.activeUsers ?? null,
          totalFiles: json.totalFiles ?? null,
          uptime: json.uptime ?? null,
        });
      } catch (err) {
        // ignore - keep placeholders
      }
    };
    fetchStats();
  }, [authorizationToken]);

  if (isLoading) return <h1 className="text-center text-lg mt-8">⏳ Loading...</h1>;
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
        <h1 className="text-lg font-semibold text-gray-800">Admin Dashboard</h1>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-white text-gray-800 w-72 p-6 border-r hidden md:block`}
        >
          <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/admin"
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md ${
                      isActive ? "bg-indigo-50 text-indigo-700" : "hover:bg-gray-100"
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
                      isActive ? "bg-indigo-50 text-indigo-700" : "hover:bg-gray-100"
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
                      isActive ? "bg-indigo-50 text-indigo-700" : "hover:bg-gray-100"
                    }`
                  }
                >
                  <span className="text-lg">📊</span> <span>Analytics</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Mobile sliding sidebar */}
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
                  to="/admin"
                  end
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md ${
                      isActive ? "bg-indigo-50 text-indigo-700" : "hover:bg-gray-100"
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
                      isActive ? "bg-indigo-50 text-indigo-700" : "hover:bg-gray-100"
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
                      isActive ? "bg-indigo-50 text-indigo-700" : "hover:bg-gray-100"
                    }`
                  }
                >
                  <span className="text-lg">📊</span> <span>Analytics</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Overlay when mobile sidebar open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Header area with title + Add user button */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-indigo-700">Admin Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Manage users, monitor system performance, and oversee platform operations</p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-3 py-2 bg-white border rounded shadow-sm text-sm">Export CSV</button>
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md shadow">
                + Add User
              </button>
            </div>
          </div>

          {/* Top stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-xs text-gray-500">Total Users</p>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-semibold">{stats.totalUsers ?? "—"}</h3>
                <span className="text-sm text-green-600">+12% </span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-xs text-gray-500">Active Users</p>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-semibold">{stats.activeUsers ?? "—"}</h3>
                <span className="text-sm text-green-600">+5%</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-xs text-gray-500">Total Files</p>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-semibold">{stats.totalFiles ?? "—"}</h3>
                <span className="text-sm text-green-600">+18%</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-xs text-gray-500">System Uptime</p>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-semibold">{stats.uptime ?? "99.9%"}</h3>
                <span className="text-sm text-green-600">+0.1%</span>
              </div>
            </div>
          </div>

          {/* Tabs / content area */}
          <div className="bg-transparent">
            <div className="bg-white rounded-lg p-4 shadow">
              {/* small tab navigation */}
              <div className="flex items-center gap-3 mb-4">
                <NavLink to="/admin/users" className={({ isActive }) => `px-3 py-2 rounded-md ${isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-100"}`}>User Management</NavLink>
                <NavLink to="/admin/charts" className={({ isActive }) => `px-3 py-2 rounded-md ${isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-100"}`}>Analytics</NavLink>
                <button className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100">Settings</button>
              </div>

              {/* Outlet where AdminUsers / AdminCharts etc. render */}
              <div className="mt-2">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
