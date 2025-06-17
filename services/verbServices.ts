import api from './api';


export const getVerbList = async () => {
  try {
    const response = await api.get('/verb/getVerbs', {
        params: {
            level: 'A1',
        },
    });

    return response.data; 
  } catch (error: any) {
    if (error.response) {
      // Server responded with error
      throw new Error(error.response.data.message || 'Get VerbList Error');
    } else {
      throw new Error('Network error');
    }
  }
};

