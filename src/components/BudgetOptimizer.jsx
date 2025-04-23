import React from "react";

const BudgetOptimizer = ({ salary, onOptimize }) => {
  if (salary <= 0) return null; 
  
  const handleFixBudget = () => {
  
    const idealBudget = {
      fixed: salary * 0.5,
      variable: salary * 0.3,
      savings: salary * 0.2,
    };
  
    onOptimize(idealBudget);
  };

  return (
    <button className="auth-btn optimize-budget" onClick={handleFixBudget}>
      Fix Over Budget
    </button>
  );
};

export default BudgetOptimizer;