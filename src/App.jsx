import React from "react";
import LandingPage from "./components/LandingPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import OnboardingFlow from "../src/components/Onboarding/OnboardingFlow.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<OnboardingFlow />} />
      </Routes>
    </Router>
  );
}

export default App;
