import { useState } from "react";
import OnboardingCard from "../components/OnboardingCard";
import Input from "../components/Input";
import { evaluateFinancialReality } from "../engine";

export default function Onboarding() {
  const [income, setIncome] = useState("");
  const [fixed, setFixed] = useState("");
  const [variable, setVariable] = useState("");

  function handleSubmit() {
    const reality = evaluateFinancialReality({
      income,
      fixed,
      variable,
    });

    console.log("FINANCIAL REALITY:", reality);
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <OnboardingCard
          title="Let’s understand your reality"
          subtitle="No judgement. Just numbers."
        >
          <div className="space-y-5">
            <Input
              label="Monthly Income"
              placeholder="₹ 50,000"
              value={income}
              onChange={setIncome}
            />

            <Input
              label="Fixed Expenses"
              placeholder="₹ 25,000"
              value={fixed}
              onChange={setFixed}
            />

            <Input
              label="Variable Expenses"
              placeholder="₹ 10,000"
              value={variable}
              onChange={setVariable}
            />

            <button
              onClick={handleSubmit}
              className="
                w-full
                bg-primary
                hover:bg-primary-soft
                text-white
                py-2.5
                rounded-xl
                font-medium
                mt-6
                transition-all
                active:scale-[0.98]
              "
            >
              See my reality
            </button>
          </div>
        </OnboardingCard>
      </div>
    </div>
  );
}
