import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeExpense } from "../services/openAI";
import './ExpenseAnalyzer.css';  // Assuming you have custom styles here

const ExpenseAnalyzer = () => {
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [advice, setAdvice] = useState("");

    const navigate = useNavigate();

    const handleAnalyze = async () => {
        if (!category || !amount) {
            alert("Enter category and amount");
            return;
        }

        setAdvice("Analyzing...");

        const result = await analyzeExpense(category, amount);
        setAdvice(result);
    };

    return (
        <div style={styles.container} className="expense-analyzer-wrapper">
            {/* Wrapper div for overall component */}
            
            <h2 style={styles.title}>Expense Analyzer</h2>

            <div className="input-group">
                <input
                    type="text"
                    placeholder="Category (e.g.,: Food)"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={styles.input}
            />
            </div>

            <div className="input-group">
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={styles.input}
            />
            </div>

            <div className="button-group">
                <button onClick={handleAnalyze} style={styles.button}>
                Analyze
            </button>
            </div>

            {advice && (
                <div className="advice-group" style={styles.adviceBox}>
                    <h3>Advice:</h3>
                    <p style={styles.adviceText}>{advice}</p>
                </div>
            )}

            <button onClick={() => navigate("/dashboard")} style={styles.backButton}>
                Back to Dashboard
            </button>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        background: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    title: {
        color: "#333",
        marginBottom: "10px",
    },
    input: {
        width: "90%",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        color: "#fff",
        background: "#007bff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background 0.3s",
        marginRight: "10px",
    },
    backButton: {
        padding: "10px 20px",
        fontSize: "16px",
        color: "#fff",
        background: "#6c757d",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background 0.3s",
        marginTop: "10px",
    },
    adviceBox: {
        marginTop: "20px",
        padding: "15px",
        background: "#e3f2fd",
        borderLeft: "5px solid #007bff",
        borderRadius: "5px",
        textAlign: "left",
    },
    adviceText: {
        fontSize: "16px",
        color: "#333",
        lineHeight: "1.5",
    },
};

export default ExpenseAnalyzer;
