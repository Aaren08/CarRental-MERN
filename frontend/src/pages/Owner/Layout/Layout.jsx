import { Outlet } from "react-router-dom";
import NavbarOnwer from "../../../components/Owner/NavbarOwner/NavbarOwner.jsx";
import Sidebar from "../../../components/Owner/Sidebar/Sidebar.jsx";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="owner-layout">
      <NavbarOnwer />
      <div className="owner-layout-sidebar">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
