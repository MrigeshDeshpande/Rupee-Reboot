import React from "react";
import "../../Styles/Onboarding.css";

const Step3VariableExpense = ({ formData, setFormData, onNext, prevStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      variableExpenses: {
        ...prev.variableExpenses,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Spending That Changes 💳</h2>
        <p className="auth-subtitle">
          Let’s capture your average monthly variable expenses.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="groceries" className="label-custom">
            Groceries
          </label>
          <input
            type="number"
            name="Groceries"
            value={formData.variableExpenses.Groceries || ""}
            onChange={handleChange}
            required
          />

          <label htmlFor="transport" className="label-custom">
            Transport
          </label>
          <input
            type="number"
            name="Transport"
            value={formData.variableExpenses.Transport || ""}
            onChange={handleChange}
            required
          />

          <label htmlFor="entertainment" className="label-custom">
            Entertainment
          </label>
          <input
            type="number"
            name="Entertainment"
            value={formData.variableExpenses.Entertainment || ""}
            onChange={handleChange}
            required
          />

          <div className="auth-btn-group spaced-buttons">
            <button
              type="button"
              className="auth-btn secondary"
              onClick={prevStep}
            >
              Back
            </button>
            <button type="submit" className="auth-btn">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step3VariableExpense;
