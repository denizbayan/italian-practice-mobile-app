import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EnumSessionStorageKeys } from '@/constants/enums/EnumSessionStorageKeys';


const api = axios.create({
  baseURL: 'http://192.168.1.7:8080/api', // Change to your Spring Boot base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(EnumSessionStorageKeys.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;