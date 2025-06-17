import api from './api';

export const signin = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/signin', {
      email,
      password,
    });

    return response.data; // e.g., tokens, user info
  } catch (error: any) {
    if (error.response) {
      // Server responded with error
      throw new Error(error.response.data.message || 'Login failed');
    } else {
      throw new Error('Network error');
    }
  }
};

export const signup = async (email: string,username:string, password: string) => {
  try {
    const response = await api.post('/auth/signup', {
      email,
      username,
      password,
    });

    return response.data; // e.g., tokens, user info
  } catch (error: any) {
    if (error.response) {
      // Server responded with error
      throw new Error(error.response.data.message || 'Login failed');
    } else {
      throw new Error('Network error');
    }
  }
};