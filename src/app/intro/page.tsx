'use client'
import IntroFirst from "../components/Intro/IntroFirst"
import IntroLogin from "../components/Intro/IntroLogin"
import IntroPromo from "../components/Intro/IntroPromo"
import IntroWelcome from "../components/Intro/IntroWelcome"
import Stepper from "../components/Stepper"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "../components/Header"

const Page = () => {
    // Will need zustand for passing data between steps
    const Router = useRouter()
    const steps = [
        { nextComponent: <IntroLogin /> },
        { nextComponent: <IntroPromo /> },
        { nextComponent: <IntroFirst /> },
      ];
    const [currentStep, setCurrentStep] = useState(0);
    const finish = () => {
        Router.push('/daily')
    }
    return <>
        <div className="relative h-full">
        {steps[currentStep].nextComponent}
        <div className="absolute bottom-5 w-full">
          <Stepper steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} finalFunction={finish} />
        </div>
      </div>
      </>
}

export default Page