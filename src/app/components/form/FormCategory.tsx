import { categories } from "@/data/enums";
import { getCategoryColor } from "@/app/lib/colorGetter";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SkillIcon, StudyIcon, HealthIcon, FitIcon, CodingIcon, SideIcon } from "../icons/IconsCats";


const FormCategory = ({ activeCategory, setActiveCategory }: any) => {
    const hexColor = getCategoryColor(activeCategory.id);
    const [display, setDisplay] = useState(activeCategory)
    const transparentWhite = 'rgba(255, 255, 255, 0.02)';	
    // Fix category illustrations

    return (
        <>
            <div className="cat-row">Which area you want to improve?</div>
            <div className="flex flex-row w-full gap-5">
                <div className=" bg-gray-600/20 md:cursor-pointer transition-all duration-200 ease-in-out relative
                p-6 rounded-xl border border-gray-700/40 h-[120px] my-5 w-full flex flex-row justify-between" 
                    onClick={() => setActiveCategory(display)}
                >
                    <div className="flex flex-col gap-2">
                        <AnimatePresence>
                            <motion.div
                                key={display.id}
                                className="absolute ease-in-out"
                                initial={{ opacity: 0, y: -70 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 70 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="flex flex-row items-center pt-2">
                                    <div
                                        className={`w-5 h-5 rounded-full inline-block mr-2 md:cursor-pointer transition-all duration-300 ease-in-out 
                                        ${activeCategory.id === display.id ? '' : 'animate-bounce'}`}
                                        style={activeCategory.id === display.id ? { backgroundColor: hexColor } : { backgroundColor: 'transparent', border: '1px solid #4B5563' }}
                                    />
                                    <div>{display.name}</div>
                                </div>
                                <div className="text-xs text-gray-600 my-2">{display.description}</div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <div className="absolute right-[30%] top-0 h-[100px] w-[100px]">
                        <SkillIcon width={50} height={50} color={'blue'} />
                    </div>
                    <div className="text-xs px-2 font-sans bg-transmain absolute top-0">
                        {display !== activeCategory ? 'Activate' : ''}
                    </div>
                    <AnimatePresence>
                        <motion.div
                            key={display.id}
                            className="text-xs text-gray-300 absolute right-[10%]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1}}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                          {display.examples.length > 0 && <div className="flex flex-col gap-1 pt-1 pb-2 w-full">{display.examples.map((e, i) => (
                                <div key={i} className="flex flex-row items-center">
                                    <div className="w-1 h-1 rounded-full inline-block mr-2" style={{ backgroundColor: display.color }} />
                                    <div>{e}</div>
                                </div>
                            ))
                          }</div>}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            <div className="flex flex-row w-full">
                {categories.map(c => (
                    <div key={c.id} className="flex flex-row items-center justify-center w-1/4">
                        <div className={`md:cursor-pointer text-xs transition-all duration-300 ease-in-out md:text-sm
                                    ${display.id === c.id ? `${activeCategory.id === c.id ? 'text-main' : 'text-gray-300'}
                                        ` : `${activeCategory.id === c.id ? 'text-main' : 'text-gray-600 hover:text-gray-400'}`}`}
                            onClick={() => setDisplay(c)}
                        >{c.name}</div>
                        <div className="border-r border-gray-700/80 w-2 h-2" />
                    </div>
                ))}
            </div>
        </>
    );
}

export default FormCategory;