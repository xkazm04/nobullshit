'use client';
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { BookCheckIcon, CalendarDaysIcon, CrownIcon, GoalIcon, TimerResetIcon } from 'lucide-react';
import useGetUser from '../lib/hooks/useGetUser';

const navItems = [
  { href: '/daily', label: 'Daily', logo: <CalendarDaysIcon strokeWidth={0.75} /> },
  { href: '/weekly', label: 'Weekly Goals', logo: <GoalIcon strokeWidth={0.75} /> },
  { href: '/tasks', label: 'Tasks', logo: <BookCheckIcon strokeWidth={0.75} /> },
  { href: '/timer', label: 'Timer', logo: <TimerResetIcon strokeWidth={0.75} /> },
  { href: '/challenge', label: 'Challenge', logo: <CrownIcon strokeWidth={0.75} /> },
]

export default function BottomNav() {
  const [path, setPath] = useState('' as string);
  const user = useGetUser()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPath(window.location.pathname);
    }
  }, []);

  const handleClick = (href: string) => {
    setPath(href);
  };

  const ActiveSvg = () => {
    return <div className="absolute animate-circle -top-1" style={{ width: '100%', height: '100%' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="7" viewBox="0 0 63 31" fill="none">
        <path d="M31 0.5C53.9987 2.70631 63.0014 30.9977 63.0014 30.9977H31.5014H0.00146484C0.00146484 30.9977 8.0013 -1.70631 31 0.5Z" fill="#9DA44C" />
      </svg>
    </div>
  }


  return (
    <>
      {user && <>
        <div className=" bg-slate-950 font-['Inter'] capitalize tracking-wide font-light text-sm py-2 rounded-2xl">
          <nav className="max-w-md mx-auto px-4 py-2 flex justify-around">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <button onClick={() => handleClick(item.href)}
                  className={`p-1 pt-2 ${path === item.href ? 'text-main bg-transmain' : 'text-gray-200'} relative flex flex-col gap-2 item-center rounded-xl `}
                >
                  {path === item.href && <ActiveSvg />}
                  <div>{item.logo}</div>
                </button>
              </Link>
            ))}
          </nav>
        </div>
      </>}
    </>

  )
}