import { calculateMonthlyReality } from './reality';
import { calculateRunway } from './runway';
import { classifyFragility } from './fragility';

export function evaluateFinancialReality(input) {
    const reality = calculateMonthlyReality(input);
    const runway = calculateRunway({
        netmonthly: reality.netMonthly,
    })

    const status = classifyFragility(runway);

    return {
        ...reality,
        ...runway,
        status
    }
}