import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Title from "../../components/Title/Title.jsx";
import CarCard from "../../components/CarCard/CarCard.jsx";
import { assets } from "../../assets/assets.js";
import { useAppContext } from "../../context/ContexedApp.js";
import "./Cars.css";

const Cars = () => {
  const { cars, axios } = useAppContext();
  const [input, setInput] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);

  // GETTING SEARCH PARAMS FROM URL
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  // FILTERING CARS BASED ON SEARCH INPUT
  const isSearchData = pickupLocation && pickupDate && returnDate;

  const searchCarAvailability = useCallback(async () => {
    try {
      const { data } = await axios.post(
        "/api/bookings/check-availability",
        {
          location: pickupLocation,
          pickupDate: pickupDate,
          returnDate: returnDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data?.success && data.availableCars?.length) {
        setFilteredCars(data.availableCars);
      } else {
        setFilteredCars([]);
        toast("No cars available for selected dates");
      }
    } catch (err) {
      toast.error("Error checking availability");
      console.error(err);
    }
  }, [pickupLocation, pickupDate, returnDate, axios]);

  useEffect(() => {
    if (isSearchData) {
      searchCarAvailability();
    }
  }, [isSearchData, searchCarAvailability]);

  // APPLYING FILTER ON CARS
  const applyFilter = useCallback(async () => {
    if (input === "") {
      setFilteredCars(cars);
      return null;
    }
    const filtered = cars.slice().filter((car) => {
      return (
        car.brand.toLowerCase().includes(input.toLowerCase()) ||
        car.model.toLowerCase().includes(input.toLowerCase()) ||
        car.category.toLowerCase().includes(input.toLowerCase()) ||
        car.transmission.toLowerCase().includes(input.toLowerCase())
      );
    });
    setFilteredCars(filtered);
  }, [input, cars]);

  useEffect(() => {
    if (cars.length > 0 && !isSearchData) {
      applyFilter();
    }
  }, [applyFilter, cars, isSearchData]);

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
            onChange={(e) => setInput(e.target.value)}
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
          Showing {filteredCars.length} Cars
        </p>

        <div className="cars-section-cards">
          {filteredCars.map((car, index) => (
            <div key={index}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;
