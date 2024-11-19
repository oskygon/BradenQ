import { create } from 'zustand';
import { getFirestore, collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';

interface Patient {
  nombre: string;
  diagnostico: string;
  fechaNacimiento: string;
}

interface Evaluation {
  patientData: Patient;
  scores: Record<string, number>;
  totalScore: number;
  fechaEvaluacion: Date;
}

interface ScoreState {
  scores: Record<string, number>;
  totalScore: number;
  currentPatient: Patient | null;
  evaluations: Evaluation[];
  isLoading: boolean;
  error: string | null;
  
  // Métodos para manejar scores
  setScore: (category: string, value: number) => boolean;
  resetScores: () => void;
  
  // Métodos para manejar pacientes
  setPatient: (patient: Patient) => void;
  
  // Métodos para Firebase
  saveEvaluation: () => Promise<string>;
  getPatientEvaluations: (nombrePaciente: string) => Promise<void>;
}

export const useScoreStore = create<ScoreState>((set, get) => ({
  // Estado inicial
  scores: {},
  totalScore: 0,
  currentPatient: null,
  evaluations: [],
  isLoading: false,
  error: null,

  // Método para establecer scores
  setScore: (category, value) => {
    let isComplete = false;
    set((state) => {
      const newScores = { ...state.scores, [category]: value };
      const total = Object.values(newScores).reduce((sum, curr) => sum + curr, 0);

      // Verificar si todas las categorías están completas
      const requiredCategories = [
        'mobility',
        'activity',
        'sensory',
        'humidity',
        'friction',
        'nutrition',
        'perfusion'
      ];
      isComplete = requiredCategories.every(cat => newScores[cat] !== undefined);

      return { scores: newScores, totalScore: total };
    });
    return isComplete;
  },

  // Resetear scores
  resetScores: () => set({ scores: {}, totalScore: 0 }),

  // Establecer datos del paciente
  setPatient: (patient) => set({ currentPatient: patient }),

  // Guardar evaluación en Firebase
  saveEvaluation: async () => {
    const state = get();
    if (!state.currentPatient) {
      throw new Error('No hay paciente seleccionado');
    }

    set({ isLoading: true, error: null });

    try {
      const db = getFirestore();
      const evaluacionData = {
        // Datos del paciente
        nombrePaciente: state.currentPatient.nombre,
        diagnostico: state.currentPatient.diagnostico,
        fechaNacimiento: Timestamp.fromDate(new Date(state.currentPatient.fechaNacimiento)),
        fechaEvaluacion: Timestamp.fromDate(new Date()),
        
        // Scores individuales
        mobility: state.scores.mobility,
        activity: state.scores.activity,
        sensory: state.scores.sensory,
        humidity: state.scores.humidity,
        friction: state.scores.friction,
        nutrition: state.scores.nutrition,
        perfusion: state.scores.perfusion,
        
        // Score total
        puntuacionTotal: state.totalScore,
        
        // Metadatos
        fechaCreacion: Timestamp.fromDate(new Date()),
        ultimaActualizacion: Timestamp.fromDate(new Date())
      };

      const docRef = await addDoc(collection(db, "evaluaciones"), evaluacionData);
      
      // Actualizar el estado local con la nueva evaluación
      set((state) => ({
        evaluations: [...state.evaluations, {
          patientData: state.currentPatient!,
          scores: state.scores,
          totalScore: state.totalScore,
          fechaEvaluacion: new Date()
        }]
      }));

      set({ isLoading: false });
      return docRef.id;

    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false });
      throw error;
    }
  },

  // Obtener evaluaciones de un paciente
  getPatientEvaluations: async (nombrePaciente: string) => {
    set({ isLoading: true, error: null });

    try {
      const db = getFirestore();
      const q = query(
        collection(db, "evaluaciones"),
        where("nombrePaciente", "==", nombrePaciente)
      );

      const querySnapshot = await getDocs(q);
      const evaluations: Evaluation[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        evaluations.push({
          patientData: {
            nombre: data.nombrePaciente,
            diagnostico: data.diagnostico,
            fechaNacimiento: data.fechaNacimiento.toDate().toISOString().split('T')[0]
          },
          scores: {
            mobility: data.mobility,
            activity: data.activity,
            sensory: data.sensory,
            humidity: data.humidity,
            friction: data.friction,
            nutrition: data.nutrition,
            perfusion: data.perfusion
          },
          totalScore: data.puntuacionTotal,
          fechaEvaluacion: data.fechaEvaluacion.toDate()
        });
      });

      set({ evaluations, isLoading: false });

    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false });
      throw error;
    }
  }
}));