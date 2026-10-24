import type { Metadata } from 'next';
import { CheckCircle2, HeartHandshake, LockKeyhole, Scale } from 'lucide-react';
import { Marca } from '@/components/Marca';

export const metadata: Metadata = { title: 'Acerca de EquilibrioLaboral' };

export default function Acerca() {
  return (
    <div className="acerca shell">
      <section className="acerca-hero">
        <div className="acerca-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> ACERCA DE EQUILIBRIOLABORAL</span>
          <h1>El trabajo también<br />puede <em>hacernos bien.</em></h1>
          <p>Una herramienta para escuchar a los equipos, reconocer oportunidades y convertirlas en mejores experiencias de trabajo.</p>
          <div className="acerca-atributos">
            <span><b>05</b> áreas de bienestar</span>
            <i aria-hidden="true" />
            <span>Privado por diseño</span>
          </div>
        </div>

        <div className="acerca-visual" role="group" aria-label="EquilibrioLaboral integra cinco áreas del bienestar en el trabajo">
          <div className="acerca-visual-cabecera"><span><i /> BIENESTAR EN PERSPECTIVA</span><span>01 — 05</span></div>
          <div className="acerca-visual-centro">
            <Marca grande />
            <h2>Personas primero.<br /><em>Mejores equipos.</em></h2>
          </div>
          <div className="acerca-visual-medidor" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className="acerca-visual-pie"><span>Una mirada integral</span><span>Con cuidado y claridad</span></div>
        </div>
      </section>

      <section className="acerca-detalle" aria-labelledby="acerca-detalle-titulo">
        <div className="acerca-detalle-cabecera">
          <div><span className="eyebrow">UNA BASE PARA AVANZAR</span><h2 id="acerca-detalle-titulo">Escuchar mejor.<br /><em>Trabajar mejor.</em></h2></div>
          <p>Una evaluación sencilla puede abrir conversaciones importantes. Estas son las ideas que guían EquilibrioLaboral.</p>
        </div>

        <div className="acerca-grid">
          <article>
            <span className="acerca-icon"><HeartHandshake /></span>
            <span className="eyebrow">01 · PROPÓSITO</span>
            <h3>Que escuchar abra caminos.</h3>
            <p>Invitamos a conversar sobre las condiciones, las relaciones, el equilibrio entre vida y trabajo, el desarrollo y la salud emocional. La evaluación ayuda a reconocer fortalezas y elegir acciones posibles, sin calificar a las personas.</p>
          </article>

          <article>
            <span className="acerca-icon"><Scale /></span>
            <span className="eyebrow">02 · MÉTODO</span>
            <h3>Resultados claros y transparentes.</h3>
            <p>Las respuestas usan una escala de 1 a 5. Cada área se convierte a una puntuación sobre 100; el resultado general promedia las áreas respondidas. Las recomendaciones señalan dónde puede ser útil empezar.</p>
            <div className="niveles-lista"><span>80–100 <b>Óptimo</b></span><span>60–79 <b>Mejorable</b></span><span>40–59 <b>Atención media</b></span><span>0–39 <b>Necesita acción</b></span></div>
          </article>

          <article>
            <span className="acerca-icon"><LockKeyhole /></span>
            <span className="eyebrow">03 · PRIVACIDAD</span>
            <h3>Tus respuestas son tuyas.</h3>
            <p>Las respuestas se guardan en el navegador de este dispositivo y no se envían a servidores. Puedes borrarlas cuando quieras al limpiar el almacenamiento local del navegador.</p>
          </article>
        </div>
      </section>

      <footer className="acerca-pie">
        <div className="acerca-autor"><span>Una iniciativa de</span><strong>Miguel Hermógenes Mogrovejo Pérez</strong></div>
        <div className="acerca-version"><CheckCircle2 size={16} /> EquilibrioLaboral <span>·</span> Versión 1.0.0</div>
      </footer>
    </div>
  );
}
