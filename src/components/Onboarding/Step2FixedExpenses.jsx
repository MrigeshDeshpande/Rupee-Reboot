import React from "react";
import "../../Styles/Onboarding.css";

const Step2FixedExpenses = ({ formData, setFormData, onNext, prevStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      fixedExpenses: {
        ...prev.fixedExpenses,
        [name]: value,
      },
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Your Monthly Commitments 💸</h2>
        <p className="auth-subtitle">
          Let’s capture your fixed expenses like rent, bills, etc.
        </p>

        <form className="auth-form" onSubmit={handleNext}>
          <label htmlFor="rent" className="label-custom">
            Rent
          </label>
          <input
            id="rent"
            type="number"
            name="Rent"
            value={formData.fixedExpenses?.Rent || ""}
            onChange={handleChange}
            required
          />

          <label htmlFor="utilities" className="label-custom">
            Utilities (Electricity, Water, etc.)
          </label>
          <input
            id="utilities"
            type="number"
            name="Utilities"
            value={formData.fixedExpenses?.Utilities || ""}
            onChange={handleChange}
            required
          />

          <label htmlFor="subscriptions" className="label-custom">
            Subscriptions (Netflix, etc.)
          </label>
          <input
            id="subscriptions"
            type="number"
            name="Subscriptions"
            value={formData.fixedExpenses?.Subscriptions || ""}
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

export default Step2FixedExpenses;
