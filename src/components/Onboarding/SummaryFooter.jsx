import React from "react";

const SummaryFooter = ({ totalOutflow, remaining }) => {
  const formattedOutflow = totalOutflow.toLocaleString();
  const formattedRemaining = remaining.toLocaleString();
  const isNegative = remaining < 0;

  return (
    <div className="summary-card summary-footer">
      <p className="green">
        💸 Total Outflow: ₹{formattedOutflow}
      </p>
      <p className={isNegative ? "red" : "green"}>
        {isNegative ? "⚠️" : "💰"} Remaining: ₹{formattedRemaining}
      </p>
    </div>
  );
};

export default SummaryFooter;
