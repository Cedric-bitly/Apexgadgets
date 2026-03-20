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

        const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/mpesa_payment", formdata)
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
      if (!product) {
       return <div className="text-center mt-5"><h3>Loading product details...</h3></div>;
    }

  return (
    <div className='row justify-content-center'>
        {/* <Button className='btn btn-primary '>Back to Products</Button> */}

        <h1 className='text-success'>Make Payment - Lipa Na M-Pesa</h1>   

          <div className="col-md-1">
            <input type="button"
            className="btn btn-success"
            value="<--Back"
            onClick={() => navigate("/getproducts")} />
        </div> 

        <div className='col-md-6 card shadow p-4'>
          <img src={img_url + product.product_photo} alt="Product name" className='product_img'/>

          <div className="cardbody">
              <h2 className='text-info'> {product.product_name} </h2>


              <p className="text-dark"> {product.product_description} </p>

              <h3 className="text-warning">Kshs. {product.product_cost}</h3> <br />

              <form onSubmit={handleSubmit}>

                  {/* bind the loading hook */}
            {loading && <Loader />}
            <h3 className="text-success"> {success} </h3>
            <h4 className="text-danger"> {error} </h4>
                 
                <input type="number"
                className='form-control'
                placeholder='Enter your Phone Number : 254XXXXXXXXX'
                required
                value={number}
                onChange={(e) => setNumber(e.target.value)} /> <br />

                {/* {number} */}
                
                <input type="submit" 
                value="Makepayment"
                className='btn btn-success'/>
              </form>
          </div>
        </div>
    </div>
  )
}

export default Makepayment;
