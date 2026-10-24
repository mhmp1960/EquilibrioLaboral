import { Building2, HeartPulse, Scale, TrendingUp, Users, type LucideProps } from 'lucide-react';

const iconos = { ambiente: Building2, clima: Users, equilibrio: Scale, crecimiento: TrendingUp, emocional: HeartPulse } as const;

export function IconoArea({ id, ...props }: { id: string } & LucideProps) {
  const Icono = iconos[id as keyof typeof iconos] ?? Building2;
  return <Icono aria-hidden="true" {...props} />;
}
