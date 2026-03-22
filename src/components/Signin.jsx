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
      <div className="signin-wrapper">
    <div className="signin-box">

      {loading && <h5 style={{ color: '#00b8d9', marginBottom: '1rem' }}>⟳ {loading}</h5>}
      {success && <h5 style={{ color: '#2ed573', marginBottom: '1rem' }}>✓ {success}</h5>}
      {error   && <h5 style={{ color: '#ff4757', marginBottom: '1rem' }}>✗ {error}</h5>}

      <h1 className="signin-title">Sign In</h1>
      <p className="signin-subtitle">// access your apex account</p>

      <form onSubmit={handleSubmit}>
        <label className="signin-label">Email Address</label>
        <input
          type="email"
          className="signin-input"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="signin-label">Password</label>
        <input
          type="password"
          className="signin-input"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="signin-btn">
          → Sign In
        </button>
      </form>

      <p className="signin-link">
        No account? <Link to="/signup">Create one →</Link>
      </p>

    </div>
  </div>
  )
}

export default Signin;




// How can you store the users details into the local storage