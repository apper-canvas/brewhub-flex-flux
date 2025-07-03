import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import { formatDistanceToNow } from 'date-fns'

const OrderCard = ({ order, onViewDetails, onCancelOrder }) => {
  const { orderNumber, customerName, items, total, status, pickupTime, createdAt } = order

  const getStatusVariant = (status) => {
    switch (status) {
      case 'received': return 'info'
      case 'preparing': return 'warning'
      case 'ready': return 'success'
      case 'completed': return 'default'
      case 'cancelled': return 'danger'
      default: return 'default'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'received': return 'text-blue-600'
      case 'preparing': return 'text-yellow-600'
      case 'ready': return 'text-green-600'
      case 'completed': return 'text-gray-600'
      case 'cancelled': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <Card variant="elevated" className="relative">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display text-xl text-coffee">Order #{orderNumber}</h3>
          <p className="text-gray-600">{customerName}</p>
        </div>
        <Badge variant={getStatusVariant(status)} className="capitalize">
          {status}
        </Badge>
      </div>
      
      <div className="space-y-2 mb-4">
        {items.slice(0, 3).map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span>{item.quantity}x {item.menuItem.name}</span>
            <span>${item.subtotal.toFixed(2)}</span>
          </div>
        ))}
        {items.length > 3 && (
          <p className="text-sm text-gray-500">+{items.length - 3} more items</p>
        )}
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-lg text-coffee">Total: ${total.toFixed(2)}</span>
        <span className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Pickup: {new Date(pickupTime).toLocaleTimeString()}
        </span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails(order)}
          >
            View Details
          </Button>
          {status === 'received' && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onCancelOrder(order.Id)}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

export default OrderCard