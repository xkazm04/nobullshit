'use client'
import { categories } from "@/data/enums";
import { getCategoryColor } from "@/app/lib/colorGetter";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
const FormCategory = ({ activeCategory, setActiveCategory }: any) => {
    const hexColor = getCategoryColor(activeCategory.id);
    const [display, setDisplay] = useState(activeCategory)

    return (
        <>
            <div className="cat-row">Which area you want to improve?</div>
            <div className="flex flex-row w-full gap-5">
                <div className=" bg-gray-600/20 p-6 rounded-xl border border-gray-700/40 h-[120px] my-5 w-full flex flex-row justify-between" >
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
                                <div className="flex flex-row items-center">
                                    <div
                                        className={'w-5 h-5 rounded-full inline-block mr-2 lg:cursor-pointer transition-all duration-300 ease-in-out'}
                                        style={activeCategory.id === display.id ? { backgroundColor: hexColor } : { backgroundColor: 'transparent', border: '1px solid #4B5563' }}
                                        onClick={() => setActiveCategory(display)}
                                    />
                                    <div>{display.name}</div>
                                </div>
                                <div className="text-xs text-gray-600 my-2">Become master of any craft</div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <AnimatePresence>
                        <motion.div
                            key={display.id}
                            className="absolute text-xs text-gray-300 right-5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1}}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="border-b border-gray-500/20 pt-1 pb-2 w-full">{display.name}</div>
                            <div className="border-b border-gray-500/20 pt-1 pb-2 w-full">Skill</div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            <div className="flex flex-row w-full">
                {categories.map(c => (
                    <div key={c.id} className="flex flex-row items-center justify-center w-1/4">
                        <div className={`lg:cursor-pointer text-xs transition-all duration-300 ease-in-out
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