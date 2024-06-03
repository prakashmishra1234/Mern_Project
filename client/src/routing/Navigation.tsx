import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/auth/Login";
import NoRoute from "../pages/NoRoute";
import Home from "../pages/Home";
import ProtectedRoute from "./component/ProtectedRoute";
import PublicRoute from "./component/PublicRoute";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import Navbar from "../Components/common/layout/Navbar";
import Profile from "../pages/Profile";
import UserManagement from "../pages/UserManagement";
import AdminRoute from "./component/AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Navbar />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <PublicRoute>
        <ForgotPassword />
      </PublicRoute>
    ),
  },
  {
    path: "/reset-password/:token",
    element: (
      <PublicRoute>
        <ResetPassword />
      </PublicRoute>
    ),
  },
  {
    path: "/verify-email/:token",
    element: <VerifyEmail />,
  },
  {
    path: "*",
    element: (
      <ProtectedRoute>
        <NoRoute />
      </ProtectedRoute>
    ),
  },
]);

const Navigation = () => {
  return <RouterProvider router={router} />;
};

export default Navigation;
