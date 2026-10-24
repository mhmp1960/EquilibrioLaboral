'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Marca } from './Marca';

export function BarraNavegacion() {
  const ruta = usePathname(); const [abierto, setAbierto] = useState(false);
  useEffect(() => {
    const cerrarConEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setAbierto(false);
    };
    window.addEventListener('keydown', cerrarConEscape);
    return () => window.removeEventListener('keydown', cerrarConEscape);
  }, []);
  const links = [{ href: '/', label: 'Inicio' }, { href: '/auditoria', label: 'La auditoría' }, { href: '/acerca', label: 'Acerca de' }];
  return <header className="nav-wrap"><nav className="nav shell" aria-label="Navegación principal"><Marca /><div id="menu-principal" className={`nav-links${abierto ? ' abierto' : ''}`}>{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setAbierto(false)} className={ruta === link.href ? 'activo' : ''} aria-current={ruta === link.href ? 'page' : undefined}>{link.label}</Link>)}<Link className="nav-cta" href="/auditoria" onClick={() => setAbierto(false)}>Iniciar auditoría <ArrowUpRight size={15} /></Link></div><button className="menu-movil" type="button" aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'} aria-controls="menu-principal" aria-expanded={abierto} onClick={() => setAbierto(!abierto)}>{abierto ? <X /> : <Menu />}</button></nav></header>;
}
