import React from "react";
import "../../Styles/whatif.css";

const WhatIfSliders = ({
  values,
  categories,
  onChange,
  onApply,
  onCancel,
  salary,
}) => {
  const totalAllocated = Object.values(values).reduce(
    (sum, val) => sum + val,
    0,
  );
  const remaining = salary - totalAllocated;
  const isOverBudget = remaining < 0;

  return (
    <div className="simulation-panel">
      <div className="simulation-header">
        <h3>Budget Simulation</h3>
        <p>Adjust sliders to explore different financial scenarios</p>
      </div>

      <div className="simulation-status">
        <div className="status-item">
          <span>Total Allocated:</span>
          <span>₹{totalAllocated.toLocaleString()}</span>
        </div>
        <div className={`status-item ${isOverBudget ? "warning" : "success"}`}>
          <span>Remaining:</span>
          <span>₹{Math.abs(remaining).toLocaleString()}</span>
          {isOverBudget && <span className="warning-badge">OVER BUDGET</span>}
        </div>
      </div>

      <div className="sliders-container">
        {Object.keys(categories).map((key) => (
          <div className="slider-group" key={key}>
            <div className="slider-header">
              <span className="slider-icon">{categories[key].icon}</span>
              <span className="slider-title">{categories[key].label}</span>
              <span className="slider-value" data-value={values[key]}>
                ₹{values[key].toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={salary}
              step={salary > 50000 ? 1000 : 500}
              value={values[key]}
              style={{
                "--track-color": categories[key].color,
              }}
              onChange={(e) => onChange(key, e.target.value)}
              className="custom-slider"
            />
            <div className="slider-limits">
              <span>₹0</span>
              <span>₹{salary.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="simulation-actions">
        <button className="auth-btn" onClick={onCancel}>
          Discard Changes
        </button>
        <button className="auth-btn" onClick={onApply} disabled={isOverBudget}>
          {isOverBudget ? "Fix Over Budget" : "Apply Changes"}
        </button>
      </div>
    </div>
  );
};

export default WhatIfSliders;
