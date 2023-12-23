import FormCategory from "../../form/FormCategory";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightCircleIcon, InfoIcon } from "lucide-react";
import HabitTemplateSummary from "./HabitTemplateSummary";

const setOne = [
    {
        name: 'Morning routine',
    }, {
        name: 'Health improvement',
    }, {
        name: 'Sleep better',
    }
]

const setTwo = [
    {
        name: 'Exercise target',
    }, {
        name: 'Be stronga',
    }, {
        name: 'Skill improvement',
    }
]


const HabitTemplate = () => {
    const [category, setCategory] = useState(1)
    const [template, setTemplate] = useState('')
    const [step, setStep] = useState(1)
    const [active, setActive] = useState('')
    const [activeSet, setActiveSet] = useState(setOne)
    const [habits, setHabits] = useState([])
    const [activeHabit, setActiveHabit] = useState('' as any)
    const handleTemplate = (temp: string) => {
        setStep(2)
        setTemplate(temp)
    }
    const handleCategoryChange = (cat: any) => {
        setCategory(cat)
        if (cat.id === 1) {
            setActiveSet(setOne)
        } else {
            setActiveSet(setTwo)
        }
    }

    const handleHabit = (habit: string) => {
        // If habit exists, remove it
        // If habit doesn't exist, add it
        if (habits.includes(habit)) {
            setHabits(habits.filter(h => h !== habit))
        } else {
            setHabits([...habits, habit])
        }
    }
    // Get all templates
    // Převzít komponentu z menu pro editaci habitu
    // Pick category
    // Pick template
    // Post habit from template
    // Select goals 
    return <div className="flex flex-col justify-start w-full h-full text-sm">
        <div className='divider' />
        <FormCategory activeCategory={category} setActiveCategory={handleCategoryChange} />
        <div className='divider' />
        {active !== '' ? <div className="cat-row">Select one routine</div> : <div className="cat-row">Choose a template</div>}
        <div className="flex flex-col justify-start gap-3 w-full">
            <div className="flex flex-row justify-between">
                {active === '' && <div className={`flex flex-col items-start gap-7 justify-start h-full text-sm py-1 px-2 font-mono rounded-xl transition-all duration-200 ease-out  tracking-wide`}>
                    {activeSet.map((item) => (
                        <motion.div
                            initial={{ opacity: 0, translateX: -100 }}
                            animate={{ opacity: 1, translateX: 0 }}
                            exit={{ opacity: 0, translateX: 100 }}
                            transition={{ duration: 0.3 }}
                            key={item.name}
                            className='flex flex-row items-center justify-between w-full  lg:cursor-pointer'
                            onClick={() => setActive(item.name)}
                        >
                            <div className={`flex flex-row items-center gap-2 ${active === item.name ? 'text-green-300' : ''}`}>
                                <div>{item.name}</div>
                                <div><ArrowRightCircleIcon size={15} /></div>
                            </div>
                        </motion.div>
                    ))}
                </div>}
                {active !== '' && <div className="full-w min-w-[20%]">
                    {active === 'Morning routine' && <motion.div
                        initial={{ opacity: 0, translateX: -100 }}
                        animate={{ opacity: 1, translateX: 0 }}
                        exit={{ opacity: 0, translateX: 100 }}
                        transition={{ duration: 0.3 }}
                    >Choose a template</motion.div>}
                    {active === 'Health improvement' && <div>Edit</div>}
                    {active === 'Sleep better' && <div className="flex flex-row">
                        {setOne.map((item) => (
                            <div key={item.name} className="flex flex-row justify-between">
                                {item.name}
                            </div>
                        ))}
                    </div>}
                </div>}
            </div>
            {active !== '' && <>
                <div className="divider" />
                <div className="cat-row">Choose 3 habits</div>
                {activeHabit !== '' && <motion.div
                    initial={{ opacity: 0, translateX: -100 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    exit={{ opacity: 0, translateX: 100 }}
                    transition={{ duration: 0.3 }}
                ><HabitTemplateSummary habit={activeHabit}/></motion.div>}
                {habits.length > 2 && <></>}
            </>}
        </div>
    </div>
}

export default HabitTemplate;