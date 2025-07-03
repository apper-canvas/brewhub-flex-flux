import orderData from '@/services/mockData/orders.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const orderService = {
  async getAll() {
    await delay(400)
    return [...orderData]
  },

  async getById(id) {
    await delay(200)
    const order = orderData.find(order => order.Id === id)
    if (!order) {
      throw new Error('Order not found')
    }
    return { ...order }
  },

  async create(order) {
    await delay(600)
    const newOrder = {
      ...order,
      Id: Math.max(...orderData.map(o => o.Id)) + 1,
      orderNumber: `BH${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString()
    }
    orderData.push(newOrder)
    return { ...newOrder }
  },

  async update(id, updates) {
    await delay(400)
    const index = orderData.findIndex(order => order.Id === id)
    if (index === -1) {
      throw new Error('Order not found')
    }
    orderData[index] = { ...orderData[index], ...updates }
    return { ...orderData[index] }
  },

  async delete(id) {
    await delay(300)
    const index = orderData.findIndex(order => order.Id === id)
    if (index === -1) {
      throw new Error('Order not found')
    }
    const deletedOrder = orderData.splice(index, 1)[0]
    return { ...deletedOrder }
  }
}