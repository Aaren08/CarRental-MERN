import { Link } from "react-router-dom";
import { assets } from "../../../assets/assets.js";
import { useAppContext } from "../../../context/ContexedApp.js";
import "./NavbarOwner.css";

const NavbarOwner = () => {
  const { user } = useAppContext();
  return (
    <div className="owner-navbar">
      <Link to={"/"}>
        <img src={assets.logo} alt="logo" style={{ height: "1.75rem" }} />
      </Link>

      <p>Welcome, {user?.name || "Owner"}</p>
    </div>
  );
};

export default NavbarOwner;
