import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ScoreModalProps {
  isVisible: boolean;
  onClose: () => void;
  score: number;
}

const getRiskLevel = (score: number) => {
  if (score >= 23) return { text: 'Sin riesgo', color: '#4CAF50' };
  if (score >= 21) return { text: 'Riesgo leve', color: '#FFC107' };
  if (score >= 16) return { text: 'Riesgo moderado', color: '#FF9800' };
  return { text: 'Riesgo alto', color: '#F44336' };
};

const ScoreModal = ({ isVisible, onClose, score }: ScoreModalProps) => {
  const risk = getRiskLevel(score);

  const handleSendData = () => {
    // Aquí iría la lógica para enviar los datos
    console.log('Enviando datos...');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Evaluación Completa</Text>
          
          <View style={styles.scoreSection}>
            <Text style={styles.scoreLabel}>Puntuación Total</Text>
            <Text style={styles.scoreValue}>{score}</Text>
          </View>

          <View style={styles.riskSection}>
            <Text style={styles.riskLabel}>Nivel de Riesgo</Text>
            <Text style={[styles.riskValue, { color: risk.color }]}>{risk.text}</Text>
          </View>

          <Text style={styles.question}>¿Desea enviar estos datos?</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.sendButton]}
              onPress={handleSendData}
            >
              <Text style={styles.buttonText}>Enviar Datos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4C4B16',
    marginBottom: 20,
  },
  scoreSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4C4B16',
  },
  riskSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  riskLabel: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  riskValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  question: {
    fontSize: 18,
    color: '#4C4B16',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    minWidth: 120,
  },
  sendButton: {
    backgroundColor: '#4C4B16',
  },
  closeButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ScoreModal;