import { ArrowRightIcon } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export type AiResponseType = {
    action: (name: string) => void,
    item: {
        name: string,
        description: string,
        rationale: string
    }
}
const AiResponse = ({ action, item }: AiResponseType) => {
    return <AnimatePresence><motion.div
        className="flex flex-col gap-1 items-start p-2 rounded-xl bg-gray-600/10"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
    >
        <motion.div 
            onClick={() => { action(item.name) }} 
            className="text-main bg-gray-800/70 px-4 py-1 rounded my-1 flex gap-3 md:cursor-pointer md:hover:text-main/90"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            >
            {item.name} <ArrowRightIcon />
        </motion.div>
        <div className="tracking-wider text-gray-100 text-xs">{item.description}</div>
        <br />
        <div className="tracking-wider text-gray-100 text-xs">{item.rationale}</div>
    </motion.div></AnimatePresence>
}

export default AiResponse