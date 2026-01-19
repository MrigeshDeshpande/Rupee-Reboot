const sum = (obj = {}) =>
  Object.values(obj).reduce((acc, val) => acc + Number(val || 0), 0);

export function calculateTotals(formData) {
    console.log(formData,'formdata');
    
  const income = Number(formData?.salary) || 0;

  const fixed = sum(formData?.fixedExpenses);
  const variable = sum(formData?.variableExpenses);
  const savings = sum(formData?.savings);

  const totalOutflow = fixed + variable + savings;
  const remaining = Math.max(0, income - totalOutflow);

  return {
    income,
    fixed,
    variable,
    savings,
    totalOutflow,
    remaining,
  };
}

export function scaleExpenses(original = {}, newTotal = 0) {
  const originalTotal = sum(original);
  if (originalTotal === 0) return original;

  const scaled = {};
  for (let key in original) {
    const ratio = Number(original[key]) / originalTotal;
    scaled[key] = Math.round(ratio * newTotal);
  }
  return scaled;
}
