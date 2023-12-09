'use client';
import { useState, useEffect } from 'react';
import { MenuIcon } from './icons/IconsNav';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';

const randomLogo = () => {
    return (
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="14" height="2" rx="1" transform="matrix(1 0 0 -1 0 2)" fill="#EEFF87"/>
            <rect width="14" height="2" rx="1" transform="matrix(1 0 0 -1 0 6)" fill="#EEFF87"/>
            <rect width="14" height="2" rx="1" transform="matrix(1 0 0 -1 0 10)" fill="#EEFF87"/>
        </svg>
    )
}

const navigation = [
    { name: 'Daily', href: '/daily', logo: randomLogo() },
    { name: 'Habbits', href: '/habbits', logo: randomLogo() },
    { name: 'Goals', href: '/goals', logo: randomLogo() },
]
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeRoute, setActiveRoute] = useState('' as string);

    const getActiveRoute = () => {
        const path = window.location.pathname;
        const route = navigation.find((route) => route.href === path);
        return route;
    }

    useEffect(() => {
        const route = getActiveRoute();
        if (route) {
            setActiveRoute(route.name);
        }
    }, []);

    // TBD responsivity

    return <>
        <nav aria-label='Global'>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <div className='
                                     flex flex-row justify-center items-center
                                     bg-gray-950 w-10 h-10 rounded-full relative z-0 
                                '>
                                   <div className='absolute z-10 '> <MenuIcon /></div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div>Logo</div>
                                <div>Motto</div>
                                <div className='divider'/>
                                <div className='flex flex-col gap-1'>
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={`flex flex-col items-start justify-start h-full text-sm py-2 px-3 rounded-xl
                                            transition-all duration-200 ease-out 
                                            lg:cursor-pointer lg:focus-within:bg-gray-950 lg:hover:font-bold
                                            ${activeRoute === item.name ? 'bg-gray-950' : ''}`}
                                            onClick={() => {
                                                setActiveRoute(item.name);
                                                setIsOpen(false);
                                            }}
                                        >
                                           <div className='flex items-center justify-start gap-2'>
                                                {item.logo}
                                                <span>{item.name}</span>
                                             </div>
                                        </a>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
            <div className='hidden'>
                <div className={`lg:block ${isOpen ? 'block' : 'hidden'}`}>
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className='menu-item'
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    </>
}

export default Header;