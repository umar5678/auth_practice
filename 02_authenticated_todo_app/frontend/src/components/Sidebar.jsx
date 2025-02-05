import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // No Outlet here

const SideBar = ({ toggleSidebar }) => {
  return (
    <div className="h-full px-3 py-4 overflow-y-auto">
      <button
        onClick={toggleSidebar}
        className="absolute top-2 right-2 sm:hidden"
      >
        {/* ... Close Icon ... */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <ul
        className="space-y-2 font-medium flex flex-col gap-2 items-center mt-10"
        onClick={toggleSidebar}
      >
        <li>
          <NavLink to="/dashboard" className="">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/profile" className="">
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/todos" className="">
            Todos
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/all-todos" className="">
            All Todos
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
