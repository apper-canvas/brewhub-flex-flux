import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'

const CategoryFilter = ({ categories, activeCategory, onCategoryChange, className = '' }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {categories.map((category) => (
        <motion.div
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant={activeCategory === category ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className="capitalize"
          >
            {category}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}

export default CategoryFilter