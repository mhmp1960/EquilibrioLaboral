import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { BarraNavegacion } from '@/components/BarraNavegacion';
import { Pie } from '@/components/Pie';
import { CargadorNavegacion } from '@/components/CargadorNavegacion';

const manrope = Manrope({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--font-manrope', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const viewport: Viewport = { themeColor: '#0d2a3d', width: 'device-width', initialScale: 1 };

export const metadata: Metadata = {
  title: { default: 'EquilibrioLaboral — Bienestar que se siente', template: '%s | EquilibrioLaboral' },
  description: 'Auditoría de bienestar laboral, confidencial y en cinco áreas: convierte lo que las personas sienten en un diagnóstico claro y acciones concretas.',
  applicationName: 'EquilibrioLaboral',
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
  openGraph: { title: 'EquilibrioLaboral — Bienestar que se siente', description: 'Una auditoría cercana y confidencial para equipos que crecen.', type: 'website', locale: 'es_PE', siteName: 'EquilibrioLaboral' },
};

export default function Raiz({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <a className="salto-contenido" href="#contenido">Saltar al contenido</a>
        <CargadorNavegacion />
        <BarraNavegacion />
        <main id="contenido" tabIndex={-1}>{children}</main>
        <Pie />
      </body>
    </html>
  );
}
