import React, { useState, useMemo } from "react";
import DonutChart from "./DonutChart";
import SummaryCard from "./SummaryCard";
import SalaryCard from "./SalaryCard";
import SummaryFooter from "./SummaryFooter";
import WhatIfSliders from "../Simulation/WhatIfSliders";
import {
  calculateTotals,
  scaleExpenses,
} from "../../domain/financeEngine";
import "../../Styles/Summary.css";

/**
 * Final summary screen (Step 5) showing budget breakdown with donut chart,
 * category cards, salary info and "what-if" simulation mode.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.formData - Complete form data collected from previous steps
 * @param {number} props.formData.income - Monthly net income/salary
 * @param {Object} props.formData.fixedExpenses - Object of {category: amount} for fixed expenses
 * @param {Object} props.formData.variableExpenses - Object of {category: amount} for variable expenses
 * @param {Object} props.formData.savings - Object of {category: amount} for savings/investments
 * @returns {JSX.Element} Summary dashboard with visualization and simulation controls
 */
const Step5Summary = ({ formData }) => {
  const [simulateMode, setSimulateMode] = useState(false);

  /**
   * Stores current simulated values when user is in "what-if" mode
   * @type {Object}
   */
  const [simulatedValues, setSimulatedValues] = useState({
    fixed: 0,
    variable: 0,
    savings: 0,
    fixedExpenses: {},
    variableExpenses: {},
    savingsData: {},
  });

  /**
   * Calculates real (non-simulated) totals from form data
   * Memoized to prevent unnecessary recalculations
   */
  const {
    income,
    fixed,
    variable,
    savings,
    totalOutflow,
    remaining,
  } = useMemo(() => calculateTotals(formData), [formData]);

  /** Category metadata for consistent styling and labeling across components */
  const categories = {
    fixed: { label: "Fixed", color: "#22c55e" },
    variable: { label: "Variable", color: "#3b82f6" },
    savings: { label: "Savings", color: "#f59e0b" },
  };

  /**
   * Activates simulation mode and initializes simulated values with current plan
   */
  const handleSimulate = () => {
    setSimulatedValues({
      fixed,
      variable,
      savings,
      fixedExpenses: { ...formData.fixedExpenses },
      variableExpenses: { ...formData.variableExpenses },
      savingsData: { ...formData.savings },
    });
    setSimulateMode(true);
  };

  /**
   * Handles changes from WhatIfSliders and updates simulated totals & breakdown
   *
   * @param {"fixed" | "variable" | "savings"} category - Which budget category is being adjusted
   * @param {number|string} value - New target total for the category (from slider)
   */
  const handleSliderChange = (category, value) => {
    const keyMap = {
      fixed: "fixedExpenses",
      variable: "variableExpenses",
      savings: "savings",
    };

    const baseKey = keyMap[category];
    const original = simulateMode
      ? simulatedValues[baseKey] || {}
      : formData[baseKey] || {};

    const scaled = scaleExpenses(original, value);

    setSimulatedValues((prev) => {
      if (category === "savings") {
        return {
          ...prev,
          savings: Number(value),
          savingsData: scaled,
        };
      }

      return {
        ...prev,
        [category]: Number(value),
        [baseKey]: scaled,
      };
    });
  };

  /**
   * Data prepared for the DonutChart component.
   * Switches between real values and simulated values depending on mode.
   */
  const chartData = useMemo(() => {
    if (!simulateMode) {
      return [
        { name: "Fixed", value: fixed },
        { name: "Variable", value: variable },
        { name: "Savings", value: savings },
        { name: "Remaining", value: remaining },
      ];
    }

    const used =
      simulatedValues.fixed +
      simulatedValues.variable +
      simulatedValues.savings;

    return [
      { name: "Fixed", value: simulatedValues.fixed },
      { name: "Variable", value: simulatedValues.variable },
      { name: "Savings", value: simulatedValues.savings },
      { name: "Remaining", value: Math.max(0, income - used) },
    ];
  }, [
    simulateMode,
    fixed,
    variable,
    savings,
    remaining,
    simulatedValues,
    income,
  ]);

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
          {/* LEFT SIDE – Chart + Simulation Controls */}
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
              <WhatIfSliders
                values={simulatedValues}
                categories={categories}
                onChange={handleSliderChange}
                onApply={() => setSimulateMode(false)}
                onCancel={() => setSimulateMode(false)}
                salary={income}
                simulateMode={simulateMode}
                simulatedValues={simulatedValues}
                totalOutflow={
                  simulatedValues.fixed +
                  simulatedValues.variable +
                  simulatedValues.savings
                }
              />
            )}
          </div>

          {/* RIGHT SIDE – Salary + Breakdown Cards + Footer */}
          <div className="right-column">
            <SalaryCard salary={income} />

            <div className="cards-grid">
              <SummaryCard
                title="Fixed Expenses"
                data={
                  simulateMode
                    ? simulatedValues.fixedExpenses
                    : formData.fixedExpenses
                }
                overrideTotal={simulateMode ? simulatedValues.fixed : undefined}
                color={categories.fixed.color}
              />

              <SummaryCard
                title="Variable Expenses"
                data={
                  simulateMode
                    ? simulatedValues.variableExpenses
                    : formData.variableExpenses
                }
                overrideTotal={
                  simulateMode ? simulatedValues.variable : undefined
                }
                color={categories.variable.color}
              />

              <SummaryCard
                title="Savings Goal"
                data={
                  simulateMode
                    ? simulatedValues.savingsData
                    : formData.savings
                }
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
                  ? income -
                    (simulatedValues.fixed +
                      simulatedValues.variable +
                      simulatedValues.savings)
                  : remaining
              }
              salary={income}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5Summary;