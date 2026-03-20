import api from './api';

const departmentService = {
  ambilSemua: async () => {
    try {
      const response = await api.get('/department');
      return response.data;
    } catch (error) {
      console.error('Error ambil department:', error);
      throw error;
    }
  },

  ambilAktif: async () => {
    try {
      const response = await api.get('/department/aktif');
      return response.data;
    } catch (error) {
      console.error('Error ambil department aktif:', error);
      throw error;
    }
  },

  ambilRoot: async () => {
    try {
      const response = await api.get('/department/root');
      return response.data;
    } catch (error) {
      console.error('Error ambil root department:', error);
      throw error;
    }
  },

  ambilStatistik: async () => {
    try {
      const response = await api.get('/department/statistik');
      return response.data;
    } catch (error) {
      console.error('Error ambil statistik department:', error);
      throw error;
    }
  },

  ambilByID: async (id) => {
    try {
      const response = await api.get(`/department/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error ambil department by ID:', error);
      throw error;
    }
  },

  tambah: async (data) => {
    try {
      const response = await api.post('/department', data);
      return response.data;
    } catch (error) {
      console.error('Error tambah department:', error);
      throw error;
    }
  },

  perbarui: async (id, data) => {
    try {
      const response = await api.put(`/department/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error perbarui department:', error);
      throw error;
    }
  },

  hapus: async (id) => {
    try {
      const response = await api.delete(`/department/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error hapus department:', error);
      throw error;
    }
  },

  toggleStatus: async (id) => {
    try {
      const response = await api.patch(`/department/${id}/toggle`);
      return response.data;
    } catch (error) {
      console.error('Error toggle status department:', error);
      throw error;
    }
  }
};

export default departmentService;