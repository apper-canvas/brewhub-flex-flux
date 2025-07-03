import { forwardRef } from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = forwardRef(({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  icon, 
  iconPosition = 'left',
  error,
  disabled = false,
  className = '',
  ...props 
}, ref) => {
  const baseClasses = `
    w-full px-4 py-3 rounded-lg border-2 
    bg-white/80 backdrop-blur-sm
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-orange/50
    disabled:opacity-50 disabled:cursor-not-allowed
    placeholder:text-gray-400
  `

  const stateClasses = error 
    ? 'border-red-300 focus:border-red-500' 
    : 'border-gray-200 focus:border-orange hover:border-orange/50'

  return (
    <div className="relative">
      {icon && iconPosition === 'left' && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <ApperIcon name={icon} size={20} />
        </div>
      )}
      
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          ${baseClasses} 
          ${stateClasses} 
          ${icon && iconPosition === 'left' ? 'pl-10' : ''}
          ${icon && iconPosition === 'right' ? 'pr-10' : ''}
          ${className}
        `}
        {...props}
      />
      
      {icon && iconPosition === 'right' && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <ApperIcon name={icon} size={20} />
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input