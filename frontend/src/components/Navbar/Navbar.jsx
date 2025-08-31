import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { assets, menuLinks } from "../../assets/assets.js";
import { useAppContext } from "../../context/ContexedApp.js";
import "./Navbar.css";

const Navbar = () => {
  const { setShowLogin, user, logoutUser, isOwner, axios, setIsOwner } =
    useAppContext();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const changeRole = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "/api/owner/change-role",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error("Not authorized");
      }
    } catch (err) {
      console.error("changeRole error:", err.response?.data || err.message);
      toast.error("Not authorized");
    }
  };

  return (
    <div className={`navbar  ${location.pathname === "/" && "active"}`}>
      <Link to={"/"}>
        <img
          src={assets.logo}
          alt="logo"
          style={{ height: "2rem" }}
          onClick={() => {}}
        />
      </Link>

      <div
        className={`navlinks ${
          location.pathname === "/" ? "active" : "non-active"
        } ${open ? "close" : "open"}`}
      >
        {menuLinks.map((link, index) => (
          <Link key={index} to={link.path}>
            {link.name}
          </Link>
        ))}

        {/* SEARCH BAR */}
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <img src={assets.search_icon} alt="search" />
        </div>

        {/* BUTTONS */}
        <div className="nav-btns">
          <button
            className="dashboardBtn"
            onClick={() => (isOwner ? navigate("/owner") : changeRole())}
          >
            {isOwner ? "Dashboard" : "List Cars"}
          </button>

          <button
            className="loginBtn"
            onClick={() => {
              user ? logoutUser() : setShowLogin(true);
            }}
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>

      {/* MENU DISPLAY ON MOBILE SCREEN */}
      <button
        className="menu-icon"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
      </button>
    </div>
  );
};

export default Navbar;
