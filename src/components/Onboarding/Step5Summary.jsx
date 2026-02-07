import React, { useState, useMemo } from "react";
import DonutChart from "./DonutChart";
import SummaryCard from "./SummaryCard";
import SalaryCard from "./SalaryCard";
import SummaryFooter from "./SummaryFooter";
import WhatIfSliders from "../Simulation/WhatIfSliders";

import {
  calculateTotals,
  scaleExpenses,
} from "../../domain/financeSelectors";

import {
  runStressTest,
  evaluatePlanFragility,
} from "../../domain/financeEngine";

import "../../Styles/Summary.css";

const Step5Summary = ({ formData }) => {
  const [simulateMode, setSimulateMode] = useState(false);

  /* -------------------- ENGINE TRUTH -------------------- */

  const fragilityResult = useMemo(() => {
    return evaluatePlanFragility({
      monthlyIncome: formData.income,
      fixedExpenses: formData.fixedExpenses,
      variableExpenses: formData.variableExpenses,
      emergencyFund: formData.emergencyFund,
    });
  }, [formData]);

  const stressResult = useMemo(() => {
    return runStressTest(
      {
        monthlyIncome: formData.income,
        fixedExpenses: formData.fixedExpenses,
        variableExpenses: formData.variableExpenses,
        emergencyFund: formData.emergencyFund,
      },
      20,
      40
    );
  }, [formData]);

  /* -------------------- UI TOTALS -------------------- */

  const {
    income,
    fixed,
    variable,
    savings,
    totalOutflow,
    remaining,
  } = useMemo(() => calculateTotals(formData), [formData]);

  /* -------------------- SIMULATION STATE -------------------- */

  const [simulatedValues, setSimulatedValues] = useState({
    fixed: 0,
    variable: 0,
    savings: 0,
    fixedExpenses: {},
    variableExpenses: {},
    savingsData: {},
  });

  const categories = {
    fixed: { label: "Fixed", color: "#22c55e" },
    variable: { label: "Variable", color: "#3b82f6" },
    savings: { label: "Savings", color: "#f59e0b" },
  };

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

  /* -------------------- CHART DATA -------------------- */

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

  /* -------------------- RENDER -------------------- */

  return (
    <div className="summary-page">
      <div className="summary-container">
        <div className="summary-header">
          <h2>Your Financial Snapshot</h2>
          <p className="subheader">
            {simulateMode
              ? "Simulating changes to your budget"
              : "Here's your current financial reality"}
          </p>
        </div>

        <div className="summary-content two-column-layout">
          {/* LEFT COLUMN */}
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
                totalOutflow={
                  simulatedValues.fixed +
                  simulatedValues.variable +
                  simulatedValues.savings
                }
              />
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-column">
            <SalaryCard salary={income} />

            {/* REALITY CHECK */}
            <div
              style={{
                marginTop: "16px",
                padding: "14px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                background: "#fafafa",
              }}
            >
              <h4 style={{ marginBottom: "8px" }}>Reality Check</h4>

              <p>
                At your current spending level, you can sustain this plan for{" "}
                <strong>
                  {fragilityResult.bufferMonths === Infinity
                    ? "an unlimited time"
                    : `${fragilityResult.bufferMonths.toFixed(1)} months`}
                </strong>{" "}
                without income disruption.
              </p>

              <p>
                Your monthly recovery margin is{" "}
                <strong>
                  ₹{fragilityResult.surplus.toLocaleString()}
                </strong>
                .
              </p>

              <p>
                This plan is{" "}
                <strong>{fragilityResult.status.toLowerCase()}</strong> because:
              </p>

              <ul style={{ paddingLeft: "18px", marginTop: "6px" }}>
                {fragilityResult.reasons.slice(0, 2).map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>

              <p style={{ marginTop: "8px", fontSize: "0.9rem", color: "#555" }}>
                Under expense shocks, this plan breaks in{" "}
                <strong>
                  {Math.round(stressResult.fragilityScore * 100)}%
                </strong>{" "}
                of simulated scenarios.
              </p>
            </div>

            {/* BREAKDOWN */}
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
                title="Savings"
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
