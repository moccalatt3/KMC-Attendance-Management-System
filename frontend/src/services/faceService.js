import api from './api';

const faceService = {
  register: async (employeeId, images, poses) => {
    const formData = new FormData();
    formData.append('employee_id', employeeId);
    
    poses.forEach(pose => formData.append('poses', pose));
    
    images.forEach((imageFile, index) => {
      formData.append('images', imageFile, `face_${index}.jpg`);
    });
    
    try {
      const response = await api.post('/face/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error('Error register face:', error);
      throw error;
    }
  },

  verify: async (employeeId, images) => {
    const formData = new FormData();
    formData.append('employee_id', employeeId);
    
    images.forEach((imageFile, index) => {
      formData.append('images', imageFile, `face_${index}.jpg`);
    });
    
    try {
      const response = await api.post('/face/verify', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error('Error verify face:', error);
      throw error;
    }
  },

  getStatus: async (employeeId) => {
    try {
      const response = await api.get(`/face/status?employee_id=${employeeId}`);
      return response.data;
    } catch (error) {
      console.error('Error get face status:', error);
      throw error;
    }
  },

  getHistory: async (employeeId, limit = 10) => {
    try {
      const response = await api.get(`/face/history?employee_id=${employeeId}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error get face history:', error);
      throw error;
    }
  }
};

export default faceService;