import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EquilibrioLaboral',
    short_name: 'Equilibrio',
    description: 'Auditoría de bienestar laboral, confidencial y centrada en las personas.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f8fa',
    theme_color: '#0d2a3d',
    lang: 'es',
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
  };
}
