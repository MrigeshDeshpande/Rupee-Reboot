import React from "react";
import "../../Styles/Summary.css";

const SummaryFooter = ({ totalOutflow, remaining, salary }) => {
  const formattedOutflow = totalOutflow.toLocaleString();
  const isNegative = remaining <= 0;

  const formattedRemaining =
    remaining < 0
      ? `-${Math.abs(remaining).toLocaleString()}`
      : `${remaining.toLocaleString()}`;

  const spentPercentage = salary > 0 ? ((totalOutflow / salary) * 100) : 0;
  return (
    <div className={`summary-card summary-footer ${isNegative ? "warning" : ""}`}>
      <p className="orange">Total Outflow: ₹{formattedOutflow}</p>
      <p className={isNegative ? "red" : "green"}>Remaining: ₹{formattedRemaining}</p>
      {salary > 0 && (
        <p className="green">Salary: ₹{salary.toLocaleString()}</p>
      )}

      {/* Progress Bar */}
      {salary > 0 && (
        <div className="progress-bar-container">
          <div className="progress-labels">
            <span>Spent</span>
            <span>Remaining</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${spentPercentage}%`,
                backgroundColor: isNegative ? "#dc2626" : "#22c55e",
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryFooter;