import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Navigate,
  redirect,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import News from "../pages/News";
import Schedule from "../pages/Schedule";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import MyClub from "../pages/MyClub";
import MyClubLayout from "../layout/MyClubLayout";
import AddClub from "../components/AddClub";
import MyDreamClubLayout from "../layout/MyDreamClubLayout";
import MyDreamClub from "../pages/MyDreamClub";
import MyDreamClubForm from "../components/MyDreamClubForm";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <News />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
    loader: () => {
      if (localStorage.getItem("token")) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    element: <MyClubLayout />,
    children: [
      {
        path: "/home/myclub",
        element: <MyClub />,
      },
      {
        path: "/home/myclub/add",
        element: <AddClub />,
      },
    ],
    loader: () => {
      if (!localStorage.getItem("token")) {
        return redirect("/login");
      }
      return null;
    },
  },
  {
    element: <MyDreamClubLayout />,
    children: [
      {
        path: "/home/mydreamclub",
        element: <MyDreamClub />,
      },
      {
        path: "/home/mydreamclub/create",
        element: <MyDreamClubForm />,
      },
    ],
    loader: () => {
      if (!localStorage.getItem("token")) {
        return redirect("/login");
      }
      return null;
    },
  },
]);

export default router;
