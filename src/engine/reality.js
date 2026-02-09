import { parseMoney } from './money';

export function calculateMonthlyReality({income, fixed, variable}){
    const monthlyIncome = parseMoney(income);
    const fixedExpenses = parseMoney(fixed);
    const variableExpenses = parseMoney(variable);

    const totalExpenses = fixedExpenses + variableExpenses;
    const netMonthly = monthlyIncome - totalExpenses;

    return{
        monthlyIncome,
        fixedExpenses,
        variableExpenses,
        totalExpenses,
        netMonthly
    }
}