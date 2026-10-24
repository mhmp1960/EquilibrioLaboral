'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Marca } from './Marca';

export function BarraNavegacion() {
  const ruta = usePathname(); const [abierto, setAbierto] = useState(false);
  const links = [{ href: '/', label: 'Inicio' }, { href: '/auditoria', label: 'La auditoría' }, { href: '/acerca', label: 'Acerca de' }];
  return <header className="nav-wrap"><nav className="nav shell" aria-label="Navegación principal"><Marca /><div className={`nav-links${abierto ? ' abierto' : ''}`}>{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setAbierto(false)} className={ruta === link.href ? 'activo' : ''}>{link.label}</Link>)}<Link className="nav-cta" href="/auditoria" onClick={() => setAbierto(false)}>Iniciar auditoría <ArrowUpRight size={15} /></Link></div><button className="menu-movil" aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={abierto} onClick={() => setAbierto(!abierto)}>{abierto ? <X /> : <Menu />}</button></nav></header>;
}
