import { assets } from "../../assets/assets.js";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <img src={assets.logo} alt="logo" className="footer-logo" />
          <p className="footer-description">
            Premium car rental service with a wide selection of luxury and
            everyday vehicles for all your driving needs.
          </p>
          <div className="social-icons">
            <a href="#">
              <img
                src={assets.facebook_logo}
                alt="facebook"
                className="social-icon"
              />
            </a>

            <a href="#">
              <img
                src={assets.twitter_logo}
                alt="twitter"
                className="social-icon"
              />
            </a>

            <a href="#">
              <img
                src={assets.instagram_logo}
                alt="instagram"
                className="social-icon"
              />
            </a>

            <a href="#">
              <img
                src={assets.gmail_logo}
                alt="linkedin"
                className="social-icon"
              />
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h2 className="footer-heading">Quick Links</h2>
          <ul className="footer-links">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Browse Cars</a>
            </li>
            <li>
              <a href="#">List Your Car</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h2 className="footer-heading">Resources</h2>
          <ul className="footer-links">
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Insurance</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h2 className="footer-heading">Contact</h2>
          <ul className="footer-links">
            <li>1234 Luxury Drive</li>
            <li>New York, NY 10001</li>
            <li>+1 (123) 456-7890</li>
            <li>info@carrental.com</li>
          </ul>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()}{" "}
          <a href="https://prebuiltui.com">CarRental</a>. All rights reserved.
        </p>
        <ul className="footer-policy-links">
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>|</li>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>|</li>
          <li>
            <a href="#">Cookies</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
