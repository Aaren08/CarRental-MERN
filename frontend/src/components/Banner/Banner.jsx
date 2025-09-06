import toast from "react-hot-toast";
import { assets } from "../../assets/assets.js";
import { useAppContext } from "../../context/ContexedApp.js";
import "./Banner.css";

const Banner = () => {
  const { navigate, user } = useAppContext();

  const handleListCar = () => {
    if (user) {
      navigate("/owner/add-car");
    } else {
      toast.error("You need to be logged in to list a car");
    }
  };

  return (
    <div className="banner">
      <div className="banner-text">
        <h2>Do you own a luxury car?</h2>
        <p>
          Monetize your vehicle effortlessly by listing it on{" "}
          <strong>CarRental</strong>
        </p>
        <p>
          We take care of insurance, driver verification and secure payments ―
          so you can earn passive income, stress free.
        </p>
        <button onClick={handleListCar}>List your car</button>
      </div>
      <img
        src={assets.banner_car_image}
        alt="car image"
        className="banner-image"
      />
    </div>
  );
};

export default Banner;
