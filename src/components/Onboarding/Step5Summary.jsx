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
    fixed: { label: "Fixed", icon: "🏠", color: "#22c55e" },
    variable: { label: "Variable", icon: "🛍️", color: "#3b82f6" },
    savings: { label: "Savings", icon: "💰", color: "#f59e0b" },
  };

  const handleSimulate = () => {
    setSimulatedValues({
      fixed: totalFixed,
      variable: totalVariable,
      savings: totalSavings,
    });
    setSimulateMode(true);
  };

  const handleSliderChange = (category, value) => {
    setSimulatedValues((prev) => ({
      ...prev,
      [category]: Number(value),
    }));
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
                  🧮 Simulate Changes
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
                icon={categories.fixed.icon}
                data={formData?.fixedExpenses || {}}
                overrideTotal={simulateMode ? simulatedValues.fixed : undefined}
                color={categories.fixed.color}
              />
              <SummaryCard
                title="Variable Expenses"
                icon={categories.variable.icon}
                data={formData?.variableExpenses || {}}
                overrideTotal={
                  simulateMode ? simulatedValues.variable : undefined
                }
                color={categories.variable.color}
              />
              <SummaryCard
                title="Savings Goal"
                icon={categories.savings.icon}
                data={formData?.savings || {}}
                overrideTotal={
                  simulateMode ? simulatedValues.savings : undefined
                }
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
                  ? Math.max(
                      0,
                      (formData?.salary || 0) -
                        (simulatedValues.fixed +
                          simulatedValues.variable +
                          simulatedValues.savings),
                    )
                  : remaining
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5Summary;
