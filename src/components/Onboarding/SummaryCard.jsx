import React from "react";
import "../../Styles/Summary.css";

const SummaryCard = ({ title, data, overrideTotal }) => {
  const isSimulated = overrideTotal !== undefined;

  const total = isSimulated
    ? overrideTotal
    : Object.values(data).reduce((sum, val) => sum + (Number(val) || 0), 0);

  return (
    <div className="summary-card">
      <div className="summary-card-header">
        <h3>{title}</h3>
        <span className="summary-card-total">₹{total.toLocaleString()}</span>
      </div>

      {isSimulated ? (
        <p className="simulated-note">Simulation mode active</p>
      ) : (
        <ul className="summary-card-list">
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <span>{key}</span>
              <span>₹{Number(value).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SummaryCard;
