import type { Metadata } from 'next';
import { Clock, EyeOff, Save } from 'lucide-react';
import { FormularioAuditoria } from '@/components/FormularioAuditoria';

export const metadata: Metadata = { title: 'Auditoría de bienestar' };

const garantias = [
  { icon: EyeOff, titulo: 'Privada por diseño', texto: 'Tus respuestas se quedan en este dispositivo. No se envían a ningún servidor.' },
  { icon: Save, titulo: 'Avance guardado', texto: 'Puedes cerrar la ventana y retomar la auditoría cuando quieras.' },
  { icon: Clock, titulo: 'Menos de 5 minutos', texto: 'Cinco áreas y un espacio final, opcional, para tus comentarios.' },
];

export default function Auditoria() {
  return (
    <div className="auditoria shell">
      <div className="auditoria-intro">
        <span className="eyebrow">Tu voz importa</span>
        <h1>Hagamos una pausa para <em className="degradado">escuchar.</em></h1>
        <p>No hay respuestas correctas. Cuéntanos cómo se siente el trabajo para ti hoy.</p>
        <ul className="garantias">
          {garantias.map(({ icon: Icono, titulo, texto }) => (
            <li key={titulo}>
              <span><Icono size={18} aria-hidden="true" /></span>
              <div><b>{titulo}</b><small>{texto}</small></div>
            </li>
          ))}
        </ul>
      </div>
      <FormularioAuditoria />
    </div>
  );
}
