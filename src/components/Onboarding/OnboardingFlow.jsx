import React from "react";
import Step1Salary from "./Step1Salary";
import Step2FixedExpenses from "./Step2FixedExpenses";
import Step3VariableExpense from "./Step3VariableExpense";
import Step4Savings from "./Step4Savings";
import Step5Summary from "./Step5Summary";

const OnboardingFlow = () => {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [formData, setFormData] = React.useState({
    salary: "",
    fixedExpenses: {
      rent: "",
      utilities: "",
      subscriptions: "",
    },
    variableExpenses: {
      groceries: "",
      transport: "",
      entertainment: "",
    },
    savings: {
      emergency: "",
      investments: "",
    },
  });

  const handleNext = () => {
    setStepIndex((prev) => prev + 1);
  };

  console.log("formData", formData);
  console.log("stepIndex", stepIndex);

  const handlePrev = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const currentStep = [
    <Step1Salary
      onNext={handleNext}
      formData={formData}
      setFormData={setFormData}
    />,
    <Step2FixedExpenses
      formData={formData}
      onNext={handleNext}
      setFormData={setFormData}
      prevStep={handlePrev}
    />,
    <Step3VariableExpense
      formData={formData}
      onNext={handleNext}
      setFormData={setFormData}
      prevStep={handlePrev}
    />,
    <Step4Savings
      formData={formData}
      onNext={handleNext}
      setFormData={setFormData}
      prevStep={handlePrev}
    />,
    <Step5Summary formData={formData} prevStep={handlePrev} />,
  ];
  return <div>{currentStep[stepIndex] || <div>All steps completed!</div>}</div>;
};

export default OnboardingFlow;
