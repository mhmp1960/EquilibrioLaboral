'use client';
import { useEffect, useRef, useState } from 'react';
import { AlertCircle, ArrowLeft, ArrowRight, Check, MessageCircle, Save, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { secciones, STORAGE_KEY, type Auditoria, type Respuestas, type Seccion } from '@/lib/auditoria';
import { IconoArea } from './IconoArea';

const escala = ['Muy en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Muy de acuerdo'];
const TOTAL_PASOS = secciones.length + 1;
const MAX_COMENTARIO = 1200;

const respondida = (seccion: Seccion, respuestas: Respuestas) => seccion.preguntas.some((_, i) => respuestas[`${seccion.id}-${i}`]);

export function FormularioAuditoria() {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState<Respuestas>({});
  const [comentario, setComentario] = useState('');
  const [error, setError] = useState('');
  const [hidratado, setHidratado] = useState(false);
  const titulo = useRef<HTMLHeadingElement>(null);
  const primeraVez = useRef(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      if (guardado) {
        const datos = JSON.parse(guardado) as Auditoria;
        setRespuestas(datos.respuestas ?? {});
        setComentario(datos.comentario ?? '');
      }
    } catch { /* Ignorar datos locales inválidos. */ }
    setHidratado(true);
  }, []);

  useEffect(() => {
    if (!hidratado) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ respuestas, comentario, fecha: new Date().toISOString() })); } catch { /* El formulario sigue disponible aunque el almacenamiento no lo esté. */ }
  }, [respuestas, comentario, hidratado]);

  // Lleva el foco al título del paso para que lectores de pantalla anuncien el cambio.
  useEffect(() => {
    if (primeraVez.current) { primeraVez.current = false; return; }
    titulo.current?.focus({ preventScroll: true });
  }, [paso]);

  const respondidas = secciones.filter((s) => respondida(s, respuestas)).length;
  const progreso = Math.round(((respondidas + (paso === secciones.length ? 1 : 0)) / TOTAL_PASOS) * 100);
  const seccion = secciones[paso];
  const enComentarios = paso >= secciones.length;

  const irA = (destino: number) => {
    setError('');
    setPaso(destino);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const puedeIr = (destino: number) => destino <= paso || secciones.slice(0, destino).every((s) => respondida(s, respuestas));

  const avanzar = () => {
    if (!respondida(seccion, respuestas)) { setError('Elige al menos una respuesta para continuar.'); return; }
    irA(paso + 1);
  };
  const finalizar = () => {
    const faltante = secciones.findIndex((s) => !respondida(s, respuestas));
    if (faltante >= 0) { irA(faltante); setError('Completa al menos una respuesta en cada área para ver tu resultado.'); return; }
    router.push('/resultados');
  };

  const alerta = error && <p className="error-form" role="alert"><AlertCircle size={17} aria-hidden="true" />{error}</p>;
  const guardado = <span className="guardado"><Save size={14} aria-hidden="true" /> Avance guardado automáticamente</span>;

  return (
    <div className="form-card">
      <div className="form-cab">
        <div className="form-cab-top">
          <div>
            <small>{enComentarios ? 'Último paso' : `Área ${paso + 1} de ${secciones.length}`}</small>
            <b>{enComentarios ? 'Comentarios y sugerencias' : seccion.nombre}</b>
          </div>
          <strong aria-label={`Avance ${progreso} por ciento`}>{progreso}<small>%</small></strong>
        </div>
        <div className="progreso" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progreso} aria-label="Avance de la auditoría"><span style={{ width: `${progreso}%` }} /></div>
      </div>

      <ol className="stepper" style={{ gridTemplateColumns: `repeat(${TOTAL_PASOS}, 1fr)` }} aria-label="Pasos de la auditoría">
        {[...secciones, { id: 'comentarios', breve: 'Comentarios' }].map((s, i) => {
          const hecho = i < paso && (i >= secciones.length || respondida(secciones[i], respuestas));
          return (
            <li key={s.id} className={hecho ? 'hecho' : i === paso ? 'actual' : ''}>
              <button type="button" onClick={() => irA(i)} disabled={i === paso || !puedeIr(i)} aria-label={`Paso ${i + 1}: ${s.breve}`} aria-current={i === paso ? 'step' : undefined}>
                {hecho ? <Check size={16} strokeWidth={3} aria-hidden="true" /> : i >= secciones.length ? <MessageCircle size={16} aria-hidden="true" /> : <IconoArea id={s.id} size={16} />}
              </button>
              <span>{s.breve}</span>
            </li>
          );
        })}
      </ol>

      {!enComentarios ? (
        <div className="form-panel" key={seccion.id} data-tono={seccion.tono}>
          <div className="panel-cab">
            <span className="icono-tono"><IconoArea id={seccion.id} size={24} /></span>
            <div>
              <small>Área {String(paso + 1).padStart(2, '0')}</small>
              <h2 ref={titulo} tabIndex={-1}>{seccion.nombre}</h2>
            </div>
          </div>
          <p className="panel-ayuda">¿Qué tan de acuerdo estás con estas afirmaciones?</p>
          <div className="escala-leyenda" aria-hidden="true"><span>1 · Muy en desacuerdo</span><span>5 · Muy de acuerdo</span></div>

          <div className="preguntas">
            {seccion.preguntas.map((pregunta, i) => {
              const key = `${seccion.id}-${i}`;
              return (
                <fieldset className="pregunta" key={key}>
                  <legend>{pregunta}</legend>
                  <div className="opciones">
                    {escala.map((etiqueta, j) => (
                      <label className="opcion" key={etiqueta}>
                        <input type="radio" name={key} value={j + 1} checked={respuestas[key] === j + 1} onChange={() => { setRespuestas((prev) => ({ ...prev, [key]: j + 1 })); setError(''); }} />
                        <span className="opcion-caja"><b>{j + 1}</b><small>{etiqueta}</small></span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              );
            })}
          </div>

          {alerta}
          <div className="form-nav">
            {guardado}
            <div className="form-nav-botones">
              <button type="button" className="btn btn-secundario" disabled={paso === 0} onClick={() => irA(paso - 1)}><ArrowLeft size={16} aria-hidden="true" /> Anterior</button>
              <button type="button" className="btn btn-primario" onClick={avanzar}>Siguiente <ArrowRight size={16} aria-hidden="true" /></button>
            </div>
          </div>
        </div>
      ) : (
        <div className="form-panel comentario-panel" data-tono="teal">
          <div className="panel-cab">
            <span className="icono-tono"><MessageCircle size={24} aria-hidden="true" /></span>
            <div>
              <small>Tu perspectiva</small>
              <h2 ref={titulo} tabIndex={-1}>Comentarios y sugerencias</h2>
            </div>
          </div>
          <p className="panel-ayuda">¿Hay algo más que te gustaría compartir? Este espacio es opcional.</p>
          <label className="comentario-etiqueta" htmlFor="comentario">Tu comentario <span>Opcional</span></label>
          <textarea id="comentario" value={comentario} onChange={(e) => setComentario(e.target.value)} placeholder="Una idea, una inquietud o algo que te gustaría que supiéramos…" rows={6} maxLength={MAX_COMENTARIO} />
          <div className="contador">{comentario.length}/{MAX_COMENTARIO}</div>
          <div className="compromiso"><ShieldCheck size={18} aria-hidden="true" /><span>Tu comentario permanece en tu navegador junto con tus respuestas.</span></div>

          {alerta}
          <div className="form-nav">
            {guardado}
            <div className="form-nav-botones">
              <button type="button" className="btn btn-secundario" onClick={() => irA(secciones.length - 1)}><ArrowLeft size={16} aria-hidden="true" /> Anterior</button>
              <button type="button" className="btn btn-primario" onClick={finalizar}>Ver mis resultados <Check size={16} aria-hidden="true" /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
