import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'
import { useCart } from '@/hooks/useCart'
import { AuthContext } from '@/App'

const Header = () => {
  const { items } = useCart()
  const { logout } = useContext(AuthContext)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const navigationItems = [
    { to: '/menu', label: 'Menu', icon: 'Coffee' },
    { to: '/orders', label: 'Orders', icon: 'Clock' },
    { to: '/cart', label: 'Cart', icon: 'ShoppingCart' }
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/90 backdrop-blur-md border-b border-orange/20 sticky top-0 z-40"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange to-caramel rounded-xl flex items-center justify-center shadow-lg">
              <ApperIcon name="Coffee" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl text-coffee">BrewHub</h1>
              <p className="text-sm text-gray-600">Coffee Shop System</p>
            </div>
          </NavLink>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-orange to-orange/90 text-white shadow-lg'
                      : 'text-coffee hover:bg-orange/10 hover:text-orange'
                  }`
                }
              >
                <ApperIcon name={item.icon} size={20} />
                <span className="font-medium">{item.label}</span>
                {item.to === '/cart' && totalItems > 0 && (
                  <Badge variant="danger" size="sm">
                    {totalItems}
                  </Badge>
                )}
              </NavLink>
            ))}
</nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              icon="LogOut"
              onClick={logout}
              className="text-coffee hover:text-orange"
            >
              Logout
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            <NavLink to="/cart" className="relative">
              <Button variant="ghost" size="sm" icon="ShoppingCart" />
              {totalItems > 0 && (
                <Badge
                  variant="danger"
                  size="sm"
                  className="absolute -top-2 -right-2"
                >
                  {totalItems}
                </Badge>
              )}
            </NavLink>
            <Button
              variant="ghost"
              size="sm"
              icon="LogOut"
              onClick={logout}
              className="text-coffee hover:text-orange"
            />
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header