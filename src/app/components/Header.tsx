'use client';
import { useState, useEffect } from 'react';
import { MenuIcon } from './icons/IconsNav';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';
import { GoalIcon, Tally5Icon, Zap } from 'lucide-react';

const mainColor ='#EEFF87'

const navigation = [
    { name: 'Daily', href: '/daily', logo: <GoalIcon color={mainColor}/> },
    { name: 'Habbits', href: '/habbits', logo: <Zap color={mainColor}/> },
    { name: 'Goals', href: '/goals', logo: <Tally5Icon color={mainColor}/>}
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
                                <div className='font-[inter] font-thin tracking-wide'>Your Turn</div>
                                <div className='divider'/>
                                <div className='flex flex-col gap-1 z-10'>
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={`flex flex-col items-start justify-start h-full text-sm py-2 px-3 rounded-xl
                                            transition-all duration-200 ease-out  tracking-wide
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