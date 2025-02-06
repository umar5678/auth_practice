import React from "react";

const ErrorMSg = ({ message }) => {
  if (!message) {
    return null; // Don't render anything if no message is provided
  }

  return (
    <div
      className="bg-red-100 border dark:bg-red-200/5 border-red-400 text-red-500 px-4 py-3 rounded relative my-2"
      role="alert"
    >
      <strong className="font-semibold">Error: </strong>
      <br />
      <span className="block sm:inline dark:text-red-500">{message}</span>
    </div>
  );
};

export default ErrorMSg;
