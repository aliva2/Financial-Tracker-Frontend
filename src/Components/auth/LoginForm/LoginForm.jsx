// https://react-icons.github.io/react-icons/

import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// LoginForm
const LoginForm = ({ onRegisterClick }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });
      localStorage.setItem("jwt", response.data.accessToken); // Save JWT token in local storage
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    }
  };
  // Handle "MockTry" button click: Redirect to the dashboard directly
  const handleMockTry = () => {
    navigate("/dashboard"); // Simulate a successful login and navigate to dashboard
  };

  return (
    <div className="wrapper">
      {/* Start of the form */}
      <form onSubmit={handleLogin}>
        <h1>Login</h1>

        {/* Username Input */}
        <div className="input-box">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <FaUser className="icon" />
        </div>

        {/* Password Input */}
        <div className="input-box">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <FaLock className="icon" />
        </div>

        {/* Remember me checkbox */}
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
        </div>

        {error && <p className="error">{error}</p>}

        {/* Submit button for the form */}
        <button type="submit">Log in</button>

        {/* Link to the registration page if the user doesn't have an account */}
        <div className="registration-link">
          <p>
            {" "}
            Don't have an account?{" "}
            <a href="#" onClick={onRegisterClick}>
              Register
            </a>
          </p>
        </div>
      </form>

      {/* MockTry Button - delete later*/}
      <button onClick={handleMockTry}>MockTry (Go to Dashboard)</button>
    </div>
  );
};

export default LoginForm;
