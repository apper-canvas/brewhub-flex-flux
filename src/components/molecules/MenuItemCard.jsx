import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const MenuItemCard = ({ item, onAddToCart, onViewDetails }) => {
  const { name, description, price, category, image, inStock } = item

  return (
    <Card
      variant="elevated"
      hover={inStock}
      className="overflow-hidden h-full flex flex-col"
    >
      <div className="relative mb-4">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover rounded-lg"
        />
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
            <Badge variant="danger">Out of Stock</Badge>
          </div>
        )}
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" size="sm">
            {category}
          </Badge>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <h3 className="font-display text-lg text-coffee mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-1">{description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-coffee">${price.toFixed(2)}</span>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              icon="Eye"
              onClick={() => onViewDetails(item)}
            />
            <Button
              variant="primary"
              size="sm"
              icon="Plus"
              onClick={() => onAddToCart(item)}
              disabled={!inStock}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default MenuItemCard