export function calculateRunway({ netmonthly, savings = 0 }) {
    if (netmonthly >= 0) {
        return {
            runwayMonths: Infinity,
            monthlyBurn: 0,
            monthlySurplus: netmonthly
        }
    };

    const monthlyBurn = Math.abs(netmonthly);

    if (savings <= 0) {
        return {
            runwayMonths: null,
            monthlyBurn,
            monthlySurplus: 0
        };
    }

    return {
        runwayMonths: Math.floor(savings / monthlyBurn),
        monthlyBurn,
        monthlySurplus: 0
    }
}