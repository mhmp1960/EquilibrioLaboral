import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Heart,
  Scale,
  Smile,
  Target,
} from 'lucide-react';

const beneficios = [
  { icon: BriefcaseBusiness, titulo: 'Más productividad', texto: 'Cuando las personas están bien, el trabajo fluye mejor.', color: 'azul' },
  { icon: Heart, titulo: 'Mejor salud mental', texto: 'Un entorno sano reduce el estrés y fortalece el bienestar.', color: 'verde' },
  { icon: Scale, titulo: 'Tiempo para ti', texto: 'Crea espacio para tu familia, tus intereses y tu descanso.', color: 'lila' },
  { icon: Target, titulo: 'Metas con sentido', texto: 'Avanza en lo profesional y personal con mayor claridad.', color: 'ambar' },
  { icon: Smile, titulo: 'Más satisfacción', texto: 'Haz del trabajo una parte positiva de una vida plena.', color: 'turquesa' },
];

const habitos = [
  'Establece horarios y respétalos.',
  'Aprende a decir “no” cuando sea necesario.',
  'Desconéctate del trabajo fuera de horario.',
  'Cuida tu salud física y emocional.',
  'Reconoce tus avances, incluso los pequeños.',
];

export default function Inicio() {
  return (
    <>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-foto" role="img" aria-label="Persona disfrutando un momento de calma al aire libre" />
        <div className="home-hero-capa" />
        <div className="home-hero-contenido shell">
          <div className="home-hero-copy">
            <span className="home-kicker"><i /> Equilibrio laboral</span>
            <h1 id="home-title">El secreto está en <span>equilibrar</span> tu vida.</h1>
            <p>No se trata de trabajar menos, sino de vivir y trabajar mejor. Escucha a tu equipo y encuentra cambios que sí hacen la diferencia.</p>
            <div className="home-hero-acciones">
              <Link href="#bienestar" className="home-boton home-boton-azul">Descubre cómo <ArrowRight size={18} /></Link>
              <Link href="/auditoria" className="home-link">Conoce la auditoría <ArrowUpRight size={16} /></Link>
            </div>
            <div className="home-hero-nota"><span className="home-nota-punto" /> Una evaluación clara, confidencial y centrada en las personas</div>
          </div>
          <p className="home-hero-frase">Más tiempo<br />para lo que<br /><em>realmente importa.</em></p>
        </div>
        <a className="home-bajar" href="#bienestar" aria-label="Desplazarse a los beneficios"><span /></a>
      </section>

      <section className="home-beneficios shell" id="bienestar" aria-label="Beneficios de un buen equilibrio laboral">
        {beneficios.map(({ icon: Icon, titulo, texto, color }) => (
          <article className="home-beneficio" key={titulo}>
            <div className={`home-beneficio-icono home-icono-${color}`}><Icon size={29} strokeWidth={1.8} aria-hidden="true" /></div>
            <h2>{titulo}</h2>
            <p>{texto}</p>
          </article>
        ))}
      </section>

      <section className="home-habitos shell" aria-labelledby="home-habitos-title">
        <div className="home-habitos-copy">
          <span className="home-kicker home-kicker-oscuro"><i /> Pequeños hábitos, grandes cambios</span>
          <h2 id="home-habitos-title">Tips para lograr tu equilibrio laboral</h2>
          <p>El bienestar también se construye con decisiones cotidianas. Empieza con una que puedas sostener.</p>
          <ul>
            {habitos.map((habito) => <li key={habito}><span><Check size={15} strokeWidth={2.8} aria-hidden="true" /></span>{habito}</li>)}
          </ul>
          <Link href="/auditoria" className="home-habitos-link">Explora tu bienestar <ArrowRight size={16} /></Link>
        </div>
        <div className="home-habitos-foto" role="img" aria-label="Espacio de trabajo cálido con libreta, café, laptop y una planta">
          <div className="home-foto-etiqueta"><span className="home-foto-punto" /> UN PASO A LA VEZ</div>
        </div>
      </section>

      <section className="home-cierre shell" aria-label="Comienza hoy">
        <div className="home-cierre-marca" aria-hidden="true"><span className="home-cierre-emblema"><Scale size={27} strokeWidth={1.5} /></span><i /></div>
        <div className="home-cierre-titular"><span>Tu bienestar también</span><strong>es parte del trabajo.</strong></div>
        <p>El equilibrio no es un destino. Es una forma más consciente de trabajar y vivir cada día.</p>
        <Link href="/auditoria" className="home-boton home-boton-amarillo">Empieza hoy <ArrowRight size={17} /></Link>
      </section>
    </>
  );
}
