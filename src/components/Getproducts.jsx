import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const Getproducts = () => {

// Initialize hook to help manage the state of the application
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

// declare the navigate hook
const navigate = useNavigate();


// below we specify the image base url
const img_url = "https://cedric22a.alwaysdata.net/static/images/"


// create a function to help you fetch the products from your API
const fetchProducts = async () => {

  try{
    // update the loading hook
    setLoading(true);
    // interact with the endpoint for fetching the products
    const response = await axios.get("https://cedric22a.alwaysdata.net/api/get_products")

    // update the products hook with the response from the API
    setProducts(response.data);
    
    // set the loading hook to false after the response is received
    setLoading(false);
  }
  catch(error){
  // if there is an error, 
  // set the loading hook to false
   setLoading(false);

  //  update the error hook with the error message
    setError(error.message);
}
}

// We shall use the useEffect hook. This hook enables us to automatically re-render new features incase of any changes
useEffect(() => {
  fetchProducts()
}, [])




  return (
      <div className="getproducts-wrapper">

    <h2 className="getproducts-title">Available Gadgets</h2>

    {loading && <Loader />}
    {error && <h4 style={{ color: '#ff4757' }}>✗ {error}</h4>}

    <div className="row g-4">
      {products.map((product) => (
        <div key={product.id} className="col-md-3 col-sm-6">
          <div className="product-card">
            <img
              src={img_url + product.product_photo}
              alt={product.product_name}
            />
            <div className="product-card-body">
              <p className="product-card-name">{product.product_name}</p>
              <p className="product-card-desc">
                {product.product_description.slice(0, 61)}...
              </p>
              <p className="product-card-price">Kshs. {product.product_cost}</p>
              <button
                className="product-card-btn"
                onClick={() => navigate('/makepayment', { state: { product } })}
              >
                ⚡ Make Purchase
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

  </div>
  );
}

export default Getproducts;


