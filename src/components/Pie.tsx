import Link from 'next/link';
import { Marca } from './Marca';
export function Pie() { return <footer className="pie"><div className="shell pie-inner"><Marca /><p>Un mejor trabajo empieza por escuchar.</p><div><Link href="/acerca">Acerca de</Link><span>© 2026 EquilibrioLaboral</span></div></div></footer>; }
