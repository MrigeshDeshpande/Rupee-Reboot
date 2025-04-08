import React from "react";
import "../../Styles/Summary.css";

const Step5Summary = ({ formData, prevStep }) => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Here’s Your Snapshot 📊</h2>
        <p className="auth-subtitle">
          Review your details before we simulate your finances.
        </p>

        <div className="summary-section">
          <h4>Salary</h4>
          <p>₹ {formData.salary}</p>

          <h4>Fixed Expenses</h4>
          <ul>
            {Object.entries(formData.fixedExpenses || {}).map(
              ([key, value]) => (
                <li key={key}>
                  {key}: ₹ {value}
                </li>
              ),
            )}
          </ul>

          <h4>Variable Expenses</h4>
          <ul>
            {Object.entries(formData.variableExpenses || {}).map(
              ([key, value]) => (
                <li key={key}>
                  {key}: ₹ {value}
                </li>
              ),
            )}
          </ul>

          <h4>Savings</h4>
          <ul>
            {Object.entries(formData.savings || {}).map(([key, value]) => (
              <li key={key}>
                {key}: ₹ {value}
              </li>
            ))}
          </ul>
        </div>

        <div className="auth-btn-group spaced-buttons">
          <button
            type="button"
            className="auth-btn secondary"
            onClick={prevStep}
          >
            Back
          </button>
          <button type="button" className="auth-btn">
            Simulate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step5Summary;
