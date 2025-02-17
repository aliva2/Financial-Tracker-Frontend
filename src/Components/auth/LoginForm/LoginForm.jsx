// https://react-icons.github.io/react-icons/

import React, { useContext, useState, useEffect } from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

import axios from "../../../api/axios";

const LOGIN_URL = "/auth/login";

// LoginForm
const LoginForm = ({ onRegisterClick }) => {
  const { setAuth } = useAuth();
  const { auth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    if (auth?.user) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ username, password }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(JSON.stringify(response.data));
      const accessToken = response.data.accessToken;
      const user = username;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", user);

      setAuth({ user: username, accessToken });
      setUsername("");
      setPassword("");
      navigate("/dashboard");
    } catch (err) {
      // Extract error message
      const errorMessage = err.response?.data?.message || "Invalid username or password"; // Fallback error message

      setError(errorMessage); // Display error to the user
    }
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
    </div>
  );
};

export default LoginForm;
