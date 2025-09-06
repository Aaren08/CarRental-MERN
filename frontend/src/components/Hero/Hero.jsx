import { useState } from "react";
import { assets, cityList } from "../../assets/assets.js";
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
    <div className="hero">
      <h1 className="hero-title">Luxury Cars on Rent</h1>

      <form onSubmit={handleSearch} className="hero-form">
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

          <button className="searchBtn">
            <img src={assets.search_icon} alt="search" /> Search
          </button>
        </div>
      </form>

      <img src={assets.main_car} alt="car" className="hero-image" />
    </div>
  );
};

export default Hero;
