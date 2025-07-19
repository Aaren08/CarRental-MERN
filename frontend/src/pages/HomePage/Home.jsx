import Hero from "../../components/Hero/Hero.jsx";
import FeaturedSection from "../../components/FeaturedSection/FeaturedSection.jsx";
import Banner from "../../components/Banner/Banner.jsx";
import Testimonial from "../../components/Testimonial/Testimonial.jsx";
import "./Home.css";
import Newsletter from "../../components/Newsletter/Newsletter.jsx";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedSection />
      <Banner />
      <Testimonial />
      <Newsletter />
    </div>
  );
};

export default Home;
