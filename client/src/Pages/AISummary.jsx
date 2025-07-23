import { useState } from "react";

const chartInfo = {
  bar: {
    summary: "Bar chart displays data using rectangular bars. Useful for comparing quantities like sales, revenue, etc.",
    steps: [
      "Upload your Excel file (e.g., .xlsx or .csv)",
      "Select a column for X-axis (e.g., Product Name)",
      "Select a column for Y-axis (e.g., Sales)",
      "Click 'Generate Chart' to view your bar chart"
    ]
  },
  line: {
    summary: "Line chart shows trends over time. Ideal for visualizing stock prices, temperature, etc.",
    steps: [
      "Upload Excel file with time-series data",
      "Select 'Date/Time' for X-axis",
      "Select values for Y-axis (e.g., Temperature, Price)",
      "Click 'Generate Chart' to visualize the trend"
    ]
  },
  pie: {
    summary: "Pie chart represents parts of a whole as slices. Best for displaying proportions.",
    steps: [
      "Upload Excel file with categorical data",
      "Choose 'Category Name' and 'Percentage/Value'",
      "Click 'Generate Chart' to see data split visually"
    ]
  },
  doughnut: {
    summary: "Doughnut chart is like a pie chart with a hollow center, enhancing appearance.",
    steps: [
      "Upload Excel file with values and categories",
      "Select appropriate columns for data",
      "Click 'Generate Chart'"
    ]
  },
  "3d-pie": {
    summary: "3D Pie chart is a visually enhanced version of the pie chart.",
    steps: [
      "Upload file with at least two columns (category + value)",
      "Choose category and value columns",
      "Click 'Generate 3D Chart'"
    ]
  },
  "3d-column": {
    summary: "3D Column chart uses vertical bars with depth for comparative analysis.",
    steps: [
      "Upload file with multiple categories and values",
      "Assign X and Y axes properly",
      "Click 'Generate 3D Column Chart'"
    ]
  },
  "3d-doughnut": {
    summary: "3D Doughnut is a stylish version of the standard doughnut chart.",
    steps: [
      "Upload category-wise data",
      "Select labels and corresponding values",
      "Generate the 3D chart"
    ]
  }
};

const chartTypes = Object.keys(chartInfo);

export const AISummary = () => {
  const [chartType, setChartType] = useState("");
  const selectedChart = chartInfo[chartType];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Section 1 - Chart Summary */}
      <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
        📊 AI Based Chart Summary
      </h1>

      <div className="mb-6">
        <label htmlFor="chartType" className="block text-lg font-semibold mb-2 text-gray-700">
          Select a chart type:
        </label>
        <select
          id="chartType"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="w-full p-3 rounded-md border border-purple-400 bg-purple-50 text-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="">-- Select Chart Type --</option>
          {chartTypes.map((type) => (
            <option key={type} value={type}>
              {type.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {selectedChart && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner transition-all duration-300 ease-in-out">
          <h2 className="text-xl font-bold text-purple-600 mb-4">🧠 Summary:</h2>
          <p className="text-gray-700 mb-6">{selectedChart.summary}</p>

          <h3 className="text-lg font-semibold text-purple-600 mb-3">🛠️ How to create this chart:</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-800">
            {selectedChart.steps.map((step, index) => (
              <li key={index}>👉 {step}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Section 2 - Features */}
      <div className="mt-12 bg-purple-50 border border-purple-300 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">✨ Additional Chart Features</h2>
        
        <ul className="list-disc list-inside space-y-4 text-gray-800 text-base">
          <li>
            📥 <strong>Download Charts:</strong> Users can export charts in multiple formats:
            <ul className="list-disc ml-6 mt-1">
              <li>PNG (high-quality image)</li>
              <li>PDF (suitable for presentations/reports)</li>
            </ul>
          </li>

          <li>
            🖱️ <strong>Interactive Features:</strong> Hover tooltips, zoom & pan, and label visibility allow better data analysis.
          </li>

          <li>
            🧾 <strong>Chart History:</strong> Each generated chart is saved for future reference. Users can:
            <ul className="list-disc ml-6 mt-1">
              <li>View previously created charts</li>
              <li>Re-download charts anytime</li>
              <li>Delete or share saved chart</li>
            </ul>
          </li>

          <li>
            🔒 <strong>Secure Access:</strong> Only logged-in users can view their chart history and perform actions.
          </li>
        </ul>
      </div>
    </div>
  );
};
