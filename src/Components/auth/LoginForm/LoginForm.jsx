// https://react-icons.github.io/react-icons/

import React from 'react'
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';

// LoginForm component definition
const LoginForm = ({ onRegisterClick }) => {
  return (
    <div className='wrapper'>

        {/* Start of the form */}
        <form action="">
          <h1>Login</h1>

          {/* Username Input */}
          <div className='input-box'>
            <input type='text' placeholder='Username' required />
            <FaUser className='icon'/>
          </div>

          {/* Password Input */}
          <div className='input-box'>
            <input type='password' placeholder='Password' required />
            <FaLock className='icon'/>
          </div>

          {/* Remember me checkbox */}
          <div className='remember-forgot'>
            <label><input type='checkbox'/>Remember me</label>
          </div>

          {/* Submit button for the form */}
          <button type='submit'>Log in</button>

          {/* Link to the registration page if the user doesn't have an account */}
          <div className='registration-link'>
            <p> Don't have an account? <a href='#' onClick={onRegisterClick}>Register</a></p>
          </div>
        </form>
    </div>
  )
};

export default LoginForm;