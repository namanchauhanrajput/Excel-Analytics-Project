// Import necessary components and elements from Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Import different chart types from react-chartjs-2
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

// Register all the necessary Chart.js components globally
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

// Main reusable chart component
export const ChartComponent = ({ data, type = "bar" }) => {
  // Destructure required fields from data prop
  const {
    labels,            // Array of X-axis labels
    values,            // Array of Y-axis values
    title,             // Chart title
    backgroundColor = ["#4f46e5"], // Default background color if not provided
  } = data;

  // Create chart data structure for Chart.js
  const chartConfig = {
    labels,
    datasets: [
      {
        label: title || "Chart",
        data: values,
        backgroundColor,
      },
    ],
  };

  // Define chart options like legend position, axis titles, responsiveness, etc.
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: title || "Chart",
      },
    },
    // Show axis titles only for bar and line charts
    scales: ["bar", "line"].includes(type)
      ? {
          x: {
            title: {
              display: true,
              text: "X Axis",
            },
          },
          y: {
            title: {
              display: true,
              text: "Y Axis",
            },
          },
        }
      : {},
  };

  // Conditionally render the chart based on 'type' prop
  switch (type) {
    case "bar":
      return <Bar data={chartConfig} options={chartOptions} />;
    case "line":
      return <Line data={chartConfig} options={chartOptions} />;
    case "pie":
      return <Pie data={chartConfig} options={chartOptions} />;
    case "doughnut":
      return <Doughnut data={chartConfig} options={chartOptions} />;
    default:
      return <p className="text-red-600">Invalid chart type selected</p>;
  }
};
