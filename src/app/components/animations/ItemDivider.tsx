import { motion } from "framer-motion"
const ItemDivider = () => {
    return <motion.div className='bg-gray-400/60 mx-1 w-[1px]'
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: '100%' }}
    />
}

export default ItemDivider