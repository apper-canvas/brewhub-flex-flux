export const orderService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "order_number" } },
          { field: { Name: "customer_name" } },
          { field: { Name: "phone" } },
          { field: { Name: "items" } },
          { field: { Name: "total" } },
          { field: { Name: "status" } },
          { field: { Name: "pickup_time" } },
          { field: { Name: "created_at" } }
        ],
        orderBy: [
          {
            fieldName: "created_at",
            sorttype: "DESC"
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('order', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching orders:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "order_number" } },
          { field: { Name: "customer_name" } },
          { field: { Name: "phone" } },
          { field: { Name: "items" } },
          { field: { Name: "total" } },
          { field: { Name: "status" } },
          { field: { Name: "pickup_time" } },
          { field: { Name: "created_at" } }
        ]
      };
      
      const response = await apperClient.getRecordById('order', id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching order with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async create(order) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Only include Updateable fields
      const createData = {
        Name: order.Name || `Order for ${order.customerName}`,
        Tags: order.Tags,
        Owner: order.Owner,
        order_number: order.order_number || `BH${Date.now().toString().slice(-6)}`,
        customer_name: order.customerName,
        phone: order.phone,
        items: JSON.stringify(order.items),
        total: order.total,
        status: order.status,
        pickup_time: order.pickupTime,
        created_at: order.createdAt || new Date().toISOString()
      };
      
      const params = {
        records: [createData]
      };
      
      const response = await apperClient.createRecord('order', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to create order');
        }
        
        return successfulRecords[0]?.data;
      }
      
      throw new Error('No response data');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating order:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async update(id, updates) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Only include Updateable fields
      const updateData = {
        Id: id,
        ...(updates.Name && { Name: updates.Name }),
        ...(updates.Tags && { Tags: updates.Tags }),
        ...(updates.Owner && { Owner: updates.Owner }),
        ...(updates.order_number && { order_number: updates.order_number }),
        ...(updates.customer_name && { customer_name: updates.customer_name }),
        ...(updates.phone && { phone: updates.phone }),
        ...(updates.items && { items: typeof updates.items === 'string' ? updates.items : JSON.stringify(updates.items) }),
        ...(updates.total !== undefined && { total: updates.total }),
        ...(updates.status && { status: updates.status }),
        ...(updates.pickup_time && { pickup_time: updates.pickup_time }),
        ...(updates.created_at && { created_at: updates.created_at })
      };
      
      const params = {
        records: [updateData]
      };
      
      const response = await apperClient.updateRecord('order', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to update order');
        }
        
        return successfulRecords[0]?.data;
      }
      
      throw new Error('No response data');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating order:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        RecordIds: [id]
      };
      
      const response = await apperClient.deleteRecord('order', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          throw new Error(failedDeletions[0].message || 'Failed to delete order');
        }
        
        return successfulDeletions.length === 1;
      }
      
      throw new Error('No response data');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting order:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
}