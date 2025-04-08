import React from 'react';

const Step3VariableExpense = ({ formData, setFormData, onNext, prevStep }) => {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      variableExpenses: {
        ...prev.variableExpenses,
        [e.target.name]: e.target.value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(); // Nothing to pass explicitly since formData is already updated
  };

  const values = formData.variableExpenses || {};

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Spending That Changes 💳</h2>
        <p className="auth-subtitle">Let’s capture your average monthly variable expenses.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="number"
            name="groceries"
            placeholder="Groceries"
            value={values.groceries || ''}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="transport"
            placeholder="Transport"
            value={values.transport || ''}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="entertainment"
            placeholder="Entertainment"
            value={values.entertainment || ''}
            onChange={handleChange}
            required
          />

          <div className="auth-btn-group spaced-buttons">
            <button type="button" className="auth-btn secondary" onClick={prevStep}>Back</button>
            <button type="submit" className="auth-btn">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step3VariableExpense;
