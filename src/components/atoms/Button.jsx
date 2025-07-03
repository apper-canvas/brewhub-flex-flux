import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  disabled = false,
  onClick,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-orange to-orange/90 text-white hover:from-orange/90 hover:to-orange shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-caramel to-caramel/90 text-white hover:from-caramel/90 hover:to-caramel shadow-lg hover:shadow-xl',
    outline: 'bg-transparent border-2 border-orange text-orange hover:bg-orange hover:text-white',
    ghost: 'bg-transparent text-coffee hover:bg-coffee/10',
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  }

  const baseClasses = `
    inline-flex items-center justify-center gap-2 
    rounded-lg font-medium transition-all duration-200 
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-orange/50
  `

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <ApperIcon name={icon} size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <ApperIcon name={icon} size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
      )}
    </motion.button>
  )
}

export default Button