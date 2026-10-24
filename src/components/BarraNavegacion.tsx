'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Marca } from './Marca';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/auditoria', label: 'La auditoría' },
  { href: '/resultados', label: 'Resultados' },
  { href: '/acerca', label: 'Acerca de' },
];

export function BarraNavegacion() {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [elevado, setElevado] = useState(false);

  useEffect(() => {
    const alDesplazar = () => setElevado(window.scrollY > 8);
    const cerrarConEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setAbierto(false); };
    alDesplazar();
    window.addEventListener('scroll', alDesplazar, { passive: true });
    window.addEventListener('keydown', cerrarConEscape);
    return () => {
      window.removeEventListener('scroll', alDesplazar);
      window.removeEventListener('keydown', cerrarConEscape);
    };
  }, []);

  useEffect(() => setAbierto(false), [ruta]);

  return (
    <header className={`nav-wrap${elevado || abierto ? ' elevado' : ''}`}>
      <nav className="nav shell" aria-label="Navegación principal">
        <Marca />
        <div id="menu-principal" className={`nav-links${abierto ? ' abierto' : ''}`}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={`nav-link${ruta === link.href ? ' activo' : ''}`} aria-current={ruta === link.href ? 'page' : undefined}>
              {link.label}
            </Link>
          ))}
          <Link className="btn btn-primario btn-sm nav-cta" href="/auditoria">Iniciar auditoría <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>
        <button className="menu-movil" type="button" aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'} aria-controls="menu-principal" aria-expanded={abierto} onClick={() => setAbierto(!abierto)}>
          {abierto ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
    </header>
  );
}
