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
    const [checked, setChecked] = useState(true)
    const {data: session} = useSession()

    const mutation = useMutation({
        mutationFn: (user: UserType) => registerUser(user),
        onSuccess: () => {
            setChecked(!checked)
            setError(false)
        },
        onError: () => {
            setError(true)
        }
    })

    const txt =  "By setting a habbit 5 hours / week you will gain 250h+ expertize at any skill, feel physically better."

    const handleSubmit = async(user) => {
        setSuccess(false)
        setError(false)
        mutation.mutate(user)
    }
      const guestLogin = async () => {
        console.log('guest login')
        const userIpAddress = await fetch('https://api.ipify.org')
        let user = {
            email: userIpAddress + '@guest.com',
            username: userIpAddress
        }
        await handleSubmit(user)
      }
      const githubLogin = async () => {
            await signIn('github', {callbackUrl: 'http://localhost:3000'})     
            if (session) {
                console.log(session.user);
                localStorage.setItem('user', JSON.stringify(session.user))
                let user = {
                    email: session.user.email,
                    username: session.user.name
                }
                await handleSubmit(user)
              }
      }
        const googleLogin = async () => {
            await signIn('google', {callbackUrl: 'http://localhost:3000'})
            if (session) {
                console.log(session.user);
                localStorage.setItem('user', JSON.stringify(session.user))
                if (session.user.email && session.user.name){
                    let user = {
                        email: session.user.email,
                        username: session.user.name
                    }
                    await handleSubmit(user)
                }
              }
        }

    return (
        <div className="flex flex-col justify-center items-center py-10  h-full">
            <div className="flex flex-col w-[90%] gap-5 rounded-lg ">
                <div className="typo-long">
                   {txt}
                </div>
                <div className="flex flex-between w-full gap-2">
                    <div className="w-[50%] bg-gray-950 py-10 px-5 rounded-xl border border-gray-600/50" onClick={googleLogin}><PlayCircleIcon size={40} strokeWidth={1}/></div>
                    <div className="w-[50%] bg-gray-950 py-10 px-5 rounded-xl border border-gray-600/50" onClick={githubLogin}><GithubIcon size={40} strokeWidth={1}/></div>
                </div>
                <div className="w-full relative mb-5">
                    <div className="border-t border-gray-700/60"/>
                    <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-gray-900/50 px-2 text-sm font-mono text-blue-200 lg:cursor-pointer"
                        onClick={guestLogin}>get in as guest</div>
                </div>
                <FormCondition checked={checked} setChecked={setChecked} text="I agree to process my data for recommnedation"/>
                <FormCondition checked={condition} setChecked={()=>{setCondition(!condition)}} text="Check me"/>
                {error && <div className="fullbox">Error</div>}
                {success && <div className="fullbox text-green-400 border border-green-400/20">Registration completed</div>}
            </div>
        </div>
    )
}

export default IntroLogin