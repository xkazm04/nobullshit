import { motion } from "framer-motion"
const Divider = () => {
    return <motion.div className='bg-gray-400/60 my-3 h-[1px]'
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: '100%' }}
    />
}

export default Divider