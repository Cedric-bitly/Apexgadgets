import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  // initialize the hooks
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");

  const navigate = useNavigate();

  // Define the three states an application will move to
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  //Below is a function that will handle the submit action  
  const handleSubmit = async(e) =>{
    // Below we prevent our site from reloading
    e.preventDefault()

    // update our loading hook with a message that will be displayed to the users who are trying to register
    setLoading("Please wait as the registration is in progress...")

    try{
      // create a form data object that will enable you to capture the four details entered on the form
      const formdata = new FormData();

      // insert the four details(username, email, password, phone) in terms of key-value pairs
      formdata.append("username", username)
      formdata.append("email", email)
      formdata.append("password", password)
      formdata.append("phone", tel)

      // by use of axios we can access the method POST
      const response =await axios.post("https://cedric22a.alwaysdata.net/api/signup", formdata)

      // setback the loading  to default
      setLoading("");

      // just in case everything goes on well update the success hook with a message
      setSuccess(response.data.message);

      setTimeout(() => {
        navigate('/getproducts');
      }, 2000);

      // clear your hooks
      setUsername("");
      setEmail("");
      setPassword("");
      setTel("");

       setTimeout(() => {
        setSuccess("");
      }, 3000);

    }
    catch(error){
      // set the loading hook back to default
      setLoading("");

      // update the error hook with the maessage given back from the response
      setError(error.message)
    }

  }





  return (
      <div className="signup-wrapper">
    <div className="signup-box">

      {loading && <h5 style={{ color: '#00b8d9', marginBottom: '1rem' }}>⟳ {loading}</h5>}
      {success && <h5 style={{ color: '#2ed573', marginBottom: '1rem' }}>✓ {success}</h5>}
      {error   && <h5 style={{ color: '#ff4757', marginBottom: '1rem' }}>✗ {error}</h5>}

      <h1 className="signup-title">Create Account</h1>
      <p className="signup-subtitle">// join the apex network</p>

      <form onSubmit={handleSubmit}>
        <label className="signup-label">Username</label>
        <input
          type="text"
          className="signup-input"
          placeholder="apex_user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label className="signup-label">Email Address</label>
        <input
          type="email"
          className="signup-input"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="signup-label">Password</label>
        <input
          type="password"
          className="signup-input"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className="signup-label">Phone Number</label>
        <input
          type="tel"
          className="signup-input"
          placeholder="254XXXXXXXXX"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          required
        />

        <button type="submit" className="signup-btn">
          → Create Account
        </button>
      </form>

      <p className="signup-link">
        Already have an account? <Link to="/signin">Sign In →</Link>
      </p>

    </div>
  </div>
  )
}

export default Signup;

// Research on AXIOS module in reactjs.
// Axios is a library that allows you to make HTTP requests (GET, POST, PUT, DELETE, etc.) to external APIs or your backend server. It works in both browsers and Node.js environments.