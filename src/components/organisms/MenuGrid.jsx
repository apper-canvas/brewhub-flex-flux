import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import MenuItemCard from '@/components/molecules/MenuItemCard'
import MenuItemModal from '@/components/molecules/MenuItemModal'
import SearchBar from '@/components/molecules/SearchBar'
import CategoryFilter from '@/components/molecules/CategoryFilter'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { menuService } from '@/services/api/menuService'
import { useCart } from '@/hooks/useCart'

const MenuGrid = () => {
  const [menuItems, setMenuItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const { addItem } = useCart()

  const categories = ['all', 'coffee', 'tea', 'pastries', 'sandwiches']

  useEffect(() => {
    loadMenuItems()
  }, [])

  useEffect(() => {
    filterItems()
  }, [menuItems, searchTerm, activeCategory])

  const loadMenuItems = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await menuService.getAll()
      setMenuItems(data)
    } catch (err) {
      setError('Failed to load menu items. Please try again.')
      console.error('Error loading menu items:', err)
    } finally {
      setLoading(false)
    }
  }

  const filterItems = () => {
    let filtered = menuItems

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory)
    }

    setFilteredItems(filtered)
  }

  const handleAddToCart = (item) => {
    addItem(item)
    toast.success(`${item.name} added to cart!`)
  }

  const handleViewDetails = (item) => {
    setSelectedItem(item)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedItem(null)
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadMenuItems} />

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <SearchBar
          onSearch={setSearchTerm}
          placeholder="Search menu items..."
          className="w-full md:w-96"
        />
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* Menu Grid */}
      {filteredItems.length === 0 ? (
        <Empty
          title="No menu items found"
          description="Try adjusting your search or filter criteria"
          actionText="Clear Filters"
          onAction={() => {
            setSearchTerm('')
            setActiveCategory('all')
          }}
        />
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.Id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <MenuItemCard
                  item={item}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Menu Item Detail Modal */}
      <MenuItemModal
        isOpen={showModal}
        onClose={handleCloseModal}
        item={selectedItem}
        onAddToCart={handleAddToCart}
      />
    </div>
  )
}

export default MenuGrid