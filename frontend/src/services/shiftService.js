import api from './api';

const shiftService = {
  ambilSemua: async () => {
    try {
      const response = await api.get('/shift');
      return response.data;
    } catch (error) {
      console.error('Error ambil shift:', error);
      throw error;
    }
  },

  ambilByID: async (id) => {
    try {
      const response = await api.get(`/shift/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error ambil shift by ID:', error);
      throw error;
    }
  },

  tambah: async (data) => {
    try {
      const response = await api.post('/shift', data);
      return response.data;
    } catch (error) {
      console.error('Error tambah shift:', error);
      throw error;
    }
  },

  perbarui: async (id, data) => {
    try {
      const response = await api.put(`/shift/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error perbarui shift:', error);
      throw error;
    }
  },

  hapus: async (id) => {
    try {
      const response = await api.delete(`/shift/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error hapus shift:', error);
      throw error;
    }
  },

  toggleStatus: async (id) => {
    try {
      const response = await api.patch(`/shift/${id}/toggle`);
      return response.data;
    } catch (error) {
      console.error('Error toggle status shift:', error);
      throw error;
    }
  }
};

export default shiftService;