import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import "./CarCard.css";

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/car-details/${car._id}`);
        scrollTo(0, 0);
      }}
      className="car-card group"
    >
      <div className="car-card-image-container">
        <img src={car.image} alt="car image" className="car-card-image" />
        {car.isAvailable && <p className="car-available">Available Now</p>}
        <div className="car-card-info">
          <span>
            {currency}
            {car.pricePerDay}
          </span>
          <span> / day</span>
        </div>
      </div>

      {/* CAR SPECIFICATIONS */}

      <div className="car-card-specs">
        <div className="car-card-specs-item">
          <div>
            <h3>
              {car.brand} {car.model}
            </h3>
            <p>
              {car.category} • {car.year}
            </p>
          </div>
        </div>

        <div className="car-card-specs-specific">
          <div className="car-card-specs-item-2">
            <img src={assets.users_icon} alt="users icon" />
            <span>{car.seating_capacity} Seats</span>
          </div>

          <div className="car-card-specs-item-2">
            <img src={assets.fuel_icon} alt="fuel icon" />
            <span>{car.fuel_type}</span>
          </div>

          <div className="car-card-specs-item-2">
            <img src={assets.car_icon} alt="car icon" />
            <span>{car.transmission}</span>
          </div>

          <div className="car-card-specs-item-2">
            <img src={assets.location_icon} alt="location icon" />
            <span>{car.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
