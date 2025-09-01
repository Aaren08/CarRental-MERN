import { useState } from "react";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { assets, ownerMenuLinks } from "../../../assets/assets.js";
import { useAppContext } from "../../../context/ContexedApp.js";
import Spinner from "../../../utils/Spinner/Spinner.jsx";
import "./Sidebar.css";

const Sidebar = () => {
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user, axios, checkUser, token } = useAppContext();

  const updateImage = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      const { data } = await axios.post("/api/owner/update-image", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        checkUser(token);
        setImage("");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
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
                  "https://plus.unsplash.com/premium_photo-1724088683759-ee94b21a4f1c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEzfHxtZW5zfGVufDB8fDB8fHww"
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

          {isLoading && <Spinner />}

          <div className="owner-user-image-edit-icon">
            <img src={assets.edit_icon} alt="edit icon" />
          </div>
        </label>
      </div>

      {image && (
        <button className="owner-user-check-btn" onClick={updateImage}>
          Save <img src={assets.check_icon} width={13} alt="check icon" />
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
