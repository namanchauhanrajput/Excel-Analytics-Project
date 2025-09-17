import { NavLink } from "react-router-dom";
import {
  FaUpload,
  FaChartBar,
  FaBolt,
  FaDatabase,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";

export const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 overflow-hidden">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center pt-24 pb-20 px-4 backdrop-blur-md">
          <div className="mb-6">
            <div className="w-16 h-16 bg-purple-600 text-white flex items-center justify-center rounded-xl shadow-lg mx-auto mb-6 text-3xl">
              <FaChartBar />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-purple-800 mb-4 leading-tight">
              Transform Your Excel Data <br /> Into Powerful Visualizations
            </h1>
            <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto mb-6">
              Upload, analyze, and visualize your Excel files with interactive
              2D/3D charts. Get AI-powered insights and export beautiful
              visualizations.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <NavLink to="/login">
                <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 shadow-md transition">
                  Start Analyzing →
                </button>
              </NavLink>
              <button className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold border border-purple-600 hover:bg-purple-100 shadow-md transition">
                View Live Demo
              </button>
            </div>
          </div>
        </div>

        {/* Feature Section */}
        <div className="backdrop-blur-md bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 py-16 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Data Analysis
          </h2>
          <p className="text-gray-600 mb-10">
            Everything you need to transform raw data into actionable insights
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <FaUpload />,
                title: "Smart Upload",
                desc: "Drag & drop Excel files with intelligent parsing and validation. Supports .xlsx, .xls, and CSV formats.",
              },
              {
                icon: <FaChartBar />,
                title: "Interactive Charts",
                desc: "Create stunning 2D/3D visualizations with Chart.js and Three.js. Export as PNG or PDF.",
              },
              {
                icon: <FaBolt />,
                title: "AI Insights",
                desc: "Get automated analysis and insights powered by advanced AI. Discover hidden patterns instantly.",
              },
              {
                icon: <FaDatabase />,
                title: "Data History",
                desc: "Access your complete analysis history with secure cloud storage. Never lose your insights.",
              },
              {
                icon: <FaShieldAlt />,
                title: "Enterprise Security",
                desc: "Bank-level security with JWT authentication and encrypted storage. Your data is always protected.",
              },
              {
                icon: <FaChartLine />,
                title: "Admin Dashboard",
                desc: "Comprehensive analytics and user management for organizations. Monitor usage and performance.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/30 text-black p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call To Action Footer Section */}
        <div className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 py-20 px-6 text-center">
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl shadow-xl p-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Transform Your Data?
            </h2>
            <p className="text-lg mb-6 text-white/90">
              Join thousands of professionals who trust our platform for data
              analysis and visualization.
            </p>
            <NavLink to="/register">
              <button className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-purple-100 shadow-md transition">
                Get Started Free →
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
