import api from './api';

const permissionService = {
  ambilSemua: async () => {
    try {
      const response = await api.get('/permissions');
      return response.data;
    } catch (error) {
      console.error('Error ambil permissions:', error);
      throw error;
    }
  },

  ambilGrouped: async () => {
    try {
      const response = await api.get('/permissions/grouped');
      return response.data;
    } catch (error) {
      console.error('Error ambil grouped permissions:', error);
      throw error;
    }
  },

  ambilModules: async () => {
    try {
      const response = await api.get('/permissions/modules');
      return response.data;
    } catch (error) {
      console.error('Error ambil modules:', error);
      throw error;
    }
  },

  ambilByModule: async (module) => {
    try {
      const response = await api.get(`/permissions/module/${module}`);
      return response.data;
    } catch (error) {
      console.error('Error ambil permissions by module:', error);
      throw error;
    }
  },

  ambilByID: async (id) => {
    try {
      const response = await api.get(`/permissions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error ambil permission by ID:', error);
      throw error;
    }
  },

  tambah: async (data) => {
    try {
      const response = await api.post('/permissions', data);
      return response.data;
    } catch (error) {
      console.error('Error tambah permission:', error);
      throw error;
    }
  },

  perbarui: async (id, data) => {
    try {
      const response = await api.put(`/permissions/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error perbarui permission:', error);
      throw error;
    }
  },

  hapus: async (id) => {
    try {
      const response = await api.delete(`/permissions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error hapus permission:', error);
      throw error;
    }
  }
};

export default permissionService;