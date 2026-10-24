import type { Metadata } from 'next';
import { CheckCircle2, HeartHandshake, LockKeyhole, Scale } from 'lucide-react';
import { Marca } from '@/components/Marca';

export const metadata: Metadata = { title: 'Acerca de EquilibrioLaboral' };

export default function Acerca() {
  return (
    <div className="acerca shell">
      <div className="acerca-hero">
        <span className="eyebrow"><span className="eyebrow-dot" /> ACERCA DE NOSOTROS</span>
        <h1>El trabajo también<br />puede <em>hacernos bien.</em></h1>
        <p>EquilibrioLaboral ayuda a convertir la escucha en mejoras concretas para la vida diaria de los equipos.</p>
        <div className="acerca-marca"><Marca grande /></div>
      </div>

      <div className="acerca-grid">
        <article>
          <span className="acerca-icon"><HeartHandshake /></span>
          <span className="eyebrow">NUESTRO PROPÓSITO</span>
          <h2>Que escuchar abra caminos de mejora.</h2>
          <p>Ofrecemos a cada equipo una forma clara y respetuosa de conversar sobre sus condiciones de trabajo, sus relaciones, el equilibrio entre vida y trabajo, las oportunidades de crecimiento y la salud emocional. La evaluación ayuda a reconocer fortalezas y temas que merecen atención, para dar paso a acuerdos y acciones posibles. No busca calificar personas ni reemplazar una conversación directa.</p>
        </article>

        <article>
          <span className="acerca-icon"><Scale /></span>
          <span className="eyebrow">CÓMO SE CALCULA</span>
          <h2>Claro y transparente.</h2>
          <p>Cada respuesta usa una escala de 1 a 5. El promedio de cada área se convierte a una puntuación sobre 100. El resultado general es el promedio de las áreas respondidas. Las recomendaciones priorizan las puntuaciones más bajas.</p>
          <div className="niveles-lista"><span>80–100 <b>Óptimo</b></span><span>60–79 <b>Mejorable</b></span><span>40–59 <b>Atención media</b></span><span>0–39 <b>Necesita acción</b></span></div>
        </article>

        <article className="acerca-confidencial">
          <span className="acerca-icon"><LockKeyhole /></span>
          <span className="eyebrow">TU PRIVACIDAD</span>
          <h2>En tus manos.</h2>
          <p>Las respuestas se guardan en el navegador del usuario y no se envían a servidores. Puedes borrar los datos limpiando el almacenamiento local de este dispositivo.</p>
        </article>
      </div>

      <div className="acerca-pie">
        <div className="acerca-autor"><span>Autor</span><strong>Miguel Hermógenes Mogrovejo Pérez</strong></div>
        <div className="acerca-version"><CheckCircle2 size={16} /> EquilibrioLaboral <span>·</span> Versión 1.0.0 <span>·</span> Hecho con cuidado, para equipos que importan.</div>
      </div>
    </div>
  );
}
