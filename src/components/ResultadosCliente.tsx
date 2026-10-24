'use client';
import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ClipboardList, Download, Lightbulb, LockKeyhole, MessageCircle, RotateCcw, Share2, Sparkles, Target, TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { calcularResultados, nivel, NIVELES, recomendar, STORAGE_KEY, TOTAL_PREGUNTAS, type Auditoria } from '@/lib/auditoria';
import { Anillo } from './Anillo';
import { IconoArea } from './IconoArea';
import { Marca } from './Marca';

export function ResultadosCliente() {
  const [datos, setDatos] = useState<Auditoria | null>(null);
  const [listo, setListo] = useState(false);
  const [compartido, setCompartido] = useState(false);
  const [confirmando, setConfirmando] = useState(false);

  useEffect(() => {
    try { const guardado = localStorage.getItem(STORAGE_KEY); if (guardado) setDatos(JSON.parse(guardado) as Auditoria); } catch { /* Ignorar datos locales inválidos. */ }
    setListo(true);
  }, []);

  const resultados = useMemo(() => (datos ? calcularResultados(datos.respuestas ?? {}) : null), [datos]);
  const fecha = datos?.fecha ? new Date(datos.fecha).toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  if (!listo) return <div className="cargando-resultados" role="status">Preparando tus resultados…</div>;

  if (!datos || !resultados?.general) {
    return (
      <div className="sin-resultados shell">
        <span className="sin-icono"><Sparkles size={28} aria-hidden="true" /></span>
        <span className="eyebrow">Todavía no hay resultados</span>
        <h1>Empecemos por <em className="degradado">escuchar.</em></h1>
        <p>Completa la auditoría para descubrir cómo se siente el bienestar en tu equipo.</p>
        <Link className="btn btn-primario btn-lg" href="/auditoria">Iniciar auditoría <ArrowRight size={18} aria-hidden="true" /></Link>
      </div>
    );
  }

  const estado = nivel(resultados.general);
  const respondidas = resultados.puntajes.filter((s) => s.respondidas);
  const ordenadas = [...respondidas].sort((a, b) => a.puntaje - b.puntaje);
  const prioritaria = ordenadas[0];
  const fortaleza = ordenadas[ordenadas.length - 1];
  const totalRespondidas = respondidas.reduce((total, s) => total + s.respondidas, 0);
  const recs = ordenadas.filter((s) => s.puntaje < 80).slice(0, 3);

  const compartir = async () => {
    const texto = `EquilibrioLaboral · Resultado de bienestar: ${resultados.general}/100 (${estado.etiqueta}). Áreas: ${resultados.puntajes.map((s) => `${s.breve} ${s.puntaje}%`).join(' · ')}`;
    try {
      if (navigator.share) await navigator.share({ title: 'Resultados de bienestar laboral', text: texto });
      else if (navigator.clipboard) { await navigator.clipboard.writeText(texto); setCompartido(true); setTimeout(() => setCompartido(false), 2500); }
    } catch { /* La persona puede cancelar el menú de compartir. */ }
  };
  const reiniciar = () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* Sin acceso al almacenamiento local. */ }
    window.location.href = '/auditoria';
  };

  return (
    <div className="resultados shell">
      <div className="res-top">
        <Link className="volver" href="/"><ArrowLeft size={16} aria-hidden="true" /> Inicio</Link>
        {fecha && <span className="res-fecha">Auditoría · {fecha}</span>}
      </div>

      <header className="res-hero" style={{ '--estado-hero': estado.claro } as CSSProperties}>
        <div>
          <span className="eyebrow">Una mirada para crecer</span>
          <h1>Tu bienestar, en perspectiva.</h1>
          <p>{estado.resumen}</p>
          <span className="pill-estado">{estado.etiqueta}</span>
        </div>
        <div className="res-anillo" role="img" aria-label={`Bienestar general: ${resultados.general} de 100, ${estado.etiqueta}`}>
          <Anillo valor={resultados.general} tamano={208} grosor={8} />
          <div aria-hidden="true"><span>Bienestar general</span><strong>{resultados.general}<small>/100</small></strong></div>
        </div>
      </header>

      <div className="kpis">
        <div className="kpi tarjeta" data-tono={fortaleza.tono}>
          <span className="icono-tono"><TrendingUp size={20} aria-hidden="true" /></span>
          <div><small>Mayor fortaleza</small><b>{fortaleza.breve}</b><span>{fortaleza.puntaje}% · {nivel(fortaleza.puntaje).etiqueta}</span></div>
        </div>
        <div className="kpi tarjeta" data-tono={prioritaria.tono}>
          <span className="icono-tono"><Target size={20} aria-hidden="true" /></span>
          <div><small>Prioridad sugerida</small><b>{prioritaria.breve}</b><span>{prioritaria.puntaje}% · {nivel(prioritaria.puntaje).etiqueta}</span></div>
        </div>
        <div className="kpi tarjeta" data-tono="teal">
          <span className="icono-tono"><ClipboardList size={20} aria-hidden="true" /></span>
          <div><small>Respuestas</small><b>{totalRespondidas} de {TOTAL_PREGUNTAS}</b><span>afirmaciones respondidas</span></div>
        </div>
      </div>

      <section className="res-seccion" aria-labelledby="titulo-detalle">
        <div className="res-seccion-cab">
          <div><span className="eyebrow">El detalle</span><h2 id="titulo-detalle">Cinco áreas, una visión.</h2></div>
          <span>Puntuación sobre 100</span>
        </div>
        <div className="res-grid">
          <div className="grafico-card tarjeta">
            <ResponsiveContainer width="100%" height={290}>
              <BarChart data={resultados.puntajes} layout="vertical" margin={{ top: 8, right: 36, left: 4, bottom: 0 }} barCategoryGap={16}>
                <CartesianGrid stroke="#e2e9ee" strokeDasharray="3 4" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: '#5b6f7e', fontSize: 11 }} />
                <YAxis type="category" dataKey="breve" width={108} tickLine={false} axisLine={false} tick={{ fill: '#0e2231', fontSize: 12, fontWeight: 600 }} />
                <Tooltip cursor={{ fill: '#f1f6f8' }} formatter={(v) => [`${v}%`, 'Puntuación']} contentStyle={{ border: '1px solid #e2e9ee', borderRadius: 12, fontSize: 12, boxShadow: '0 10px 28px rgb(13 42 61 / 10%)' }} />
                <Bar dataKey="puntaje" radius={[0, 8, 8, 0]} barSize={20}>
                  {resultados.puntajes.map((s) => <Cell key={s.id} fill={nivel(s.puntaje).color} />)}
                  <LabelList dataKey="puntaje" position="right" fill="#0e2231" fontSize={12} fontWeight={700} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="leyenda">
              {NIVELES.map((n) => <span key={n.clase}><i style={{ background: n.color }} />{n.etiqueta}</span>)}
            </div>
          </div>

          <div className="puntajes-lista tarjeta">
            {resultados.puntajes.map((s) => {
              const n = nivel(s.puntaje);
              return (
                <article className={`puntaje-fila estado-${n.clase}`} data-tono={s.tono} key={s.id}>
                  <span className="icono-tono"><IconoArea id={s.id} size={20} /></span>
                  <div className="puntaje-info">
                    <div><b>{s.breve}</b><span>{s.puntaje}%</span></div>
                    <div className="barra" style={{ '--tono': n.color } as CSSProperties}><i style={{ width: `${s.puntaje}%` }} /></div>
                    <small>{n.etiqueta}</small>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="reco" aria-labelledby="titulo-reco">
        <div className="reco-cab">
          <span><Lightbulb size={22} aria-hidden="true" /></span>
          <div><span className="eyebrow">Próximos pasos</span><h2 id="titulo-reco">Ideas para empezar.</h2><p>Pequeñas acciones pueden abrir conversaciones importantes.</p></div>
        </div>
        <div className="reco-grid">
          {(recs.length ? recs : [prioritaria]).map((s, i) => (
            <article className="reco-card" data-tono={s.tono} key={s.id}>
              <div className="reco-card-top"><span className="reco-num">0{i + 1}</span><span className="reco-area">{s.breve} · {s.puntaje}%</span></div>
              <p>{recomendar(s.id, s.puntaje)}</p>
            </article>
          ))}
        </div>
      </section>

      {datos.comentario && (
        <section className="comentario-guardado" aria-label="Tu comentario">
          <span className="eyebrow"><MessageCircle size={14} aria-hidden="true" /> Lo que quieres compartir</span>
          <blockquote>“{datos.comentario}”</blockquote>
        </section>
      )}

      <section className="res-acciones">
        <div className="res-acciones-info">
          <Marca />
          <p>Este resultado es una invitación a conversar, no un diagnóstico.</p>
        </div>
        {confirmando ? (
          <div className="confirmar" role="alertdialog" aria-label="Confirmar nueva auditoría">
            <span>¿Borrar las respuestas guardadas y empezar de nuevo?</span>
            <button type="button" className="btn btn-secundario btn-sm" onClick={() => setConfirmando(false)}>Cancelar</button>
            <button type="button" className="btn btn-peligro btn-sm" onClick={reiniciar}>Sí, borrar y reiniciar</button>
          </div>
        ) : (
          <div className="acciones-botones">
            <button type="button" className="btn btn-secundario" onClick={() => window.print()}><Download size={16} aria-hidden="true" /> Imprimir / guardar PDF</button>
            <button type="button" className="btn btn-secundario" onClick={compartir}><Share2 size={16} aria-hidden="true" /> {compartido ? 'Resumen copiado' : 'Compartir resumen'}</button>
            <button type="button" className="btn btn-primario" onClick={() => setConfirmando(true)}><RotateCcw size={16} aria-hidden="true" /> Nueva auditoría</button>
          </div>
        )}
      </section>
      <p className="privacidad-nota"><LockKeyhole size={15} aria-hidden="true" /> Tus respuestas se guardan solo en este navegador. No se envían a ningún servidor.</p>
    </div>
  );
}
