import { evaluateFinancialReality } from './index';

export function evaluateScenario({ baseline, modified }) {
    const before = evaluateFinancialReality(baseline);
    const after = evaluateFinancialReality(modified);

    const delta = {
        netMonthly: after.netMonthly - before.netMonthly,

        runwayMonths:
            before.runwayMonths === Infinity || after.runwayMonths === Infinity
                ? null
                : after.runwayMonths - before.runwayMonths,
    }

    const cause = identifyPrimaryCause(before, after);

    return {
        before,
        after,
        delta,
        cause,
    };
}


function identifyPrimaryCause(before, after) {
    const incomeChange = after.monthlyIncome - before.monthlyIncome;
    const expenseChange = after.totalExpenses - before.totalExpenses;

    if (Math.abs(incomeChange) > Math.abs(expenseChange)) {
        return incomeChange > 0 ? "income increased" : "income decreased";
    }

    if (expenseChange !== 0) {
        return expenseChange < 0 ? "expense reduced" : "expense increased";
    }

    return "no significant changes"
}
