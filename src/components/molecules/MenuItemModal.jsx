import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const MenuItemModal = ({ isOpen, onClose, item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1)
  const [customizations, setCustomizations] = useState({})
  const [totalPrice, setTotalPrice] = useState(0)
  const [showNutrition, setShowNutrition] = useState(false)
  useEffect(() => {
    if (item) {
      setTotalPrice(item.price * quantity)
      setQuantity(1)
      setCustomizations({})
    }
  }, [item])

  useEffect(() => {
    if (item) {
      let price = item.price
      // Add customization costs here if needed
      setTotalPrice(price * quantity)
    }
  }, [quantity, customizations, item])

  const handleCustomizationChange = (option, value) => {
    setCustomizations(prev => ({
      ...prev,
      [option]: value
    }))
  }

  const handleAddToCart = () => {
    onAddToCart({
      ...item,
      quantity,
      customizations,
      subtotal: totalPrice
    })
    onClose()
  }

  if (!item) return null

  const customizationOptions = {
    coffee: {
      size: ['Small', 'Medium', 'Large'],
      milk: ['Regular', 'Oat', 'Almond', 'Soy'],
      extras: ['Extra Shot', 'Decaf', 'Extra Hot', 'Iced']
    },
    tea: {
      size: ['Small', 'Medium', 'Large'],
      extras: ['Extra Hot', 'Iced', 'Honey', 'Lemon']
    },
    pastries: {
      extras: ['Heated', 'Extra Butter']
    }
  }

  const availableOptions = customizationOptions[item.category] || {}

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="font-display text-2xl text-coffee">{item.name}</h2>
                <Badge variant="secondary" size="sm">
                  {item.category}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                icon="X"
                onClick={onClose}
              />
            </div>
            
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
/>
            
            <p className="text-gray-600 mb-6">{item.description}</p>
            
            {/* Nutritional Information Accordion */}
            <div className="mb-6">
              <motion.button
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setShowNutrition(!showNutrition)}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-medium text-coffee flex items-center gap-2">
                  <ApperIcon name="Info" size={18} />
                  Nutritional Information
                </span>
                <motion.div
                  animate={{ rotate: showNutrition ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ApperIcon name="ChevronDown" size={18} />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {showNutrition && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-white border border-gray-200 rounded-b-lg mt-1">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">{item.nutritional?.calories || 'N/A'}</div>
                          <div className="text-sm text-gray-600">Calories</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{item.nutritional?.sugar || 'N/A'}g</div>
                          <div className="text-sm text-gray-600">Sugar</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Protein</span>
                          <span className="font-medium">{item.nutritional?.protein || 'N/A'}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Fat</span>
                          <span className="font-medium">{item.nutritional?.fat || 'N/A'}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fiber</span>
                          <span className="font-medium">{item.nutritional?.fiber || 'N/A'}g</span>
                        </div>
                      </div>
                      
                      {item.nutritional?.allergens && item.nutritional.allergens.length > 0 && (
                        <div className="mt-4 p-3 bg-red-50 rounded-lg">
                          <div className="flex items-start gap-2">
                            <ApperIcon name="AlertTriangle" size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium text-red-700 mb-1">Allergen Information</div>
                              <div className="text-sm text-red-600">
                                Contains: {item.nutritional.allergens.join(', ')}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {item.nutritional?.additionalInfo && (
                        <div className="mt-3 p-3 bg-green-50 rounded-lg">
                          <div className="text-sm text-green-700">
                            <ApperIcon name="Leaf" size={14} className="inline mr-1" />
                            {item.nutritional.additionalInfo}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Customization Options */}
            {Object.entries(availableOptions).map(([optionType, options]) => (
              <div key={optionType} className="mb-6">
                <h3 className="font-medium text-coffee mb-3 capitalize">{optionType}</h3>
                <div className="flex flex-wrap gap-2">
                  {options.map((option) => (
                    <Button
                      key={option}
                      variant={customizations[optionType] === option ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleCustomizationChange(optionType, option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Quantity */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-medium text-coffee">Quantity</span>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  icon="Minus"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                />
                <span className="font-medium text-lg min-w-[2rem] text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  icon="Plus"
                  onClick={() => setQuantity(quantity + 1)}
                />
              </div>
            </div>
            
            {/* Total and Add to Cart */}
            <div className="flex items-center justify-between pt-6 border-t">
              <span className="font-bold text-xl text-coffee">
                Total: ${totalPrice.toFixed(2)}
              </span>
              <Button
                variant="primary"
                size="lg"
                icon="ShoppingCart"
                onClick={handleAddToCart}
                disabled={!item.inStock}
              >
                Add to Cart
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MenuItemModal