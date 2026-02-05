import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const DashboardLayout = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar />


      <div className="flex flex-1 flex-col">

        <header className="z-10 border-b border-gray-200 bg-white">

          <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-8">


            <Link
              to="/dashboard"
              className="text-xl font-semibold text-gray-800 hover:opacity-80"
            >
              Dashboard
            </Link>



            <div className="flex items-center gap-6">
              <span className="max-w-[200px] truncate text-sm text-gray-600">
                {user?.username}
              </span>

              <button
                className="rounded-md px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                Logout
              </button>
              <div className="w-2 bg-amber-400"></div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1280px] px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

