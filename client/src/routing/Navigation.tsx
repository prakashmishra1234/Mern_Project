import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/auth/Login";
import NoRoute from "../pages/NoRoute";
import Home from "../pages/Home";
import ProtectedRoute from "./component/ProtectedRoute";
import PublicRoute from "./component/PublicRoute";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import GoogleCallBack from "../pages/auth/GoogleCallBack";
import VerifyEmail from "../pages/auth/VerifyEmail";
import Profile from "../pages/Profile";
import UserManagement from "../pages/UserManagement";
import AdminRoute from "./component/AdminRoute";
import MainLayout from "../Components/common/layout/MainLayout";
import AuthLayout from "../Components/common/layout/AuthLayout";
import MicrosoftCallback from "../pages/auth/MicrosoftCallback";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
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
    path: "/",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/auth/google/callback",
    element: (
      <PublicRoute>
        <GoogleCallBack />
      </PublicRoute>
    ),
  },
  {
    path: "/auth/microsoft/callback",
    element: (
      <PublicRoute>
        <MicrosoftCallback />
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
