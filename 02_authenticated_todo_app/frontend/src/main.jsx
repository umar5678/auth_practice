import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import {
  Home,
  Login,
  Signup,
  ProfilePage,
  Todos,
  AllTodos,
  Dashboard,
  DashboaedPage,
} from "./pages/index.js";
import Protected from "./components/Protected";

import { AuthProvider } from "./context/AuthContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      {
        path: "/dashboard",
        element: (
          <Protected>
            <Dashboard />
          </Protected>
        ),
        children: [
          { path: "/dashboard", element: <DashboaedPage /> },
          { path: "/dashboard/profile", element: <ProfilePage /> },
          { path: "/dashboard/todos", element: <Todos /> },
          { path: "/dashboard/all-todos", element: <AllTodos /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
