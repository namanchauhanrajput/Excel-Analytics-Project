import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FileUp, History, Menu, X, BrainCircuit } from "lucide-react";
import { useAuth } from "../../store/auth";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export const DashboardLayout = () => {
  const { user, authorizationToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chartStats, setChartStats] = useState({
    totalCharts: 0,
    chartTypes: new Set(),
    recentCharts: [],
  });

  const isHome = location.pathname === "/dashboard";

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const handleNavClick = () => {
    if (window.innerWidth < 640) setIsSidebarOpen(false);
  };

  const fetchChartStats = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://excel-analytics-project.onrender.com/api/charts/history",
        {
          headers: { Authorization: authorizationToken },
        }
      );

      const charts = res.data;
      const types = new Set(charts.map((chart) => chart.type));
      const recent = charts.slice(0, 5);

      setChartStats({
        totalCharts: charts.length,
        chartTypes: types,
        recentCharts: recent,
      });
    } catch (err) {
      console.error("Error fetching stats", err);
    }
  }, [authorizationToken]);

  useEffect(() => {
    if (authorizationToken) fetchChartStats();
  }, [fetchChartStats, authorizationToken]);

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* 🌐 Sidebar */}
      <aside
        className={`fixed sm:static top-0 left-0 z-40 sm:z-auto bg-blue-800 w-64 sm:min-h-screen shadow-lg border-r p-6 space-y-6 transform ${
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full sm:translate-x-0"
        } transition-transform duration-300 ease-in-out`}
      >
        <NavLink
          to="/dashboard"
          onClick={handleNavClick}
          className="text-2xl font-bold text-white mb-8 block"
        >
          📊 Dashboard
        </NavLink>

        <nav className="space-y-4">
          <NavLink
            to="/dashboard/upload"
            onClick={handleNavClick}
            className="flex items-center gap-3 px-4 py-2 rounded-md text-white hover:bg-blue-700"
          >
            <FileUp size={18} />
            Upload
          </NavLink>

          <NavLink
            to="/dashboard/history"
            onClick={handleNavClick}
            className="flex items-center gap-3 px-4 py-2 rounded-md text-white hover:bg-blue-700"
          >
            <History size={18} />
            History
          </NavLink>

          <NavLink
            to="/dashboard/summary"
            onClick={handleNavClick}
            className="flex items-center gap-3 px-4 py-2 rounded-md text-white hover:bg-blue-700"
          >
            <BrainCircuit size={18} />
            AI Summary
          </NavLink>
        </nav>
      </aside>

      {/* 🔳 Mobile Header */}
      <div className="sm:hidden fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 z-50 shadow-md">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded shadow"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            {isSidebarOpen ? "Close" : "Menu"}
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        </div>
      </div>

      {/* 📦 Main Content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 sm:ml-0 mt-14 sm:mt-0">
        {isHome ? (
          <div className="p-4 sm:p-10 bg-white min-h-full rounded-lg shadow-sm">
            {/* Welcome Section */}
            <div className="text-left mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600">
                Welcome back! Here’s an overview of your Excel analysis
                activities.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-white rounded-xl p-6 text-center shadow border">
                <h2 className="text-3xl font-bold text-gray-900">24</h2>
                <p className="text-gray-600">Total Files</p>
                <span className="text-sm text-green-600">+2 from last week</span>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow border">
                <h2 className="text-3xl font-bold text-gray-900">156</h2>
                <p className="text-gray-600">Charts Created</p>
                <span className="text-sm text-green-600">
                  +12% from last month
                </span>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow border">
                <h2 className="text-3xl font-bold text-gray-900">2.4h</h2>
                <p className="text-gray-600">Analysis Time</p>
                <span className="text-sm text-gray-500">
                  Average per session
                </span>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow border">
                <h2 className="text-3xl font-bold text-gray-900">8</h2>
                <p className="text-gray-600">Team Members</p>
                <span className="text-sm text-green-600">
                  +1 new this month
                </span>
              </div>
            </div>

            {/* Quick Upload & Visualization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-white border rounded-xl p-6 shadow text-center">
                <h3 className="text-lg font-semibold mb-2">Quick Upload</h3>
                <p className="text-gray-500 mb-4">
                  Upload a new Excel file to start analyzing your data
                </p>
                <button
                  onClick={() => navigate("/dashboard/upload")}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-md shadow hover:from-purple-700 hover:to-blue-700"
                >
                  Upload New File
                </button>
              </div>

              <div className="bg-white border rounded-xl p-6 shadow text-center">
                <h3 className="text-lg font-semibold mb-2">
                  Create Visualization
                </h3>
                <p className="text-gray-500 mb-4">
                  Generate interactive charts from your uploaded data
                </p>
                <button
                  onClick={() => navigate("/dashboard/history")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-md shadow hover:from-blue-700 hover:to-purple-700"
                >
                  Start Visualizing
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border rounded-xl p-6 shadow">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Recent Activity
              </h3>
              {chartStats.recentCharts.length === 0 ? (
                <div className="text-gray-500 text-center py-8">
                  <p>No Files Found</p>
                  <p className="text-sm mt-1">
                    You haven’t uploaded any files yet. Start by uploading a
                    file to view insights.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border rounded overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 border">Title</th>
                        <th className="p-2 border">Type</th>
                        <th className="p-2 border">Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chartStats.recentCharts.map((chart) => (
                        <tr key={chart._id} className="hover:bg-gray-50">
                          <td className="p-2 border">{chart.title}</td>
                          <td className="p-2 border">{chart.type}</td>
                          <td className="p-2 border">
                            {new Date(chart.createdAt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};