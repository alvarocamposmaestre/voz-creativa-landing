# Preferred Tech Stack & Implementation Rules

Cuando generes código o componentes de UI para ProjectPilot, debes adherirte estrictamente a las siguientes elecciones tecnológicas.

## Core Stack
* **Framework:** React (TypeScript preferred)
* **Styling Engine:** Tailwind CSS (Mandatory. Do not use plain CSS or styled-components unless explicitly asked.)
* **Component Library:** shadcn/ui (Use these primitives as the base for all new components.)
* **Icons:** Lucide React

## Implementation Guidelines

### 1. Tailwind Usage
* Usa clases de utilidad directamente en el JSX.
* Utiliza los tokens de color definidos en `design-tokens.json` (ej: usa `bg-primary text-primary-foreground` en lugar de hexadecimales hardcoded).
* **Dark Mode:** Soporta modo oscuro usando el modificador `dark:` de Tailwind.

### 2. Component Patterns
* **Buttons:** Las acciones primarias deben usar el color sólido Primary. Las secundarias deben usar las variantes 'Ghost' u 'Outline' de shadcn/ui.
* **Forms:** Las etiquetas (labels) siempre deben ir *encima* de los campos de entrada. Usa espaciado estándar de Tailwind (ej: `gap-4` entre items del formulario).
* **Layout:** Usa Flexbox y CSS Grid mediante utilidades de Tailwind para todas las estructuras de diseño.

### 3. Forbidden Patterns
* NO uses jQuery.
* NO uses clases de Bootstrap.
* NO crees nuevos archivos CSS; mantén los estilos dentro de los archivos de componentes vía Tailwind.
