import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Loader from './Loader';

const Makepayment = () => {

    // destructure the details passed from the Getproducts component
    // THE USEOCATION HOOK ALLOWS US TO GET/DESTRUCTURE THE PROPERTIRS PASSED FROM THE PREVIOUS COMPONENT.
    const {product} = useLocation().state || {}
    const navigate = useNavigate();

    // console.log("The products details are:", )
    const img_url = "https://cedric22a.alwaysdata.net/static/images/"

    // initialize hooks to manage the state of the application
    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
     

    // Create a function that will handle the submit action of the form
    const handleSubmit = async (e) =>{
        //  prevent the site from reloading
        e.preventDefault();

        // update the loading hook
        setLoading(true);

        try{
        //  create a form data
        const formdata = new FormData();

        // append the data
        formdata.append("phone", number);
        formdata.append("amount", product.product_cost)

        const response = await axios.post("https://cedric22a.alwaysdata.net/api/mpesa_payment", formdata)
        // set the loading back to default
        setLoading(false);

        // update the success hook with the a message
        setSuccess(response.data.message)
        }
        catch(error){
            // set the loading back to default
            setLoading(false);
            // update the error hook with the error message
            setError(error.response.data.message)
        }


    }

      // Safety check - if product doesn't exist, show loading or error
     if (!product) return (
      <div style={{ textAlign: 'center', marginTop: '3rem', color: '#00b8d9' }}>
        ⟳ Loading product details...
      </div>
    );

  return (
     <div className="payment-wrapper">

    <button className="payment-back" onClick={() => navigate('/getproducts')}>
      ← Back to Gadgets
    </button>

    <div className="payment-box">

      <h2 className="payment-title">Make Payment · M-Pesa</h2>

      {/* Product preview */}
      <div className="payment-preview">
        <img
          src={img_url + product.product_photo}
          alt={product.product_name}
          className="payment-preview-img"
        />
        <div>
          <p className="payment-product-name">{product.product_name}</p>
          <p className="payment-product-desc">{product.product_description}</p>
          <p className="payment-product-price">Kshs. {product.discountedPrice || product.product_cost}</p>
        </div>
      </div>

      {loading && <Loader />}
      {success && <h5 style={{ color: '#2ed573', marginBottom: '1rem' }}>✓ {success}</h5>}
      {error   && <h5 style={{ color: '#ff4757', marginBottom: '1rem' }}>✗ {error}</h5>}

      <form onSubmit={handleSubmit}>
        <label className="payment-label">M-Pesa Phone Number</label>
        <input
          type="number"
          className="payment-input"
          placeholder="254XXXXXXXXX"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />

        <button type="submit" className="payment-btn">
          ✓ Confirm Payment — Kshs. {product.product_cost}
        </button>
      </form>

    </div>
  </div>
   
  )
}

export default Makepayment;
