import React from 'react';
import DonutChart from './DonutChart.jsx';
import SummaryCard from './SummaryCard.jsx';
import SalaryCard from './SalaryCard.jsx';
import SummaryFooter from './SummaryFooter.jsx';
import "../../Styles/Summary.css";

const Step5Summary = ({ formData, prevStep }) => {
  const { salary = 0, fixedExpenses = {}, variableExpenses = {}, savings = {} } = formData || {};


  const totalFixed = Object.values(fixedExpenses).reduce((a, b) => a + Number(b), 0);
  const totalVariable = Object.values(variableExpenses).reduce((a, b) => a + Number(b), 0);
  const totalSavings = Object.values(savings).reduce((a, b) => a + Number(b), 0);
  const totalOutflow = totalFixed + totalVariable + totalSavings;
  const remaining = salary - totalOutflow;

  const chartData = [
    { name: 'Fixed', value: totalFixed },
    { name: 'Variable', value: totalVariable },
    { name: 'Savings', value: totalSavings },
    { name: 'Remaining', value: remaining }
  ];

  return (
    <div className="summary-page">
      <div className="summary-container">
        <div className="summary-header">
          <h2>📊 Your Financial Snapshot</h2>
          <p>Here’s a quick glance before we simulate your monthly plan.</p>
        </div>

        <div className="summary-left">
          <div className="donut-chart-container">
            <DonutChart data={chartData} />
          </div>
        </div>

        <div className="summary-right">
          <SalaryCard salary={salary} />
          <SummaryCard title="Fixed Expenses" icon="" data={fixedExpenses} />
          <SummaryCard title="Variable Expenses" icon="" data={variableExpenses} />
          <SummaryCard title="Savings Goal" icon="" data={savings} />
          <SummaryFooter totalOutflow={totalOutflow} remaining={remaining} />
        </div>

        <div className="summary-buttons">
          <button className="primary-btn" onClick={prevStep}>Back</button>
          <button className="primary-btn" onClick={() => console.log("Simulating financial plan...")}>
            Simulate Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step5Summary;
