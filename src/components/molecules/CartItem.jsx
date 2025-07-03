import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { menuItem, quantity, customizations, subtotal } = item

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200"
    >
      <img 
        src={menuItem.image} 
        alt={menuItem.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h4 className="font-medium text-coffee">{menuItem.name}</h4>
        {customizations && Object.keys(customizations).length > 0 && (
          <div className="text-sm text-gray-600 mt-1">
            {Object.entries(customizations).map(([key, value]) => (
              <span key={key} className="mr-3">
                {key}: {value}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              icon="Minus"
              onClick={() => onUpdateQuantity(item.Id, quantity - 1)}
              disabled={quantity <= 1}
            />
            <span className="font-medium min-w-[2rem] text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              icon="Plus"
              onClick={() => onUpdateQuantity(item.Id, quantity + 1)}
            />
          </div>
          <span className="font-bold text-coffee">${subtotal.toFixed(2)}</span>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        icon="Trash2"
        onClick={() => onRemove(item.Id)}
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
      />
    </motion.div>
  )
}

export default CartItem