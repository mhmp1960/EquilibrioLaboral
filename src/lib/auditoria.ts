export type Tono = 'teal' | 'violet' | 'amber' | 'blue' | 'rose';
export type Seccion = { id: string; nombre: string; breve: string; descripcion: string; tono: Tono; preguntas: string[] };

export const secciones: Seccion[] = [
  {
    id: 'ambiente', nombre: 'Ambiente físico y seguridad', breve: 'Ambiente físico', tono: 'teal',
    descripcion: 'Iluminación, limpieza, ergonomía, herramientas y medidas de seguridad.',
    preguntas: ['El espacio de trabajo tiene buena iluminación y ventilación.', 'Las áreas de trabajo se mantienen limpias y ordenadas.', 'Mi puesto y mobiliario son cómodos y ergonómicos.', 'Cuento con las herramientas y equipos que necesito.', 'Conozco las medidas de seguridad para realizar mi trabajo.'],
  },
  {
    id: 'clima', nombre: 'Clima laboral y relaciones', breve: 'Clima laboral', tono: 'violet',
    descripcion: 'Respeto, comunicación, compañerismo, trato justo y resolución de conflictos.',
    preguntas: ['En mi equipo nos tratamos con respeto.', 'La comunicación en mi equipo es clara y oportuna.', 'Puedo contar con mis compañeros cuando lo necesito.', 'Las decisiones y oportunidades se gestionan con justicia.', 'Los desacuerdos se conversan y resuelven de forma constructiva.'],
  },
  {
    id: 'equilibrio', nombre: 'Equilibrio vida-trabajo', breve: 'Vida y trabajo', tono: 'amber',
    descripcion: 'Carga laboral, horarios, flexibilidad, descansos y tiempo personal.',
    preguntas: ['La carga de trabajo es razonable y sostenible.', 'Mi horario me permite desconectarme al terminar la jornada.', 'Tengo flexibilidad para atender asuntos personales importantes.', 'Puedo tomar pausas y descansos durante el día.', 'El trabajo me deja tiempo y energía para mi vida personal.'],
  },
  {
    id: 'crecimiento', nombre: 'Crecimiento y reconocimiento', breve: 'Crecimiento', tono: 'blue',
    descripcion: 'Aprendizaje, reconocimiento, feedback y desarrollo profesional.',
    preguntas: ['Tengo oportunidades para aprender y desarrollar habilidades.', 'Mi esfuerzo y mis logros son reconocidos.', 'Recibo comentarios útiles para mejorar mi trabajo.', 'Veo posibilidades de crecimiento profesional aquí.'],
  },
  {
    id: 'emocional', nombre: 'Salud emocional y apoyo', breve: 'Salud emocional', tono: 'rose',
    descripcion: 'Manejo del estrés, apoyo, prevención del acoso y sentido de pertenencia.',
    preguntas: ['Puedo hablar sobre el estrés o las dificultades que enfrento.', 'Recibo apoyo cuando atravieso un momento difícil.', 'Confío en que se toman en serio las situaciones de acoso o maltrato.', 'Me siento parte de este equipo y organización.'],
  },
];

export const TOTAL_PREGUNTAS = secciones.reduce((total, s) => total + s.preguntas.length, 0);

export type Respuestas = Record<string, number>;
export type Auditoria = { respuestas: Respuestas; comentario: string; fecha: string };
export const STORAGE_KEY = 'equilibrio-laboral-auditoria-v1';

export function calcularResultados(respuestas: Respuestas) {
  const puntajes = secciones.map((seccion) => {
    const valores = seccion.preguntas.map((_, i) => respuestas[`${seccion.id}-${i}`]).filter((v): v is number => typeof v === 'number');
    return { ...seccion, puntaje: valores.length ? Math.round((valores.reduce((a, b) => a + b, 0) / valores.length) * 20) : 0, respondidas: valores.length };
  });
  const conRespuesta = puntajes.filter((s) => s.respondidas);
  const general = conRespuesta.length ? Math.round(conRespuesta.reduce((a, s) => a + s.puntaje, 0) / conRespuesta.length) : 0;
  return { general, puntajes };
}

export const NIVELES = [
  { min: 80, rango: '80–100', etiqueta: 'Óptimo', color: '#0E8F6B', claro: '#3DD6A8', clase: 'optimo', resumen: 'Un entorno que cuida a las personas. Conviene sostener y compartir lo que ya funciona.' },
  { min: 60, rango: '60–79', etiqueta: 'Mejorable', color: '#C28A0E', claro: '#F2C14E', clase: 'mejorable', resumen: 'Buenas bases con oportunidades claras. Pequeños ajustes pueden marcar una gran diferencia.' },
  { min: 40, rango: '40–59', etiqueta: 'Atención media', color: '#DB6A24', claro: '#FF9A5C', clase: 'atencion', resumen: 'Hay señales que merecen conversación y un plan de acción con seguimiento.' },
  { min: 0, rango: '0–39', etiqueta: 'Necesita acción', color: '#CF3F4F', claro: '#FF7A87', clase: 'urgente', resumen: 'Es momento de priorizar cambios y acompañar al equipo de cerca.' },
] as const;

export function nivel(puntaje: number) {
  return NIVELES.find((n) => puntaje >= n.min) ?? NIVELES[NIVELES.length - 1];
}

export function recomendar(id: string, score: number) {
  if (score >= 80) return 'Mantén las prácticas que ya funcionan y comparte lo aprendido con otros equipos.';
  const textos: Record<string, string> = {
    ambiente: 'Revisar las condiciones del espacio, ergonomía y equipos junto con el equipo de prevención.',
    clima: 'Implementar conversaciones de equipo y encuestas de clima periódicas para mejorar la comunicación.',
    equilibrio: 'Revisar la carga laboral semanal, proteger los descansos y acordar límites de desconexión.',
    crecimiento: 'Definir conversaciones de desarrollo, feedback frecuente y oportunidades de aprendizaje.',
    emocional: 'Fortalecer los canales confidenciales de apoyo y prevención de acoso, con seguimiento visible.',
  };
  return textos[id] ?? 'Conversar con el equipo para identificar acciones concretas de mejora.';
}
