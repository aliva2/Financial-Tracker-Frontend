import React from 'react';
import './RegisterForm.css';  
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa"; // Importing icons for Username, Email, and Password.

const RegisterForm = ({ onBackToLoginClick }) => {
  const handleBackToLogin = (event) => {
      event.preventDefault();  // Prevent default anchor tag behavior
      onBackToLoginClick();
  };

  return (
    <div className='wrapper'>
      <form action="">
        <h1>Register</h1>

        {/* Username */}
        <div className='input-box'>
          <input type='text' placeholder='Username' required />
          <FaUser className='icon'/>
        </div>

        {/* Name */}
        <div className='input-box'>
          <input type='text' placeholder='Name' required />
          <FaUser className='icon'/>
        </div>

        {/* Surname */}
        <div className='input-box'>
          <input type='text' placeholder='Surname' required />
          <FaUser className='icon'/>
        </div>

        {/* Email */}
        <div className='input-box'>
          <input type='email' placeholder='Email' required />
          <FaEnvelope className='icon'/>
        </div>

        {/* Password */}
        <div className='input-box'>
          <input type='password' placeholder='Password' required />
          <FaLock className='icon'/>
        </div>

        {/* Confirm Password */}
        <div className='input-box'>
          <input type='password' placeholder='Confirm Password' required />
          <FaLock className='icon'/>
        </div>

        {/* Register Button */}
        <button type='submit'>Register Account</button>

        {/* Already have an account? */}
        <div className='registration-link'>
          <p> Already have an account? <a href='#' onClick={onBackToLoginClick}>Login</a></p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
