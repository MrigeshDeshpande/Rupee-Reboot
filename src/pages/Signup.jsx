import React from "react";
import "../styles/Auth.css";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Get started 🚀</h2>
        <p className="auth-subtitle">Create your RupeeReboot account</p>

        <form className="auth-form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="auth-btn">
            Sign Up
          </button>
        </form>

        <p className="auth-alt">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
