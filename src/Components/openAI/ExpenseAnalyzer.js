import React, { useState } from "react";
import { analyzeExpense } from "../services/openAI";

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
        <div>
            <h2>Expense Analyzer</h2>
            <input
                type="text"
                placeholder="Category (For example food)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleAnalyze}>Analyze</button>

            {advice && (
                <div>
                    <h3>Advice:</h3>
                    <p>{advice}</p>
                </div>
            )}
        </div>
    );
};

export default ExpenseAnalyzer;
