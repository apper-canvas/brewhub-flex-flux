import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import OrderCard from '@/components/molecules/OrderCard'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { orderService } from '@/services/api/orderService'

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')

  const statusFilters = [
    { value: 'all', label: 'All Orders' },
    { value: 'received', label: 'Received' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'ready', label: 'Ready' },
    { value: 'completed', label: 'Completed' }
  ]

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await orderService.getAll()
      // Sort by most recent first
      const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setOrders(sortedOrders)
    } catch (err) {
      setError('Failed to load orders. Please try again.')
      console.error('Error loading orders:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelOrder = async (orderId) => {
    try {
      const updatedOrder = await orderService.update(orderId, { status: 'cancelled' })
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.Id === orderId ? { ...order, status: 'cancelled' } : order
        )
      )
      toast.success('Order cancelled successfully')
    } catch (err) {
      toast.error('Failed to cancel order. Please try again.')
      console.error('Error cancelling order:', err)
    }
  }

  const handleViewDetails = (order) => {
    // In a real app, this would open a detailed view
    toast.info(`Viewing details for Order #${order.orderNumber}`)
  }

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter)

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadOrders} />

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h1 className="font-display text-3xl text-coffee">Orders</h1>
        
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((statusFilter) => (
            <Button
              key={statusFilter.value}
              variant={filter === statusFilter.value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter(statusFilter.value)}
            >
              {statusFilter.label}
            </Button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <Empty
          title="No orders found"
          description={
            filter === 'all' 
              ? "You haven't placed any orders yet. Start by browsing our menu!" 
              : `No orders with status: ${filter}`
          }
          actionText="Browse Menu"
          onAction={() => window.location.href = '/menu'}
        />
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredOrders.map((order) => (
              <motion.div
                key={order.Id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <OrderCard
                  order={order}
                  onViewDetails={handleViewDetails}
                  onCancelOrder={handleCancelOrder}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}

export default OrdersDashboard