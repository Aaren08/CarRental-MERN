import toast from "react-hot-toast";
import { motion as Motion } from "motion/react";
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
    <Motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 30 }}
      transition={{ duration: 0.6 }}
      className="banner"
    >
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
      <Motion.img
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        src={assets.banner_car_image}
        alt="car image"
        className="banner-image"
      />
    </Motion.div>
  );
};

export default Banner;
