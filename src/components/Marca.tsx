import Link from 'next/link';
import { Scale } from 'lucide-react';

export function Marca({ grande = false }: { grande?: boolean }) {
  return <Link href="/" className={`marca${grande ? ' marca-grande' : ''}`} aria-label="EquilibrioLaboral, ir al inicio"><span className="marca-icono"><Scale size={grande ? 29 : 21} strokeWidth={1.8} /></span><span>equilibrio<span className="marca-verde">laboral</span></span></Link>;
}
