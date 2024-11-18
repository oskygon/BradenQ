import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, } from 'react-native';
import { router } from 'expo-router';
import { useScoreStore } from '../stores/scoreStore';

interface Option {
  id: number;
  title: string;
  value: number;
  description?: string;
}

const optionsData: Record<string, Option[]> = {
  mobility: [
    { id: 1, title: 'Completamente inmóvil', value: 1, description: 'No realiza ningún movimiento con el cuerpo o las extremidades sin ayuda.' },
    { id: 2, title: 'Muy limitado', value: 2, description: 'Realiza movimientos mínimos, requiere mucha ayuda.' },
    { id: 3, title: 'Ligeramente limitado', value: 3, description: 'Tiene algunas limitaciones pero puede moverse con ayuda.' },
    { id: 4, title: 'Sin limitaciones', value: 4, description: 'Se mueve libremente sin ayuda.' },
  ],
  activity: [
    { id: 1, title: 'Encamado', value: 1, description: 'Limitado/a a la cama.' },
    { id: 2, title: 'En silla', value: 2, description: 'Capacidad para caminar severamente limitada o inexistente. No puede soportar su propio peso y/o hay que ayudarle para sentarse en una silla o en una silla de ruedas.' },
    { id: 3, title: 'Deambula ocasionalmente', value: 3, description: 'Camina ocasionalmente durante el día, pero distancias muy cortas, con o sin ayuda. Pasa la mayor parte de cada turno en la cama o en la silla..' },
    { id: 4, title: 'Deambula frecuentemente', value: 4, description: 'Camina fuera de la habitación al menos dos veces al día y dentro de la habitación al menos una vez cada dos horas durante las horas de paseo.' },
  ],
  sensory: [
    { id: 1, title: 'Completamente limitada', value: 1, description: 'No responde a estímulos dolorosos (no gime, no se estremece ni se agarra) debido a un bajo nivel de conciencia o a sedación O capacidad limitada para sentir dolor en la mayor parte del cuerpo.' },
    { id: 2, title: 'Muy limitada', value: 2, description: 'Responde sólo a estímulos dolorosos. Incapacidad para comunicar malestar, excepto gimiendo o mostrando inquietud O tiene alguna alteración sensorial que limita la capacidad de sentir dolor o malestar en más de la mitad del cuerpo.' },
    { id: 3, title: 'Ligeramente limitada', value: 3, description: 'Responde a órdenes verbales, pero no siempre puede comunicar la incomodidad o la necesidad de ser cambiado de postura O tiene alguna alteración sensorial que limita la capacidad de sentir dolor o malestar en una o dos extremidades.' },
    { id: 4, title: 'Sin alteración', value: 4, description: 'Responde a órdenes verbales. No tiene ninguna alteración sensorial que limite su capacidad de sentir o comunicar dolor o malestar.' },
  ],
  humidity: [
    { id: 1, title: 'Piel constantemente húmeda', value: 1, description: 'La piel se mantiene húmeda casi permanentemente debido a la transpiración, orina, drenaje, etc. La humedad es detectada cada vez que se gira o mueve al paciente.' },
    { id: 2, title: 'Piel muy húmeda', value: 2, description: 'La piel está húmeda a menudo, pero no siempre. La ropa de cama debe ser cambiada al menos cada 8 horas.' },
    { id: 3, title: 'Piel ocasionalmente húmeda', value: 3, description: 'La piel está húmeda de forma ocasional, necesitando cambio de la ropa de cama cada 12 horas.' },
    { id: 4, title: 'Piel raramente húmeda', value: 4, description: 'La piel está casi siempre seca. Hay que cambiar los pañales de forma rutinaria; la ropa de cama solo hay que cambiarla cada 24 horas.' },
  ],
  friction: [
    { id: 1, title: 'Problema severo', value: 1, description: 'La espasticidad, contracturas, picores o agitación le llevan a un movimiento y fricción casi constantes.' },
    { id: 2, title: 'Problema', value: 2, description: 'Requiere ayuda de moderada a máxima para moverse. Es imposible levantarle completamente sin que se produzca un roce contra las sábanas. Frecuentemente se desliza hacia abajo en la cama o en la silla, necesitando recolocarle con la máxima ayuda.' },
    { id: 3, title: 'Problema potencial', value: 3, description: 'Se mueve débilmente o necesita una ayuda mínima. Mientras se mueve, es posible que la piel roce de algún modo con las sábanas, la silla u otros dispositivos. La mayor parte del tiempo mantiene una posición relativamente buena en la silla o cama, aunque ocasionalmente se desliza hacia abajo.' },
    { id: 4, title: 'Sin problema aparente', value: 4, description: 'Es posible levantarle completamente durante un cambio de postura. Se mueve independientemente en la cama y en la silla, y tiene suficiente fuerza muscular para levantarse completamente mientras se mueve. Mantiene una buena postura en la cama o en la silla en todo momento.' },
  ],
  nutrition: [
    { id: 1, title: 'Muy pobre', value: 1, description: 'Está en ayunas; o a dieta líquida; o con sueroterapia más de 5 días O albúmina < 2.5 mg/dl O nunca come una comida completa. Raras veces come más de la mitad de cualquier comida ofrecida. La ingesta de proteínas incluye 2  o menos raciones de carne, pescado o productos lácteos al día. Toma pocos líquidos. No toma un suplemento dietético líquido.' },
    { id: 2, title: 'Inadecuada', value: 2, description: 'Se le administra una nutrición enteral (SNG) o nutrición parenteral (IV) que le proporciona una cantidad inadecuada de calorías y minerales para su edad O albúmina <3 mg/dl O raras veces come una comida completa y generalmente sólo come la mitad de cualquier comida ofrecida. La ingesta de proteínas incluye sólo 3 raciones de carne, pescado o productos lácteos al día. Ocasionalmente toma un suplemento dietético.' },
    { id: 3, title: 'Adecuada', value: 3, description: 'Se le administra una nutrición enteral (SNG) o nutrición parenteral (IV) que le proporciona una cantidad adecuada de calorías y minerales para su edad O come la mitad de la mayoría de las comidas. Come un total de 4 raciones de proteínas al día (carne, pescado, productos lácteos). Ocasionalmente rechaza una comida, pero normalmente toma un suplemento si se le ofrece.' },
    { id: 4, title: 'Excelente', value: 4, description: 'Toma una dieta normal que le proporciona las calorías adecuadas para su edad. Por ejemplo: come/bebe la mayor parte de cada comida/toma. Nunca rechaza una comida. Normalmente come un total de 4 o más raciones de carne, pescados o productos lácteos al día. Ocasionalmente come entre comidas. No necesita suplementos.' },
  ],
  perfusion: [
    { id: 1, title: 'Muy comprometida', value: 1, description: 'Hipotenso (TAm<50mmHg; <40 en recién nacidos) O el paciente no tolera fisiológicamente los cambios posturales.' },
    { id: 2, title: 'Comprometida', value: 2, description: 'Normotenso; el pH sérico es < 7.40; la saturación de oxígeno puede ser < 95% O la hemoglobina puede ser < 10mg/dl O el relleno capilar puede ser > 2 segundos.' },
    { id: 3, title: 'Adecuada', value: 3, description: 'Normotenso; el pH de la sangre es normal; la saturación de oxígeno puede ser < 95% O la hemoglobina puede ser < 10mg/dl O el relleno capilar puede ser > 2 segundos.' },
    { id: 4, title: 'Excelente', value: 4, description: 'Normotenso; la saturación de oxígeno es >95%; hemoglobina normal; y el relleno capilar < 2 segundos.' },
  ],
};

const OptionsScreen = ({ title,  category }: { title: string, category: string }) => {
  const { setScore, scores } = useScoreStore();
  const options = optionsData[category] || [];

  const handleSelect = (value: number) => {
    const isComplete = setScore(category, value);
    if (isComplete) {
      router.replace({
        pathname: '/(tabs)',
        params: { showModal: 'true', timestamp: Date.now() }
      });
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              scores[category] === option.value && styles.selectedOption
            ]}
            onPress={() => handleSelect(option.value)}
          >
            <Text
              style={[
                styles.optionText,
                scores[category] === option.value && styles.selectedOptionText
              ]}
            >
              {option.title}
            </Text>
            <Text style={styles.optionDescription}>
              {option.description}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF8F3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4C4B16',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF7849',
  },
  selectedOption: {
    backgroundColor: '#FF7849',
  },
  optionText: {
    fontSize: 16,
    color: '#FF7849',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  optionDescription: {
    fontSize: 14,
    color: '#898121',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default OptionsScreen;