import api from './api';


export const getConjugation = async (verb: string) => {
  try {
    const response = await api.get('/conjugation/'+verb);

    return response.data; 
  } catch (error: any) {
    if (error.response) {
      // Server responded with error
      throw new Error(error.response.data.message || 'Get Conjugation Error');
    } else {
      throw new Error('Network error');
    }
  }
};