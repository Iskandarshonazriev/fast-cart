import React from "react";
import Header from "../pages/Header";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Footer";


const Layout = () => {
  return (
    <div className="bg-[#FFFFFF]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;