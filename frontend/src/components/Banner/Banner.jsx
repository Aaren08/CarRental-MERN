import { assets } from "../../assets/assets.js";
import "./Banner.css";

const Banner = () => {
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
        <button>List your car</button>
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
