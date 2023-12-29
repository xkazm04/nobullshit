'use client'
import IntroFirst from "../components/Intro/IntroFirst"
import IntroLogin from "../components/Intro/IntroLogin"
import IntroPromo from "../components/Intro/IntroPromo"
import Stepper from "../components/Stepper"
import { useState } from "react"
import { useRouter } from "next/navigation"

const Page = () => {
    const Router = useRouter()
    const [condition, setCondition] = useState(false)
    const steps = [
        { nextComponent: <IntroLogin condition={condition} setCondition={setCondition} /> },
        { nextComponent: <IntroPromo setCondition={setCondition}/> },
        { nextComponent: <IntroFirst setCondition={setCondition}/> },
      ];
    const [currentStep, setCurrentStep] = useState(0);
    
    const finish = () => {
        Router.push('/daily')
    }
    return <>
        <div className="page">
        {steps[currentStep].nextComponent}
        <div className="absolute bottom-5 w-full">
          <Stepper 
            steps={steps} 
            currentStep={currentStep} 
            setCurrentStep={setCurrentStep} 
            finalFunction={finish} 
            condition={condition} 
            setCondition={setCondition} />
        </div>
      </div>
      </>
}

export default Page