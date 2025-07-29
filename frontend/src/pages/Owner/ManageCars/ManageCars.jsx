import { useEffect, useState } from "react";
import Title from "../../../components/Owner/Title/Title.jsx";
import { assets, dummyCarData } from "../../../assets/assets.js";
import "./ManageCars.css";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const currency = import.meta.env.VITE_CURRENCY;

  const fetchOwnerCars = async () => {
    setCars(dummyCarData);
  };

  useEffect(() => {
    fetchOwnerCars();
  }, []);

  return (
    <div className="manage-cars">
      <Title
        title={"Manage Cars"}
        subtitle={
          "View all listed cars, update their details, or remove them from the booking platform."
        }
      />

      {/* TABLE */}

      <div className="manage-cars-table-container">
        <table className="manage-cars-table">
          <thead>
            <tr className="manage-cars-table-header">
              <th>Car</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {cars.map((car, index) => (
              <tr key={index} className="manage-cars-table-row">
                <td className="manage-cars-table-row-info">
                  <img src={car.image} alt="car image" />

                  {/* CAR INFO */}
                  <div>
                    <p>
                      {car.brand} {car.model}
                    </p>
                    <p>
                      {car.seating_capacity} • {car.transmission}
                    </p>
                  </div>
                </td>

                {/* CATEGORY */}
                <td className="manage-cars-table-row-category">
                  {car.category}
                </td>

                {/* PRICE PER DAY */}
                <td className="manage-cars-table-row-price">
                  {currency} {car.pricePerDay} /day
                </td>

                {/* STATUS */}
                <td className="manage-cars-table-row-status">
                  <span
                    className={` ${
                      car.isAvailable
                        ? "manage-cars-available"
                        : "manage-cars-unavailable"
                    }`}
                  >
                    {car.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="manage-cars-table-row-actions">
                  <img
                    src={
                      car.isAvailable ? assets.eye_close_icon : assets.eye_icon
                    }
                    alt="availability icon"
                    className="manage-cars-table-row-actions-icon"
                  />
                  <img
                    src={assets.delete_icon}
                    alt="delete icon"
                    className="manage-cars-table-row-actions-icon"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCars;
