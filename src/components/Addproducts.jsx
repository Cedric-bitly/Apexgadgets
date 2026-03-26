import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';

const Addproducts = () => {

//  introduce the hooks
const [product_name, setProductname] = useState("");
const [product_description, setProductdescription] = useState("");
const [product_cost, setProductcost] = useState("");
const [product_photo, setProductphoto] = useState("");
const [product_category, setProductcategory] = useState("");
const [product_discount, setProductdiscount] = useState(0);

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
      formdata.append("product_category", product_category)
      formdata.append("product_discount", product_discount)
      // Also try alternative field name
      formdata.append("discount", product_discount)

      // Debug: Log what we're sending
      console.log("Sending form data:");
      console.log("product_name:", product_name);
      console.log("product_cost:", product_cost);
      console.log("product_category:", product_category);
      console.log("product_discount:", product_discount);
      console.log("Form data entries:");
      for (let [key, value] of formdata.entries()) {
        console.log(key, value);
      }

      //interact with axios
      const response = await axios.post("https://cedric22a.alwaysdata.net/api/add_product", formdata)
     
 
      // Debug: Log the response
      console.log("API Response:", response.data);

      //set the loading back to default
      setLoading(false)
 

      //update the success hook with a message
      setSuccess(response.data.message)
 

      //setting them back to default(clearing the hooks )
      setProductname("");
      setProductdescription("");
      setProductcost("");
      setProductphoto("");
      setProductcategory("");
      setProductdiscount("");

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
      console.log("Error:", error.response?.data || error.message);


    }
  }

  return (
    <div className="addproduct-wrapper">
      <div className="addproduct-box">

      <h3 className="addproduct-title">Add an Apex Gadget</h3>

      {loading && <Loader />}
      {success && <h5 style={{ color: '#2ed573', marginBottom: '1rem' }}>✓ {success}</h5>}
      {error   && <h5 style={{ color: '#ff4757', marginBottom: '1rem' }}>✗ {error}</h5>}

      <form onSubmit={handleSubmit}>
        <label className="addproduct-label">Gadget Name</label>
        <input
          type="text"
          className="addproduct-input"
          placeholder="Enter the gadget name"
          value={product_name}
          onChange={(e) => setProductname(e.target.value)}
          required
        />

        <label className="addproduct-label">Description</label>
        <input
          type="text"
          className="addproduct-input"
          placeholder="Enter the gadget description"
          value={product_description}
          onChange={(e) => setProductdescription(e.target.value)}
          required
        />

        <label className="addproduct-label">Cost (Kshs)</label>
        <input
          type="number"
          className="addproduct-input"
          placeholder="Enter the gadget cost"
          value={product_cost}
          onChange={(e) => setProductcost(e.target.value)}
          required
        />

        <label className="addproduct-label">Gadget Photo</label>
        <input
          type="file"
          className="addproduct-input"
          accept="image/*"
          onChange={(e) => setProductphoto(e.target.files[0])}
          required
        />

          <label className="addproduct-label">Gadget Category</label>
          <input
            type="text"
            className="addproduct-input"
            placeholder="Enter the gadget category"
            value={product_category}
            onChange={(e) => setProductcategory(e.target.value)}
            required
          />

            
          <label className="addproduct-label"> Gadget Discount (%)</label>
          <input
            type="number"
            className="addproduct-input"
            placeholder="Enter gadget discount e.g 10 for 10%"
            value={product_discount}
            onChange={(e) => setProductdiscount(e.target.value)}
            min="0"
            max="100"
          />

        <button type="submit" className="addproduct-btn">
          + Add Gadget to Catalogue
        </button>
      </form>

    </div>
  </div>
  )
}

export default Addproducts;
