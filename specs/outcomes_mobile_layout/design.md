# Technical Design: outcomes_mobile_layout

This document outlines the technical design decisions for correcting the Outcomes section mobile layout order, styling/integrating the "Conocer más" button with its studio link, and centering the logo image in the final signup column.

---

## 📐 Layout & Ordering Updates

### 1. Outcomes Section Mobile Order
In `style.css`, under the `@media (max-width: 992px)` media query, we will configure the layout order for `.outcomes-container` grid items using Flexbox:

```css
@media (max-width: 992px) {
    .outcomes-container {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
    
    .outcomes-title {
        grid-area: auto;
        order: 1;
    }
    
    .outcomes-list {
        grid-area: auto;
        order: 2;
    }
    
    .outcomes-right-visual {
        grid-area: auto;
        order: 3;
    }
}
```

### 2. "Conocer más" Button for Raquel Cartaya Bio
In `index.html`, we will add the button inside `.avatar-caption` pointing to `https://raquelcartayastudio.com/`:

```html
<div class="avatar-caption">
    <h4>Raquel Cartaya</h4>
    <span>Docente de Voz Creativa</span>
    <p>Profesional multidisciplinario...</p>
    <a href="https://raquelcartayastudio.com/" class="btn-conocer-mas btn-cta-primary">Conocer más</a>
</div>
```

In `style.css` (general styles):
```css
.btn-conocer-mas {
    display: none;
    margin-top: 16px;
}
```

In `style.css` (under `@media (max-width: 992px)`):
```css
.btn-conocer-mas {
    display: inline-flex !important;
    padding: 12px 28px !important;
    font-size: 0.85rem !important;
    justify-content: center;
    width: auto;
    margin-top: 16px;
}
```

### 3. Logo Centering in "Reserva tu plaza"
In `style.css` under the `.signup-logo-wrapper` rules, we will add auto margins:

```css
.signup-logo-wrapper {
    margin-top: 32px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 320px;
    opacity: 0.95;
}
```

---
*Design is updated.*
