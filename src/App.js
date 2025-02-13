import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./Components/auth/LoginForm/LoginForm";
import RegisterForm from "./Components/auth/RegisterForm/RegisterForm";
import Dashboard from "./Components/Dashboard/Dashboard";
import Settings from "./Components/Dashboard/Settings";
import ExpenseAnalyzer from "./Components/openAI/ExpenseAnalyzer";

function App() {
  const [isRegistering, setIsRegistering] = useState(false);

    const handleRegisterClick = () => setIsRegistering(true);
    const handleBackToLoginClick = () => setIsRegistering(false);

    const isAuthenticated = !!localStorage.getItem("jwt");

    return (
        <Router>
            <Routes>
                <Route
                    path="/dashboard"
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
                />
                <Route
                    path="/settings"
                    element={isAuthenticated ? <Settings /> : <Navigate to="/" />}
                />
                <Route
                    path="/expense-analyzer"
                    element={isAuthenticated ? <ExpenseAnalyzer /> : <Navigate to="/" />}
                />
            </Routes>
        </Router>
    );
}

export default App;
