// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBU9py6cE_Gtgi4paHzsHjSR9D-RdgEGuc",
  authDomain: "bradenqappdb.firebaseapp.com",
  projectId: "bradenqappdb",
  storageBucket: "bradenqappdb.firebasestorage.app",
  messagingSenderId: "83270773950",
  appId: "1:83270773950:web:794512796896f956e102ef",
  measurementId: "G-CFSVW8G446"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Función para guardar una nueva evaluación
const guardarEvaluacionBradenQ = async (datoPaciente) => {
    try {
      const evaluacionRef = await addDoc(collection(db, "evaluaciones"), {
        // Datos del paciente
        nombrePaciente: datoPaciente.nombre,
        diagnostico: datoPaciente.diagnostico,
        fechaNacimiento: Timestamp.fromDate(new Date(datoPaciente.fechaNacimiento)),
        fechaEvaluacion: Timestamp.fromDate(new Date()),
        
        // Resultados de la escala Braden Q
        intensidadPercepcion: datoPaciente.intensidadPercepcion,
        humedad: datoPaciente.humedad,
        actividad: datoPaciente.actividad,
        movilidad: datoPaciente.movilidad,
        nutricion: datoPaciente.nutricion,
        friccion: datoPaciente.friccion,
        perfusionTisular: datoPaciente.perfusionTisular,
        
        // Puntuación total
        puntuacionTotal: datoPaciente.puntuacionTotal,
        
        // Metadatos
        fechaCreacion: Timestamp.fromDate(new Date()),
        ultimaActualizacion: Timestamp.fromDate(new Date())
      });
      
      return evaluacionRef.id;
    } catch (error) {
      console.error("Error al guardar la evaluación: ", error);
      throw error;
    }
  };
  
  // Función para obtener evaluaciones de un paciente
  const obtenerEvaluacionesPaciente = async (nombrePaciente) => {
    try {
      const q = query(
        collection(db, "evaluaciones"), 
        where("nombrePaciente", "==", nombrePaciente)
      );
      
      const querySnapshot = await getDocs(q);
      const evaluaciones = [];
      
      querySnapshot.forEach((doc) => {
        evaluaciones.push({ id: doc.id, ...doc.data() });
      });
      
      return evaluaciones;
    } catch (error) {
      console.error("Error al obtener evaluaciones: ", error);
      throw error;
    }
  };
  
  export { guardarEvaluacionBradenQ, obtenerEvaluacionesPaciente };