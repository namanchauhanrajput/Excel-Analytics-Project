// Required imports
import { useState, useContext } from "react";
import { ExcelDataContext } from "../context/ExcelDataContext";
import * as XLSX from "xlsx";
import { UploadCloud } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../store/auth";
import axios from "axios";
import { ChartComponent } from "../components/ChartComponent";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const DashboardUpload = () => {
  // States for file handling and chart config
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState("bar");

  // Context and auth token
  const { setExcelData, setColumns, columns } = useContext(ExcelDataContext);
  const { authorizationToken } = useAuth();

  // 🎨 Mast vibrant color palette
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

  // File select
  const handleFileChange = (e) => setFile(e.target.files[0]);

  // File upload + parse
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a file!");

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);

      setExcelData(json);
      setColumns(Object.keys(json[0]));
      setPreviewData(json);
      setChartData(null);
      toast.success("File uploaded and parsed successfully!");
    };

    reader.readAsArrayBuffer(file);
  };

  // Chart generation
  const handleGenerateChart = async () => {
    if (!xAxis || !yAxis || previewData.length === 0) {
      return toast.error("Please select both X and Y axes!");
    }

    const labels = previewData.map((row) => row[xAxis]);
    const values = previewData.map((row) => row[yAxis]);

    const chartPayload = {
      labels,
      values,
      title: `${yAxis} vs ${xAxis}`,
      type: chartType,
      backgroundColor: labels.map((_, i) => COLORS[i % COLORS.length] + "99"), // pastel look
      borderColor: labels.map((_, i) => COLORS[i % COLORS.length]),
    };

    setChartData(chartPayload);

    try {
      const res = await axios.post(
        "https://excel-analytics-project.onrender.com/api/charts/save",
        chartPayload,
        {
          headers: { Authorization: authorizationToken },
        }
      );
      console.log("Chart saved:", res.data);
      toast.success("Chart generated and saved successfully!");
    } catch (error) {
      console.error("Chart save error:", error);
      toast.error("❌ Failed to save chart.");
    }
  };

  // PNG download
  const handleDownloadPNG = async () => {
    const chartNode = document.getElementById("chart-wrapper");
    const canvas = await html2canvas(chartNode);
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "chart.png";
    link.click();
  };

  // PDF download
  const handleDownloadPDF = async () => {
    const chartNode = document.getElementById("chart-wrapper");
    const canvas = await html2canvas(chartNode);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("chart.pdf");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 mt-12">
      {/* ✅ Upload Section */}
      <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <UploadCloud className="text-violet-600" size={28} />
          <h2 className="text-3xl font-bold text-violet-700">
            Upload New File
          </h2>
        </div>

        {/* File Upload Form */}
        <form onSubmit={handleUpload} className="space-y-6">
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileChange}
            className="block w-full border rounded-lg px-4 py-2 text-sm file:bg-violet-50 file:text-violet-700"
          />
          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-lg text-sm font-medium shadow"
          >
            Upload File
          </button>
        </form>

        {file && (
          <p className="mt-4 text-xs text-gray-500 text-center">
            Selected File: <span className="font-medium">{file.name}</span>
          </p>
        )}
      </div>

      {/* ✅ Data Table Preview */}
      <AnimatePresence>
        {previewData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-2xl border shadow"
          >
            <h3 className="text-lg font-semibold text-violet-700 mb-4">
              📄 Preview Uploaded Data
            </h3>

            <div className="overflow-x-auto rounded">
              <table className="min-w-full text-sm text-left text-gray-700 border">
                <thead className="bg-violet-100 text-violet-800">
                  <tr>
                    {columns.map((col, idx) => (
                      <th key={idx} className="px-4 py-2 border">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.slice(0, 10).map((row, idx) => (
                    <tr
                      key={idx}
                      className="even:bg-gray-50 hover:bg-gray-100 transition"
                    >
                      {columns.map((col, index) => (
                        <td key={index} className="px-4 py-2 border">
                          {row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Chart Generation Section */}
      {previewData.length > 0 && (
        <div className="p-6 rounded-xl shadow border">
          <h3 className="text-xl font-bold text-blue-700 mb-4">
            📊 Generate Chart
          </h3>

          {/* Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                X Axis
              </label>
              <select
                value={xAxis}
                onChange={(e) => setXAxis(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select X</option>
                {columns.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Y Axis
              </label>
              <select
                value={yAxis}
                onChange={(e) => setYAxis(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Y</option>
                {columns.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Chart Type
              </label>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="bar">📊 Bar</option>
                <option value="line">📈 Line</option>
                <option value="pie">🥧 Pie</option>
                <option value="doughnut">🍩 Doughnut</option>
              </select>
            </div>

            {/* Generate Button */}
            <div className="md:col-span-2 lg:col-span-3 flex justify-end">
              <button
                onClick={handleGenerateChart}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
              >
                Generate Chart
              </button>
            </div>
          </div>

          {/* ✅ Chart Display & Download */}
          {chartData && (
            <div className="mt-6 w-full px-4 space-y-6">
              <div
                id="chart-wrapper"
                className="bg-white px-3 py-4 rounded-lg shadow mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg h-[280px] sm:h-[320px] md:h-[360px] flex justify-center items-center"
              >
                <ChartComponent type={chartType} data={chartData} />
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10">
                <button
                  onClick={handleDownloadPNG}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow text-sm w-full sm:w-auto"
                >
                  📸 Download PNG
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow text-sm w-full sm:w-auto"
                >
                  📄 Export PDF
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
