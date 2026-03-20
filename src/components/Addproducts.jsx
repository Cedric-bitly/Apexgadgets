import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';

const Addproducts = () => {

//  introduce the hooks
const [product_name, setProductname] = useState("");
const [product_description, setProductdescription] = useState("");
const [product_cost, setProductcost] = useState("");
const [product_photo, setProductphoto] = useState("");

 //  declare the dditional hook to manage the loading state of the application
 

  // declare the three additional hooks to manage the application
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
 

  //create a function that will handle the submit function
  const handleSubmit = async (e) =>{
    //prevent the site from reloading
    e.preventDefault()
 

    //setloading hook with a message( activate it)
    setLoading(true)
 
       try{
      //create form data
      const formdata = new FormData()
 

      //append the details entered in the new form data
      formdata.append("product_name", product_name)
      formdata.append("product_description", product_description)
      formdata.append("product_cost", product_cost)
      formdata.append("product_photo", product_photo)
 

      //interact with axios
      const response = await axios.post("https://cedric22a.alwaysdata.net/api/add_product", formdata)
     
 

      //set the loading back to default
      setLoading(false)
 

      //update the success hook with a message
      setSuccess(response.data.message)
 

      //setting them back to default(clearing the hooks )
      setProductname("");
      setProductdescription("");
      setProductcost("");
      setProductphoto("");

      e.target.reset()

      setTimeout(() => {
        setSuccess("");
      }, 5000);

    }
    catch(error){
      //set the loading hook back to default
      setLoading(false)
 

      // update the error hook with message
      setError(error.message)
 

    }
  }

  return (
    <div className='row justify-content-center mt-4'>
      <div className="card col-md-6 shadow p-4">
        <h3 className='text-primary '>Add an Apex Gadget</h3>
         <h5 className="text-info">{loading}</h5>
         <h3 className='text-success'>{success}</h3>
         <h4 className="text-danger">{error}</h4>
 

        {/* //bind the loading hooks */}
        {loading && <Loader/>}

        <form onSubmit={handleSubmit}>
          <input type="text" 
          placeholder='Enter the Gadget name'
          className='form-control'
          required
          value={product_name}
          onChange={(e) => setProductname(e.target.value)}/> <br />

          {/* {product_name} */}

          <input type="text" 
          placeholder='Enter the Gadget description'
          className='form-control'
          required
          value={product_description}
          onChange={(e) => setProductdescription(e.target.value)}/> <br />

          {/* {product_description} */}

          <input type="number"
          placeholder='Enter the Gadget cost'
          className='form-control'
          required
          value={product_cost}
          onChange={(e) => setProductcost(e.target.value)}/> <br />

          {/* {product_cost} */}

          <label className='text-tertiary'>Gadget photo</label>
          <input type="file" 
          className='form-control'
          required
          accept='image/*'
          onChange={(e) => setProductphoto(e.target.files[0])}/> <br />

        

          <input type="submit" 
          value="Add Gadget to Cart" 
          className='btn btn-outline-primary'
          />
        </form>
      </div>
    </div>
  )
}

export default Addproducts;
