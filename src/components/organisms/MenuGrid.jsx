import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { useCart } from "@/hooks/useCart";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import MenuItemModal from "@/components/molecules/MenuItemModal";
import SearchBar from "@/components/molecules/SearchBar";
import CategoryFilter from "@/components/molecules/CategoryFilter";
import MenuItemCard from "@/components/molecules/MenuItemCard";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import { menuService } from "@/services/api/menuService";
const MenuGrid = () => {
  const [menuItems, setMenuItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [showModal, setShowModal] = useState(false)
const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [showFavorites, setShowFavorites] = useState(true)
  const [draggedItem, setDraggedItem] = useState(null)
  const { addItem, toggleFavorite, reorderFavorites, getFavorites } = useCart()

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

  const handleToggleFavorite = (item) => {
    toggleFavorite(item)
    const isFavorite = getFavorites().some(fav => fav.Id === item.Id)
    toast.success(isFavorite ? `${item.name} removed from favorites` : `${item.name} added to favorites`)
  }

  const handleCloseModal = () => {
    setShowModal(false)
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
        <div className="space-y-8">
          {/* Favorites Section */}
          <FavoritesSection
            favorites={getFavorites()}
            showFavorites={showFavorites}
            onToggleFavorites={setShowFavorites}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            onReorderFavorites={reorderFavorites}
            draggedItem={draggedItem}
            setDraggedItem={setDraggedItem}
          />

          {/* Menu Grid */}
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
                  onToggleFavorite={handleToggleFavorite}
                />
              </motion.div>
            ))}
</AnimatePresence>
        </motion.div>
        </div>
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
// Favorites Section Component
const FavoritesSection = ({
  favorites,
  showFavorites,
  onToggleFavorites,
  onAddToCart,
  onToggleFavorite,
  onReorderFavorites,
  draggedItem,
  setDraggedItem
}) => {
  const handleDragStart = (e, item, index) => {
    setDraggedItem({ item, index })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, dropIndex) => {
    e.preventDefault()
    if (draggedItem && draggedItem.index !== dropIndex) {
      onReorderFavorites(draggedItem.index, dropIndex)
    }
    setDraggedItem(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  if (favorites.length === 0) return null

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ApperIcon name="Star" size={20} className="text-orange" />
          <h2 className="text-xl font-display font-semibold text-coffee">
            Favorites ({favorites.length})
          </h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleFavorites(!showFavorites)}
          icon={showFavorites ? "ChevronUp" : "ChevronDown"}
        >
          {showFavorites ? 'Hide' : 'Show'}
        </Button>
      </div>

      <AnimatePresence>
        {showFavorites && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((item, index) => (
                <motion.div
                  key={item.Id}
                  layout
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`cursor-move p-4 bg-white rounded-lg border-2 transition-all duration-200 ${
                    draggedItem?.item.Id === item.Id
                      ? 'border-orange shadow-lg scale-105'
                      : 'border-gray-200 hover:border-orange/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                      <div className="hidden w-full h-full items-center justify-center">
                        <ApperIcon name="Coffee" size={16} className="text-coffee/40" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-coffee text-sm truncate">{item.name}</h3>
                      <p className="text-orange font-bold text-sm">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onToggleFavorite(item)}
                        className="p-1 hover:bg-orange/10"
                      >
                        <ApperIcon name="Star" size={16} className="text-orange fill-orange" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => onAddToCart(item)}
                        className="px-3 py-1 text-xs"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
export default MenuGrid