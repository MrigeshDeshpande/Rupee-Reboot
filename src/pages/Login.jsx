import React from "react";
import "../Styles/Auth.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Welcome back 👋</h2>
        <p className="auth-subtitle">
          Log in to simulate and reboot your rupee flow
        </p>

        <form className="auth-form">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <p className="auth-alt">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
