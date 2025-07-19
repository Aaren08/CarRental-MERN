import { assets } from "../../assets/assets.js";
import Title from "../Title/Title";
import "./Testimonial.css";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_1,
      testimonial:
        "I have rented cars from various companies, but CarRental exceeded my expectations.",
    },
    {
      name: "Liam Johnson",
      location: "New York, USA",
      image: assets.testimonial_image_2,
      testimonial:
        "CarRental made my trip so much easier. The car was delivered to my doorstep and the rental process was seamless.",
    },
    {
      name: "Sophia Lee",
      location: "Seoul, South Korea",
      image: assets.testimonial_image_1,
      testimonial:
        "I had a great experience with CarRental. The customer service was outstanding and the cars were well-maintained.",
    },
  ];
  return (
    <div className="testimonials-section">
      <Title
        title={"What Our Customers Say "}
        subtitle={
          "Discover why discerning travelers choose CarRental for their luxury accomodations around the world."
        }
      />
      <div className="testimonials-list">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-header">
              <img
                className="testimonial-avatar"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="testimonial-name">{testimonial.name}</p>
                <p className="testimonial-address">{testimonial.location}</p>
              </div>
            </div>
            <div className="testimonial-stars">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img key={index} src={assets.star_icon} alt="star icon" />
                ))}
            </div>
            <p className="testimonial-review">"{testimonial.testimonial}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
