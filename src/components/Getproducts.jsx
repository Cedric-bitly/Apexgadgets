import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const Getproducts = () => {

  // Initialize hook to help manage state of application
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // declare navigate hook
  const navigate = useNavigate();

  // Add to cart function
  const addToCart = (product) => {
    const hasDiscount = product.discount > 0;
    const discountedPrice = hasDiscount
      ? Math.round(product.product_cost - (product.product_cost * product.discount / 100))
      : product.product_cost;

    const newItem = {
      ...product,
      discountedPrice,
      quantity: 1,
      addedAt: new Date().toISOString()
    };

    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem('apexCart') || '[]');
    const updatedCart = [...existingCart, newItem];
    
    // Save to localStorage
    localStorage.setItem('apexCart', JSON.stringify(updatedCart));
    
    // Trigger storage event to update navbar
    window.dispatchEvent(new Event('storage'));
    
    // Show success feedback
    const button = document.querySelector(`[data-product-id="${product.id}"] .add-to-cart-btn`);
    if (button) {
      const originalText = button.innerHTML;
      button.innerHTML = '✓ Added!';
      button.style.background = '#2ed573';
      setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
      }, 1500);
    }
  };

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // below we specify image base url
  const img_url = "https://cedric22a.alwaysdata.net/static/images/"


  // create a function to help you fetch products from your API
  const fetchProducts = async () => {

    try{
      // update loading hook
      setLoading(true);
      // interact with endpoint for fetching products
      const response = await axios.get("https://cedric22a.alwaysdata.net/api/get_products")

      // Debug: Log the products to see what data we're getting
      console.log("Products from API:", response.data);
      
      // Check if any products have discounts
      const productsWithDiscounts = response.data.filter(p => p.discount > 0);
      console.log("Products with discounts:", productsWithDiscounts);

      // update products hook with response from the API
      setProducts(response.data);
      
      // set loading hook to false after response is received
      setLoading(false);
    }
    catch(error){
    // if there is an error, 
    // set loading hook to false
     setLoading(false);

    //  update error hook with error message
      setError(error.message);
  }
  }

  // We shall use useEffect hook. This hook enables us to automatically re-render new features incase of any changes
  useEffect(() => {
    fetchProducts()
  }, [])





  return (
      <div className="getproducts-wrapper">

    {/* Interactive Background Effect */}
    <div 
      className="products-glow-effect"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 212, 170, 0.05) 0%, transparent 50%)`
      }}
    />

    <div className="section-header">
      <h2 className="getproducts-title">
        <span className="title-icon">⚡</span>
        Available Gadgets
        <div className="title-glow"></div>
      </h2>
      <div className="title-underline"></div>
    </div>

      <div className="search-filter-row">

      {/* Enhanced Filter buttons */}
      <div className="filter-wrapper">
        {['All', 'Phones', 'Tablets', 'Laptops'].map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            <span className="filter-icon">
              {cat === 'All' && '🌟'}
              {cat === 'Phones' && '📱'}
              {cat === 'Tablets' && '📟'}
              {cat === 'Laptops' && '💻'}
            </span>
            <span className="filter-text">{cat}</span>
            <div className="filter-glow"></div>
          </button>
        ))}
      </div>

      {/* Enhanced Search bar */}
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search gadgets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="search-glow"></div>
      </div>

      </div>


    {loading && <Loader />}
    {error && <h4 className="error-message">✗ {error}</h4>}

    <div className="row g-4">
      {products
  .filter((product) =>
    activeCategory === 'All' ? true : product.category === activeCategory
  )
  .filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

      .map((product, index) => {

  // calculate discounted price
  const hasDiscount = product.discount > 0;
  const discountedPrice = hasDiscount
    ? Math.round(product.product_cost - (product.product_cost * product.discount / 100))
    : product.product_cost;

  // Debug: Log discount calculation
  console.log(`Product: ${product.product_name}, Discount: ${product.discount}, Has Discount: ${hasDiscount}, Discounted Price: ${discountedPrice}`);

  return (
    <div key={product.id} className="col-md-3 col-sm-6 d-flex">
      <div className="product-card h-100 product-card-wrapper" style={{ animationDelay: `${index * 0.1}s` }}>

        {/* Show badge only if discount exists */}
        {hasDiscount && (
          <div className="discount-badge">
            <span className="badge-text">{product.discount}% OFF</span>
            <div className="badge-glow"></div>
          </div>
        )}

        <div className="product-image-container">
          <img
            src={img_url + product.product_photo}
            alt={product.product_name}
            className="product-image"
          />
        </div>
        
        <div className="product-card-body">
          <div className="product-header">
            <p className="product-card-name">{product.product_name}</p>
            <div className="product-category-badge">{product.category}</div>
          </div>
          
          <p className="product-card-desc">
            {product.product_description.slice(0, 61)}...
          </p>

          {/* Show strikethrough only if discount exists */}
          {hasDiscount && (
            <p className="product-original-price">Kshs. {product.product_cost}</p>
          )}
          <p className={hasDiscount ? 'product-discounted-price' : 'product-card-price'}>
            Kshs. {discountedPrice}
          </p>

          <button
            className="product-card-btn"
            onClick={() => navigate('/makepayment', { state: { product: { ...product, discountedPrice } } })}
          >
            <span className="btn-icon">⚡</span>
            <span className="btn-text">Make Purchase</span>
            <div className="btn-glow"></div>
          </button>
          
          <button
            data-product-id={product.id}
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
          >
            <span className="btn-icon">🛒</span>
            <span className="btn-text">Add to Cart</span>
            <div className="btn-glow"></div>
          </button>
        </div>
      </div>
    </div>
  );
})}

    </div>

  </div>
  );
}

export default Getproducts;


