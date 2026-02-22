export function calculateRunway({ netMonthly, savings = 0 }) {
    const normalizedSavings = Number(savings) || 0;

    if (netMonthly >= 0) {
        return {
            runwayMonths: Infinity,
            monthlyBurn: 0,
            monthlySurplus: netMonthly
        };
    }

    const monthlyBurn = Math.abs(netMonthly);

    if (normalizedSavings <= 0) {
        return {
            runwayMonths: 0,
            monthlyBurn,
            monthlySurplus: 0
        };
    }

    return {
        runwayMonths: Math.floor(normalizedSavings / monthlyBurn),
        monthlyBurn,
        monthlySurplus: 0
    };
}