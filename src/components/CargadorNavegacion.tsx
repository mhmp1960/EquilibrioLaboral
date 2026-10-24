'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const DURACION_MINIMA = 520;
const DURACION_SALIDA = 320;

export function CargadorNavegacion() {
  const ruta = usePathname();
  const [visible, setVisible] = useState(false);
  const [saliendo, setSaliendo] = useState(false);
  const inicioRef = useRef(0);
  const anteriorRef = useRef(ruta);
  const temporizadorRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (temporizadorRef.current) clearTimeout(temporizadorRef.current);
  }, []);

  useEffect(() => {
    if (anteriorRef.current === ruta) return;
    anteriorRef.current = ruta;
    if (!visible) return;

    const restante = Math.max(0, DURACION_MINIMA - (Date.now() - inicioRef.current));
    temporizadorRef.current = setTimeout(() => {
      setSaliendo(true);
      temporizadorRef.current = setTimeout(() => {
        setVisible(false);
        setSaliendo(false);
      }, DURACION_SALIDA);
    }, restante);
  }, [ruta, visible]);

  useEffect(() => {
    const iniciarCarga = () => {
      if (temporizadorRef.current) clearTimeout(temporizadorRef.current);
      inicioRef.current = Date.now();
      setSaliendo(false);
      setVisible(true);
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

    const alVolver = () => iniciarCarga();
    document.addEventListener('click', alHacerClic, true);
    window.addEventListener('popstate', alVolver);
    return () => {
      document.removeEventListener('click', alHacerClic, true);
      window.removeEventListener('popstate', alVolver);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`cargador-pantalla${saliendo ? ' cargador-saliendo' : ''}`} role="status" aria-live="polite" aria-label="Cargando página">
      <div className="cargador-brillo" aria-hidden="true" />
      <div className="cargador-contenido">
        <div className="cargador-marca">
          <span className="cargador-anillo cargador-anillo-externo" aria-hidden="true" />
          <span className="cargador-anillo cargador-anillo-interno" aria-hidden="true" />
          <Image src="/logo-equilibriolaboral.svg" alt="EquilibrioLaboral" width={230} height={49} priority />
        </div>
        <p className="cargador-mensaje">Preparando tu experiencia</p>
        <div className="cargador-barra" aria-hidden="true"><span /></div>
        <span className="cargador-detalle">Un momento, por favor</span>
      </div>
    </div>
  );
}
