<div align="center">
  <img src="public/logo-equilibriolaboral.svg" alt="EquilibrioLaboral" width="440" />

  <h1>EquilibrioLaboral</h1>
  <p><strong>Bienestar que se siente. Equipos que crecen.</strong></p>
  <p>Una auditoría cercana y confidencial para escuchar cómo se vive el trabajo y convertir esa escucha en acciones concretas.</p>

  <p>
    <a href="https://github.com/mhmp1960/EquilibrioLaboral"><img src="https://img.shields.io/badge/estado-v1.0.0-188568?style=flat-square" alt="Versión 1.0.0" /></a>
    <img src="https://img.shields.io/badge/Next.js-14-112c37?style=flat-square&logo=nextdotjs" alt="Next.js 14" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Privacidad-localStorage-4cae8e?style=flat-square" alt="Respuestas guardadas localmente" />
  </p>
  <p><a href="#-comenzar">Comenzar</a> · <a href="#-la-auditoría">La auditoría</a> · <a href="#-resultados">Resultados</a> · <a href="#-privacidad">Privacidad</a></p>
</div>

---

## ✨ ¿Qué es EquilibrioLaboral?

EquilibrioLaboral es una aplicación web para reflexionar sobre el bienestar en el trabajo. A través de afirmaciones breves y una escala de cinco puntos, ayuda a identificar fortalezas y oportunidades de mejora en un equipo.

No busca poner etiquetas ni emitir diagnósticos: ofrece una mirada clara para iniciar conversaciones y acordar próximos pasos.

## 🌿 La auditoría

La experiencia está organizada en cinco áreas:

| Área | ¿Qué observa? |
| --- | --- |
| **Ambiente físico y seguridad** | Iluminación, limpieza, ergonomía, herramientas y medidas de seguridad. |
| **Clima laboral y relaciones** | Respeto, comunicación, compañerismo, trato justo y resolución de conflictos. |
| **Equilibrio vida-trabajo** | Carga laboral, horarios, flexibilidad, descansos y tiempo personal. |
| **Crecimiento y reconocimiento** | Aprendizaje, reconocimiento, feedback y desarrollo profesional. |
| **Salud emocional y apoyo** | Manejo del estrés, apoyo, prevención del acoso y sentido de pertenencia. |

Cada afirmación se responde en una escala de **1 (muy en desacuerdo) a 5 (muy de acuerdo)**. Se puede añadir un comentario libre al final. El formulario guarda el avance en el navegador para poder retomarlo.

## 📊 Resultados

Al finalizar, la aplicación presenta:

- **Puntuación general** y puntuación por cada área.
- **Gráfico comparativo** para reconocer de un vistazo dónde enfocar la atención.
- **Recomendaciones personalizadas** según las áreas con resultados más bajos.
- Acciones para **imprimir o guardar como PDF**, compartir un resumen o iniciar otra auditoría.

### Cómo se calcula el puntaje

1. Las respuestas de cada área se promedian y se convierten a una escala de 0 a 100 (<code>promedio × 20</code>).
2. La puntuación general es el promedio de las áreas que tienen respuestas.
3. Las recomendaciones priorizan las áreas con menor puntuación.

| Puntaje | Interpretación |
| ---: | --- |
| 80–100 | 🟢 Óptimo |
| 60–79 | 🟡 Mejorable |
| 40–59 | 🟠 Atención media |
| 0–39 | 🔴 Necesita acción |

## 🧰 Tecnologías

- [Next.js 14](https://nextjs.org/) con App Router
- [React 18](https://react.dev/) y TypeScript
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Recharts](https://recharts.org/) para visualizaciones
- [Lucide React](https://lucide.dev/) para iconos
- <code>localStorage</code> para guardar el avance en el dispositivo

## 🚀 Comenzar

### Requisitos

- Node.js **18.17 o posterior**
- npm **9 o posterior**

### Instalación y modo desarrollo

~~~bash
git clone https://github.com/mhmp1960/EquilibrioLaboral.git
cd EquilibrioLaboral
npm install
npm run dev
~~~

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

### Compilación de producción

~~~bash
npm run build
npm start
~~~

## ☁️ Publicar en Vercel

1. Importa <code>mhmp1960/EquilibrioLaboral</code> desde el panel de [Vercel](https://vercel.com/new).
2. Deja que Vercel detecte Next.js automáticamente.
3. Despliega con el comando de compilación <code>npm run build</code>.

No se necesitan variables de entorno ni servicios externos para guardar las respuestas.

## 🗂️ Estructura del proyecto

~~~text
EquilibrioLaboral/
├── public/
│   ├── favicon.svg                    # Símbolo de la marca para la pestaña
│   └── logo-equilibriolaboral.svg     # Logo horizontal para documentación
├── src/
│   ├── app/
│   │   ├── acerca/                    # Propósito, cálculo y privacidad
│   │   ├── auditoria/                 # Introducción a la auditoría
│   │   ├── resultados/                # Resumen y visualización
│   │   ├── globals.css                # Sistema visual y estilos adaptables
│   │   ├── layout.tsx                 # Layout y metadatos
│   │   └── page.tsx                   # Página de inicio
│   ├── components/                    # Navegación, marca, formulario y resultados
│   └── lib/auditoria.ts               # Preguntas, puntajes y recomendaciones
├── .gitignore
├── package.json
└── README.md
~~~

## 🎨 Personalizar

### Preguntas y recomendaciones

Edita <code>secciones</code> y <code>recomendar()</code> en [src/lib/auditoria.ts](src/lib/auditoria.ts). Cada pregunta pertenece a un área identificada por un <code>id</code>.

### Colores y tipografía

Las variables principales de color y los estilos adaptables están en [src/app/globals.css](src/app/globals.css). Los tonos individuales de las áreas se definen junto a sus preguntas en <code>src/lib/auditoria.ts</code>.

### Logo y favicon

- [public/logo-equilibriolaboral.svg](public/logo-equilibriolaboral.svg) es el logo horizontal usado en esta documentación.
- [public/favicon.svg](public/favicon.svg) es el símbolo compacto de la pestaña.
- El logo de la interfaz se renderiza desde [src/components/Marca.tsx](src/components/Marca.tsx).

Los archivos SVG se pueden editar con un editor vectorial o de texto. Para crear un <code>favicon.ico</code>, exporta <code>public/favicon.svg</code> a 32 × 32 px en formato ICO.

## 🔐 Privacidad

Las respuestas y comentarios se guardan **solo en el almacenamiento local del navegador**. No se envían a servidores externos. Al borrar los datos del sitio en el navegador, también se elimina la auditoría guardada.

La acción de compartir genera un resumen de puntajes cuando la persona la solicita; el contenido se comparte mediante las funciones disponibles en el dispositivo. La herramienta es una guía para conversar y no constituye un diagnóstico clínico ni una auditoría legal.

## 🤝 Colaboración

1. Crea una rama para tu cambio: <code>git switch -c mejora/nombre-del-cambio</code>.
2. Realiza los cambios y verifica localmente con <code>npm run build</code>.
3. Envía una solicitud de cambio con una descripción clara de lo que aporta.

## 🧭 Rutas principales

| Ruta | Contenido |
| --- | --- |
| <code>/</code> | Inicio y áreas de bienestar |
| <code>/auditoria</code> | Formulario paso a paso |
| <code>/resultados</code> | Puntajes, gráfico y recomendaciones |
| <code>/acerca</code> | Propósito, cálculo y privacidad |

---

<div align="center">
  <sub><strong>EquilibrioLaboral 1.0.0</strong> · Hecho con cuidado para equipos que importan.</sub>
</div>
