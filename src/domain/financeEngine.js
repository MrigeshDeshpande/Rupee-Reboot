/**
 * Utility function to sum all numeric values in an object.
 * Safely handles missing/undefined/null values by treating them as 0.
 *
 * @param {Object<string, any>} [obj={}] - Object whose values should be summed
 * @returns {number} Sum of all numeric (or numeric-coercible) values
 */

const sum = (obj = {}) =>
  Object.values(obj).reduce((acc, val) => acc + Number(val || 0), 0);

/**
 * Calculates key budget totals from the complete form data object.
 * All returned values are safe numbers (never NaN).
 *
 * @param {Object} formData - The complete budget form data collected from user
 * @param {string|number} formData.salary - User's monthly net income
 * @param {Object<string, string|number>} [formData.fixedExpenses] - Fixed expenses by category
 * @param {Object<string, string|number>} [formData.variableExpenses] - Variable expenses by category
 * @param {Object<string, string|number>} [formData.savings] - Savings/investments by goal/category
 * @returns {{
 *   income: number,
 *   fixed: number,
 *   variable: number,
 *   savings: number,
 *   totalOutflow: number,
 *   remaining: number
 * }} Calculated budget summary
 */

export function calculateTotals(formData) {
  // console.log(formData, 'formdata'); // ← consider removing or using proper logger in production

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

/**
 * Scales all values in an expense/savings object proportionally so that
 * their new sum equals the desired `newTotal`.
 *
 * - If original sum is 0 → returns original object unchanged
 * - Uses rounding (Math.round) → final sum may be ±1–2 from target due to rounding
 *
 * @param {Object<string, string|number>} [original={}] - Original category → amount object
 * @param {number|string} [newTotal=0] - Desired new total sum after scaling
 * @returns {Object<string, number>} New object with scaled (rounded) amounts
 *
 * @example
 * scaleExpenses({ rent: 1000, phone: 200 }, 1500)
 * // → { rent: 1250, phone: 250 }   (approx)
 */

export function scaleExpenses(original = {}, newTotal = 0) {
  const originalTotal = sum(original);

  // Avoid division by zero
  if (originalTotal === 0) {
    return original;
  }

  const scaled = {};

  for (let key in original) {
    const ratio = Number(original[key]) / originalTotal;
    scaled[key] = Math.round(ratio * newTotal);
  }

  return scaled;
}