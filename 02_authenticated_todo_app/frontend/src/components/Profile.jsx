import React from "react";

const Profile = ({ user }) => {
    
  if (!user)
    return <p className="text-center text-gray-500">No user data available.</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border dark:border-gray-700">
      {/* Profile Header */}
      <div className="flex flex-col items-center">
        <img
          src={user.avatar?.url || "/default-avatar.png"}
          alt="Profile Avatar"
          className="w-24 h-24 rounded-full border-4 border-gray-300 dark:border-gray-600"
        />
        <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
          {user.fullName}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          @{user.email}
        </p>
      </div>

      {/* Profile Info */}
      <div className="mt-6 space-y-4">
        <div className="flex justify-between border-b pb-2 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400">Role:</span>
          <span className="font-medium text-gray-900 dark:text-white capitalize">
            {user.role}
          </span>
        </div>

        <div className="flex justify-between border-b pb-2 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400">Login Type:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {user.loginType}
          </span>
        </div>

        <div className="flex justify-between border-b pb-2 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400">
            Profile Setup:
          </span>
          <span
            className={`font-medium ${
              user.isProfileSetupDone ? "text-green-600" : "text-red-500"
            }`}
          >
            {user.isProfileSetupDone ? "Completed" : "Incomplete"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Joined:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
