import React from "react";
import "../styles/LandingPage.css";
import SuccessFactorsImg from "../assets/ok.svg";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            Rupee<span className="logo-highlight">Reboot</span>
          </div>
          <ul className="nav-links">
            <li>Home</li>
            <li>About</li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Simplify <span className="highlight">Adulting</span> with Your
              Finances
            </h1>
            <p>Simulate your finances with ease before life surprises you.</p>
            <div className="hero-buttons">
            <Link to="/onboarding">
              <button className="primary-btn">Get Started</button>
            </Link>              
              <button className="secondary-btn">Learn More</button>
            </div>
          </div>
          <img src={SuccessFactorsImg} alt="hm" className="hero-img" />
        </div>
      </div>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="cards">
          <div className="card">
            <h3>Enter Income & Expenses</h3>
            <p>Add your salary, rent, groceries, and everything in between.</p>
          </div>
          <div className="card">
            <h3>Adjust What-If Sliders</h3>
            <p>
              Play with different scenarios to see what could change tomorrow.
            </p>
          </div>
          <div className="card">
            <h3>Visualize Your Money Story</h3>
            <p>See charts, savings, and spending patterns unfold clearly.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          © 2025 <span className="footer-brand">RupeeReboot</span>. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;
