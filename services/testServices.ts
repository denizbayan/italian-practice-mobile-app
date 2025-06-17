import api from './api';

export const testPublic = async () => {
  try {
    await api.post('/test/public', {});

  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Test Public Failed');
    } else {
      throw new Error('Network error');
    }
  }
};
export const testSecured = async () => {
  try {
    await api.post('/test/secured', {});

  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Test Secured Failed');
    } else {
      throw new Error('Network error');
    }
  }
};