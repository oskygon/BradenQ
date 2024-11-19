import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import styles from '../../components/HomeStyles';
import ScoreModal from '../../components/ScoreModal';
import ScorePanel from '../../components/ScorePanel';
import { useScoreStore } from '../../stores/scoreStore';

export default function Home() {
  const [isModalVisible, setModalVisible] = useState(false);
  const { totalScore, scores, resetScores } = useScoreStore();
  const params = useLocalSearchParams();

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

  const isAllCategoriesScored = () => {
    const requiredCategories = ['mobility', 'activity', 'sensory', 'humidity', 'friction', 'nutrition', 'perfusion'];
    return requiredCategories.every(category => scores[category] !== undefined);
  };

  const hasAnyScore = () => {
    return Object.keys(scores).length > 0;
  };

  const getTotalCategories = () => 7; // Total de categorías
  const getCompletedCategories = () => Object.keys(scores).length;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BradenQApp</Text>
        <Text style={styles.headerSubtitle}>30 días a 14 años</Text>
        
        {hasAnyScore() && !isAllCategoriesScored() && (
          <TouchableOpacity 
            style={styles.resetButtonHeader} 
            onPress={resetScores}
          >
            <Text style={styles.resetButtonHeaderText}>Reiniciar Evaluación</Text>
          </TouchableOpacity>
        )}
      </View>

      {hasAnyScore() && (
        <ScorePanel
          score={totalScore}
          totalOptions={getTotalCategories()}
          completedOptions={getCompletedCategories()}
        />
      )}

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
            <MaterialCommunityIcons name="run-fast" size={24} color={scores['mobility'] ? "#FFFFFF" : "#FFD700"} />
            <View style={styles.textContainer}>
              <Text style={[
                styles.buttonText,
                scores['mobility'] ? styles.scoredButtonText : null
              ]}>
                Movilidad {scores['mobility'] ? `(${scores['mobility']})` : ''}
              </Text>
              <Text style={[
                styles.buttonDescription,
                scores['mobility'] ? styles.scoredButtonDescription : null
              ]}>
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
            <MaterialCommunityIcons name="human-handsup" size={24} color={scores['activity'] ? "#FFFFFF" : "#87CEEB"} />
            <View style={styles.textContainer}>
              <Text style={[
                styles.buttonText,
                scores['activity'] ? styles.scoredButtonText : null
              ]}>
                Actividad {scores['activity'] ? `(${scores['activity']})` : ''}
              </Text>
              <Text style={[
                styles.buttonDescription,
                scores['activity'] ? styles.scoredButtonDescription : null
              ]}>
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
            <MaterialCommunityIcons name="brain" size={24} color={scores['sensory'] ? "#FFFFFF" : "#FFA500"} />
            <View style={styles.textContainer}>
              <Text style={[
                styles.buttonText,
                scores['sensory'] ? styles.scoredButtonText : null
              ]}>
                Percepción sensorial {scores['sensory'] ? `(${scores['sensory']})` : ''}
              </Text>
              <Text style={[
                styles.buttonDescription,
                scores['sensory'] ? styles.scoredButtonDescription : null
              ]}>
                Capacidad para reaccionar ante una presión relacionada con el malestar
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

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
            <Ionicons name="water" size={24} color={scores['humidity'] ? "#FFFFFF" : "#00CED1"} />
            <View style={styles.textContainer}>
              <Text style={[
                styles.buttonText,
                scores['humidity'] ? styles.scoredButtonText : null
              ]}>
                Humedad {scores['humidity'] ? `(${scores['humidity']})` : ''}
              </Text>
              <Text style={[
                styles.buttonDescription,
                scores['humidity'] ? styles.scoredButtonDescription : null
              ]}>
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
            <MaterialCommunityIcons name="sync" size={24} color={scores['friction'] ? "#FFFFFF" : "#FF69B4"} />
            <View style={styles.textContainer}>
              <Text style={[
                styles.buttonText,
                scores['friction'] ? styles.scoredButtonText : null
              ]}>
                Fricción y cizallamiento {scores['friction'] ? `(${scores['friction']})` : ''}
              </Text>
              <Text style={[
                styles.buttonDescription,
                scores['friction'] ? styles.scoredButtonDescription : null
              ]}>
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
            <MaterialCommunityIcons name="fruit-watermelon" size={24} color={scores['nutrition'] ? "#FFFFFF" : "#32CD32"} />
            <View style={styles.textContainer}>
              <Text style={[
                styles.buttonText,
                scores['nutrition'] ? styles.scoredButtonText : null
              ]}>
                Nutrición {scores['nutrition'] ? `(${scores['nutrition']})` : ''}
              </Text>
              <Text style={[
                styles.buttonDescription,
                scores['nutrition'] ? styles.scoredButtonDescription : null
              ]}>
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
            <MaterialCommunityIcons name="heart-pulse" size={24} color={scores['perfusion'] ? "#FFFFFF" : "#FF1493"} />
            <View style={styles.textContainer}>
              <Text style={[
                styles.buttonText,
                scores['perfusion'] ? styles.scoredButtonText : null
              ]}>
                Perfusión tisular y oxigenación {scores['perfusion'] ? `(${scores['perfusion']})` : ''}
              </Text>
              <Text style={[
                styles.buttonDescription,
                scores['perfusion'] ? styles.scoredButtonDescription : null
              ]}>
                Estado del flujo sanguíneo y oxigenación de los tejidos
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {isAllCategoriesScored() && (
          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity 
              style={styles.showScoreButton} 
              onPress={handleShowScore}
            >
              <Text style={styles.showScoreButtonText}>Ver Puntuación</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.resetButton} 
              onPress={resetScores}
            >
              <Text style={styles.resetButtonText}>Reiniciar Evaluación</Text>
            </TouchableOpacity>
          </View>
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