export type Seccion = { id: string; nombre: string; breve: string; icono: string; color: string; preguntas: string[] };

export const secciones: Seccion[] = [
  { id: 'ambiente', nombre: 'Ambiente físico y seguridad', breve: 'Ambiente físico', icono: '⌂', color: '#a9e8d1', preguntas: ['El espacio de trabajo tiene buena iluminación y ventilación.', 'Las áreas de trabajo se mantienen limpias y ordenadas.', 'Mi puesto y mobiliario son cómodos y ergonómicos.', 'Cuento con las herramientas y equipos que necesito.', 'Conozco las medidas de seguridad para realizar mi trabajo.'] },
  { id: 'clima', nombre: 'Clima laboral y relaciones', breve: 'Clima laboral', icono: '♡', color: '#d3c8ff', preguntas: ['En mi equipo nos tratamos con respeto.', 'La comunicación en mi equipo es clara y oportuna.', 'Puedo contar con mis compañeros cuando lo necesito.', 'Las decisiones y oportunidades se gestionan con justicia.', 'Los desacuerdos se conversan y resuelven de forma constructiva.'] },
  { id: 'equilibrio', nombre: 'Equilibrio vida-trabajo', breve: 'Vida y trabajo', icono: '◷', color: '#ffddb0', preguntas: ['La carga de trabajo es razonable y sostenible.', 'Mi horario me permite desconectarme al terminar la jornada.', 'Tengo flexibilidad para atender asuntos personales importantes.', 'Puedo tomar pausas y descansos durante el día.', 'El trabajo me deja tiempo y energía para mi vida personal.'] },
  { id: 'crecimiento', nombre: 'Crecimiento y reconocimiento', breve: 'Crecimiento', icono: '↗', color: '#b9ddff', preguntas: ['Tengo oportunidades para aprender y desarrollar habilidades.', 'Mi esfuerzo y mis logros son reconocidos.', 'Recibo comentarios útiles para mejorar mi trabajo.', 'Veo posibilidades de crecimiento profesional aquí.'] },
  { id: 'emocional', nombre: 'Salud emocional y apoyo', breve: 'Salud emocional', icono: '✳', color: '#ffc9c7', preguntas: ['Puedo hablar sobre el estrés o las dificultades que enfrento.', 'Recibo apoyo cuando atravieso un momento difícil.', 'Confío en que se toman en serio las situaciones de acoso o maltrato.', 'Me siento parte de este equipo y organización.'] },
];

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

export function nivel(puntaje: number) {
  if (puntaje >= 80) return { etiqueta: 'Óptimo', color: '#178568', clase: 'optimo' };
  if (puntaje >= 60) return { etiqueta: 'Mejorable', color: '#b58a19', clase: 'mejorable' };
  if (puntaje >= 40) return { etiqueta: 'Atención media', color: '#d77736', clase: 'atencion' };
  return { etiqueta: 'Necesita acción', color: '#d75555', clase: 'urgente' };
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
