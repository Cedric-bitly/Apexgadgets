import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'nav-active' : '';

  return (
    <nav className="apex-nav">
      <Link to="/getproducts" className="apex-nav-logo">
        ◈ APEX<span>GADGETS</span> <h4>Elevate Your Tech</h4>
      </Link>
      <ul className="apex-nav-links">
        <li><Link to="/getproducts" className={isActive('/getproducts')}>Shop</Link></li>
        <li><Link to="/addproducts" className={isActive('/addproducts')}>Add Product</Link></li>
        <li><Link to="/signin" className={isActive('/signin')}>Sign In</Link></li>
        <li><Link to="/signup" className={`apex-nav-cta ${isActive('/signup')}`}>Sign Up</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;