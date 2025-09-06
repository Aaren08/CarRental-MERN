import { motion as Motion } from "motion/react";
import { assets } from "../../assets/assets.js";
import "./Footer.css";

const Footer = () => {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="footer-container"
    >
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="footer-content"
      >
        <div className="footer-brand">
          <Motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            src={assets.logo}
            alt="logo"
            className="footer-logo"
          />
          <Motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="footer-description"
          >
            Premium car rental service with a wide selection of luxury and
            everyday vehicles for all your driving needs.
          </Motion.p>
          <Motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="social-icons"
          >
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
          </Motion.div>
        </div>

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="footer-column-wrapper"
        >
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
        </Motion.div>
      </Motion.div>

      <hr className="footer-divider" />

      <Motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="footer-bottom"
      >
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
      </Motion.div>
    </Motion.div>
  );
};

export default Footer;
