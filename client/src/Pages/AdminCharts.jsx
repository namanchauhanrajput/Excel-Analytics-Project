import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../store/auth";
import { ChartComponent } from "../components/ChartComponent";
import { Trash2 } from "lucide-react";

export const AdminCharts = () => {
  const { authorizationToken } = useAuth();
  const [charts, setCharts] = useState([]);

  const fetchCharts = useCallback(async () => {
    try {
      const res = await axios.get("https://excel-analytics-project.onrender.com/api/charts", {
        headers: {
          Authorization: authorizationToken,
        },
      });
      setCharts(res.data);
    } catch (error) {
      console.error("Error fetching charts:", error.response?.data || error.message);
    }
  }, [authorizationToken]);

  const handleDelete = async (chartId) => {
    const confirm = window.confirm("Are you sure you want to delete this chart?");
    if (!confirm) return;

    try {
      await axios.delete(`https://excel-analytics-project.onrender.com/api/charts/delete/${chartId}`, {
        headers: {
          Authorization: authorizationToken,
        },
      });
      setCharts(prev => prev.filter(chart => chart._id !== chartId));
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchCharts();
  }, [fetchCharts]);

  return (
    <div className="space-y-6 p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4 text-center">
        📊 All Saved Charts
      </h1>

      {charts.length === 0 ? (
        <p className="text-gray-500 text-center">No charts found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {charts.map((chart) => (
            <div
              key={chart._id}
              className="bg-white rounded-xl p-4 shadow border relative"
            >
              <h2 className="text-lg font-semibold text-blue-700 mb-2 text-center sm:text-left">
                {chart.title}
              </h2>

              <div className="w-full">
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                  <ChartComponent
                    type={chart.type}
                    data={{
                      labels: chart.labels,
                      values: chart.values,
                      title: chart.title,
                    }}
                  />
                </div>
              </div>

              <p className="text-sm mt-3 text-gray-500 text-center sm:text-left">
                Uploaded by:{" "}
                <strong>{chart.createdBy?.username}</strong> (
                {chart.createdBy?.email})
              </p>

              <button
                onClick={() => handleDelete(chart._id)}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
                title="Delete chart"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
