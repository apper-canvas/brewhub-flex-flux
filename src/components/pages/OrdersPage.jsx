import { motion } from 'framer-motion'
import OrdersDashboard from '@/components/organisms/OrdersDashboard'

const OrdersPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h1 className="font-display text-4xl md:text-5xl text-coffee mb-4">
          Order Status
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Track your orders and see when they're ready for pickup. 
          We'll keep you updated on every step of the process.
        </p>
      </div>
      
      <OrdersDashboard />
    </motion.div>
  )
}

export default OrdersPage