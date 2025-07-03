import { motion } from "framer-motion";
import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";

export default function MenuItemCard({ item, onAddToCart, onViewDetails }) {
  const { name, price, description, image, inStock, category } = item
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <div className="w-full h-48 bg-gray-100 relative overflow-hidden">
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <ApperIcon name="image" size={24} className="text-gray-400" />
                  </div>
                </div>
              </div>
            )}
            
            {!imageError ? (
              <img
                src={image}
                alt={name}
                className={`w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-coffee/10 to-orange/10 flex flex-col items-center justify-center">
                <ApperIcon name="image" size={32} className="text-coffee/40 mb-2" />
                <span className="text-coffee/60 text-sm font-medium">{name}</span>
              </div>
            )}
          </div>
          
          {!inStock && (
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="capitalize">
              {category}
            </Badge>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-display text-lg font-semibold text-coffee truncate">
              {name}
            </h3>
            <span className="font-bold text-orange text-lg ml-2">
              ${price.toFixed(2)}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {description}
</p>
          
          <div className="flex gap-2">
            <Button
              icon="Plus"
              onClick={() => onAddToCart(item)}
              disabled={!inStock}
            >
              Add
            </Button>
          </div>
        </div>
      </motion.div>
    </Card>
  )
}