'use client';
import { useRouter } from 'next/navigation';
import { useSwipeable } from 'react-swipeable';

interface Step {
  nextComponent: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
  finalFunction: () => void;
  condition: boolean;
  setCondition: (condition: boolean) => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, setCurrentStep, finalFunction, condition, setCondition }) => {
  const router = useRouter();

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const goNext = () => {
    setCondition(false)
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goBack
  });

  return (
    <div {...handlers}  className="flex flex-row justify-around">
      <button onClick={goBack} className="btn-mini">
        Back
      </button>
      <div className="flex justify-center space-x-2">
        {steps.map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full ${i === currentStep ? 'bg-main' : 'bg-gray-300'}`}></div>
        ))}
      </div>
      {condition ? <>
      {currentStep < steps.length - 1 ? (
        <button onClick={goNext} className="btn-mini">
          Next
        </button>
      ) : 
        <button onClick={finalFunction} className="btn-mini">
        Finish
      </button>
      }</> : <button disabled className="btn-disabled">Next</button>}
    </div>
  );
};

export default Stepper;