'use client';
import Link from 'next/link'
import { MenuIcon } from './icons/IconsNav'
import {useState, useEffect} from 'react'

const navItems = [
  { href: '/daily', label: 'Daily', logo: <MenuIcon/> },
  { href: '/goals', label: 'Goals', logo: <MenuIcon/> },
  { href: '/timer', label: 'Timer', logo: <MenuIcon/> },
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
            <div className={`${path === item.href ? 'text-main' : 'text-gray-200'}`}>
                <div>{item.label}</div>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  )
}