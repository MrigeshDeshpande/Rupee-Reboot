import React from "react";

/**
 * Step1Salary Component:
 * - Purpose: Collects user's monthly take-home salary.
 * - Uses formData to persist input across steps.
 */

const Step1Salary = ({ onNext, formData, setFormData }) => {
  const salary = formData.salary || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!salary || isNaN(salary) || Number(salary) <= 0) {
      alert("Please enter a valid salary greater than 0.");
      return;
    }
    onNext({ salary: Number(salary) });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "" || Number(value) >= 0) {
      setFormData((prev) => ({
        ...prev,
        salary: value,
      }));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Let's get started 💼</h2>
        <p className="auth-subtitle">
          What’s your monthly take-home salary (after tax)?
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="e.g. 50000"
            value={salary}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-btn">
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default Step1Salary;
