import { ExpenseMap, FinancialPlanInput } from "./financeEngine";

export function calculateTotals(input: FinancialPlanInput) {
    const fixed = Object.values(input.fixedExpenses).reduce((a, b) => a + b, 0);
    const variable = Object.values(input.variableExpenses).reduce((a, b) => a + b, 0);

    const totalExpenses = fixed + variable;
    const remaining = Math.max(0, input.monthlyIncome - totalExpenses);

    return {
        income: input.monthlyIncome,
        fixed,
        variable,
        totalExpenses,
        remaining,
    };
}

export function scaleExpenses(
    expenses: ExpenseMap,
    newTotal: number
): ExpenseMap {
    const currentTotal = Object.values(expenses).reduce((a, b) => a + b, 0);
    if (currentTotal === 0) return expenses;

    const scaled: ExpenseMap = {};
    for (const key in expenses) {
        scaled[key] = Math.round((expenses[key] / currentTotal) * newTotal);
    }

    return scaled;
}
