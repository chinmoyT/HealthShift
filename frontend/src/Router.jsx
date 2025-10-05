import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./views/Login";
import Home from "./views/Home";
import Layout from "./custom/Layout";
import ProtectedRoute from "./utils/ProtectedRoute";
import UserlistPage from "./views/@usermanagement/UserlistPage";
import Analytics from "./views/@analytics/Analytics";
import PageNotFound from "./views/PageNotFound";
import StaffList from "./views/@staff/StaffList";
import StaffDetails from "./views/@staff/StaffDetails";
import DepartmentList from "./views/@department/DepartmentList";
import DepartmentDetails from "./views/@department/DepartmentDetails";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/um",
            element: <UserlistPage />,
          },
          {
            path: '/staff',
            element: <StaffList /> 
          },
          {
            path: '/staff/:id',
            element: <StaffDetails />
          },
          {
            path: "/analytics",
            element: <Analytics />,
          },
          {
            path: "/department",
            element: <DepartmentList />
          },
          {
            path: "/department/:id",
            element: <DepartmentDetails />
          }
        ],
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />
}
