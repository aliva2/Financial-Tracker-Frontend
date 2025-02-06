import React, { useState } from 'react';
import LoginForm from './Components/auth/LoginForm/LoginForm';
import RegisterForm from './Components/auth/RegisterForm/RegisterForm';

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

    return (
      <div>
      {/* If isRegistering is true, show RegisterForm, else show LoginForm */}
      {!isRegistering ? (
          <LoginForm onRegisterClick={handleRegisterClick} />
      ) : (
          <RegisterForm onBackToLoginClick={handleBackToLoginClick} />
      )}
  </div>
    );
}

export default App;
