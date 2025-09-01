import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import Title from "../../../components/Owner/Title/Title.jsx";
import { assets } from "../../../assets/assets.js";
import { useAppContext } from "../../../context/ContexedApp.js";
import "./ManageCars.css";

const ManageCars = () => {
  const { isOwner, axios, currency, token } = useAppContext();
  const [cars, setCars] = useState([]);

  const fetchOwnerCars = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/owner/cars", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }, [axios, token]);

  const toggleAvailability = useCallback(
    async (carId) => {
      try {
        const { data } = await axios.post(
          "/api/owner/toggle-car",
          { carId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (data.success) {
          fetchOwnerCars();
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    },
    [axios, token, fetchOwnerCars]
  );

  const deleteCar = useCallback(
    async (carId) => {
      try {
        const confirm = window.confirm(
          "Are you sure you want to delete this car?"
        );
        if (!confirm) return;
        const { data } = await axios.post(
          "/api/owner/delete-car",
          { carId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (data.success) {
          fetchOwnerCars();
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    },
    [axios, token, fetchOwnerCars]
  );

  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner, fetchOwnerCars]);

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
                    onClick={() => toggleAvailability(car._id)}
                  />
                  <img
                    src={assets.delete_icon}
                    alt="delete icon"
                    className="manage-cars-table-row-actions-icon"
                    onClick={() => deleteCar(car._id)}
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
