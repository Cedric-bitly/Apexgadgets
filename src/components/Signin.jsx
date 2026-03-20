import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {

  //  Define the two hooks for capturing/storing the users input.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Declare three addittional hooks
   const [loading, setLoading] = useState("");
   const [success, setSuccess] = useState("");
   const [error, setError] = useState("");

  //  below we have the useNavigate hook that will enable us to redirect the user to another page after successful login
  const navigate = useNavigate();

  // below is the function to handle the signin action
  const handleSubmit = async (e) =>{
    // prevent the site from reloading
    e.preventDefault()

    // update the loading hook with message
    setLoading("Please wait as we sign in to your account...")

    try{
    // Create a formdata object that will hold the email and the password
    const formdata = new FormData();

     // insert the two details(, email, password) in terms of key-value pairs
      formdata.append("email", email)
      formdata.append("password", password)

      // interact with axios for the response
      const response = await axios.post("https://cedric22a.alwaysdata.net/api/signin", formdata)

      // set the loading hook back to default
      setLoading("");

      // check whether the user exists as part of your response from the API
      if(response.data.user){
         localStorage.setItem("user", JSON.stringify(response.data.user));
         localStorage.setItem("token", response.data.token);

        // if the user exists, update the success hook with a message
         setSuccess("Login successful")
        // if it is successful, redirect the user to another page
        navigate("/getproducts");
      }
      else{
        setError("Login failed please try again")
      }
  }

  catch(error){
    // set the loading hook back to default
    setLoading("");

    // Update the error hook with a message
    setError("An error occurred while signing in. Please try again later.")
  }
  }

  
  return (
    <div className='row justify-content-center mt-4'>
         <div className="col-md-6 card shadow p-4">
           <h1 className='text-info'>Sign In</h1>

           <h5 className="text-info">{loading}</h5>
           <h3 className="text-success">{success}</h3>
           <h3 className="text-danger">{error}</h3>

         <form onSubmit={handleSubmit}>
           <input type="email" 
           placeholder='Enter your email address here'
           className='form-control'
           required
           value={email}
           onChange={(e) => setEmail(e.target.value)}/> <br />

           {/* {email} */}

           <input type="password"
           placeholder='Enter your password here'
           className='form-control'
           required
           value={password}
           onChange={(e) => setPassword(e.target.value)}/> <br />

           {/* {password} */}

           <input type="submit"
           value="Sign In" 
           className='btn btn-secondary'/> <br /><br />

            Don't have an account? <Link to={'/signup'}>Signup</Link>
         </form>
         </div>
    </div>
  )
}

export default Signin;




// How can you store the users details into the local storage