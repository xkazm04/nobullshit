'use client'
import { useState } from "react"
import FormCondition from "../form/FormCondition"
import { GithubIcon, PlayCircleIcon } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import { useMutation } from "@tanstack/react-query"
import { registerUser } from "@/app/apiFns/userApis"
import { UserType } from "@/app/types/TrackerTypes"


type Props = {
    condition: boolean
    setCondition: (condition: boolean) => void
}
const IntroLogin = ({condition,setCondition}: Props) => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const {data: session} = useSession()
    const [ip, setIp] = useState('')

    const mutation = useMutation({
        mutationFn: (user: UserType) => registerUser(user),
        onSuccess: () => {
            setCondition(true)
            setError(false)
            setSuccess(true)
        },
        onError: () => {
            setError(true)
        }
    })

    const txt =  "Consistency is the key. Start now"

    const handleSubmit = async(user: UserType) => {
        setSuccess(false)
        setError(false)
        try {
            mutation.mutate(user)
            localStorage.setItem('user', user.email)
        } catch (error) {
            console.log(error);
        }
    }
    const guestLogin = async () => {
        setError(false)
        try {
          const response = await fetch('https://api.ipify.org');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const ip = await response.text();
          setIp(ip);
          console.log(ip);
          let user = {
            email: ip + '@guest.com',
            username: ip,
          };
          handleSubmit(user);
          localStorage.setItem('user', user.email)
          setSuccess(true)
          setCondition(true)
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
      const providerLogin = async (provider: string) => {
        await signIn(provider, {callbackUrl: 'http://localhost:3000'})
        if (session) {
            console.log(session.user);
            let user = {
                email: session.user.email,
                username: session.user.name
            }
            await handleSubmit(user)
          }
      }


    return (
        <div className="flex flex-col justify-center items-center py-10  h-full">
            <div className="flex flex-col w-[90%] gap-5 rounded-lg ">
                <div className="typo-long">
                   {txt}
                </div>
                <div className="flex flex-between w-full gap-2">
                    <div className="w-[50%] bg-gray-950 py-10 px-5 rounded-xl border border-gray-600/50" onClick={()=>{providerLogin('google')}}><PlayCircleIcon size={40} strokeWidth={1}/></div>
                    <div className="w-[50%] bg-gray-950 py-10 px-5 rounded-xl border border-gray-600/50" onClick={()=>{providerLogin('github')}}><GithubIcon size={40} strokeWidth={1}/></div>
                </div>
                <div className="w-full relative mb-5">
                    <div className="border-t border-gray-700/60"/>
                    <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-gray-900/50 px-2 text-sm font-mono text-blue-200 
                    md:cursor-pointer md:hover:text-blue-400"
                        onClick={guestLogin}>get in as guest</div>
                </div>
                <FormCondition checked={condition} setChecked={()=>{setCondition(!condition)}} text="I agree to process my data for recommnedation"/>
                {error && <div className="alert-error">Error</div>}
                {success && <div className="alert-success">Registration completed. You may continue.</div>}
            </div>
        </div>
    )
}

export default IntroLogin