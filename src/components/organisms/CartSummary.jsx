import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import CartItem from '@/components/molecules/CartItem'
import OrderFormModal from '@/components/molecules/OrderFormModal'
import Empty from '@/components/ui/Empty'
import { useCart } from '@/hooks/useCart'
import { orderService } from '@/services/api/orderService'

const CartSummary = () => {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCart()
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [processing, setProcessing] = useState(false)

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId)
      toast.info('Item removed from cart')
    } else {
      updateQuantity(itemId, newQuantity)
    }
  }

  const handleRemoveItem = (itemId) => {
    removeItem(itemId)
    toast.info('Item removed from cart')
  }

  const handlePlaceOrder = async (orderData) => {
    try {
      setProcessing(true)
      
      const orderPayload = {
        ...orderData,
        items: items,
        total: getTotalPrice(),
        status: 'received',
        createdAt: new Date().toISOString()
      }

      await orderService.create(orderPayload)
      
      clearCart()
      setShowOrderForm(false)
      toast.success('Order placed successfully!')
    } catch (err) {
      toast.error('Failed to place order. Please try again.')
      console.error('Error placing order:', err)
    } finally {
      setProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <Empty
        title="Your cart is empty"
        description="Add some delicious items from our menu to get started!"
        actionText="Browse Menu"
        onAction={() => window.location.href = '/menu'}
      />
    )
  }

  return (
    <div className="space-y-6">
      <Card variant="elevated">
        <h2 className="font-display text-2xl text-coffee mb-6">Your Order</h2>
        
        <div className="space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <CartItem
                key={item.Id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </AnimatePresence>
        </div>
        
        <div className="border-t pt-4 mt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium text-coffee">Subtotal:</span>
            <span className="text-2xl font-bold text-coffee">
              ${getTotalPrice().toFixed(2)}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={clearCart}
              className="flex-1"
              icon="Trash2"
            >
              Clear Cart
            </Button>
            <Button
              variant="primary"
              onClick={() => setShowOrderForm(true)}
              className="flex-1"
              icon="CreditCard"
              disabled={processing}
            >
              {processing ? 'Processing...' : 'Place Order'}
            </Button>
          </div>
        </div>
      </Card>

      <OrderFormModal
        isOpen={showOrderForm}
        onClose={() => setShowOrderForm(false)}
        onSubmit={handlePlaceOrder}
        orderTotal={getTotalPrice()}
      />
    </div>
  )
}

export default CartSummary