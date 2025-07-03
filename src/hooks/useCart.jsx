import { createContext, useContext, useReducer } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => 
        item.menuItem.Id === action.payload.Id && 
        JSON.stringify(item.customizations) === JSON.stringify(action.payload.customizations)
      )
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.Id === existingItem.Id
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          )
        }
      }
      
      const newItem = {
        Id: Date.now(), // Simple ID generation
        menuItem: action.payload,
        quantity: action.payload.quantity || 1,
        customizations: action.payload.customizations || {},
        subtotal: action.payload.price * (action.payload.quantity || 1)
      }
      
      return {
        ...state,
        items: [...state.items, newItem]
      }
    }
    
    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items.map(item =>
          item.Id === action.payload.itemId
            ? { ...item, quantity: action.payload.quantity, subtotal: item.menuItem.price * action.payload.quantity }
            : item
        )
      }
    }
    
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.Id !== action.payload.itemId)
      }
    }
    
case 'CLEAR_CART': {
      return {
        ...state,
        items: []
      }
    }
    
    case 'ADD_FAVORITE': {
      const exists = state.favorites.some(fav => fav.Id === action.payload.Id)
      if (exists) return state
      
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      }
    }
    
    case 'REMOVE_FAVORITE': {
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav.Id !== action.payload.itemId)
      }
    }
    
    case 'REORDER_FAVORITES': {
      const { startIndex, endIndex } = action.payload
      const newFavorites = Array.from(state.favorites)
      const [removed] = newFavorites.splice(startIndex, 1)
      newFavorites.splice(endIndex, 0, removed)
      
      return {
        ...state,
        favorites: newFavorites
      }
    }
    
    default:
      return state
  }
}

const initialState = {
  items: [],
  favorites: []
}
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const updateQuantity = (itemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } })
  }

  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + item.subtotal, 0)
  }

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

const toggleFavorite = (item) => {
    const isFavorite = state.favorites.some(fav => fav.Id === item.Id)
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FAVORITE', payload: { itemId: item.Id } })
    } else {
      dispatch({ type: 'ADD_FAVORITE', payload: item })
    }
  }

  const reorderFavorites = (startIndex, endIndex) => {
    dispatch({ type: 'REORDER_FAVORITES', payload: { startIndex, endIndex } })
  }

  const getFavorites = () => {
    return state.favorites
  }

  const value = {
    items: state.items,
    favorites: state.favorites,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalPrice,
    getTotalItems,
    toggleFavorite,
    reorderFavorites,
    getFavorites
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}