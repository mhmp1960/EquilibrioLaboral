import type { Metadata } from 'next';
import { FormularioAuditoria } from '@/components/FormularioAuditoria';
export const metadata: Metadata = { title: 'Auditoría de bienestar' };
export default function Auditoria() { return <div className="pagina-form shell"><div className="form-intro"><div className="eyebrow"><span className="eyebrow-dot" /> TU VOZ IMPORTA</div><h1>Hagamos una pausa<br />para <em>escuchar.</em></h1><p>No hay respuestas correctas. Cuéntanos cómo se siente el trabajo para ti hoy.</p><div className="privacidad"><span>🔒</span> Tus respuestas se quedan en este dispositivo.</div></div><FormularioAuditoria /></div>; }
