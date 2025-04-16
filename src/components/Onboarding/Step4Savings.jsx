import React from "react";
import "../../Styles/Onboarding.css";

const Step4Savings = ({ formData, setFormData, onNext, prevStep }) => {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      savings: {
        ...prev.savings,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const values = formData.savings || {};

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Savings Goals...</h2>
        <p className="auth-subtitle">How much are you saving every month?</p>

        <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="emergency_fund" className="label-custom">Emergency Fund</label>
          <input
            type="number"
            name="emergency"
            value={values.emergency || ""}
            onChange={handleChange}
            required
          />

         <label htmlFor="investments" className="label-custom">Investments </label>
          <input
            type="number"
            name="investments"
            value={values.investments || ""}
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

export default Step4Savings;
