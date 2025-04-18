import React, { useState, useEffect } from "react";
import DonutChart from "../Onboarding/DonutChart";
import WhatIfSliders from "./WhatIfSliders";
import "../Onboarding/summary.css"; 

const SummarySimulationView = ({ data }) => {
  const [simulationValues, setSimulationValues] = useState({
    salary: 0,
    fixedExpenses: 0,
    variableExpenses: 0,
    savings: 0,
  });

  // Autofill existing data from summary step
  useEffect(() => {
    if (data) {
      setSimulationValues({
        salary: data.salary || 0,
        fixedExpenses: data.fixedExpenses || 0,
        variableExpenses: data.variableExpenses || 0,
        savings: data.savings || 0,
      });
    }
  }, [data]);

  const chartData = [
    { name: "Fixed", value: simulationValues.fixedExpenses, color: "#22c55e" },
    { name: "Variable", value: simulationValues.variableExpenses, color: "#38bdf8" },
    { name: "Savings", value: simulationValues.savings, color: "#6366f1" },
  ];

  return (
    <div className="simulation-wrapper">
      <div className="left-rail">
        <WhatIfSliders values={simulationValues} onChange={setSimulationValues} />
      </div>

      <div className="right-rail">
        <DonutChart data={chartData} />
      </div>
    </div>
  );
};

export default SummarySimulationView;
