export function classifyFragility({ runwayMonths }) {
    if (runwayMonths === Infinity) {
        return {
            status: "stable",
            severity: 0
        };
    }

    if (runwayMonths <= 3) {
        return {
            status: "breaking",
            severity: 1
        };
    }

    if (runwayMonths <= 12) {
        return {
            status: "fragile",
            severity: 0.6
        };
    }

    return {
        status: "stable",
        severity: 0.2
    };
}