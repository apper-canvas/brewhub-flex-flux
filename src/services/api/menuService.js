export const menuService = {
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
          { field: { Name: "category" } },
          { field: { Name: "price" } },
          { field: { Name: "description" } },
          { field: { Name: "image" } },
          { field: { Name: "customizations" } },
          { field: { Name: "nutritional" } },
          { field: { Name: "in_stock" } }
        ]
      };
      
      const response = await apperClient.fetchRecords('menu_item', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching menu items:", error?.response?.data?.message);
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
          { field: { Name: "category" } },
          { field: { Name: "price" } },
          { field: { Name: "description" } },
          { field: { Name: "image" } },
          { field: { Name: "customizations" } },
          { field: { Name: "nutritional" } },
          { field: { Name: "in_stock" } }
        ]
      };
      
      const response = await apperClient.getRecordById('menu_item', id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching menu item with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async getByCategory(category) {
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
          { field: { Name: "category" } },
          { field: { Name: "price" } },
          { field: { Name: "description" } },
          { field: { Name: "image" } },
          { field: { Name: "customizations" } },
          { field: { Name: "nutritional" } },
          { field: { Name: "in_stock" } }
        ],
        where: [
          {
            FieldName: "category",
            Operator: "EqualTo",
            Values: [category]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('menu_item', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching menu items by category:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  },

  async create(item) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Only include Updateable fields
      const createData = {
        Name: item.Name,
        Tags: item.Tags,
        Owner: item.Owner,
        category: item.category,
        price: item.price,
        description: item.description,
        image: item.image,
        customizations: item.customizations,
        nutritional: item.nutritional,
        in_stock: item.in_stock
      };
      
      const params = {
        records: [createData]
      };
      
      const response = await apperClient.createRecord('menu_item', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to create menu item');
        }
        
        return successfulRecords[0]?.data;
      }
      
      throw new Error('No response data');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating menu item:", error?.response?.data?.message);
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
        ...(updates.category && { category: updates.category }),
        ...(updates.price !== undefined && { price: updates.price }),
        ...(updates.description && { description: updates.description }),
        ...(updates.image && { image: updates.image }),
        ...(updates.customizations && { customizations: updates.customizations }),
        ...(updates.nutritional && { nutritional: updates.nutritional }),
        ...(updates.in_stock !== undefined && { in_stock: updates.in_stock })
      };
      
      const params = {
        records: [updateData]
      };
      
      const response = await apperClient.updateRecord('menu_item', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to update menu item');
        }
        
        return successfulRecords[0]?.data;
      }
      
      throw new Error('No response data');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating menu item:", error?.response?.data?.message);
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
      
      const response = await apperClient.deleteRecord('menu_item', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          throw new Error(failedDeletions[0].message || 'Failed to delete menu item');
        }
        
        return successfulDeletions.length === 1;
      }
      
      throw new Error('No response data');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting menu item:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }
}