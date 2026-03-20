import api from './api';

const karyawanService = {
  ambilSemua: async () => {
    try {
      const response = await api.get('/karyawan');
      return response.data;
    } catch (error) {
      console.error('Error ambil karyawan:', error);
      throw error;
    }
  },

  ambilByID: async (id) => {
    try {
      const response = await api.get(`/karyawan/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error ambil karyawan by ID:', error);
      throw error;
    }
  },

  ambilStatistik: async () => {
    try {
      const response = await api.get('/karyawan/statistik');
      return response.data;
    } catch (error) {
      console.error('Error ambil statistik:', error);
      throw error;
    }
  },

  tambah: async (data) => {
    try {
      const response = await api.post('/karyawan', data);
      return response.data;
    } catch (error) {
      console.error('Error tambah karyawan:', error);
      throw error;
    }
  },

  perbarui: async (id, data) => {
    try {
      const response = await api.put(`/karyawan/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error perbarui karyawan:', error);
      throw error;
    }
  },

  hapus: async (id) => {
    try {
      const response = await api.delete(`/karyawan/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error hapus karyawan:', error);
      throw error;
    }
  }
};

export default karyawanService;