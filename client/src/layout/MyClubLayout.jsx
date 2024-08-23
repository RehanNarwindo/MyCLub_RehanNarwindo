import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
const MyClubLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MyClubLayout;
