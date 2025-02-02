import React from "react";

const Container = ({ children }) => {
  return (
    <div className="dark:bg-slate-900 dark:text-white">
      <div className="pt-20 px-4 mx-auto  w-full max-w-7xl ">{children}</div>
    </div>
  );
};

export default Container;
