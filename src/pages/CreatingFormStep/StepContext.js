import React, { createContext, useState } from 'react';
import FormStepper from './FormStepper';

export const MultiStepContext = createContext();
const StepContext = () => {
  const [currentStep, setStep] = useState(1);
  const [userData, setUserData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  return (
    <div>
      <MultiStepContext.Provider
        value={{
          currentStep,
          setStep,
          userData,
          setUserData,
          finalData,
          setFinalData,
        }}
      >
        <FormStepper />
      </MultiStepContext.Provider>
    </div>
  );
};

export default StepContext;
