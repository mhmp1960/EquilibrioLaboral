import type { CSSProperties } from 'react';

/** Indicador circular de puntaje (0–100). El color lo define la variable CSS --estado. */
export function Anillo({ valor, tamano = 116, grosor = 9 }: { valor: number; tamano?: number; grosor?: number }) {
  const radio = (100 - grosor) / 2;
  const total = 2 * Math.PI * radio;
  const desplazamiento = total * (1 - Math.min(Math.max(valor, 0), 100) / 100);
  return (
    <svg className="anillo" width={tamano} height={tamano} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <circle className="anillo-pista" cx="50" cy="50" r={radio} strokeWidth={grosor} />
      <circle
        className="anillo-valor"
        cx="50" cy="50" r={radio} strokeWidth={grosor} strokeLinecap="round"
        strokeDasharray={total} strokeDashoffset={desplazamiento}
        transform="rotate(-90 50 50)"
        style={{ '--anillo-total': total } as CSSProperties}
      />
    </svg>
  );
}
