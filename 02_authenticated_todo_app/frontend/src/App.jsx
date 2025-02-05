import React from "react";
import NavBar from "./components/NavBar";

  
import { Outlet } from "react-router-dom";



const App = () => {
  return (
    <div className=" mx-auto py-4">
      <NavBar />
      <div className="pt-4 mt-4">

      <Outlet/>
      </div>
    </div>
  );
};

export default App;
 