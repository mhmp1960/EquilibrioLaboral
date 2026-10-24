import type { Metadata } from 'next';
import { ResultadosCliente } from '@/components/ResultadosCliente';

export const metadata: Metadata = { title: 'Tus resultados' };

export default function Resultados() {
  return <ResultadosCliente />;
}
