import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';  // Import routing components
import LoginForm from './Components/auth/LoginForm/LoginForm';
import RegisterForm from './Components/auth/RegisterForm/RegisterForm';
import Dashboard from './Components/Dashboard/Dashboard';  


function App() {
    // State to toggle between LoginForm and RegisterForm
    const [isRegistering, setIsRegistering] = useState(false);

    // Function to handle showing the RegisterForm when "Register" link is clicked
    const handleRegisterClick = () => {
      setIsRegistering(true);
    };

    // Function to handle going back to LoginForm when user clicks "Back to Login"
    const handleBackToLoginClick = () => {
      setIsRegistering(false);
    };

    const isAuthenticated = !!localStorage.getItem('jwt'); // Check if user is authenticated

    return (
      <Router>  {/* This will wrap all the Routes */}
        <Routes>
          <Route path="/" element={!isRegistering ? <LoginForm onRegisterClick={handleRegisterClick} /> : <RegisterForm onBackToLoginClick={handleBackToLoginClick} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    );
}

export default App;
