import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  ClipboardList,
  Clock,
  Heart,
  Lightbulb,
  LockKeyhole,
  Scale,
  ShieldCheck,
  Smile,
  Sparkles,
  Target,
} from 'lucide-react';
import { Anillo } from '@/components/Anillo';
import { IconoArea } from '@/components/IconoArea';
import { secciones, TOTAL_PREGUNTAS } from '@/lib/auditoria';

const pasos = [
  { icon: ClipboardList, titulo: 'Responde con calma', texto: 'Afirmaciones breves en una escala de 1 a 5, organizadas en cinco áreas. Sin respuestas correctas.' },
  { icon: BarChart3, titulo: 'Obtén tu diagnóstico', texto: 'Un puntaje general y uno por área, con un gráfico claro para ver dónde enfocar la atención.' },
  { icon: Lightbulb, titulo: 'Actúa con claridad', texto: 'Recomendaciones priorizadas según las áreas con menor puntaje, listas para conversar en equipo.' },
];

const beneficios = [
  { icon: BriefcaseBusiness, titulo: 'Más productividad', texto: 'Cuando las personas están bien, el trabajo fluye mejor.' },
  { icon: Heart, titulo: 'Mejor salud mental', texto: 'Un entorno sano reduce el estrés y fortalece el bienestar.' },
  { icon: Scale, titulo: 'Tiempo para ti', texto: 'Espacio para la familia, los intereses y el descanso.' },
  { icon: Target, titulo: 'Metas con sentido', texto: 'Avanza en lo profesional y personal con mayor claridad.' },
  { icon: Smile, titulo: 'Más satisfacción', texto: 'Haz del trabajo una parte positiva de una vida plena.' },
];

const habitos = [
  'Establece horarios y respétalos.',
  'Aprende a decir “no” cuando sea necesario.',
  'Desconéctate del trabajo fuera de horario.',
  'Cuida tu salud física y emocional.',
  'Reconoce tus avances, incluso los pequeños.',
];

// Datos ilustrativos para la vista previa del hero (no son resultados reales).
const ejemplo = [76, 84, 72, 61, 78, 85];

export default function Inicio() {
  const metricas = [
    { valor: String(secciones.length).padStart(2, '0'), etiqueta: 'Áreas de bienestar' },
    { valor: String(TOTAL_PREGUNTAS), etiqueta: 'Afirmaciones' },
    { valor: '~5 min', etiqueta: 'Para completarla' },
    { valor: '100%', etiqueta: 'Privada en tu dispositivo' },
  ];

  return (
    <>
      <section className="hero" aria-labelledby="titulo-inicio">
        <div className="hero-fondo" aria-hidden="true" />
        <div className="hero-grid shell">
          <div className="hero-texto">
            <span className="insignia"><Sparkles size={15} aria-hidden="true" /> Auditoría de bienestar laboral</span>
            <h1 id="titulo-inicio">El bienestar de tu equipo, <em className="degradado">medido con claridad.</em></h1>
            <p className="lead">Una auditoría confidencial de cinco áreas que convierte lo que las personas sienten en un diagnóstico claro y en acciones concretas para mejorar.</p>
            <div className="hero-acciones">
              <Link href="/auditoria" className="btn btn-primario btn-lg">Iniciar auditoría <ArrowRight size={18} aria-hidden="true" /></Link>
              <Link href="#como-funciona" className="btn btn-secundario btn-lg">Cómo funciona</Link>
            </div>
            <ul className="hero-garantias">
              <li><Clock size={17} aria-hidden="true" /> Menos de 5 minutos</li>
              <li><Check size={17} aria-hidden="true" /> Sin registro</li>
              <li><LockKeyhole size={17} aria-hidden="true" /> Tus datos se quedan contigo</li>
            </ul>
          </div>

          <div className="hero-vista" role="img" aria-label="Vista de ejemplo de los resultados: puntaje general de 76 sobre 100 y puntaje por área">
            <div className="vista estado-mejorable" aria-hidden="true">
              <div className="vista-barra">
                <span className="vista-puntos"><i /><i /><i /></span>
                <span className="vista-etiqueta">Vista de ejemplo</span>
              </div>
              <div className="vista-cuerpo">
                <div className="vista-resumen">
                  <div className="vista-anillo">
                    <Anillo valor={ejemplo[0]} tamano={116} grosor={9} />
                    <div><strong>{ejemplo[0]}</strong><span>de 100</span></div>
                  </div>
                  <div>
                    <span className="pill-estado">Mejorable</span>
                    <h3>Bienestar general</h3>
                    <p>Buenas bases con oportunidades claras de mejora.</p>
                  </div>
                </div>
                <div className="vista-filas">
                  {secciones.map((s, i) => (
                    <div key={s.id} data-tono={s.tono}>
                      <div className="vista-fila-top"><span><IconoArea id={s.id} size={16} /> {s.breve}</span><span>{ejemplo[i + 1]}%</span></div>
                      <div className="barra"><i style={{ width: `${ejemplo[i + 1]}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flota flota-a" aria-hidden="true">
              <span className="icono-tono" data-tono="amber"><Lightbulb size={18} /></span>
              <div><b>Prioridad sugerida</b><small>Equilibrio vida-trabajo</small></div>
            </div>
            <div className="flota flota-b" aria-hidden="true">
              <span className="icono-tono" data-tono="teal"><ShieldCheck size={18} /></span>
              <div><b>100% confidencial</b><small>Guardado en tu navegador</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell" aria-label="La auditoría en cifras">
        <dl className="metricas">
          {metricas.map((m) => (
            <div className="metrica" key={m.etiqueta}><dt>{m.etiqueta}</dt><dd>{m.valor}</dd></div>
          ))}
        </dl>
      </section>

      <section className="seccion shell" id="como-funciona" aria-labelledby="titulo-pasos">
        <div className="seccion-cabecera">
          <span className="eyebrow">Cómo funciona</span>
          <h2 id="titulo-pasos">De la escucha a la acción, en tres pasos.</h2>
          <p>Sin formularios interminables ni cuentas: solo una conversación estructurada con tu propia experiencia de trabajo.</p>
        </div>
        <div className="pasos">
          {pasos.map(({ icon: Icono, titulo, texto }, i) => (
            <article className="paso" key={titulo}>
              <span className="paso-num" aria-hidden="true">0{i + 1}</span>
              <span className="paso-icono"><Icono size={22} aria-hidden="true" /></span>
              <h3>{titulo}</h3>
              <p>{texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="areas" aria-labelledby="titulo-areas">
        <div className="seccion shell">
          <div className="seccion-cabecera">
            <span className="eyebrow">Qué observamos</span>
            <h2 id="titulo-areas">Cinco áreas que dan forma a tu día a día.</h2>
            <p>Una mirada integral: del espacio físico a la salud emocional, pasando por las relaciones, el tiempo y el crecimiento.</p>
          </div>
          <div className="areas-grid">
            {secciones.map((s, i) => (
              <article className="area-card" data-tono={s.tono} key={s.id}>
                <div className="area-card-top">
                  <span className="icono-tono"><IconoArea id={s.id} size={21} /></span>
                  <span className="area-card-n">0{i + 1}</span>
                </div>
                <h3>{s.nombre}</h3>
                <p>{s.descripcion}</p>
                <span className="area-card-pie">{s.preguntas.length} afirmaciones</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion shell" aria-labelledby="titulo-importa">
        <div className="importa">
          <div>
            <div className="seccion-cabecera">
              <span className="eyebrow">Por qué importa</span>
              <h2 id="titulo-importa">Las personas bien, los equipos mejor.</h2>
              <p>No se trata de trabajar menos, sino de vivir y trabajar mejor. Escuchar es el primer paso para que los cambios sí hagan la diferencia.</p>
            </div>
            <div className="importa-lista">
              {beneficios.map(({ icon: Icono, titulo, texto }) => (
                <article className="beneficio" key={titulo}>
                  <span className="beneficio-icono"><Icono size={20} aria-hidden="true" /></span>
                  <h3>{titulo}</h3>
                  <p>{texto}</p>
                </article>
              ))}
            </div>
          </div>
          <aside className="habitos" aria-labelledby="titulo-habitos">
            <span className="eyebrow">Pequeños hábitos</span>
            <h3 id="titulo-habitos">Tips para sostener tu equilibrio</h3>
            <ul>
              {habitos.map((h) => <li key={h}><span><Check size={13} strokeWidth={3} aria-hidden="true" /></span>{h}</li>)}
            </ul>
          </aside>
        </div>
      </section>

      <section className="shell" style={{ paddingBottom: 96 }} aria-label="Comienza hoy">
        <div className="cta-final">
          <div>
            <h2>Tu bienestar también <em>es parte del trabajo.</em></h2>
            <p>El equilibrio no es un destino: es una forma más consciente de trabajar y vivir cada día. Empieza hoy, en menos de cinco minutos.</p>
          </div>
          <Link href="/auditoria" className="btn btn-claro btn-lg">Empezar ahora <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
