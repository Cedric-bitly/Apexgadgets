import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useState } from 'react'

const Signup = () => {
  // initialize the hooks
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");

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

      // clear your hooks
      setUsername("");
      setEmail("");
      setPassword("");
      setTel("");
    }
    catch(error){
      // set the loading hook back to default
      setLoading("");

      // update the error hook with the maessage given back from the response
      setError(error.message)
    }

  }





  return (
    <div className='row justify-content-center mt-4'>
      <div className="card col-md-6 shadow p-4">
        <h1 className='text-primary '>Sign Up</h1>

        <h5 className="text-warning"> {loading}</h5>
        <h3 className="text-success">{success}</h3>
        <h4 className="text-danger">{error}</h4>

        <form onSubmit={handleSubmit}>


          <input type="text"
          placeholder='Enter the Username'
          className='form-control'
          value={username}
          onChange={(e => setUsername(e.target.value))}
          required/> <br />

          {/* {username} */}

          <input type="email"
          placeholder='Enter the Email address'
          className='form-control'
          value={email}
          onChange={(e => setEmail(e.target.value))}
          required /> <br />

          {/* {email} */}

          <input type="password"
          placeholder='Enter the password'
          className='form-control'
          value={password}
          onChange={(e => setPassword(e.target.value))}
          required /> <br />

          {/* {password} */}

          <input type="tel"
          placeholder='Enter your mobile phone number'
          className='form-control'
          value={tel}
          onChange={(e => setTel(e.target.value))}
          required /> <br />
          {/* minLength={10}  */}

          {/* {tel.length > 0 && tel.length < 10 && <span className='text-danger'>Phone number must be at least 10 digits</span>} */}

          {/* {tel} */}

          <input type="submit" value="Signup" className='btn-primary'/>
          <br /> <br />

          Already have an account? <Link to={'/signin'}>Signin</Link>
        </form>
      </div>
    </div>
  )
}

export default Signup;

// Research on AXIOS module in reactjs.
// Axios is a library that allows you to make HTTP requests (GET, POST, PUT, DELETE, etc.) to external APIs or your backend server. It works in both browsers and Node.js environments.