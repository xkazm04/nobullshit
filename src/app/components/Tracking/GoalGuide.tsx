'use client';
import Stepper from "../Stepper";
import { useState } from "react";
import GuideArea from "./Guide/GuideArea";
import GuideHabit from "./Guide/GuideHabit";
import GuideMilestones from "./Guide/GuideMilestones";

const GoalGuide = () => {
   
    const [currentStep, setCurrentStep] = useState(0)
    const steps = [
        {nextComponent: <GuideArea/>},
        {nextComponent: <GuideHabit/>},
        {nextComponent: <GuideMilestones/>},
    ]

    const finish = () => {
        console.log('finish')
    }
    return (
        <div className="page">

            <div>
                {steps[currentStep].nextComponent}
            </div>
            <div className="absolute bottom-[100px] w-full">
                <Stepper steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} finalFunction={finish}  />
            </div>
        </div>
    );
}

export default GoalGuide;