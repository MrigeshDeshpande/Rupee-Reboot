export type ExpenseMap = Record<string, number>;

export type FinancialPlanInput = {
  monthlyIncome: number;
  fixedExpenses: ExpenseMap;
  variableExpenses: ExpenseMap;
  emergencyFund: number;
};

export type PlanStatus = "STABLE" | "FRAGILE" | "BREAKING";

export type FragilityResult = {
  status: PlanStatus;
  surplus: number;
  bufferMonths: number;
  reasons: String[];
}

export type StressTestResult = {
  runs: number;
  variancePercent: number;
  brokeRuns: number;
  fragilityScore: number;
}

function sum(expenses: ExpenseMap = {}): number {
  return Object.values(expenses).reduce((acc, val) =>
    acc + val, 0)
}

export function applyStress(
  original: ExpenseMap = {},
  variancePercent = 10
): ExpenseMap {
  const stressed: ExpenseMap = {};
  const variance = variancePercent / 100;

  for (const key in original) {
    const base = original[key] ?? 0;
    const factor = 1 + (Math.random() * 2 - 1) * variance;
    stressed[key] = Math.round(base * factor);
  }

  return stressed;
}

export function evaluatePlanFragility(
  plan: FinancialPlanInput
): FragilityResult {
  const { monthlyIncome, fixedExpenses, variableExpenses, emergencyFund } = plan;

  const fixed = sum(fixedExpenses);
  const variable = sum(variableExpenses);
  const totalExpenses = fixed + variable;
  const surplus = monthlyIncome - totalExpenses;

  const reasons: string[] = [];

  if (surplus <= 0) {
    return {
      status: "BREAKING",
      surplus,
      bufferMonths: 0,
      reasons: [
        "Expenses meet or exceed income",
        "No monthly recovery margin",
      ],
    };
  }

  const bufferMonths =
    totalExpenses > 0 ? emergencyFund / totalExpenses : Infinity;

  const variableRatio =
    totalExpenses > 0 ? variable / totalExpenses : 0;

  let status: PlanStatus = "STABLE";

  if (bufferMonths < 3) {
    status = "FRAGILE";
    reasons.push("Emergency fund covers less than 3 months");
  }

  if (surplus < 0.15 * monthlyIncome) {
    status = "FRAGILE";
    reasons.push("Monthly surplus is thin");
  }

  if (variableRatio > 0.45) {
    status = "FRAGILE";
    reasons.push("High dependence on variable expenses");
  }

  if (
    bufferMonths < 1 ||
    (bufferMonths < 3 && surplus < 0.1 * monthlyIncome)
  ) {
    status = "BREAKING";
    reasons.push("Plan collapses under minor expense shocks");
  }

  if (reasons.length === 0) {
    reasons.push("Plan absorbs normal expense variation comfortably");
  }

  return {
    status,
    surplus,
    bufferMonths,
    reasons,
  };
}


//Stress Testing

export function runStressTest(
  plan: FinancialPlanInput,
  variancePercent = 10,
  runs = 20
): StressTestResult {
  let brokeRuns = 0;

  for (let i = 0; i < runs; i++) {
    const stressedPlan: FinancialPlanInput = {
      ...plan,
      fixedExpenses: applyStress(plan.fixedExpenses, variancePercent),
      variableExpenses: applyStress(plan.variableExpenses, variancePercent),
    };

    const result = evaluatePlanFragility(stressedPlan);

    if (result.status === "BREAKING") {
      brokeRuns++;
    }
  }

  return {
    runs,
    variancePercent,
    brokeRuns,
    fragilityScore: brokeRuns / runs,
  };
}