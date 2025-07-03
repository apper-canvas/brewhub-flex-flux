import { motion } from 'framer-motion'
import MenuGrid from '@/components/organisms/MenuGrid'

const MenuPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h1 className="font-display text-4xl md:text-5xl text-coffee mb-4">
          Our Menu
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our carefully crafted selection of premium coffees, teas, and fresh pastries. 
          Each item is prepared with love and the finest ingredients.
        </p>
      </div>
      
      <MenuGrid />
    </motion.div>
  )
}

export default MenuPage