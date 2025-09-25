import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";
import { ChartComponent } from "../components/ChartComponent";
import { Eye, Trash2, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const DashboardHistory = () => {
  const [history, setHistory] = useState([]);
  const [selectedChart, setSelectedChart] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // loading states
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState(null);
  const [loadingDownloadId, setLoadingDownloadId] = useState(null);
  const [loadingPreviewId, setLoadingPreviewId] = useState(null);

  const { authorizationToken } = useAuth();

  const fetchHistory = useCallback(async () => {
    setLoadingFetch(true);
    try {
      const res = await axios.get(
        "https://excel-analytics-project.onrender.com/api/charts/history",
        {
          headers: { Authorization: authorizationToken },
        }
      );
      setHistory(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to load history:", error);
      toast.error("Failed to load history.");
    } finally {
      setLoadingFetch(false);
    }
  }, [authorizationToken]);

  const handleDelete = async (chartId) => {
    setLoadingDeleteId(chartId);
    try {
      await axios.delete(
        `https://excel-analytics-project.onrender.com/api/charts/delete/${chartId}`,
        {
          headers: { Authorization: authorizationToken },
        }
      );
      toast.success("Chart deleted.");
      setSelectedChart((s) => (s && s._id === chartId ? null : s));
      setDeleteConfirm(null);
      await fetchHistory();
    } catch (error) {
      console.error("Failed to delete chart:", error);
      toast.error("Failed to delete chart.");
    } finally {
      setLoadingDeleteId(null);
    }
  };

  const handleDownload = async (chart, format) => {
    setLoadingDownloadId(chart._id);
    try {
      const node = document.getElementById("chart-preview");
      if (!node) {
        toast.error("No chart preview found to download.");
        return;
      }

      const canvas = await html2canvas(node, {
        useCORS: true,
        scale: 2,
        backgroundColor: "#ffffff",
      });

      if (format === "png") {
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataUrl;
        const safeName = (chart.title || "chart").replace(
          /[^a-z0-9_\-. ]/gi, // fixed regex (no unnecessary escape)
          "_"
        );
        link.download = `${safeName}.png`;
        link.click();
        toast.success("PNG downloaded.");
      } else if (format === "pdf") {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: canvas.width > canvas.height ? "landscape" : "portrait",
          unit: "px",
          format: [canvas.width, canvas.height],
        });

        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        const safeName = (chart.title || "chart").replace(
          /[^a-z0-9_\-. ]/gi, //fixed regex
          "_"
        );
        pdf.save(`${safeName}.pdf`);
        toast.success("PDF exported.");
      }
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Download failed.");
    } finally {
      setLoadingDownloadId(null);
    }
  };

  const handlePreview = async (chart) => {
    setLoadingPreviewId(chart._id);
    setTimeout(() => {
      setSelectedChart(chart);
      setLoadingPreviewId(null);
    }, 180);
  };

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Stats
  const totalFilesUploaded = (() => {
    const fileNames = history.map((h) => h.fileName).filter(Boolean);
    if (fileNames.length > 0) {
      return new Set(fileNames).size;
    }
    return history.length;
  })();

  const chartsCreated = history.reduce((acc, h) => {
    return acc + (typeof h.chartsCount === "number" ? h.chartsCount : 1);
  }, 0);

  const totalExports = history.reduce((acc, h) => {
    return acc + (h.exports || h.exportsCount || 0);
  }, 0);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-10">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Analysis History
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          View and manage your uploaded files and created visualizations.
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700 mb-6">
        <div className="bg-white rounded-lg border shadow p-4">
          <h4 className="font-semibold text-gray-900">Total Files Uploaded</h4>
          <p className="text-2xl font-bold mt-1">{totalFilesUploaded}</p>
        </div>
        <div className="bg-white rounded-lg border shadow p-4">
          <h4 className="font-semibold text-gray-900">Charts Created</h4>
          <p className="text-2xl font-bold mt-1">{chartsCreated}</p>
        </div>
        <div className="bg-white rounded-lg border shadow p-4">
          <h4 className="font-semibold text-gray-900">Total Exports</h4>
          <p className="text-2xl font-bold mt-1">{totalExports}</p>
        </div>
      </div>

      {/* Chart Cards */}
      <div className="grid grid-cols-1 gap-4">
        {loadingFetch ? (
          <div className="text-center py-8 text-gray-500">Loading history...</div>
        ) : history.length > 0 ? (
          history.map((chart) => (
            <div
              key={chart._id}
              className="bg-white rounded-xl shadow border px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between"
            >
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {chart.title}
                </h3>
                <div className="text-gray-500 text-xs mt-1 flex items-center space-x-2">
                  <span>{new Date(chart.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{chart?.size || "—"}</span>
                  <span>•</span>
                  <span>
                    {typeof chart?.chartsCount === "number"
                      ? chart.chartsCount
                      : 1}{" "}
                    charts
                  </span>
                </div>
              </div>

              <div className="flex items-center mt-3 md:mt-0 space-x-3">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                    chart.status === "processing"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {chart.status || "completed"}
                </span>

                {/* Preview */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePreview(chart)}
                  className="relative p-2 text-gray-600 hover:text-purple-600"
                  title="Preview"
                  aria-label={`Preview ${chart.title}`}
                >
                  {loadingPreviewId === chart._id ? (
                    <span className="inline-block w-5 h-5 rounded-full border-2 border-gray-300 border-t-transparent animate-spin" />
                  ) : (
                    <Eye size={18} />
                  )}
                </motion.button>

                {/* Delete */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDeleteConfirm(chart)}
                  className="relative p-2 text-gray-600 hover:text-red-500"
                  title="Delete"
                  aria-label={`Delete ${chart.title}`}
                >
                  {loadingDeleteId === chart._id ? (
                    <span className="inline-block w-5 h-5 rounded-full border-2 border-gray-300 border-t-transparent animate-spin" />
                  ) : (
                    <Trash2 size={18} />
                  )}
                </motion.button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No chart history available.</p>
        )}
      </div>

      {/* Chart Preview */}
      {selectedChart && (
        <div className="bg-white rounded-xl shadow p-6 mt-10">
          <h3 className="text-xl font-semibold text-violet-700 mb-4 text-center">
            {selectedChart.title}
          </h3>

          <div
            id="chart-preview"
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-white flex items-center justify-center"
          >
            <ChartComponent
              type={selectedChart.type || "bar"}
              data={{
                labels: selectedChart.labels,
                values: selectedChart.values,
                backgroundColor: [
                  "rgba(99,102,241,0.85)",
                  "rgba(236,72,153,0.85)",
                  "rgba(34,197,94,0.85)",
                  "rgba(249,115,22,0.85)",
                  "rgba(59,130,246,0.85)",
                ],
              }}
            />
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => handleDownload(selectedChart, "png")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
              disabled={!!loadingDownloadId}
            >
              {loadingDownloadId === selectedChart._id ? (
                <span className="inline-block w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <Download size={16} />
              )}
              PNG
            </button>

            <button
              onClick={() => handleDownload(selectedChart, "pdf")}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
              disabled={!!loadingDownloadId}
            >
              {loadingDownloadId === selectedChart._id ? (
                <span className="inline-block w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <Download size={16} />
              )}
              PDF
            </button>

            <button
              onClick={() => setSelectedChart(null)}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded shadow"
            >
              <X size={16} />
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white rounded-lg shadow p-6 w-80 text-center relative">
              <h4 className="font-semibold text-lg text-gray-800 mb-2">
                Confirm Delete
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to delete{" "}
                <span className="font-medium">{deleteConfirm.title}</span>?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleDelete(deleteConfirm._id)}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  {loadingDeleteId === deleteConfirm._id ? (
                    <span className="inline-block w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    "Yes, Delete"
                  )}
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardHistory;
