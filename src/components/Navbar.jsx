import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'nav-active' : '';
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cartCount, setCartCount] = useState(0);
  const [profileImage, setProfileImage] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Update cart count from localStorage
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('apexCart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartCount(parsedCart.length);
      }
    };

    // Update profile image from localStorage
    const updateProfileImage = () => {
      const savedImage = localStorage.getItem('apexProfileImage');
      if (savedImage) {
        setProfileImage(savedImage);
      }
    };

    updateCartCount();
    updateProfileImage();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('storage', updateProfileImage);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('storage', updateProfileImage);
    };
  }, []);

  return (
    <>
      {/* Animated Background Effect */}
      <div 
        className="nav-glow-effect"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 212, 170, 0.1) 0%, transparent 50%)`
        }}
      />
      
      <nav className={`apex-nav ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/getproducts" className="apex-nav-logo">
          <span className="logo-symbol">◈</span>
          <span className="logo-text">APEX</span>
          <span className="logo-gadgets">GADGETS</span>
          <div className="logo-pulse"></div>
        </Link>

        {/* Desktop links */}
        <ul className="apex-nav-links desktop-links">
          <li>
            <Link to="/" className={isActive('/')}>
              <span className="nav-icon">🏠</span>
              <span className="nav-text">Home</span>
              <div className="nav-underline"></div>
            </Link>
          </li>
          <li>
            <Link to="/getproducts" className={isActive('/getproducts')}>
              <span className="nav-icon">🛍️</span>
              <span className="nav-text">Shop</span>
              <div className="nav-underline"></div>
            </Link>
          </li>
          <li>
            <Link to="/addproducts" className={isActive('/addproducts')}>
              <span className="nav-icon">➕</span>
              <span className="nav-text">Add Product</span>
              <div className="nav-underline"></div>
            </Link>
          </li>
          <li>
            <Link to="/cart" className={isActive('/cart')}>
              <span className="nav-icon">🛒</span>
              <span className="nav-text">Cart</span>
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
              <div className="nav-underline"></div>
            </Link>
          </li>

          {!user ? (
            <>
              <li>
                <Link to="/signin" className={isActive('/signin')}>
                  <span className="nav-icon">🔐</span>
                  <span className="nav-text">Sign In</span>
                  <div className="nav-underline"></div>
                </Link>
              </li>
              <li>
                <Link to="/signup" className={`apex-nav-cta ${isActive('/signup')}`}>
                  <span className="nav-icon">🚀</span>
                  <span className="nav-text">Sign Up</span>
                  <div className="cta-glow"></div>
                </Link>
              </li>
            </>
          ) : (
            <li className="user-profile">
              <Link to="/profile" className="profile-link">
                <div className="user-avatar">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="profile-avatar"
                    />
                  ) : (
                    <div className="default-avatar">
                      <span className="avatar-text">{user.username[0].toUpperCase()}</span>
                    </div>
                  )}
                  <div className="avatar-glow"></div>
                  <div className="avatar-ring"></div>
                </div>
                <div className="user-info">
                  <span className="username">{user.username}</span>
                  <span className="user-status">● Online</span>
                </div>
                <div className="nav-underline"></div>
              </Link>
            </li>
          )}
        </ul>

        {/* Enhanced Hamburger button */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="bar bar-1"></span>
          <span className="bar bar-2"></span>
          <span className="bar bar-3"></span>
          <div className="hamburger-glow"></div>
        </button>

        {/* Enhanced Mobile dropdown menu */}
        <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}>
          <ul className="mobile-menu">
            <li><Link to="/" onClick={() => setMenuOpen(false)}>
              <span className="mobile-nav-icon">🏠</span>
              Home
            </Link></li>
            <li><Link to="/getproducts" onClick={() => setMenuOpen(false)}>
              <span className="mobile-nav-icon">🛍️</span>
              Shop
            </Link></li>
            <li><Link to="/addproducts" onClick={() => setMenuOpen(false)}>
              <span className="mobile-nav-icon">➕</span>
              Add Product
            </Link></li>
            <li><Link to="/cart" onClick={() => setMenuOpen(false)}>
              <span className="mobile-nav-icon">🛒</span>
              Cart
            </Link></li>
            <li><Link to="/signin" onClick={() => setMenuOpen(false)}>
              <span className="mobile-nav-icon">🔐</span>
              Sign In
            </Link></li>
            <li><Link to="/signup" onClick={() => setMenuOpen(false)}>
              <span className="mobile-nav-icon">🚀</span>
              Sign Up
            </Link></li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;