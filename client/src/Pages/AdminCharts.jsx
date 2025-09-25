import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../store/auth";
import { Trash2 } from "lucide-react";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const AdminCharts = () => {
  const { authorizationToken } = useAuth();
  const [charts, setCharts] = useState([]);

  const fetchCharts = useCallback(async () => {
    if (!authorizationToken) return;
    try {
      const res = await axios.get("https://excel-analytics-project.onrender.com/api/charts", {
        headers: { Authorization: authorizationToken },
      });
      setCharts(res.data ?? []);
    } catch (error) {
      console.error("Error fetching charts:", error.response?.data || error.message);
    }
  }, [authorizationToken]);

  useEffect(() => {
    fetchCharts();
  }, [fetchCharts]);

  const handleDelete = async (chartId) => {
    if (!window.confirm("Delete this chart?")) return;
    try {
      await axios.delete(`https://excel-analytics-project.onrender.com/api/charts/delete/${chartId}`, {
        headers: { Authorization: authorizationToken },
      });
      setCharts((prev) => prev.filter((c) => c._id !== chartId));
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
    }
  };

  // Mast vibrant color palette
  const COLORS = [
    "#6366F1", // Indigo
    "#F43F5E", // Rose
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#3B82F6", // Blue
    "#8B5CF6", // Violet
    "#EC4899", // Pink
    "#14B8A6", // Teal
    "#84CC16", // Lime
    "#EF4444", // Red
  ];

  if (!charts.length) {
    return <div className="py-10 text-center text-gray-600">No charts found.</div>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      {charts.map((chart) => {
        const labels = chart.labels ?? [];
        const values = chart.values ?? [];

        const data = {
          labels,
          datasets: [
            {
              label: chart.title || "Data",
              data: values,
              backgroundColor: labels.map((_, i) => COLORS[i % COLORS.length] + "99"), // pastel look
              borderColor: labels.map((_, i) => COLORS[i % COLORS.length]),
              borderWidth: 2,
            },
          ],
        };

        return (
          <div key={chart._id} className="bg-white rounded-lg p-4 shadow relative">
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">{chart.title}</h3>

            <div className="mb-2">
              {chart.type === "pie" ? (
                <Pie data={data} />
              ) : (
                <Bar
                  data={data}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      y: { beginAtZero: true },
                    },
                  }}
                />
              )}
            </div>

            <p className="text-sm text-gray-500">
              Uploaded by: <strong>{chart.createdBy?.username ?? "—"}</strong>
            </p>

            <button
              onClick={() => handleDelete(chart._id)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
            >
              <Trash2 size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
