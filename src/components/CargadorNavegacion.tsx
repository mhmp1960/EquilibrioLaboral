'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Simbolo } from './Marca';

const DURACION_MINIMA = 650;
const DURACION_SALIDA = 400;
const TIEMPO_MAXIMO = 8000;

/** Pantalla de carga: se muestra al abrir la app y entre páginas. */
export function CargadorNavegacion() {
  const ruta = usePathname();
  const [visible, setVisible] = useState(true);
  const [saliendo, setSaliendo] = useState(false);
  const visibleRef = useRef(true);
  const inicioRef = useRef(0);
  const anteriorRef = useRef(ruta);
  const temporizadorRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const limpiar = useCallback(() => {
    if (temporizadorRef.current) clearTimeout(temporizadorRef.current);
    temporizadorRef.current = null;
  }, []);

  const ocultar = useCallback(() => {
    limpiar();
    const restante = Math.max(0, DURACION_MINIMA - (Date.now() - inicioRef.current));
    temporizadorRef.current = setTimeout(() => {
      setSaliendo(true);
      temporizadorRef.current = setTimeout(() => {
        visibleRef.current = false;
        setVisible(false);
        setSaliendo(false);
      }, DURACION_SALIDA);
    }, restante);
  }, [limpiar]);

  // Carga inicial de la aplicación.
  useEffect(() => {
    inicioRef.current = Date.now();
    ocultar();
    return limpiar;
  }, [ocultar, limpiar]);

  // La página nueva ya está lista.
  useEffect(() => {
    if (anteriorRef.current === ruta) return;
    anteriorRef.current = ruta;
    if (visibleRef.current) ocultar();
  }, [ruta, ocultar]);

  useEffect(() => {
    const iniciarCarga = () => {
      limpiar();
      inicioRef.current = Date.now();
      visibleRef.current = true;
      setSaliendo(false);
      setVisible(true);
      temporizadorRef.current = setTimeout(ocultar, TIEMPO_MAXIMO);
    };

    const alHacerClic = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const objetivo = event.target;
      if (!(objetivo instanceof Element)) return;
      const enlace = objetivo.closest('a[href]');
      if (!(enlace instanceof HTMLAnchorElement) || enlace.target || enlace.hasAttribute('download')) return;

      const destino = new URL(enlace.href, window.location.href);
      if (destino.origin !== window.location.origin) return;
      if (destino.pathname === window.location.pathname) return;
      iniciarCarga();
    };

    document.addEventListener('click', alHacerClic, true);
    window.addEventListener('popstate', iniciarCarga);
    return () => {
      document.removeEventListener('click', alHacerClic, true);
      window.removeEventListener('popstate', iniciarCarga);
    };
  }, [ocultar, limpiar]);

  if (!visible) return null;

  return (
    <div className={`cargador${saliendo ? ' cargador-saliendo' : ''}`} role="status" aria-live="polite" aria-label="Cargando EquilibrioLaboral">
      <div className="cargador-centro">
        <div className="cargador-simbolo"><Simbolo tamano={88} animado /></div>
        <p className="cargador-nombre">Equilibrio<b>Laboral</b></p>
        <p className="cargador-detalle">Preparando tu experiencia</p>
        <div className="cargador-progreso" aria-hidden="true"><span /></div>
      </div>
    </div>
  );
}
