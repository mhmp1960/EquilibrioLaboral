import Link from 'next/link';

/** Símbolo de la marca: una balanza nivelada cuyos platillos son hojas. */
export function Simbolo({ tamano = 36, animado = false }: { tamano?: number; animado?: boolean }) {
  return (
    <svg className={`simbolo${animado ? ' simbolo-animado' : ''}`} width={tamano} height={tamano} viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
      <rect width="48" height="48" rx="14" fill="#0D2A3D" />
      <path d="M24 16v17M16.5 34h15" stroke="#BDEBDD" strokeWidth="2.6" strokeLinecap="round" />
      <g className="simbolo-viga">
        <path d="M10.5 16h27" stroke="#BDEBDD" strokeWidth="2.6" strokeLinecap="round" />
        <g className="simbolo-hoja simbolo-hoja-i"><path d="M10.5 17.5c-4.2 3.3-4.2 8.2 0 11.8 4.2-3.6 4.2-8.5 0-11.8Z" fill="#3CC2B3" /></g>
        <g className="simbolo-hoja simbolo-hoja-d"><path d="M37.5 17.5c-4.2 3.3-4.2 8.2 0 11.8 4.2-3.6 4.2-8.5 0-11.8Z" fill="#BDEBDD" /></g>
      </g>
      <circle cx="24" cy="16" r="3" fill="#fff" />
    </svg>
  );
}

export function Marca({ grande = false, claro = false }: { grande?: boolean; claro?: boolean }) {
  return (
    <Link href="/" className={`marca${grande ? ' marca-grande' : ''}${claro ? ' marca-claro' : ''}`} aria-label="EquilibrioLaboral, ir al inicio">
      <Simbolo tamano={grande ? 48 : 36} />
      <span className="marca-texto">Equilibrio<b>Laboral</b></span>
    </Link>
  );
}
