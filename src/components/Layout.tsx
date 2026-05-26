
import { Outlet } from "react-router-dom";
import Footer from "../pages/Footer";
import Navbar from "../pages/Header";


const Layout = () => {
  return (
    <div className="bg-[#FFFFFF]">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;