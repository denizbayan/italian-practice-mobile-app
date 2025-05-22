// GenericPopup.tsx
import React, { useEffect, useRef,useState } from 'react';
import { Modal, View, Text, Animated, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // İkonlar için kullanacağız

enum PopupType {
  Success = 'success',
  Error = 'error',
}

interface GenericPopupProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: PopupType;
}

const GenericPopup: React.FC<GenericPopupProps> = ({
  visible,
  onClose,
  title,
  message,
  type,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const [showModal, setShowModal] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setShowModal(false);
          onClose();
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!showModal) return null;

  const backgroundColor = type === PopupType.Success ? '#80E27E' : '#FFB0B0'; // Hafif yeşil / pastel kırmızı
  const emoji = type === PopupType.Success ? 'check-circle' : 'error';
  const iconColor = type === PopupType.Success ? '#388E3C' : '#D32F2F'; // Başarı için yeşil, hata için kırmızı

  return (
    <Modal visible={true} transparent animationType="none">
      <View style={styles.container}>
        <Animated.View style={[styles.modal, { backgroundColor, opacity }]}>
          <MaterialIcons name={emoji} size={48} color={iconColor} style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    borderRadius: 20,
    padding: 25,
    minWidth: 280,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  icon: {
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export { GenericPopup, PopupType };
