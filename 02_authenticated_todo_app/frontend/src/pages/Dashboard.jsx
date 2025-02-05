import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar";

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="h-screen grid sm:grid-cols-[256px_1fr] top-0 fixed w-full">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-[200px] sm:w-[256px] bg-gray-100 dark:bg-gray-900 z-50 transition-transform duration-100 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } sm:relative sm:translate-x-0`}
      >
        <SideBar toggleSidebar={toggleMobileMenu} />
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 sm:hidden bg-gray-900 text-white p-2 rounded-md"
      >
        {/* Menu Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {/* Main Content */}
      <main
        className="p-4 bg-gray-50 dark:bg-gray-800 overflow-y-scroll h-full pt-14 sm:pt-6"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
