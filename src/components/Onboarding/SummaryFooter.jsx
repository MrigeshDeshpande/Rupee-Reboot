import React from "react";

const SummaryFooter = ({ totalOutflow, remaining }) => (
  <div className="summary-card summary-footer">
    <p className="green">Total Outflow: ₹{totalOutflow}</p>
    <p className={remaining < 0 ? "red" : "green"}>Remaining: ₹{remaining}</p>
  </div>
);

export default SummaryFooter;
