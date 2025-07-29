import { useEffect, useState } from "react";
import Title from "../../../components/Owner/Title/Title.jsx";
import { dummyMyBookingsData } from "../../../assets/assets.js";
import "./ManageBookings.css";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const currency = import.meta.env.VITE_CURRENCY;

  const fetchOwnerBookings = async () => {
    setBookings(dummyMyBookingsData);
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  return (
    <div className="manage-bookings">
      <Title
        title={"Manage Bookings"}
        subtitle={
          "Track all customer bookings, approve or cancel requests, and manage booking statuses."
        }
      />

      {/* TABLE */}

      <div className="manage-bookings-table-container">
        <table className="manage-bookings-table">
          <thead>
            <tr className="manage-bookings-table-header">
              <th>Car</th>
              <th>Date Range</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className="manage-bookings-table-row">
                <td className="manage-bookings-table-row-info">
                  <img src={booking.car.image} alt="car image" />
                  <p>
                    {booking.car.brand} {booking.car.model}
                  </p>
                </td>

                {/* DATE RANGE */}
                <td className="manage-bookings-table-row-dateRange">
                  {booking.pickupDate.split("T")[0]} to{" "}
                  {booking.returnDate.split("T")[0]}
                </td>

                {/* TOTAL */}
                <td className="manage-bookings-table-row-total">
                  {currency}
                  {booking.price}
                </td>

                {/* PAYMENT */}
                <td className="manage-bookings-table-row-payment">
                  <span>offline</span>
                </td>

                {/* ACTIONS */}
                <td className="manage-bookings-table-row-actions">
                  {booking.status === "pending" ? (
                    <select value={booking.status}>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  ) : (
                    <span
                      className={`${
                        booking.status === "confirmed"
                          ? "manage-bookings-confirmed"
                          : "manage-bookings-cancelled"
                      }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
