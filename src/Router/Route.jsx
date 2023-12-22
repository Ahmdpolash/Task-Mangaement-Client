import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ErrorPage from "../Pages/ErrorPage";
import Dashboard from "../Dashboard/Dashboard";
import PrivateRout from "./PrivateRout";
import DashboardHome from "../Dashboard/DashboardHome";
import AddTask from "../Pages/AddTask";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "dashboardHome",
    element: <DashboardHome />,
    loader: ({ params }) => fetch(`https://task-managment-server-sigma.vercel.app/tasks/${params.id}`),
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRout>
        <Dashboard />
      </PrivateRout>
    ),
    // children: [
    //   {
    //     path: "dashboardHome",
    //     element: <DashboardHome />,
    //   },

    // ],
  },
]);

export default Route;
