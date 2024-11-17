import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import styles from '../../components/HomeStyles';
import ScoreModal from '../../components/ScoreModal';
import { useScoreStore } from '../../stores/scoreStore';

export default function Home() {
  const [isModalVisible, setModalVisible] = useState(false);
  const { totalScore, scores, resetScores } = useScoreStore();
  const params = useLocalSearchParams();

  const isAllCategoriesScored = () => {
    const requiredCategories = ['mobility', 'activity', 'sensory', 'humidity', 'friction', 'nutrition', 'perfusion'];
    return requiredCategories.every(category => scores[category] !== undefined);
  };

  // Efecto para mostrar el modal cuando se completen todas las categorías
  useEffect(() => {
    if (isAllCategoriesScored()) {
      setModalVisible(true);
    }
  }, [scores]);

  useEffect(() => {
    if (params.showModal === 'true') {
      setModalVisible(true);
    }
  }, [params.showModal]);

  const handleNavigateToOptions = (title: string, category: string) => {
    router.push({
      pathname: '/options',
      params: { title, category }
    });
  };

  const handleShowScore = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleResetScores = () => {
    resetScores();
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BradenQApp</Text>
        <Text style={styles.headerSubtitle}>30 días a 14 años</Text>
        
        {isAllCategoriesScored() && (
          <TouchableOpacity 
            style={styles.showScoreButton} 
            onPress={handleShowScore}
          >
            <Text style={styles.showScoreButtonText}>Ver Puntuación</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Primera sección */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Intensidad y duración de la presión</Text>
        
        <TouchableOpacity 
          style={[
            styles.button,
            scores['mobility'] ? styles.scoredButton : null
          ]}
          onPress={() => handleNavigateToOptions('Movilidad', 'mobility')}
        >
          <View style={styles.buttonContent}>
            <MaterialCommunityIcons name="run" size={24} color="#FFFFFF" />
            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>
                Movilidad {scores['mobility'] ? `(${scores['mobility']})` : ''}
              </Text>
              <Text style={styles.buttonDescription}>
                Capacidad para cambiar y controlar la posición del cuerpo
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.button,
            scores['activity'] ? styles.scoredButton : null
          ]}
          onPress={() => handleNavigateToOptions('Actividad', 'activity')}
        >
          <View style={styles.buttonContent}>
            <FontAwesome5 name="walking" size={24} color="#FFFFFF" />
            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>
                Actividad {scores['activity'] ? `(${scores['activity']})` : ''}
              </Text>
              <Text style={styles.buttonDescription}>
                Nivel de actividad física y frecuencia de movimientos
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.button,
            scores['sensory'] ? styles.scoredButton : null
          ]}
          onPress={() => handleNavigateToOptions('Percepción sensorial', 'sensory')}
        >
          <View style={styles.buttonContent}>
            <MaterialCommunityIcons name="brain" size={24} color="#FFFFFF" />
            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>
                Percepción sensorial {scores['sensory'] ? `(${scores['sensory']})` : ''}
              </Text>
              <Text style={styles.buttonDescription}>
                Capacidad para reaccionar ante una presión relacionada con el malestar
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Segunda sección */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tolerancia de la piel y la estructura de soporte</Text>
        
        <TouchableOpacity 
          style={[
            styles.button,
            scores['humidity'] ? styles.scoredButton : null
          ]}
          onPress={() => handleNavigateToOptions('Humedad', 'humidity')}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="water" size={24} color="#FFFFFF" />
            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>
                Humedad {scores['humidity'] ? `(${scores['humidity']})` : ''}
              </Text>
              <Text style={styles.buttonDescription}>
                Nivel de exposición de la piel a la humedad
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.button,
            scores['friction'] ? styles.scoredButton : null
          ]}
          onPress={() => handleNavigateToOptions('Fricción y cizallamiento', 'friction')}
        >
          <View style={styles.buttonContent}>
            <MaterialCommunityIcons name="refresh" size={24} color="#FFFFFF" />
            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>
                Fricción y cizallamiento {scores['friction'] ? `(${scores['friction']})` : ''}
              </Text>
              <Text style={styles.buttonDescription}>
                Roce entre la piel y las superficies de apoyo
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.button,
            scores['nutrition'] ? styles.scoredButton : null
          ]}
          onPress={() => handleNavigateToOptions('Nutrición', 'nutrition')}
        >
          <View style={styles.buttonContent}>
            <MaterialCommunityIcons name="food-apple" size={24} color="#FFFFFF" />
            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>
                Nutrición {scores['nutrition'] ? `(${scores['nutrition']})` : ''}
              </Text>
              <Text style={styles.buttonDescription}>
                Patrón habitual de consumo alimentario
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.button,
            scores['perfusion'] ? styles.scoredButton : null
          ]}
          onPress={() => handleNavigateToOptions('Perfusión tisular y oxigenación', 'perfusion')}
        >
          <View style={styles.buttonContent}>
            <FontAwesome5 name="heart" size={24} color="#FFFFFF" />
            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>
                Perfusión tisular y oxigenación {scores['perfusion'] ? `(${scores['perfusion']})` : ''}
              </Text>
              <Text style={styles.buttonDescription}>
                Estado del flujo sanguíneo y oxigenación de los tejidos
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {isAllCategoriesScored() && (
          <TouchableOpacity 
            style={styles.resetButton} 
            onPress={handleResetScores}
          >
            <Text style={styles.resetButtonText}>Reiniciar Evaluación</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScoreModal 
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        score={totalScore}
      />
    </ScrollView>
  );
}