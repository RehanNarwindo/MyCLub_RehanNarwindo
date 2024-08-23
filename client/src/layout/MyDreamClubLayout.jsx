import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
const MyDreamClubLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MyDreamClubLayout;
