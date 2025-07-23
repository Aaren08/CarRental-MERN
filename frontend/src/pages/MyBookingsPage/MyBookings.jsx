import { useEffect, useState } from "react";
import Title from "../../components/Title/Title.jsx";
import { assets, dummyMyBookingsData } from "../../assets/assets.js";
import "./MyBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const currency = import.meta.env.VITE_CURRENCY;

  const fetchMyBookings = async () => {
    setBookings(dummyMyBookingsData);
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  return (
    <div className="my-bookings">
      <Title
        title={"My Bookings"}
        subtitle={"View and manage your bookings"}
        align={"left"}
      />

      {/* CAR BOOKINGS */}

      <div className="my-bookings-cards">
        {bookings.map((booking, index) => (
          <div key={booking._id} className="my-bookings-card">
            {/* CAR IMAGE */}
            <div className="my-bookings-card-info">
              <div className="my-bookings-card-image-container">
                <img
                  src={booking.car.image}
                  alt="car image"
                  className="my-bookings-card-image"
                />
              </div>

              {/* CAR INFO */}
              <p className="my-bookings-card-title">
                {booking.car.brand} {booking.car.model}
              </p>

              <p className="my-bookings-card-subtitle">
                {booking.car.year} • {booking.car.category} •{" "}
                {booking.car.location}
              </p>
            </div>

            {/* BOOKING INFO */}

            <div className="my-bookings-card-info-2">
              <div className="my-bookings-card-info-item">
                <p className="my-bookings-card-info-item-title">
                  Booking #{index + 1}
                </p>
                <p
                  className={`my-bookings-card-info-item-status ${
                    booking.status === "confirmed" ? "confirmed" : "pending"
                  }`}
                >
                  {booking.status}
                </p>
              </div>

              <div className="my-bookings-card-info-3">
                <img
                  src={assets.calendar_icon_colored}
                  alt="calendar"
                  className="my-bookings-card-info-calendar-icon"
                />
                <div>
                  <p>Rental Period</p>
                  <p>
                    {booking.pickupDate.split("T")[0]} To{" "}
                    {booking.returnDate.split("T")[0]}
                  </p>
                </div>
              </div>

              <div className="my-bookings-card-info-3">
                <img
                  src={assets.location_icon_colored}
                  alt="calendar"
                  className="my-bookings-card-info-calendar-icon"
                />
                <div>
                  <p>Pick-up Location</p>
                  <p>{booking.car.location}</p>
                </div>
              </div>
            </div>

            {/* BOOKING PRICE */}
            <div className="my-bookings-card-info-price">
              <div className="my-bookings-card-info-price-item">
                <p>Total Price</p>
                <h1>
                  {currency}
                  {booking.price}
                </h1>
                <p>Booked on {booking.createdAt.split("T")[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
