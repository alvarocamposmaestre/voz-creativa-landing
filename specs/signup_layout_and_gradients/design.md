# Diseño Técnico: Logo de Registro y Gradientes de Color

Este documento describe las especificaciones técnicas del diseño implementado.

## Arquitectura de Interfaz y Estilos

### 1. Logo de Registro
Para lograr un posicionamiento condicional exacto y evitar problemas de reordenamiento complejos con CSS Grid en móvil y escritorio, duplicaremos el componente del logotipo en `index.html`:

1. **Logo A (Desktop):** Se inserta al final del elemento `.signup-info-content`.
   - Clase: `signup-logo-wrapper logo-desktop-only`
2. **Logo B (Mobile):** Se mantiene al final de `.signup-grid-container`.
   - Clase: `signup-logo-wrapper logo-mobile-only`

**Estilos CSS:**
```css
.logo-desktop-only {
    display: block;
    margin-top: 32px;
}
.logo-mobile-only {
    display: none;
}

@media (max-width: 768px) {
    .logo-desktop-only {
        display: none;
    }
    .logo-mobile-only {
        display: block;
    }
}
```

### 2. Gradientes de Sección
Modificaremos los gradientes de fondo lineales del sistema de diseño en `style.css`:

- **overview-section, outcomes-section, signup-section (Verde):**
  - Anterior: `linear-gradient(135deg, var(--color-green-light) 0%, var(--color-green-primary) 50%, var(--color-green-dark) 100%)`
  - Nuevo: `linear-gradient(135deg, var(--color-green-light) 0%, var(--color-green-primary) 100%)`

- **inside-section (Naranja):**
  - Anterior: `linear-gradient(135deg, var(--color-orange-light) 0%, var(--color-orange-primary) 50%, var(--color-orange-dark) 100%)`
  - Nuevo: `linear-gradient(135deg, var(--color-orange-light) 0%, var(--color-orange-primary) 100%)`

- **experts-section (Púrpura):**
  - Anterior: `linear-gradient(135deg, var(--color-purple-light) 0%, var(--color-purple-primary) 50%, var(--color-purple-dark) 100%)`
  - Nuevo: `linear-gradient(135deg, var(--color-purple-light) 0%, var(--color-purple-primary) 100%)`
