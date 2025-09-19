import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";
import { ChartComponent } from "../components/ChartComponent";
import { Eye, Download } from "lucide-react";

export const DashboardHistory = () => {
  const [history, setHistory] = useState([]);
  const [selectedChart, setSelectedChart] = useState(null);
  const { authorizationToken } = useAuth();

  const fetchHistory = useCallback(async () => {
    try {
      const res = await axios.get("https://excel-analytics-project.onrender.com/api/charts/history", {
        headers: { Authorization: authorizationToken },
      });
      setHistory(res.data);
    } catch (error) {
      console.error("Failed to load history:", error);
    }
  }, [authorizationToken]);

  const handleDelete = async (chartId) => {
    try {
      await axios.delete(`https://excel-analytics-project.onrender.com/api/charts/delete/${chartId}`, {
        headers: { Authorization: authorizationToken },
      });
      setSelectedChart(null);
      fetchHistory();
    } catch (error) {
      console.error("Failed to delete chart:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-10">
      {/* 🔹 Title & Search */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Analysis History</h2>
        <p className="text-gray-600 text-sm mb-6">
          View and manage your uploaded files and created visualizations.
        </p>
        <input
          type="text"
          placeholder="🔍 Search files and charts..."
          className="w-full md:w-96 p-2 px-4 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-300 outline-none mb-4"
        />
      </div>

      {/* 🔹 Chart Cards */}
      <div className="grid grid-cols-1 gap-4">
        {history.length > 0 ? (
          history.map((chart) => (
            <div
              key={chart._id}
              className="bg-white rounded-xl shadow border px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between"
            >
              <div>
                <h3 className="text-sm font-semibold text-gray-800">{chart.title}</h3>
                <div className="text-gray-500 text-xs mt-1 flex items-center space-x-2">
                  <span>{new Date(chart.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{chart?.size || "2.3 MB"}</span>
                  <span>•</span>
                  <span>{chart?.chartsCount || Math.floor(Math.random() * 10) + 1} charts created</span>
                </div>
              </div>

              <div className="flex items-center mt-3 md:mt-0 space-x-3">
                <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize
                  ${chart.status === "processing"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                  }`}
                >
                  {chart.status || "completed"}
                </span>

                <button
                  onClick={() => setSelectedChart(chart)}
                  className="p-2 text-gray-600 hover:text-purple-600"
                  title="Preview"
                >
                  <Eye size={18} />
                </button>

                <button
                  onClick={() => handleDelete(chart._id)}
                  className="p-2 text-gray-600 hover:text-red-500"
                  title="Delete"
                >
                  🗑
                </button>

                <button
                  className="p-2 text-gray-600 hover:text-blue-600"
                  title="Download"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No chart history available.</p>
        )}
      </div>

      {/* 🔹 Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
        <div className="bg-white rounded-lg border shadow p-4">
          <h4 className="font-semibold text-gray-900">Total Files Uploaded</h4>
          <p className="text-2xl font-bold mt-1">4</p>
          <p className="text-green-600 text-xs mt-1">+2 from last week</p>
        </div>
        <div className="bg-white rounded-lg border shadow p-4">
          <h4 className="font-semibold text-gray-900">Charts Created</h4>
          <p className="text-2xl font-bold mt-1">4</p>
          <p className="text-green-600 text-xs mt-1">+8 from last week</p>
        </div>
        <div className="bg-white rounded-lg border shadow p-4">
          <h4 className="font-semibold text-gray-900">Total Exports</h4>
          <p className="text-2xl font-bold mt-1">24</p>
          <p className="text-green-600 text-xs mt-1">+15 from last week</p>
        </div>
      </div>

      {/* 🔹 Chart Preview */}
      {selectedChart && (
        <div className="bg-white rounded-xl shadow p-6 mt-10">
          <h3 className="text-xl font-semibold text-violet-700 mb-4 text-center">
            {selectedChart.title}
          </h3>
          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px]">
            <ChartComponent
              type={selectedChart.type || "bar"}
              data={{
                labels: selectedChart.labels,
                values: selectedChart.values,
                backgroundColor: [
                  "rgba(99,102,241,0.7)",
                  "rgba(139,92,246,0.7)",
                  "rgba(79,70,229,0.7)",
                ],
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
