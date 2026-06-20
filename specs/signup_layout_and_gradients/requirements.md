# Requerimientos: Logo de Registro y Gradientes de Color

Este documento detalla los requerimientos en notación EARS para el ajuste de diseño del logotipo en la sección de registro y la simplificación de degradados.

## Requerimientos de Negocio y Funcionales (EARS)

- **R1 - Ubicación del Logo en Escritorio (Desktop):**
  - **When** el dispositivo visualizando la página tiene un ancho de pantalla de escritorio (viewport > 768px),
  - **the system shall** renderizar el logotipo secundario dentro de la columna izquierda de información de registro (`signup-info-content`), justo debajo de la lista de verificación (checklist).

- **R2 - Ubicación del Logo en Móvil (Mobile):**
  - **When** el dispositivo visualizando la página tiene un ancho de pantalla móvil (viewport <= 768px),
  - **the system shall** ocultar el logotipo secundario de la columna izquierda y mostrarlo únicamente al final de la sección, justo debajo del formulario de captura de leads.

- **R3 - Simplificación de Degradados de Fondos:**
  - **When** se renderizan las secciones de fondo coloreado (`overview-section`, `inside-section`, `experts-section`, `outcomes-section`, `signup-section`),
  - **the system shall** aplicar un degradado de dos colores (color claro a color base, de 0% a 100%) eliminando el tono oscuro (100% color oscuro) para optimizar la suavidad y contraste visual de la landing page.
