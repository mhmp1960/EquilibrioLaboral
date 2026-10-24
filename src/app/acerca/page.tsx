import type { Metadata } from 'next';
import { CheckCircle2, HeartHandshake, LockKeyhole, Scale } from 'lucide-react';
import { Simbolo } from '@/components/Marca';
import { NIVELES, secciones, TOTAL_PREGUNTAS } from '@/lib/auditoria';

export const metadata: Metadata = { title: 'Acerca de EquilibrioLaboral' };

const calculo = [
  'Las respuestas de cada área se promedian y se convierten a una escala de 0 a 100.',
  'La puntuación general es el promedio de las áreas que tienen respuestas.',
  'Las recomendaciones priorizan las áreas con menor puntuación.',
];

export default function Acerca() {
  return (
    <div className="acerca shell">
      <section className="acerca-hero" aria-labelledby="titulo-acerca">
        <div>
          <span className="eyebrow">Acerca de EquilibrioLaboral</span>
          <h1 id="titulo-acerca">El trabajo también puede <em>hacernos bien.</em></h1>
          <p>Una herramienta para escuchar a los equipos, reconocer oportunidades y convertirlas en mejores experiencias de trabajo.</p>
          <div className="acerca-datos">
            <div><b>{String(secciones.length).padStart(2, '0')}</b><span>áreas de bienestar</span></div>
            <div><b>{TOTAL_PREGUNTAS}</b><span>afirmaciones</span></div>
            <div><b>0</b><span>datos enviados a servidores</span></div>
          </div>
        </div>
        <div className="acerca-visual" aria-hidden="true">
          <div className="acerca-visual-aro"><Simbolo tamano={132} animado /></div>
        </div>
      </section>

      <section className="principios" aria-label="Principios">
        <article className="principio tarjeta" data-tono="teal">
          <span className="icono-tono"><HeartHandshake size={24} aria-hidden="true" /></span>
          <span className="eyebrow">01 · Propósito</span>
          <h2>Que escuchar abra caminos.</h2>
          <p>Invitamos a conversar sobre las condiciones, las relaciones, el equilibrio entre vida y trabajo, el desarrollo y la salud emocional. La evaluación ayuda a reconocer fortalezas y elegir acciones posibles, sin calificar a las personas.</p>
        </article>
        <article className="principio tarjeta" data-tono="violet">
          <span className="icono-tono"><Scale size={24} aria-hidden="true" /></span>
          <span className="eyebrow">02 · Método</span>
          <h2>Resultados claros y transparentes.</h2>
          <p>Las respuestas usan una escala de 1 a 5. Cada área se convierte a una puntuación sobre 100 y el resultado general promedia las áreas respondidas. Las recomendaciones señalan dónde puede ser útil empezar.</p>
        </article>
        <article className="principio tarjeta" data-tono="blue">
          <span className="icono-tono"><LockKeyhole size={24} aria-hidden="true" /></span>
          <span className="eyebrow">03 · Privacidad</span>
          <h2>Tus respuestas son tuyas.</h2>
          <p>Las respuestas se guardan en el navegador de este dispositivo y no se envían a servidores. Puedes borrarlas cuando quieras al limpiar el almacenamiento local del navegador.</p>
        </article>
      </section>

      <section className="metodo" id="metodo" aria-labelledby="titulo-metodo">
        <div>
          <span className="eyebrow">Cómo se calcula</span>
          <h2 id="titulo-metodo">Un puntaje que se entiende de un vistazo.</h2>
          <p>Cada afirmación se responde de 1 (muy en desacuerdo) a 5 (muy de acuerdo). Así se transforma en un resultado:</p>
          <ol className="pasos-calculo">
            {calculo.map((paso, i) => <li key={paso}><span>{i + 1}</span>{paso}</li>)}
          </ol>
        </div>
        <ul className="niveles tarjeta" aria-label="Niveles de interpretación">
          {NIVELES.map((n) => (
            <li className={`estado-${n.clase}`} key={n.clase}>
              <b>{n.rango}</b>
              <div><strong>{n.etiqueta}</strong><p>{n.resumen}</p></div>
            </li>
          ))}
        </ul>
      </section>

      <section className="privacidad-bloque tarjeta" id="privacidad" data-tono="teal" aria-labelledby="titulo-privacidad">
        <span className="icono-tono"><LockKeyhole size={26} aria-hidden="true" /></span>
        <div>
          <span className="eyebrow">Privacidad</span>
          <h2 id="titulo-privacidad">Tus datos se quedan contigo.</h2>
          <p>Las respuestas y comentarios se guardan solo en el almacenamiento local del navegador. No hay cuentas, seguimiento ni servidores que reciban tu auditoría. Al borrar los datos del sitio también se elimina la auditoría guardada.</p>
          <p>La acción de compartir genera un resumen de puntajes solo cuando la solicitas. La herramienta es una guía para conversar y no constituye un diagnóstico clínico ni una auditoría legal.</p>
        </div>
      </section>

      <footer className="acerca-pie">
        <div><small>Una iniciativa de</small><strong>Miguel Hermógenes Mogrovejo Pérez</strong></div>
        <span><CheckCircle2 size={16} aria-hidden="true" /> EquilibrioLaboral · Versión 1.0.0</span>
      </footer>
    </div>
  );
}
