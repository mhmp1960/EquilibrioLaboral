import Image from 'next/image';
import Link from 'next/link';

export function Marca({ grande = false }: { grande?: boolean }) {
  const ancho = grande ? 230 : 190;
  const alto = grande ? 49 : 41;

  return (
    <Link href="/" className={"marca" + (grande ? " marca-grande" : "")} aria-label="EquilibrioLaboral, ir al inicio">
      <Image
        src="/logo-equilibriolaboral.svg"
        alt=""
        width={ancho}
        height={alto}
        priority={grande}
      />
    </Link>
  );
}
