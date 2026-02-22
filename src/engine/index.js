import { calculateMonthlyReality } from "./reality.js";
import { calculateRunway } from "./runway.js";
import { classifyFragility } from "./fragility.js";

export function evaluateFinancialReality(input) {
    const snapshotRaw = calculateMonthlyReality(input);

    const runwayRaw = calculateRunway({
        netMonthly: snapshotRaw.netMonthly,
        savings: input.savings || 0
    });

    const fragility = classifyFragility({
        runwayMonths: runwayRaw.runwayMonths
    });

    return {
        snapshot: {
            income: snapshotRaw.monthlyIncome,
            fixed: snapshotRaw.fixedExpenses,
            variable: snapshotRaw.variableExpenses,
            totalExpenses: snapshotRaw.totalExpenses,
            netMonthly: snapshotRaw.netMonthly
        },

        runway: {
            months:
                runwayRaw.runwayMonths === Infinity
                    ? null
                    : runwayRaw.runwayMonths,
            burn: runwayRaw.monthlyBurn,
            surplus: runwayRaw.monthlySurplus,
            type:
                runwayRaw.runwayMonths === Infinity
                    ? "infinite"
                    : "finite"
        },

        fragility
    };
}