// services/authStorage.ts
import { EnumSessionStorageKeys } from '@/constants/enums/EnumSessionStorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (storageKey: EnumSessionStorageKeys, value: string) =>{

    try {
        await AsyncStorage.setItem(storageKey,value);
    } catch (error) {
        console.error('Failed to save tokens:', error);
    }
}

export const saveItem = async (storageKey: EnumSessionStorageKeys, value: string) =>{

    try {
        await AsyncStorage.setItem(storageKey,value);
    } catch (error) {
        console.error('Failed to save tokens:', error);
    }
}

export const getItem = async (storageKey: EnumSessionStorageKeys) =>{

    try {
        return AsyncStorage.getItem(storageKey);
    } catch (error) {
        console.error('Failed to get tokens:', error);
    }
}


export const clearItemsAppClose = async () => {
  try {
    AsyncStorage.clear();
      } catch (error) {
    console.error('Failed to clear tokens:', error);
  }
};
