import api from './api';

const positionService = {
  ambilSemua: async () => {
    try {
      const response = await api.get('/position');
      return response.data;
    } catch (error) {
      console.error('Error ambil position:', error);
      throw error;
    }
  },

  ambilAktif: async () => {
    try {
      const response = await api.get('/position/aktif');
      return response.data;
    } catch (error) {
      console.error('Error ambil position aktif:', error);
      throw error;
    }
  },

  ambilStatistik: async () => {
    try {
      const response = await api.get('/position/statistik');
      return response.data;
    } catch (error) {
      console.error('Error ambil statistik position:', error);
      throw error;
    }
  },

  ambilByID: async (id) => {
    try {
      const response = await api.get(`/position/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error ambil position by ID:', error);
      throw error;
    }
  },

  tambah: async (data) => {
    try {
      const response = await api.post('/position', data);
      return response.data;
    } catch (error) {
      console.error('Error tambah position:', error);
      throw error;
    }
  },

  perbarui: async (id, data) => {
    try {
      const response = await api.put(`/position/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error perbarui position:', error);
      throw error;
    }
  },

  hapus: async (id) => {
    try {
      const response = await api.delete(`/position/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error hapus position:', error);
      throw error;
    }
  },

  toggleStatus: async (id) => {
    try {
      const response = await api.patch(`/position/${id}/toggle`);
      return response.data;
    } catch (error) {
      console.error('Error toggle status position:', error);
      throw error;
    }
  }
};

export default positionService;