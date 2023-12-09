'use client'
import IntroLogin from "../components/Intro/IntroLogin"
import IntroPromo from "../components/Intro/IntroPromo"
import IntroWelcome from "../components/Intro/IntroWelcome"
import Stepper from "../components/Stepper"
import { useState } from "react"

const Page = () => {
    const steps = [
        { nextComponent: <IntroLogin /> },
        { nextComponent: <IntroPromo /> },
        { nextComponent: <IntroWelcome /> },
      ];
    const [currentStep, setCurrentStep] = useState(0);
    const finish = () => {
        console.log("finish")
    }
    return (
        <div className="relative h-full">
        {steps[currentStep].nextComponent}
        <div className="absolute bottom-5 w-full">
          <Stepper steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} finalFunction={finish} />
        </div>
      </div>
    )
}

export default Page