import api from './api';

const roleService = {
  ambilSemua: async () => {
    try {
      const response = await api.get('/roles');
      return response.data;
    } catch (error) {
      console.error('Error ambil roles:', error);
      throw error;
    }
  },

  ambilByID: async (id) => {
    try {
      const response = await api.get(`/roles/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error ambil role by ID:', error);
      throw error;
    }
  },

  tambah: async (data) => {
    try {
      const response = await api.post('/roles', data);
      return response.data;
    } catch (error) {
      console.error('Error tambah role:', error);
      throw error;
    }
  },

  perbarui: async (id, data) => {
    try {
      const response = await api.put(`/roles/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error perbarui role:', error);
      throw error;
    }
  },

  hapus: async (id) => {
    try {
      const response = await api.delete(`/roles/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error hapus role:', error);
      throw error;
    }
  },

  ambilPermissions: async (roleId) => {
    try {
      const response = await api.get(`/roles/${roleId}/permissions`);
      return response.data;
    } catch (error) {
      console.error('Error ambil permissions role:', error);
      throw error;
    }
  },

  updatePermissions: async (roleId, permissionIds) => {
    try {
      const response = await api.put(`/roles/${roleId}/permissions`, {
        permission_ids: permissionIds
      });
      return response.data;
    } catch (error) {
      console.error('Error update permissions role:', error);
      throw error;
    }
  }
};

export default roleService;