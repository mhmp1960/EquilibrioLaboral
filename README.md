# EquilibrioLaboral

Auditoría de bienestar laboral para equipos más sanos y productivos. Una aplicación web en español para reflexionar sobre cinco dimensiones del trabajo y convertir las respuestas en una visión clara y recomendaciones prácticas.

## Funcionalidades

- Auditoría en cinco áreas, con escala de acuerdo de 1 a 5 y avance por pasos.
- Guardado automático y temporal de respuestas en el almacenamiento local del navegador.
- Puntuación general y por área, gráfico comparativo y recomendaciones personalizadas.
- Impresión o guardado del resumen como PDF, y opción de compartir el resumen.
- Diseño adaptable, navegación accesible y respeto a la preferencia de movimiento reducido.
- Página informativa sobre el cálculo y la privacidad.

## Tecnologías

Next.js 14 con App Router, React 18, TypeScript, Tailwind CSS 3, Recharts y Lucide React. No se requiere base de datos ni variables de entorno.

## Requisitos previos

- Node.js 18.17 o posterior.
- npm 9 o posterior.

## Instalar y ejecutar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Para una compilación de producción:

```bash
npm run build
npm start
```

## Git y Vercel

1. Inicializa un repositorio con `git init`, agrega los archivos con `git add .` y crea un commit con `git commit -m "Inicializa EquilibrioLaboral"`.
2. Crea un repositorio remoto, enlázalo con `git remote add origin <URL>` y publica la rama con `git push -u origin main`.
3. En Vercel, importa el repositorio. Vercel detecta Next.js automáticamente; usa `npm run build` como comando de compilación. No hacen falta variables de entorno.

## Estructura

```text
src/
  app/                  Páginas, layout y estilos globales
  components/           Navegación, formulario y resultados
  lib/auditoria.ts      Preguntas, cálculo y recomendaciones
public/favicon.svg      Símbolo de marca para la pestaña
```

## Personalización

- **Preguntas:** edita el arreglo `secciones` en `src/lib/auditoria.ts`. El cálculo promedia las preguntas que tengan respuesta en cada área.
- **Colores:** cambia las variables de marca al principio de `src/app/globals.css` y los tonos de cada sección en `src/lib/auditoria.ts`.
- **Logo:** `src/components/Marca.tsx` dibuja el símbolo con Lucide React. El favicon vectorial editable está en `public/favicon.svg`. Para generar un `favicon.ico`, exporta ese SVG a 32 × 32 px con un convertidor de SVG a ICO y añade el archivo a `public/`; Next.js también sirve el SVG configurado en los metadatos.
- **Tipografía:** la interfaz utiliza Manrope y DM Sans. Puedes sustituirlas en la importación de Google Fonts de `src/app/globals.css`.

## Privacidad y resultados

Las respuestas se guardan solo en el navegador del usuario y no se envían a servidores externos a menos que la organización lo configure posteriormente. Limpiar los datos del sitio en el navegador elimina la auditoría guardada. El promedio de cada área se expresa sobre 100; el resultado general promedia las áreas que tienen respuestas. La herramienta orienta conversaciones y no constituye un diagnóstico clínico ni una auditoría legal.

**Versión:** 1.0.0  
**Autor:** Equipo EquilibrioLaboral
