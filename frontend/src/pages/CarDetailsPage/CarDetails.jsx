import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion as Motion } from "motion/react";
import { assets } from "../../assets/assets.js";
import Spinner from "../../utils/Spinner/Spinner.jsx";
import { useAppContext } from "../../context/ContexedApp.js";
import "./CarDetails.css";

const CarDetails = () => {
  const {
    cars,
    axios,
    token,
    currency,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
  } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/bookings/create",
        {
          car: id,
          pickupDate,
          returnDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        navigate("/my-bookings");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    setCar(cars.find((car) => car._id === id));
  }, [id, cars]);

  return car ? (
    <div className="car-details">
      <button className="car-details-backBtn" onClick={() => navigate(-1)}>
        <img src={assets.arrow_icon} alt="arrow" />
        Back to all cars
      </button>

      <div className="car-details-container">
        {/* LEFT -> CAR DETAILS */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="car-details-left"
        >
          <Motion.img
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={car.image}
            alt="car image"
            className="car-details-image"
          />
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="car-details-info"
          >
            <div>
              <h1>
                {car.brand} {car.model}
              </h1>
              <p>
                {car.category} • {car.year}
              </p>
            </div>

            <hr className="car-details-divider" />

            {/* CAR SPECIFICATIONS */}

            <div className="car-details-specs">
              {[
                {
                  icon: assets.users_icon,
                  text: `${car.seating_capacity} Seats`,
                },
                {
                  icon: assets.fuel_icon,
                  text: car.fuel_type,
                },
                {
                  icon: assets.car_icon,
                  text: car.transmission,
                },
                {
                  icon: assets.location_icon,
                  text: car.location,
                },
              ].map(({ icon, text }, index) => (
                <Motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  key={`${text}-${index}`}
                  className="car-details-specs-item"
                >
                  <img
                    src={icon}
                    alt="image"
                    className="car-details-specs-icon"
                  />
                  {text}
                </Motion.div>
              ))}
            </div>

            {/* CAR DESCRIPTION */}

            <div className="car-details-description">
              <h1>Description</h1>
              <p>{car.description}</p>
            </div>

            {/* CAR FEATURES */}

            <div className="car-details-features">
              <h1>Features</h1>
              <ul>
                {[
                  "Automatic Air Conditioning",
                  "Bluetooth",
                  "GPS Navigation",
                  "Heated Seats",
                  "360 Camera",
                  "Sunroof",
                ].map((feature) => (
                  <li key={feature} className="car-details-features-item">
                    <img
                      src={assets.check_icon}
                      alt="check icon"
                      className="car-details-features-icon"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Motion.div>
        </Motion.div>

        {/* RIGHT -> BOOKING FORM */}

        <Motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          onSubmit={handleSubmit}
          className="car-details-form-right"
        >
          <p className="car-details-form-title">
            {currency} {car.pricePerDay} <span> per day</span>
          </p>

          <hr className="car-details-from-divider" />

          <div className="car-details-form-date">
            <label htmlFor="pickup-date">Pickup Date</label>
            <input
              type="date"
              className="car-details-form-input"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              required
            />
          </div>

          <div className="car-details-form-date">
            <label htmlFor="return-date">Return Date</label>
            <input
              type="date"
              className="car-details-form-input"
              id="return-date"
              min={pickupDate}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />
          </div>
          <button className="car-details-form-button">Book Now</button>
          <p className="car-details-form-credit">
            No credit card required to reserve
          </p>
        </Motion.form>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default CarDetails;
