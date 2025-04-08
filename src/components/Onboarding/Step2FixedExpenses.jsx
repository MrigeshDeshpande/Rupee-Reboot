import React from "react";

const Step2FixedExpenses = ({ formData, setFormData, onNext, prevStep }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      fixedExpenses: {
        ...formData.fixedExpenses,
        [e.target.name]: e.target.value,
      },
    });
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
          <div className="input-group">
            <label htmlFor="rent">Rent</label>
            <input
              id="rent"
              type="number"
              name="rent"
              value={formData.fixedExpenses?.rent || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="utilities">
              Utilities (Electricity, Water, etc.)
            </label>
            <input
              id="utilities"
              type="number"
              name="utilities"
              value={formData.fixedExpenses?.utilities || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="subscriptions">Subscriptions (Netflix, etc.)</label>
            <input
              id="subscriptions"
              type="number"
              name="subscriptions"
              value={formData.fixedExpenses?.subscriptions || ""}
              onChange={handleChange}
              required
            />
          </div>

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
