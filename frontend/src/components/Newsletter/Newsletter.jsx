import "./Newsletter.css";

const Newsletter = () => {
  return (
    <div className="newsletter-section">
      <h1 className="newsletter-title">Never Miss a Deal!</h1>
      <p className="newsletter-description">
        Subscribe to get the latest offers, new arrivals, and exclusive
        discounts
      </p>
      <form className="newsletter-form">
        <input
          type="text"
          className="newsletter-input"
          placeholder="Enter your email id"
          required
        />
        <button type="submit" className="newsletter-button">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
