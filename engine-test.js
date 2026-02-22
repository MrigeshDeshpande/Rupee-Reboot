import { evaluateFinancialReality } from "./src/engine/index.js";

function testCase(label, input) {
  console.log(`\n===== ${label} =====`);
  const result = evaluateFinancialReality(input);
  console.log(result);
}

// Case 1: Surplus (should be infinite runway)
testCase("Surplus Case", {
  income: "50000",
  fixed: "20000",
  variable: "10000",
  savings: 100000
});

// Case 2: Deficit but survivable
testCase("Deficit - 12 Months Runway", {
  income: "30000",
  fixed: "25000",
  variable: "10000",
  savings: 60000
});

// Case 3: Deficit, no savings
testCase("Breaking Immediately", {
  income: "30000",
  fixed: "25000",
  variable: "10000",
  savings: 0
});