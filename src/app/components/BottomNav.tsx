'use client';
import Link from 'next/link'
import {useState, useEffect} from 'react'
import { BookCheckIcon, GoalIcon, TimerResetIcon } from 'lucide-react';

const navItems = [
  { href: '/daily', label: 'Daily', logo: <BookCheckIcon strokeWidth={0.75}/> },
  { href: '/goals', label: 'Goals', logo: <GoalIcon strokeWidth={0.75}/>  },
  { href: '/timer', label: 'Timer', logo: <TimerResetIcon strokeWidth={0.75}/> },
]

export default function BottomNav() {
  const [path, setPath] = useState('' as string);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPath(window.location.pathname);
    }
  }, []);


  return (
    <div className="asbsolute bottom-0 w-full bg-slate-950 font-['Inter'] capitalize tracking-wide font-light text-sm py-2">
      <nav className="max-w-md mx-auto px-4 py-2 flex justify-around">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className={`${path === item.href ? 'text-main' : 'text-gray-200'} flex flex-col gap-2 item-center`}>
                <div className='pl-1'>{item.logo}</div>
                <div className='text-xs'>{item.label}</div>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  )
}