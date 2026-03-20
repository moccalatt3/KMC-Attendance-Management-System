import api from './api';

const absensiService = {
  getToday: async (employeeId) => {
    try {
      const response = await api.get(`/absensi/today?employee_id=${employeeId}`);
      return response.data;
    } catch (error) {
      console.error('Error get today attendance:', error);
      
      if (error.response?.status === 404) {
        return { 
          success: false, 
          data: null,
          message: 'Endpoint absensi belum tersedia'
        };
      }
      
      throw error;
    }
  },

  record: async (data) => {
    try {
      const response = await api.post('/absensi/record', data);
      return response.data;
    } catch (error) {
      console.error('Error record attendance:', error);
      
      if (error.response?.status === 404) {
        return { 
          success: false, 
          message: 'Endpoint absensi belum tersedia'
        };
      }
      
      throw error;
    }
  },

  getHistory: async (employeeId, month, year) => {
    try {
      const response = await api.get(`/absensi/history?employee_id=${employeeId}&month=${month}&year=${year}`);
      return response.data;
    } catch (error) {
      console.error('Error get history:', error);
      
      if (error.response?.status === 404) {
        return { 
          success: false, 
          data: [],
          message: 'Endpoint history belum tersedia'
        };
      }
      
      throw error;
    }
  }
};

export default absensiService;