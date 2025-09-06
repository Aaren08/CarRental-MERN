import { useState } from "react";
import { assets, cityList } from "../../assets/assets.js";
import { motion as Motion } from "motion/react";
import { useAppContext } from "../../context/ContexedApp.js";
import "./Hero.css";

const Hero = () => {
  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useAppContext();
  const [pickupLocation, setPickupLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      "/cars?pickupLocation=" +
        pickupLocation +
        "&pickupDate=" +
        pickupDate +
        "&returnDate=" +
        returnDate
    );
  };

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="hero"
    >
      <Motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hero-title"
      >
        Luxury Cars on Rent
      </Motion.h1>

      <Motion.form
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onSubmit={handleSearch}
        className="hero-form"
      >
        <div className="hero-form-input">
          {/* SELECT BOX */}
          <div className="select-box">
            <select
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            >
              <option value="">Pickup Location</option>
              {cityList.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p>{pickupLocation ? pickupLocation : "Please select location"}</p>
          </div>

          {/* PICKUP DATE */}
          <div className="date">
            <label htmlFor="pickup-date">Pick-up Date</label>
            <input
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              className="date-input"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              required
            />
          </div>

          {/* RETURN DATE */}
          <div className="date">
            <label htmlFor="return-date">Return Date</label>
            <input
              type="date"
              id="return-date"
              min={pickupDate}
              className="date-input"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />
          </div>

          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="searchBtn"
          >
            <img src={assets.search_icon} alt="search" />
            Search
          </Motion.button>
        </div>
      </Motion.form>

      <Motion.img
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        src={assets.main_car}
        alt="car"
        className="hero-image"
      />
    </Motion.div>
  );
};

export default Hero;
