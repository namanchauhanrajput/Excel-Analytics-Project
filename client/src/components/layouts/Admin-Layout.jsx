import { useState } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../store/auth";

export const AdminLayout = () => {
  const { user, isLoading } = useAuth();
  console.log("user admin", user);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  // 🕗 Show loading state while user is being fetched
  if (isLoading) {
    return <h1 className="text-center text-lg mt-8">⏳ Loading...</h1>;
  }

  // ❌ Redirect to home if user is not an admin
  if (!user?.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col h-[81.5vh] overflow-hidden">
      
      {/* 📱 Mobile Header with Menu Button */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow shrink-0">
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded shadow"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          {isSidebarOpen ? "Close" : "Menu"}
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
      </div>

      {/* 🔄 Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* 🧭 Sidebar Navigation */}
        <aside
          className={`bg-blue-800 text-white w-64 p-5 my-3 space-y-6 z-40
            transition-transform duration-300 ease-in-out
            fixed top-0 md:top-auto md:relative h-full md:h-[78.5vh] rounded-tr-lg rounded-br-lg
            md:block ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0`}
        >
          <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
          <nav>
            <ul className="space-y-4">
              {/* 👤 Users Link */}
              <li>
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                      isActive ? "bg-blue-700" : "hover:bg-blue-700"
                    }`
                  }
                >
                  <FaUser /> <span>Users</span>
                </NavLink>
              </li>

              {/* 📊 Charts Link */}
              <li>
                <NavLink
                  to="/admin/charts"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                      isActive ? "bg-blue-700" : "hover:bg-blue-700"
                    }`
                  }
                >
                  📊 <span>Charts</span>
                </NavLink>
              </li>

              {/* 🏠 Home Link */}
              <li>
                <NavLink
                  to="/"
                  className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  <MdHome /> <span>Home</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

        {/* 🔳 Overlay behind sidebar for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* 🧾 Main Content (Outlet) */}
        <div className="flex-1 md:ml-12 overflow-y-auto p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
