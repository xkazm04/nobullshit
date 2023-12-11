'use client';
import { useState, useEffect } from 'react';
import { MenuIcon } from './icons/IconsNav';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';
import { ArrowRight, GoalIcon, Tally5Icon, Zap } from 'lucide-react';
const mainColor ='#EEFF87'

const navigation = [
    { name: 'Daily', href: '/daily', logo: <GoalIcon color={mainColor} strokeWidth={0.75} size={20}/> },
    { name: 'Habbits', href: '/habbits', logo: <Zap color={mainColor}  strokeWidth={0.75} size={20}/> },
    { name: 'Goals', href: '/goals', logo: <Tally5Icon color={mainColor}  strokeWidth={0.75} size={20}/>},
    { name: 'Challenges', href: '/challenges', logo: <GoalIcon color={mainColor} strokeWidth={0.75} size={20}/> },
]
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeRoute, setActiveRoute] = useState('' as string);;

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
                                <div className='font-mono text-main tracking-wide'>Your Turn</div>
                                <div className='divider'/>
                                <div className='title-menu'>Features</div>
                                <div className='flex flex-col gap-1 z-10'>
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={`flex flex-col items-start justify-start h-full text-sm py-1 px-2 font-mono rounded-xl
                                            transition-all duration-200 ease-out  tracking-wide
                                            lg:cursor-pointer lg:focus-within:bg-gray-950 lg:hover:font-bold lg:hover:bg-cc
                                            ${activeRoute === item.name ? 'bg-gray-950' : ''}`}
                                            onClick={() => {
                                                setActiveRoute(item.name);
                                                setIsOpen(false);
                                            }}
                                        >
                                           <div className='flex flex-row items-center justify-between w-full'>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <div>{item.logo}</div>
                                                    <div>{item.name}</div>
                                                </div>
                                                <div>
                                                    <ArrowRight color={mainColor} strokeWidth={0.75} size={20}/>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                                <div className='divider'/>
                                <div className='title-menu'>Integrations</div>
                                <div className='divider'/>
                                <div className='title-menu'>Settings</div>
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