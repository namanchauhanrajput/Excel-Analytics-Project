import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FileUp, History, Menu, X } from "lucide-react";
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

  // Toggle Sidebar on small devices
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Close Sidebar on mobile after clicking a nav item
  const handleNavClick = () => {
    if (window.innerWidth < 640) setIsSidebarOpen(false);
  };

  // Fetch Chart Stats
  const fetchChartStats = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/charts/history", {
        headers: { Authorization: authorizationToken },
      });

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

  // Load stats on mount
  useEffect(() => {
    if (authorizationToken) fetchChartStats();
  }, [fetchChartStats, authorizationToken]);

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-gradient-to-br from-blue-50 to-purple-100">

      {/* 🌐 Mobile Top Header */}
      <div className="sm:hidden flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex items-center gap-24">
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

      {/* 📚 Sidebar Menu */}
      <aside
        className={`fixed sm:static top-14 sm:top-0 left-0 z-40 sm:z-auto bg-blue-800 w-64 sm:min-h-screen shadow-lg border-r p-6 space-y-6 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* 🏷 Logo / Title */}
        <NavLink
          to="/dashboard"
          onClick={handleNavClick}
          className="text-2xl font-bold text-white mb-8 block"
        >
          📊 Dashboard
        </NavLink>

        {/* 📁 Navigation Links */}
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
        </nav>
      </aside>

      {/* 🔳 Mobile Overlay when Sidebar Open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 📦 Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 mt-16 sm:mt-0">
        {isHome ? (
          <div className="p-4 sm:p-10 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen">

            {/* 👋 Welcome User */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-2">
                Welcome back, {user?.username || "User"} 👋
              </h1>
              <p className="text-gray-600 text-base sm:text-lg">
                Manage your Excel visualizations and create new insights
              </p>
            </div>

            {/* 📈 Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
              <div className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl p-6 text-center shadow-md">
                <h2 className="text-3xl sm:text-4xl font-bold">{chartStats.totalCharts}</h2>
                <p className="text-base sm:text-lg">Uploaded Files</p>
              </div>
              <div className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-6 text-center shadow-md">
                <h2 className="text-3xl sm:text-4xl font-bold">{chartStats.chartTypes.size}</h2>
                <p className="text-base sm:text-lg">Different Chart Types</p>
              </div>
            </div>

            {/* 🕓 Recent Files Table */}
            <div className="bg-white max-w-4xl mx-auto p-4 sm:p-6 rounded-2xl shadow-md">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <h3 className="text-lg sm:text-xl font-bold text-blue-800">Your Recent Files</h3>
                <button
                  onClick={() => navigate("/dashboard/upload")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md shadow-md hover:from-blue-700 hover:to-purple-700"
                >
                  + Upload File
                </button>
              </div>

              {chartStats.recentCharts.length === 0 ? (
                <div className="text-gray-500 text-center py-8">
                  <p>No Files Found</p>
                  <p className="text-sm mt-1">
                    You haven’t uploaded any files yet. Start by uploading a file to view insights.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border rounded overflow-hidden">
                    <thead className="bg-blue-100">
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
