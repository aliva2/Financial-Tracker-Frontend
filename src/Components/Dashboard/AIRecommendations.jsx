import React, { useState } from "react";
import { analyzeExpense } from "../services/openAI"; // Import your AI service
import ExpenseAnalyzer from "../openAI/ExpenseAnalyzer"; // Go up one level from Dashboard to Components
 // Import the ExpenseAnalyzer component

const AIRecommendations = () => {
    // You can still keep any other logic or state that might be used for AI recommendations

    return (
        <div>
          
            {/* Use the ExpenseAnalyzer component here */}
            <ExpenseAnalyzer />
        </div>
    );
};

export default AIRecommendations;
