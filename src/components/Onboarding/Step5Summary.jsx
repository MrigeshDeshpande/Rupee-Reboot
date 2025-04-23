import React, { useState, useMemo } from "react";
import DonutChart from "./DonutChart";
import SummaryCard from "./SummaryCard";
import SalaryCard from "./SalaryCard";
import SummaryFooter from "./SummaryFooter";
import WhatIfSliders from "../Simulation/WhatIfSliders";
import "../../Styles/Summary.css";

const Step5Summary = ({ formData }) => {
  const [simulateMode, setSimulateMode] = useState(false);
  const [simulatedValues, setSimulatedValues] = useState({
    fixed: 0,
    variable: 0,
    savings: 0,
    fixedExpenses: {},
    variableExpenses: {},
    savingsData: {},
  });

  // Memoized calculations
  const { totalFixed, totalVariable, totalSavings, totalOutflow, remaining } =
    useMemo(() => {
      const calculateTotal = (expenses) =>
        Object.values(expenses).reduce(
          (sum, val) => sum + (Number(val) || 0),
          0,
        );

      const fixed = calculateTotal(formData?.fixedExpenses || {});
      const variable = calculateTotal(formData?.variableExpenses || {});
      const savings = calculateTotal(formData?.savings || {});
      const outflow = fixed + variable + savings;
      const remaining = Math.max(0, (formData?.salary || 0) - outflow);

      return {
        totalFixed: fixed,
        totalVariable: variable,
        totalSavings: savings,
        totalOutflow: outflow,
        remaining,
      };
    }, [formData]);

  const categories = {
    fixed: { label: "Fixed", color: "#22c55e" },
    variable: { label: "Variable", color: "#3b82f6" },
    savings: { label: "Savings", color: "#f59e0b" },
  };

  const handleSimulate = () => {
 
    setSimulatedValues({
      fixed: totalFixed,
      variable: totalVariable,
      savings: totalSavings,
      fixedExpenses: { ...formData.fixedExpenses }, 
      variableExpenses: { ...formData.variableExpenses },
      savingsData: { ...formData.savings },
    });
  
    setSimulateMode(true);

  };
  

  const scaleSubcategories = (original, newTotal) => {
    const originalTotal = Object.values(original).reduce((sum, v) => sum + Number(v), 0);
    if (originalTotal === 0) return original; 
  
    const scaled = {};
    for (let key in original) {
      const ratio = Number(original[key]) / originalTotal;
      scaled[key] = Math.round(ratio * newTotal);
    }
    return scaled;
  };
  
  const handleSliderChange = (category, value) => {
    const baseKey = {
      fixed: "fixedExpenses",
      variable: "variableExpenses",
      savings: "savings",
    };
  
    const original = formData[baseKey[category]] || {};
    const scaled = scaleSubcategories(original, value);
  
    setSimulatedValues((prev) => {
      const updatedSavingsData = category === "savings" ? scaled : prev.savingsData; 
      return {
        ...prev,
        [category]: Number(value),
        [baseKey[category]]: scaled,
        savingsData: updatedSavingsData, 
        savings: Object.values(updatedSavingsData).reduce((sum, val) => sum + Number(val), 0),
      };
    });
  
  };
  
  
  const chartData = simulateMode
    ? [
        { name: "Fixed", value: simulatedValues.fixed },
        { name: "Variable", value: simulatedValues.variable },
        { name: "Savings", value: simulatedValues.savings },
        {
          name: "Remaining",
          value: Math.max(
            0,
            (formData?.salary || 0) -
              (simulatedValues.fixed +
                simulatedValues.variable +
                simulatedValues.savings),
          ),
        },
      ]
    : [
        { name: "Fixed", value: totalFixed },
        { name: "Variable", value: totalVariable },
        { name: "Savings", value: totalSavings },
        { name: "Remaining", value: remaining },
      ];

  return (
    <div className="summary-page">
      <div className="summary-container">
        <div className="summary-header">
          <h2>Your Financial Snapshot</h2>
          <p className="subheader">
            {simulateMode
              ? "Simulating changes to your budget"
              : "Here's your current financial plan"}
          </p>
        </div>

        <div className="summary-content two-column-layout">
          {/* LEFT SIDE: Donut chart + sliders */}
          <div className="left-column">
            <div className="chart-section">
              <DonutChart data={chartData} />
              {!simulateMode && (
                <button className="auth-btn" onClick={handleSimulate}>
                  Simulate Now
                </button>
              )}
            </div>

            {simulateMode && (
              <div className="sliders-section">
                <WhatIfSliders
                  values={simulatedValues}
                  categories={categories}
                  onChange={handleSliderChange}
                  onApply={() => setSimulateMode(false)}
                  onCancel={() => setSimulateMode(false)}
                  salary={formData?.salary || 0}
                  simulateMode={simulateMode}
                  simulatedValues={simulatedValues}
                  totalOutflow={
                    simulatedValues.fixed +
                    simulatedValues.variable +
                    simulatedValues.savings
                  }
                />
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Cards */}
          <div className="right-column">
            <SalaryCard salary={formData?.salary || 0} />

            <div className="cards-grid">
              <SummaryCard
                title="Fixed Expenses"
                data={simulateMode ? simulatedValues.fixedExpenses : formData?.fixedExpenses}
                overrideTotal={simulateMode ? simulatedValues.fixed : undefined}
                color={categories.fixed.color}
              />
              <SummaryCard
                title="Variable Expenses"
                data={
                  simulateMode
                    ? simulatedValues.variableExpenses
                    : formData?.variableExpenses || {}
                }
                overrideTotal={simulateMode ? simulatedValues.variable : undefined}
                color={categories.variable.color}
              />
              <SummaryCard
                title="Savings Goal"
                data={
                  simulateMode
                    ? simulatedValues.savingsData
                    : formData?.savings || {}
                }
                overrideTotal={simulateMode ? simulatedValues.savings : undefined}
                color={categories.savings.color}
              />
            </div>

            <SummaryFooter
              totalOutflow={
                simulateMode
                  ? simulatedValues.fixed +
                    simulatedValues.variable +
                    simulatedValues.savings
                  : totalOutflow
              }
              remaining={
                simulateMode
                  ? (formData?.salary || 0) -
                    (simulatedValues.fixed +
                      simulatedValues.variable +
                      simulatedValues.savings)
                  : remaining
              }
              salary={formData?.salary || 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5Summary;
