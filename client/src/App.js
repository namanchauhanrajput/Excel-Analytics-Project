import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/footer";
import { Home } from "./Pages/Home";
// import { Contact } from "./Pages/Contact";
import { Register } from "./Pages/Register";
import { Login } from "./Pages/Login";

import { DashboardLayout } from "./components/layouts/Dashboard-Layout"; 
import { DashboardUpload } from "./Pages/DashboardUpload";
import { DashboardHistory } from "./Pages/DashboardHistory";
// import { DashboardChart } from "./Pages/DashboardChart";

import { AdminLayout } from "./components/layouts/Admin-Layout";
import { AdminUsers } from "./Pages/Admin-Users";
import { AdminUpdate } from "./Pages/Admin-Update";
import { AdminCharts } from "./Pages/AdminCharts";
import { AISummary } from "./Pages/AISummary";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="upload" element={<DashboardUpload />} />
          <Route path="history" element={<DashboardHistory />} />
          <Route path="summary" element={<AISummary />} /> {/* ✅ Fixed */}
          {/* <Route path="chart" element={<DashboardChart />} /> */}
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/:id/edit" element={<AdminUpdate />} />
          <Route path="charts" element={<AdminCharts />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
