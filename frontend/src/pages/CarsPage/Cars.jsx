import { useState } from "react";
import Title from "../../components/Title/Title.jsx";
import CarCard from "../../components/CarCard/CarCard.jsx";
import { assets, dummyCarData } from "../../assets/assets.js";
import "./Cars.css";

const Cars = () => {
  const [input, setInput] = useState("");
  return (
    <div>
      {/* HERO SECTION */}
      <div className="cars-hero-section">
        <Title
          title={"Available Cars"}
          subtitle={
            "Explore our collection of premium cars for your next adventure."
          }
        />

        {/* FILTERS SECTION --> SEARCH BAR */}
        <div className="cars-section-search-bar">
          <img
            src={assets.search_icon}
            alt="search icon"
            className="cars-section-search-icon"
          />
          <input
            value={input}
            onClick={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search by make, model or features"
            className="cars-section-search-input"
          />
          <img
            src={assets.filter_icon}
            alt="filter icon"
            className="cars-section-filter-icon"
          />
        </div>
      </div>

      {/* CARS SECTION */}
      <div className="cars-section">
        <p className="cars-section-cars-count">
          Showing {dummyCarData.length} Cars
        </p>

        <div className="cars-section-cards">
          {dummyCarData.map((car) => (
            <div>
              <CarCard key={car.id} car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;
