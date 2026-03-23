import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="apex-footer">
      <div className="footer-grid">

        {/* Brand */}
        <div className="footer-brand">
          <p className="footer-logo">◈ APEX<span>GADGETS</span></p>
          <p className="footer-tagline">Elevate Your Tech</p>
          <p className="footer-desc">
            Your go-to destination for premium gadgets in Kenya. Quality tech at the best prices.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/getproducts">Shop</Link></li>
            <li><Link to="/addproducts">Add Product</Link></li>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4 className="footer-title">Contact Us</h4>
          <ul className="footer-contact">
            <li>
              <span className="footer-icon">📍</span>
              Nakuru, Kenya
            </li>
            <li>
              <span className="footer-icon">📞</span>
              +254 700 000 000
            </li>
            <li>
              <span className="footer-icon">✉️</span>
              info@apexgadgets.co.ke
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h4 className="footer-title">Follow Us</h4>
          <div className="footer-socials">
            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noreferrer"
              className="social-btn whatsapp"
            >
              WhatsApp
            </a>
            <a
              href="https://instagram.com/apexgadgets"
              target="_blank"
              rel="noreferrer"
              className="social-btn instagram"
            >
              Instagram
            </a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ApexGadgets. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;