// FIX: Add missing React import to fix reference errors.
import React from 'react';
import { STEPS } from '../../constants';
import CheckIcon from '../icons/CheckIcon';

interface StepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ currentStep, onStepClick }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {STEPS.map((step) => (
          <li key={step.name} className="md:flex-1">
            {currentStep > step.id ? (
              <button onClick={() => onStepClick(step.id)} className="group flex w-full flex-col border-l-4 border-blue-600 py-2 pl-4 transition-colors hover:border-blue-800 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-800">{`Step ${step.id}`}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </button>
            ) : currentStep === step.id ? (
              <div
                className="flex flex-col border-l-4 border-blue-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                aria-current="step"
              >
                <span className="text-sm font-medium text-blue-600">{`Step ${step.id}`}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            ) : (
              <div className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-gray-500 transition-colors">{`Step ${step.id}`}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Stepper;