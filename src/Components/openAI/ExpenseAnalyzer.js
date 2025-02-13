import React, { useState } from "react";
import { analyzeExpense } from "../services/openAI";
import './ExpenseAnalyzer.css';  // Assuming you have custom styles here

const ExpenseAnalyzer = () => {
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [advice, setAdvice] = useState("");

    const handleAnalyze = async () => {
        if (!category || !amount) {
            alert("Enter category and amount");
            return;
        }

        const result = await analyzeExpense(category, amount);
        setAdvice(result);
    };

    return (
        <div className="expense-analyzer-wrapper">
            {/* Wrapper div for overall component */}
            
            <h2>Expense Analyzer</h2>

            <div className="input-group">
                <input
                    type="text"
                    placeholder="Category (e.g., food)"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>

            <div className="input-group">
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            <div className="button-group">
                <button onClick={handleAnalyze}>Analyze</button>
            </div>

            {advice && (
                <div className="advice-group">
                    <h3>Advice:</h3>
                    <p>{advice}</p>
                </div>
            )}
        </div>
    );
};

export default ExpenseAnalyzer;
