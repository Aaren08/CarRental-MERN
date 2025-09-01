import { useState } from "react";
import toast from "react-hot-toast";
import Title from "../../../components/Owner/Title/Title.jsx";
import { assets } from "../../../assets/assets.js";
import { useAppContext } from "../../../context/ContexedApp.js";
import "./AddCar.css";

const AddCar = () => {
  const { axios, currency, checkUser, token } = useAppContext();
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return null;
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify(car));
      const { data } = await axios.post("/api/owner/add-car", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        checkUser(token);
        setImage(null);
        setCar({
          brand: "",
          model: "",
          year: 0,
          pricePerDay: 0,
          category: "",
          transmission: "",
          fuel_type: "",
          seating_capacity: 0,
          location: "",
          description: "",
        });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-car-container">
      <Title
        title={"Add New Car"}
        subtitle={
          "Fill in details to list a new car for booking, including pricing, availability and more."
        }
      />

      <form onSubmit={onSubmitHandler} className="add-car-form">
        {/* CAR IMAGE */}
        <div className="add-car-user-image-container">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt="user image"
              className="add-car-user-image"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="add-car-user-image-text">Upload Car Image</p>
        </div>

        {/* CAR BRAND & MODEL */}
        <div className="add-car-form-level-1">
          {/* CAR BRAND */}
          <div className="add-car-form-brand">
            <label>Brand</label>
            <input
              type="text"
              placeholder="e.g. BMW, Mercedes, Audi..."
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
              required
            />
          </div>

          {/* CAR MODEL */}
          <div className="add-car-form-model">
            <label>Model</label>
            <input
              type="text"
              placeholder="e.g. X5, E-60, S-Class..."
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
              required
            />
          </div>
        </div>

        {/* CAR YEAR, PRICE & CATEGORY */}
        <div className="add-car-form-level-2">
          {/* CAR YEAR */}
          <div className="add-car-form-year">
            <label>Year</label>
            <input
              type="number"
              placeholder="e.g. 1998, 2006, 2014..."
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
              required
            />
          </div>

          {/* CAR PRICE */}
          <div className="add-car-form-price">
            <label>Price per Day ({currency})</label>
            <input
              type="number"
              placeholder="e.g. 100, 200, 300..."
              value={car.pricePerDay}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
              required
            />
          </div>

          {/* CAR CATEGORY */}
          <div className="add-car-form-category">
            <label>Category</label>
            <select
              value={car.category}
              onChange={(e) => setCar({ ...car, category: e.target.value })}
            >
              <option value="">Select a category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
            </select>
          </div>
        </div>

        {/* CAR TRANSMISSION, FUEL TYPE & SEATING CAPACITY */}
        <div className="add-car-form-level-3">
          {/* CAR TRANSMISSION */}
          <div className="add-car-form-transmission">
            <label>Transmission</label>
            <select
              value={car.transmission}
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
            >
              <option value="">Select a transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>

          {/* CAR FUEL TYPE */}
          <div className="add-car-form-fuel-type">
            <label>Fuel Type</label>
            <select
              value={car.fuel_type}
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
            >
              <option value="">Select a fuel type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* CAR SEATING CAPACITY */}
          <div className="add-car-form-seating-capacity">
            <label>Seating Capacity</label>
            <input
              type="number"
              placeholder="e.g. 4, 5, 7..."
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* CAR LOCATION & DESCRIPTION */}
        <div className="add-car-form-level-4">
          {/* CAR LOCATION */}
          <div className="add-car-form-location">
            <label>Location</label>
            <select
              value={car.location}
              onChange={(e) => setCar({ ...car, location: e.target.value })}
            >
              <option value="">Select a location</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Houston">Houston</option>
              <option value="Chicago">Chicago</option>
            </select>
          </div>

          {/* CAR DESCRIPTION */}
          <div className="add-car-form-description">
            <label>Description</label>
            <textarea
              rows={5}
              placeholder="Enter a description for your car..."
              value={car.description}
              onChange={(e) => setCar({ ...car, description: e.target.value })}
              required
            ></textarea>
          </div>
        </div>

        <button className="add-car-form-button">
          {isLoading ? (
            <>
              <span>Listing Car</span>
              <span className="listingCarLoader"></span>
            </>
          ) : (
            <>
              <img src={assets.tick_icon} alt="tick icon" />
              <span>List Your Car</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
