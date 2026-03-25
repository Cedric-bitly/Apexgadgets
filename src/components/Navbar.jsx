import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'nav-active' : '';
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return (
    <nav className="apex-nav">
      <Link to="/getproducts" className="apex-nav-logo">
        ◈ APEX<span>GADGETS</span>
      </Link>

      {/* Desktop links */}
      <ul className="apex-nav-links desktop-links">
        <li><Link to="/getproducts" className={isActive('/getproducts')}>Shop</Link></li>
        <li><Link to="/addproducts" className={isActive('/addproducts')}>Add Product</Link></li>

        {!user ? (
          <>
            <li><Link to="/signin" className={isActive('/signin')}>Sign In</Link></li>
            <li><Link to="/signup" className={`apex-nav-cta ${isActive('/signup')}`}>Sign Up</Link></li>
          </>
        ) : (
          <>
            <li>
              <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00d4aa, #00b8d9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: '900',
                  color: '#050a0f'
                }}>
                  {user.username[0].toUpperCase()}
                </div>
                {user.username}
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Hamburger button — only shows on mobile */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={menuOpen ? 'bar open' : 'bar'}></span>
        <span className={menuOpen ? 'bar open' : 'bar'}></span>
        <span className={menuOpen ? 'bar open' : 'bar'}></span>
      </button>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <ul className="mobile-menu">
          <li><Link to="/getproducts" onClick={() => setMenuOpen(false)}>Shop</Link></li>
          <li><Link to="/addproducts" onClick={() => setMenuOpen(false)}>Add Product</Link></li>
          <li><Link to="/signin" onClick={() => setMenuOpen(false)}>Sign In</Link></li>
          <li><Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;