import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./RegisterForm.css";
import { FaUser, FaLock, FaEnvelope, FaChevronDown } from "react-icons/fa"; // Importing icons for Username, Email, and Password.
import { registerUser } from "../AuthService";
import useAuth from "../../../hooks/useAuth";

const RegisterForm = ({ onBackToLoginClick }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");
  const navigate = useNavigate(); // Initialize navigate
  const { auth } = useAuth();

  useEffect(() => {
    if (auth?.user) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  const handleBackToLogin = (e) => {
    e.preventDefault(); // Prevent default anchor tag behavior
    onBackToLoginClick();
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const roleValue = role === "ADMIN" ? 1 : 0;
      const user = await registerUser({ username, name, surname, password, email, roleValue });
      navigate("");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleRegister}>
        <h1>Register</h1>

        {/* Username */}
        <div className="input-box">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <FaUser className="icon" />
        </div>

        {/* Name */}
        <div className="input-box">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <FaUser className="icon" />
        </div>

        {/* Surname */}
        <div className="input-box">
          <input type="text" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} required />
          <FaUser className="icon" />
        </div>

        {/* Email */}
        <div className="input-box">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <FaEnvelope className="icon" />
        </div>

        {/* Password */}
        <div className="input-box">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <FaLock className="icon" />
        </div>

        {/* Role */}
        <div className="input-box">
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <FaChevronDown className="icon" />
        </div>

        {/* Register Button */}
        <button type="submit">Register Account</button>

        {/* Already have an account? */}
        <div className="registration-link">
          <p>
            {" "}
            Already have an account?{" "}
            <a href="#" onClick={onBackToLoginClick}>
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
