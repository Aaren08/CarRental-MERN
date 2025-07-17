import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { assets, menuLinks } from "../../assets/assets.js";
import "./Navbar.css";

const Navbar = ({ setShowLogin }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
          <button className="dashboardBtn" onClick={() => navigate("/owner")}>
            Dashboard
          </button>
          <button className="loginBtn" onClick={() => setShowLogin(true)}>
            Login
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
