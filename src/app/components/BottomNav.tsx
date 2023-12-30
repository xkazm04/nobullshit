'use client';
import Link from 'next/link'
import {useState, useEffect} from 'react'
import { BookCheckIcon, CalendarDaysIcon, CrownIcon, GoalIcon, TimerResetIcon } from 'lucide-react';
import useGetUser from '../lib/hooks/useGetUser';

const navItems = [
  { href: '/daily', label: 'Daily', logo: <CalendarDaysIcon strokeWidth={0.75}/> },
  { href: '/weekly', label: 'Weekly Goals', logo: <GoalIcon strokeWidth={0.75}/>  },
  { href: '/tasks', label: 'Tasks', logo: <BookCheckIcon strokeWidth={0.75}/>},
  { href: '/timer', label: 'Timer', logo: <TimerResetIcon strokeWidth={0.75}/> },
  { href: '/challenge', label: 'Challenge', logo: <CrownIcon strokeWidth={0.75}/> },
]

export default function BottomNav() {
  const [path, setPath] = useState('' as string);
  const user = useGetUser()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPath(window.location.pathname);
    }
  }, []);


  return (
    <>    
    {user && <>
        <div className=" bg-slate-950 font-['Inter'] capitalize tracking-wide font-light text-sm py-2">
          <nav className="max-w-md mx-auto px-4 py-2 flex justify-around">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className={`p-1 ${path === item.href ? 'text-main bg-transmain' : 'text-gray-200'} flex flex-col gap-2 item-center rounded-xl `}>
                    <div>{item.logo}</div>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </>}
    </>

  )
}