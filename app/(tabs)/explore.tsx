import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FF7849', dark: '#FF7849' }}
      headerImage={
        <MaterialIcons
          name="face" // Nombre del ícono relacionado con la piel
          size={400} // Tamaño ajustado
          color="#808080" // Color del ícono
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Escala BradenQ</ThemedText>
      </ThemedView>
      <ThemedText>La Escala Braden Q identifica el riesgo de úlceras por presión en niños de 1 mes a 14 años. Evalúa 7 subescalas (movilidad, actividad, percepción sensorial, humedad, fricción y cizallamiento, nutrición, perfusión tisular y oxigenación), puntuadas de 1 a 4. Una puntuación ≤16 indica riesgo de desarrollar UPP.</ThemedText>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Cuidados escenciales de la piel</ThemedText>
      </ThemedView>

 <Collapsible title="Higiene y limpieza">
  <ThemedText>
    <ThemedText type="defaultSemiBold">Baño y aseo: </ThemedText>
    Realizar baños solo cuando sea necesario, utilizando agua tibia y jabones suaves hipoalergénicos sin fragancias.
  </ThemedText>
  <ThemedText>
    <ThemedText type="defaultSemiBold">Limpieza localizada: </ThemedText>
    Limpiar áreas específicas (cara, cuello, pliegues) con toallas húmedas o esponjas suaves para evitar el exceso de humedad.
  </ThemedText>
  <ThemedText>
    <ThemedText type="defaultSemiBold">Cuidado del cordón umbilical: </ThemedText>
    Mantener el cordón limpio y seco, siguiendo los protocolos del hospital (generalmente con clorhexidina o alcohol).
  </ThemedText>
  <ExternalLink href="https://inscripciones.garrahan.edu.ar/">
    <ThemedText type="link">Mas información</ThemedText>
  </ExternalLink>
</Collapsible>

 <Collapsible title="Hidratación y protección de la piel">
  <ThemedText>
    <ThemedText type="defaultSemiBold">Hidratantes:  </ThemedText>
    Aplicar lociones o cremas específicas para neonatos con piel seca o descamada. Evitar productos con alcohol o perfumes.
  </ThemedText>
  <ThemedText>
    <ThemedText type="defaultSemiBold">Barreras protectoras: </ThemedText>
    Usar cremas de barrera (óxido de zinc o lanolina) en áreas propensas a irritación por pañales.
  </ThemedText>
  <ThemedText>
    <ThemedText type="defaultSemiBold">Evitar productos innecesarios: </ThemedText>
    Reducir la exposición a productos químicos que puedan causar irritación.
  </ThemedText>
  <ExternalLink href="https://inscripciones.garrahan.edu.ar/">
    <ThemedText type="link">Mas información</ThemedText>
  </ExternalLink>
</Collapsible>

 <Collapsible title="Manejo de dispositivos médicos">
  <ThemedText>
    <ThemedText type="defaultSemiBold">Uso de adhesivos </ThemedText>
    Minimizar el uso de cintas adhesivas. Usar protectores cutáneos debajo de los dispositivos y cambiar los adhesivos cuidadosamente para evitar lesiones.
  </ThemedText>
  <ThemedText>
    <ThemedText type="defaultSemiBold">Rotación de dispositivos: </ThemedText>
    Rotar sondas, sensores y electrodos regularmente para prevenir lesiones por presión.
  </ThemedText>
  
  <ExternalLink href="https://inscripciones.garrahan.edu.ar/">
    <ThemedText type="link">Mas información</ThemedText>
  </ExternalLink>
</Collapsible>

 <Collapsible title="Prevención de lesiones">
  <ThemedText>
    <ThemedText type="defaultSemiBold">Presión y fricción: </ThemedText>
    Utilizar colchones y superficies blandas para evitar úlceras por presión. Cambiar la posición del bebé cada 2-3 horas si es clínicamente seguro.
  </ThemedText>
  <ThemedText>
    <ThemedText type="defaultSemiBold">Evaluación de la piel: </ThemedText>
    Inspeccionar la piel diariamente para detectar enrojecimiento, heridas o signos de irritación.
  </ThemedText>
  
  <ExternalLink href="https://inscripciones.garrahan.edu.ar/">
    <ThemedText type="link">Mas información</ThemedText>
  </ExternalLink>
</Collapsible>

 <Collapsible title="Control de la humedad">
  <ThemedText>
    <ThemedText type="defaultSemiBold">Evitar exceso de humedad: </ThemedText>
    Cambiar los pañales frecuentemente y limpiar bien el área perineal.
  </ThemedText>
  <ThemedText>
    <ThemedText type="defaultSemiBold">Control de la temperatura y humedad ambiental: </ThemedText>
    Mantener el ambiente térmico neutral para prevenir sudoración excesiva o piel seca.
  </ThemedText>
  
  <ExternalLink href="https://inscripciones.garrahan.edu.ar/">
    <ThemedText type="link">Mas información</ThemedText>
  </ExternalLink>
</Collapsible>

 <Collapsible title="Control de infecciones">
  <ThemedText>
    <ThemedText type="defaultSemiBold">Técnicas asépticas:  </ThemedText>
    Lavado de manos obligatorio antes y después de tocar al neonato.
  </ThemedText>
  <ThemedText>
    <ThemedText type="defaultSemiBold">Prevención de infecciones: </ThemedText>
    Usar guantes estériles al realizar procedimientos que involucren a la piel.
  </ThemedText>
  
  <ExternalLink href="https://inscripciones.garrahan.edu.ar/">
    <ThemedText type="link">Mas información</ThemedText>
  </ExternalLink>
</Collapsible>

 <Collapsible title="Monitoreo constante">
  <ThemedText>
    <ThemedText type="defaultSemiBold">Registro diario:  </ThemedText>
    Documentar cambios en la piel para ajustar los cuidados.
  </ThemedText>
  <ThemedText>
    <ThemedText type="defaultSemiBold">Uso de escalas: </ThemedText>
    Aplicar herramientas como la escala de Braden Q o E-NSRAS para valorar el riesgo de lesiones cutáneas.
  </ThemedText>
  
  <ExternalLink href="https://inscripciones.garrahan.edu.ar/">
    <ThemedText type="link">Mas información</ThemedText>
  </ExternalLink>
</Collapsible>


      
      
        
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
