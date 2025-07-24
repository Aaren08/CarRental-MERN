import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  assets,
  dummyUserData,
  ownerMenuLinks,
} from "../../../assets/assets.js";
import "./Sidebar.css";

const Sidebar = () => {
  const [image, setImage] = useState("");

  const user = dummyUserData;

  const updateImage = async () => {
    user.image = URL.createObjectURL(image);
    setImage("");
  };
  return (
    <div className="owner-sidebar">
      <div className="merge">
        <label htmlFor="image">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fG1lbnxlbnwwfHwwfHx8MA%3D%3D"
            }
            alt="image"
            className="owner-user-image"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="owner-user-image-edit-icon">
            <img src={assets.edit_icon} alt="edit icon" />
          </div>
        </label>
      </div>

      {image && (
        <button className="owner-user-check-btn">
          Save{" "}
          <img
            src={assets.check_icon}
            width={13}
            alt="check icon"
            onClick={updateImage}
          />
        </button>
      )}
      <p className="owner-user-name">{user?.name}</p>

      {/* MENU ITEMS */}
      <div style={{ width: "100%" }}>
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end // ensures exact path matching
            className={({ isActive }) =>
              `owner-menu-navlinks ${
                isActive
                  ? "owner-menu-navlink-active"
                  : "owner-menu-navlink-inactive"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive ? link.coloredIcon : link.icon}
                  alt="car icon"
                />
                <span className="owner-menu-links-name">{link.name}</span>
                <div
                  className={isActive ? "owner-menu-links-side-active" : ""}
                ></div>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
