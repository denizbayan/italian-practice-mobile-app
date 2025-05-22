import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import styles from './styles/forgot_password_style';
import { GenericPopup, PopupType } from '@/components/GenericPopup';


export default function ForgotPasswordScreen() {
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [popupVisible, setPopupVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState(PopupType.Success); // Default olarak success
  
  const handleSendCode = () => {
    setStep(2);
  };

  const handleVerifyCode = () => {
    setStep(3);
  };

  const handleResetPassword = () => {

    if (newPassword !== confirmPassword) {
      setTitle('Error');
      setMessage('Passwords do not match!');
      setType(PopupType.Error); // Error popup tipi
      setPopupVisible(true);
    } else {
      // Burada şifreyi güncelleme işlemi yapılacak (örneğin API'ye gönderme)
      setTitle('Success!');
      setMessage('Your password has been updated.');
      setType(PopupType.Success); // Success popup tipi
      setPopupVisible(true);

      // Yönlendirme işlemi
      setTimeout(() => {
        router.replace('/auth/login');
      }, 3000);
    }

  };


  return (
    
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <GenericPopup
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        title={title}
        message={message}
        type={type}
      />
    <Text style={styles.title}>Forgot Password</Text>

    {step === 1 && (
    <>
        <TextInput
        style={styles.input}
        placeholder="Email or Username"
        placeholderTextColor="#999"
        value={emailOrUsername}
        onChangeText={setEmailOrUsername}
        />
        <TouchableOpacity style={styles.button} onPress={handleSendCode}>
        <Text style={styles.buttonText}>Send Verification Code</Text>
        </TouchableOpacity>
    </>
    )}

    {step === 2 && (
    <>
        <TextInput
        style={styles.input}
        placeholder="Verification Code"
        placeholderTextColor="#999"
        value={verificationCode}
        onChangeText={setVerificationCode}
        keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
        <Text style={styles.buttonText}>Verify Code</Text>
        </TouchableOpacity>
    </>
    )}

    {step === 3 && (
    <>
        <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        />
        <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
    </>
    )}

    <TouchableOpacity onPress={() => router.replace('/auth/login')} style={styles.linkContainer}>
    <Text style={styles.linkText}>Remembered your password? Login</Text>
    </TouchableOpacity>

    <Toast />
    </KeyboardAvoidingView>
  );
}