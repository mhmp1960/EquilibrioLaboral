import type { Metadata } from 'next';
import './globals.css';
import { BarraNavegacion } from '@/components/BarraNavegacion';
import { Pie } from '@/components/Pie';
import { CargadorNavegacion } from '@/components/CargadorNavegacion';

export const metadata: Metadata = { title: { default: 'EquilibrioLaboral — Bienestar que se siente', template: '%s | EquilibrioLaboral' }, description: 'Auditoría de bienestar laboral para equipos más sanos y productivos.', icons: { icon: '/favicon.svg' }, applicationName: 'EquilibrioLaboral' };
export default function Raiz({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body><a className="salto-contenido" href="#contenido">Saltar al contenido</a><BarraNavegacion /><CargadorNavegacion /><main id="contenido" tabIndex={-1}>{children}</main><Pie /></body></html>; }
