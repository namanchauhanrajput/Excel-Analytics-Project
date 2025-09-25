import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const chartInfo = {
  bar: {
    summary:
      "Bar chart displays data using rectangular bars. Useful for comparing quantities like sales, revenue, etc.",
    steps: [
      "Upload your Excel file (e.g., .xlsx or .csv)",
      "Select a column for X-axis (e.g., Product Name)",
      "Select a column for Y-axis (e.g., Sales)",
      "Click 'Generate Chart' to view your bar chart",
    ],
  },
  line: {
    summary:
      "Line chart shows trends over time. Ideal for visualizing stock prices, temperature, etc.",
    steps: [
      "Upload Excel file with time-series data",
      "Select 'Date/Time' for X-axis",
      "Select values for Y-axis (e.g., Temperature, Price)",
      "Click 'Generate Chart' to visualize the trend",
    ],
  },
  pie: {
    summary:
      "Pie chart represents parts of a whole as slices. Best for displaying proportions.",
    steps: [
      "Upload Excel file with categorical data",
      "Choose 'Category Name' and 'Percentage/Value'",
      "Click 'Generate Chart' to see data split visually",
    ],
  },
  doughnut: {
    summary:
      "Doughnut chart is like a pie chart with a hollow center, enhancing appearance.",
    steps: [
      "Upload Excel file with values and categories",
      "Select appropriate columns for data",
      "Click 'Generate Chart'",
    ],
  },
};

const chartTypes = Object.keys(chartInfo);

export const AISummary = () => {
  const [chartType, setChartType] = useState("");
  const selectedChart = chartInfo[chartType];

  return (
    <div className="font-['Poppins'] max-w-5xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-purple-200">
      {/* Heading */}
      <motion.h1
        className="text-4xl font-extrabold text-center text-purple-700 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📊 AI Based Chart Summary
      </motion.h1>

      {/* Select Dropdown */}
      <div className="mb-8">
        <label
          htmlFor="chartType"
          className="block text-lg font-semibold mb-3 text-gray-700"
        >
          Select a chart type:
        </label>
        <motion.select
          id="chartType"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="w-full p-4 rounded-lg border-2 border-purple-400 bg-purple-50 text-purple-900 text-lg focus:outline-none focus:ring-4 focus:ring-purple-500"
          whileFocus={{ scale: 1.02 }}
        >
          <option value="">-- Select Chart Type --</option>
          {chartTypes.map((type) => (
            <motion.option
              key={type}
              value={type}
              whileHover={{ scale: 1.05 }}
              className="p-2"
            >
              {type.toUpperCase()}
            </motion.option>
          ))}
        </motion.select>
      </div>

      {/* Selected Chart Info */}
      <AnimatePresence>
        {selectedChart && (
          <motion.div
            className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-xl shadow-inner border border-purple-200"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              🧠 Summary:
            </h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              {selectedChart.summary}
            </p>

            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              🛠️ How to create this chart:
            </h3>
            <ul className="list-disc list-inside space-y-3 text-gray-800 text-base">
              {selectedChart.steps.map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  👉 {step}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Additional Features */}
      <motion.div
        className="mt-12 bg-purple-50 border border-purple-300 rounded-2xl p-8 shadow-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold text-purple-700 mb-6">
          ✨ Additional Chart Features
        </h2>

        <ul className="list-disc list-inside space-y-5 text-gray-800 text-lg">
          <li>
            📥 <strong>Download Charts:</strong> Export charts in multiple
            formats:
            <ul className="list-disc ml-6 mt-2">
              <li>PNG (high-quality image)</li>
              <li>PDF (suitable for presentations/reports)</li>
            </ul>
          </li>

          <li>
            🖱️ <strong>Interactive Features:</strong> Hover tooltips, zoom &
            pan, and label visibility for better analysis.
          </li>

          <li>
            🧾 <strong>Chart History:</strong> Save, view, re-download, or
            delete previously created charts.
          </li>

          <li>
            🔒 <strong>Secure Access:</strong> Only logged-in users can view
            chart history and perform actions.
          </li>
        </ul>
      </motion.div>
    </div>
  );
};
