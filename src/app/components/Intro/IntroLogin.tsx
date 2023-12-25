'use client'
import { useState } from "react"
import { apiRequest } from "@/app/lib/callers"
import { FormTextInput } from "../form/FormTextInput"
import FormCondition from "../form/FormCondition"
type Props = {
    condition: boolean
    setCondition: (condition: boolean) => void
}
const IntroLogin = ({condition,setCondition}: Props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [signType, setSignType] = useState('email') 
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [checked, setChecked] = useState(true)

    const txt =  "By setting a habbit 5 hours / week you will gain 250h+ expertize at any skill, feel physically better."

    const handleSubmit = async(e: any) => {
        setSuccess(false)
        setError(false)
        e.preventDefault()
        const url = 'http://localhost:8000/user/register';
        const user = {
            username: username,
            password: password,
            email: email
        }
        try{
            await apiRequest('POST', url, user as any)
            setSuccess(true)
            localStorage.setItem('user', JSON.stringify(user.username))
            setCondition(true)
        } catch (err) {
            setError(true)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center  h-full">
            <div className="flex flex-col w-[90%] gap-5
                rounded-lg
            ">
                <div className="typo-long">
                   {txt}
                </div>
                <div className="flex flex-row justify-center bg-gray-950 gap-3">
                <button 
                    className=" p-4 text-main border border-transmain rounded-2xl" 
                    onClick={() => setSignType('google')}>G</button>
                <button 
                    className="p-4 text-main border border-transmain rounded-2xl" 
                    onClick={() => setSignType('email')}>M</button>
                </div>
                {signType === 'email' && <div className="flex flex-col w-full gap-2">
                    <FormTextInput setNew={setUsername} label="Username" type='text'/>
                    <FormTextInput setNew={setEmail}  label="Email" type='email'/>
                    <FormTextInput setNew={setPassword}  label="Password" type='password'/>
                    {username === '' || email === '' || password === '' ? 
                        <button className="btn-disabled py-3 my-5 " disabled >Register</button> :
                        <button className="btn-action py-3 my-5 animate-fadeIn" onClick={handleSubmit}>Register</button>
                        }

                </div>}
                {signType === 'google' && <div>
                    <button className="fullbox">Sign in with Google</button>
                </div>
                }
                <FormCondition checked={checked} setChecked={setChecked} text="I agree to process my data for recommnedation"/>
                <FormCondition checked={condition} setChecked={()=>{setCondition(!condition)}} text="Check me"/>
                {error && <div className="fullbox">Error</div>}
                {success && <div className="fullbox text-green-400 border border-green-400/20">Registration completed</div>}
            </div>
        </div>
    )
}

export default IntroLogin