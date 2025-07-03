import menuData from '@/services/mockData/menuItems.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const menuService = {
  async getAll() {
    await delay(300)
    return [...menuData]
  },

  async getById(id) {
    await delay(200)
    const item = menuData.find(item => item.Id === id)
    if (!item) {
      throw new Error('Menu item not found')
    }
    return { ...item }
  },

  async getByCategory(category) {
    await delay(250)
    return menuData.filter(item => item.category === category)
  },

  async create(item) {
    await delay(500)
    const newItem = {
      ...item,
      Id: Math.max(...menuData.map(i => i.Id)) + 1
    }
    menuData.push(newItem)
    return { ...newItem }
  },

  async update(id, updates) {
    await delay(400)
    const index = menuData.findIndex(item => item.Id === id)
    if (index === -1) {
      throw new Error('Menu item not found')
    }
    menuData[index] = { ...menuData[index], ...updates }
    return { ...menuData[index] }
  },

  async delete(id) {
    await delay(300)
    const index = menuData.findIndex(item => item.Id === id)
    if (index === -1) {
      throw new Error('Menu item not found')
    }
    const deletedItem = menuData.splice(index, 1)[0]
    return { ...deletedItem }
  }
}