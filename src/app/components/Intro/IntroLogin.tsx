'use client'
import { useState } from "react"
const IntroLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [signType, setSignType] = useState('email') 

    const handleSubmit = async(e) => {
        e.preventDefault()
        const user = {
            username: username,
            password: password
        }

    }
      
    return (
        <div className="flex flex-col justify-center items-center  h-full">
            <div className="flex flex-col w-[90%] gap-5
                rounded-lg
            ">
                <div className="fullbox">
                    By setting a habbit 5 hours / week you will gain 250h+ expertize at any skill, feel physically better, 
                </div>
                {signType === 'email' && <div>
                    <input className="fullbox" type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}/> 
                    <input className="fullbox" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    <button className="btn-main" onClick={handleSubmit}>Sign in</button>
                </div>}
                {signType === 'google' && <div>
                    <button className="fullbox">Sign in with Google</button>
                </div>
                }
                
               <div className="flex flex-row justify-center bg-gray-950 gap-3">
                <button 
                    className=" p-4 text-main border border-transmain rounded-2xl" 
                    onClick={() => setSignType('google')}>G</button>
                <button 
                    className="p-4 text-main border border-transmain rounded-2xl" 
                    onClick={() => setSignType('email')}>M</button>
                </div>
            </div>
        </div>
    )
}

export default IntroLogin