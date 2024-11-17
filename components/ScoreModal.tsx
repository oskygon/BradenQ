// components/ScoreModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ScoreModalProps {
  isVisible: boolean;
  onClose: () => void;
  score: number;
}

const getScoreText = (score: number) => {
  if (score >= 23) return 'Sin riesgo';
  if (score >= 16) return 'Riesgo bajo';
  if (score >= 9) return 'Riesgo moderado';
  return 'Riesgo alto';
};

const getScoreColor = (score: number) => {
  if (score >= 23) return '#4CAF50';
  if (score >= 16) return '#FFC107';
  if (score >= 9) return '#FF9800';
  return '#F44336';
};

const ScoreModal = ({ isVisible, onClose, score }: ScoreModalProps) => {
  const scoreText = getScoreText(score);
  const scoreColor = getScoreColor(score);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Puntuación Total</Text>
          
          <View style={[styles.scoreContainer, { backgroundColor: scoreColor }]}>
            <Text style={styles.scoreText}>{score}</Text>
            <Text style={styles.scoreDescription}>{scoreText}</Text>
          </View>

          <Text style={styles.interpretationTitle}>Interpretación:</Text>
          <View style={styles.interpretationContainer}>
            <Text style={styles.interpretationText}>• 23-28: Sin riesgo</Text>
            <Text style={styles.interpretationText}>• 16-22: Riesgo bajo</Text>
            <Text style={styles.interpretationText}>• 9-15: Riesgo moderado</Text>
            <Text style={styles.interpretationText}>• ≤ 8: Riesgo alto</Text>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4C4B16',
  },
  scoreContainer: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  scoreDescription: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  interpretationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4C4B16',
  },
  interpretationContainer: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  interpretationText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  closeButton: {
    backgroundColor: '#FF7849',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScoreModal;