import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles/login_style'; // Styles'ı dışarıdan import ediyoruz
import { signin } from '@/services/authServices';
import { EnumSessionStorageKeys } from '@/constants/enums/EnumSessionStorageKeys';

import { clearItemsAppClose, saveItem } from '@/services/storage/authStorage';


export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Burada API'ye istek yapılacak. Örneğin:
    try {
      const data = await signin(email, password);
      clearItemsAppClose();
      await saveItem(EnumSessionStorageKeys.AUTH_TOKEN, data.jwt);
      await saveItem(EnumSessionStorageKeys.EMAIL, data.email);
      await saveItem(EnumSessionStorageKeys.SESSION_ID, data.sessionID);
      await saveItem(EnumSessionStorageKeys.USER_ID, data.userID.toString());
      await saveItem(EnumSessionStorageKeys.USERNAME, data.username);

      router.push('/main');
    } catch (error: any) {
      console.error('Login error:', error.message);
      alert(error.message); // Replace with better UX later
    } finally {
      setLoading(false);
    }
  };

  const goToSignup = () => {
    router.push('/auth/signup');
  };

  const goToForgotPassword = () => {
    router.push('/auth/forgot_password');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email or Username"
          placeholderTextColor="#999"
          style={styles.input}
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={goToSignup}>
          <Text style={styles.signupText}>
            Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToForgotPassword}>
          <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}