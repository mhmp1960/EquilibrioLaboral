import type { Metadata } from 'next';
import './globals.css';
import { BarraNavegacion } from '@/components/BarraNavegacion';
import { Pie } from '@/components/Pie';

export const metadata: Metadata = { title: { default: 'EquilibrioLaboral — Bienestar que se siente', template: '%s | EquilibrioLaboral' }, description: 'Auditoría de bienestar laboral para equipos más sanos y productivos.', icons: { icon: '/favicon.svg' }, applicationName: 'EquilibrioLaboral' };
export default function Raiz({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body><BarraNavegacion /><main>{children}</main><Pie /></body></html>; }
