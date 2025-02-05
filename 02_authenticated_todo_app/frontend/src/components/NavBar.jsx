import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav className="flex items-center justify-center">
        <ul className="flex gap-4 text-2xl font-semibold text-gray-900 dark:text-gray-300 pb-8 md:pb-14">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => `${isActive ? "text-blue-500" : ""}`}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) => `${isActive ? "text-blue-500" : ""}`}
            >
              Signup
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => `${isActive ? "text-blue-500" : ""}`}
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `${isActive ? "text-blue-500" : ""}`}
            >
              Dashboard
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
