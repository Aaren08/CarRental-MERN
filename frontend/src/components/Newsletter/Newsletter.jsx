import { motion as Motion } from "motion/react";
import "./Newsletter.css";

const Newsletter = () => {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="newsletter-section"
    >
      <Motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="newsletter-title"
      >
        Never Miss a Deal!
      </Motion.h1>

      <Motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="newsletter-description"
      >
        Subscribe to get the latest offers, new arrivals, and exclusive
        discounts
      </Motion.p>

      <Motion.form
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="newsletter-form"
      >
        <input
          type="text"
          className="newsletter-input"
          placeholder="Enter your email id"
          required
        />
        <button type="submit" className="newsletter-button">
          Subscribe
        </button>
      </Motion.form>
    </Motion.div>
  );
};

export default Newsletter;
