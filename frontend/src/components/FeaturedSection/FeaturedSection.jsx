import { useNavigate } from "react-router-dom";
import Title from "../Title/Title";
import CarCard from "../CarCard/CarCard";
import { assets } from "../../assets/assets.js";
import { useAppContext } from "../../context/ContexedApp.js";
import "./FeaturedSection.css";

const FeaturedSection = () => {
  const { cars } = useAppContext();
  const navigate = useNavigate();
  return (
    <div className="featured-section">
      <div>
        <Title
          title={"Featured Vehicles"}
          subtitle={
            "Explore our selection of premium vehicles available for your next adventure."
          }
        />
      </div>

      <div className="featured-section-cards">
        {cars.slice(0, 6).map((car, index) => (
          <div key={index}>
            <CarCard key={car.id} car={car} />
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/cars");
          scrollTo(0, 0);
        }}
        className="featured-section-button"
      >
        Explore all cars <img src={assets.arrow_icon} alt="arrow" />
      </button>
    </div>
  );
};

export default FeaturedSection;
