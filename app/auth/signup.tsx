import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles/login_style';
import { signup } from '@/services/authServices';
import { EnumSessionStorageKeys } from '@/constants/enums/EnumSessionStorageKeys';
import { saveItem } from '@/services/storage/authStorage';

export default function SignupScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Reset state when component mounts
    setSignupSuccess(false);
    setCountdown(3);
  }, []);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await signup(email, username, password);
      setSignupSuccess(true); // Show modal
    } catch (error: any) {
      console.error('Signup error:', error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!signupSuccess) return;

    setCountdown(3); // ✅ reset here too when starting countdown

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.push('/auth/login');
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [signupSuccess]);

  const goToLogin = () => {
    router.push('/auth/login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
        />
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
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
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.signupText}>
            Already have an account? <Text style={styles.signupLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🎉 Modal Popup for success */}
      <Modal
        animationType="fade"
        transparent
        visible={signupSuccess}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.modalBox}>
            <Text style={modalStyles.successText}>🎉 Signup Successful!</Text>
            <Text style={modalStyles.countdownText}>Redirecting in {countdown}...</Text>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 10,
  },
  successText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4BB543',
    marginBottom: 10,
    textAlign: 'center',
  },
  countdownText: {
    fontSize: 16,
    color: '#333',
  },
});
