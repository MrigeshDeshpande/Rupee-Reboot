import React from "react";

const SummaryCard = ({ title, icon, data }) => {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    console.warn(
      `[SummaryCard] Skipped rendering "${title}" – invalid or missing data:`,
      data,
    );
    return null;
  }

  return (
    <div className="summary-card">
      <h4>
        {icon} {title}
      </h4>
      {Object.entries(data).map(([key, value]) => (
        <p className="summary-item" key={key}>
          {key}: ₹{value}
        </p>
      ))}
    </div>
  );
};

export default SummaryCard;
