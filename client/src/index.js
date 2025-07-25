import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./store/auth";
import { ExcelDataProvider } from "./context/ExcelDataContext";
import { ToastContainer, Zoom } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ExcelDataProvider>
      <AuthProvider>
        <App />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          limit={1}
          theme="colored"
          transition={Zoom}
        />
      </AuthProvider>
    </ExcelDataProvider>
  </React.StrictMode>
);
