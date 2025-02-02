import React from "react";
import { Outlet, Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default App;
