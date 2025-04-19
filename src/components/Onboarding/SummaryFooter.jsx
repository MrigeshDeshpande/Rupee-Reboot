import React from "react";
import "../../Styles/Summary.css"

const SummaryFooter = ({ totalOutflow, remaining }) => {
  const formattedOutflow = totalOutflow.toLocaleString();
  const isNegative = remaining <= 0;

const formattedRemaining = remaining < 0
  ? `-${Math.abs(remaining).toLocaleString()}`
  : `${remaining.toLocaleString()}`;

  console.log("Remaining:", remaining, "isNegative:", isNegative);

  return (
<div className={`summary-card summary-footer ${isNegative ? "warning" : ""}`}>
    <p className="green">Total Outflow: ₹{formattedOutflow}</p>
      <p className={isNegative ? "red" : "green"}>
         Remaining: ₹{formattedRemaining}
      </p>
    </div>
  );
};

export default SummaryFooter;
