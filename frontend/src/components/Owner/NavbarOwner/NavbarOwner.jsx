import { Link } from "react-router-dom";
import { assets, dummyUserData } from "../../../assets/assets.js";
import "./NavbarOwner.css";

const NavbarOwner = () => {
  const user = dummyUserData;
  return (
    <div className="owner-navbar">
      <Link to={"/"}>
        <img src={assets.logo} alt="logo" style={{ height: "1.75rem" }} />
      </Link>

      <p>Welcome, {user.name || "Owner"}</p>
    </div>
  );
};

export default NavbarOwner;
