import { NavLink } from 'react-router-dom'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'
import { useCart } from '@/hooks/useCart'

const MobileNavigation = () => {
  const { items } = useCart()
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const navigationItems = [
    { to: '/menu', label: 'Menu', icon: 'Coffee' },
    { to: '/orders', label: 'Orders', icon: 'Clock' },
    { to: '/cart', label: 'Cart', icon: 'ShoppingCart' }
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-orange/20 z-40">
      <nav className="flex items-center justify-around py-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 relative ${
                isActive
                  ? 'text-orange'
                  : 'text-gray-600 hover:text-orange'
              }`
            }
          >
            <ApperIcon name={item.icon} size={24} />
            <span className="text-xs font-medium">{item.label}</span>
            {item.to === '/cart' && totalItems > 0 && (
              <Badge
                variant="danger"
                size="sm"
                className="absolute -top-1 -right-1"
              >
                {totalItems}
              </Badge>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default MobileNavigation