import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  variant = 'default',
  hover = false,
  className = '',
  onClick,
  ...props 
}) => {
  const variants = {
    default: 'bg-white/80 backdrop-blur-sm border border-gray-200',
    elevated: 'bg-white/90 backdrop-blur-sm shadow-lg border border-gray-100',
    premium: 'bg-gradient-to-br from-cream to-white/90 backdrop-blur-sm shadow-xl border border-orange/20'
  }

  const baseClasses = `
    rounded-xl p-6 
    transition-all duration-300
    ${variants[variant]}
    ${hover ? 'hover:shadow-lg hover:scale-[1.02] cursor-pointer' : ''}
    ${onClick ? 'cursor-pointer' : ''}
  `

  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -4 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card