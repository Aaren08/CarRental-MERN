import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import NavbarOwner from "../../../components/Owner/NavbarOwner/NavbarOwner.jsx";
import Sidebar from "../../../components/Owner/Sidebar/Sidebar.jsx";
import "./Layout.css";
import { useAppContext } from "../../../context/ContexedApp.js";

const Layout = () => {
  const { isOwner, navigate } = useAppContext();

  useEffect(() => {
    if (!isOwner) {
      navigate("/");
    }
  }, [isOwner, navigate]);

  return (
    <div className="owner-layout">
      <NavbarOwner />
      <div className="owner-layout-sidebar">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
