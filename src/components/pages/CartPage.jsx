import { motion } from 'framer-motion'
import CartSummary from '@/components/organisms/CartSummary'

const CartPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h1 className="font-display text-4xl md:text-5xl text-coffee mb-4">
          Your Cart
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Review your order and proceed to checkout. 
          We can't wait to prepare your delicious items!
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <CartSummary />
      </div>
    </motion.div>
  )
}

export default CartPage