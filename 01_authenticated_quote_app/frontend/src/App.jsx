import React from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 bg-white dark:bg-slate-900">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
