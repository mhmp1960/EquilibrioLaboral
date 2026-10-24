import Link from 'next/link';
import { LockKeyhole } from 'lucide-react';
import { Marca } from './Marca';

export function Pie() {
  return (
    <footer className="pie">
      <div className="shell">
        <div className="pie-grid">
          <div className="pie-marca">
            <Marca claro />
            <p>Bienestar que se siente. Equipos que crecen. Una auditoría cercana y confidencial para escuchar cómo se vive el trabajo.</p>
          </div>
          <nav aria-label="Producto">
            <h2>Producto</h2>
            <ul>
              <li><Link href="/auditoria">Iniciar auditoría</Link></li>
              <li><Link href="/resultados">Ver resultados</Link></li>
            </ul>
          </nav>
          <nav aria-label="Información">
            <h2>Información</h2>
            <ul>
              <li><Link href="/acerca">Acerca de</Link></li>
              <li><Link href="/acerca#metodo">Cómo se calcula</Link></li>
              <li><Link href="/acerca#privacidad">Privacidad</Link></li>
            </ul>
          </nav>
        </div>
        <div className="pie-base">
          <span>© 2026 EquilibrioLaboral · Versión 1.0.0</span>
          <span><LockKeyhole size={14} aria-hidden="true" /> Tus respuestas no salen de tu dispositivo</span>
        </div>
      </div>
    </footer>
  );
}
