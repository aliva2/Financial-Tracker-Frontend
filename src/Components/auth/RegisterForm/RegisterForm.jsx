import React, { useState } from 'react';
import './RegisterForm.css';  
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa"; // Importing icons for Username, Email, and Password.
import axios from 'axios';


const RegisterForm = ({ onBackToLoginClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  
  const handleBackToLogin = (event) => {
    event.preventDefault();  // Prevent default anchor tag behavior
    onBackToLoginClick();
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log('Registering', { username, email, password });
    // Implement the API call here
  };


  return (
    <div className='wrapper'>
      <form onSubmit={handleRegister}>
        <h1>Register</h1>

        {/* Username */}
        <div className='input-box'>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <FaUser className='icon'/>
        </div>

        {/* Name */}
        <div className='input-box'>
        <input 
            type="text" 
            placeholder="Name" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <FaUser className='icon'/>
        </div>

        {/* Surname */}
        <div className='input-box'>
        <input 
            type="text" 
            placeholder="Surname" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <FaUser className='icon'/>
        </div>

        {/* Email */}
        <div className='input-box'>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <FaEnvelope className='icon'/>
        </div>

        {/* Password */}
        <div className='input-box'>
        <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <FaLock className='icon'/>
        </div>

        {/* Confirm Password */}
        <div className='input-box'>
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <FaLock className='icon'/>
        </div>

        {/* Role */}
        <div className='input-box'>
          <input 
            type="role" 
            placeholder="Role" 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            required 
          />
          <FaUser className='icon'/>
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
