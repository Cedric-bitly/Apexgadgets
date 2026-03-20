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
    <div className='row'>
      <h2 className='text-tertiary'>Available Gadgets</h2>

      {loading && <Loader/> }
      <h4 className='text-danger'> {error} </h4>

     {/* map the products fetched from the API to the user interface */}

     {products.map((product) => (
         <div className='col-md-3 justify-content-center mb-3'>
        <div className="card shadow">
          <img src={img_url + product.product_photo}
           alt="product name" 
           className='product_img mt-3'/>

          <div className="card-body">
            <h5 className='text-primary'> {product.product_name} </h5>

            <p className='text-dark'> {product.product_description.slice(0, 61)}... </p>

            <h4 className='text-warning'>Kshs. {product.product_cost} </h4>


            <button className="btn btn-outline-info" onClick={() => navigate('/makepayment', { state: { product } })}>Make Purchase</button>


          </div>
        </div>
      </div>
     ) )}

    </div>
  )
}

export default Getproducts;


