import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";
import { ChartComponent } from "../components/ChartComponent";

export const DashboardHistory = () => {
  const [history, setHistory] = useState([]);
  const [selectedChart, setSelectedChart] = useState(null);
  const { authorizationToken } = useAuth();

  const fetchHistory = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/charts/history", {
        headers: { Authorization: authorizationToken },
      });
      setHistory(res.data);
    } catch (error) {
      console.error("Failed to load history:", error);
    }
  }, [authorizationToken]);

  const handleDelete = async (chartId) => {
    try {
      await axios.delete(`http://localhost:5000/api/charts/delete/${chartId}`, {
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
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-8">
      {/* 🔹 Chart History Table */}
      <div className="bg-white shadow rounded p-4 md:p-6 overflow-x-auto">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">📜 Chart History</h2>

        {/* Desktop Table */}
        <div className="hidden sm:block">
          <table className="w-full border text-left text-sm md:text-base">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-2 border">Chart Title</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Created At</th>
                <th className="p-2 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {history.length > 0 ? (
                history.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td
                      className="p-2 border text-blue-600 hover:underline cursor-pointer"
                      onClick={() => setSelectedChart(item)}
                    >
                      {item.title}
                    </td>
                    <td className="p-2 border">{item.type || "bar"}</td>
                    <td className="p-2 border">{new Date(item.createdAt).toLocaleString()}</td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 md:px-6 py-2 rounded-full transition shadow-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-2 border text-gray-500 text-center" colSpan={4}>
                    No chart history available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-4">
          {history.length > 0 ? (
            history.map((item) => (
              <div key={item._id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
                <div
                  onClick={() => setSelectedChart(item)}
                  className="text-blue-600 font-medium cursor-pointer mb-1"
                >
                  {item.title}
                </div>
                <p className="text-sm text-gray-600 mb-1">Type: {item.type || "bar"}</p>
                <p className="text-sm text-gray-600 mb-3">
                  Created: {new Date(item.createdAt).toLocaleString()}
                </p>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-md shadow"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm">No chart history available.</p>
          )}
        </div>
      </div>

      {/* 🔹 Preview Chart */}
      {selectedChart && (
        <div className="bg-white shadow rounded p-4 md:p-6 max-w-2xl mx-auto">
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
