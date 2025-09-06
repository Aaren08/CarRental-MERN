import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import Title from "../Title/Title";
import CarCard from "../CarCard/CarCard";
import { assets } from "../../assets/assets.js";
import { useAppContext } from "../../context/ContexedApp.js";
import "./FeaturedSection.css";

const FeaturedSection = () => {
  const { cars } = useAppContext();
  const navigate = useNavigate();
  return (
    <Motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="featured-section"
    >
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Title
          title={"Featured Vehicles"}
          subtitle={
            "Explore our selection of premium vehicles available for your next adventure."
          }
        />
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="featured-section-cards"
      >
        {cars.slice(0, 6).map((car, index) => (
          <Motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            key={index}
          >
            <CarCard key={car.id} car={car} />
          </Motion.div>
        ))}
      </Motion.div>

      <Motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        onClick={() => {
          navigate("/cars");
          scrollTo(0, 0);
        }}
        className="featured-section-button"
      >
        Explore all cars <img src={assets.arrow_icon} alt="arrow" />
      </Motion.button>
    </Motion.div>
  );
};

export default FeaturedSection;
