# Technical Design: copy_and_layout_polishing

This document outlines the technical design decisions for the copy, bolding, marquee, pricing layout, and expert name layout updates on the Voz Creativa landing page.

---

## 📐 Layout & Code updates

### 1. Hero Section Bolding
In `index.html`, modify:
- Wrap the entire content of `.highlight-p` in `<strong>...</strong>`.
- Wrap the sentence starting with "Lo difícil siempre ha sido..." in the next paragraph in `<strong>...</strong>`.

### 2. Syllabus Marquee Update
In `index.html`, locate the marquee track for Row 2 (the right-moving one) and remove all instances of `<div class="marquee-card">Fotografía y narrativas</div>`.

### 3. Experts Section Name Splitting & Humberto Bio
In `index.html`:
- Split names using `<br>`:
  - `Johanna Pérez Daza` -> `Johanna<br>Pérez Daza`
  - `Humberto Valdivieso` -> `Humberto<br>Valdivieso`
  - `Elisa Martínez` -> `Elisa<br>Martínez`
  - `Emily Jolie` -> `Emily<br>Jolie`
- Change Humberto's description line to: `<p class="speaker-role">Semiólogo y curador de arte contemporáneo y diseño.</p>`

### 4. Raquel's Bio Button Visibility on Desktop
In `style.css`:
- Remove `.btn-conocer-mas { display: none; }` from the general/desktop styles. Set `.btn-conocer-mas` to display by default (e.g. `display: inline-flex`).
- Ensure it aligns correctly within the card on both desktop and mobile viewports.

### 5. Investment Section Redesign
In `index.html` (under `.investment-section`):
- Change `inv-scarcity-left` inner contents to:
  ```html
  <h2 class="section-title text-left" style="margin-top: 0;">Inversión</h2>
  <p class="scarcity-alert-text" style="font-size: 1.1rem; line-height: 1.6; font-weight: 300;">
      Hemos diseñado una experiencia formativa que reúne conocimiento, acompañamiento, acceso a profesionales de referencia y que <strong>en el mercado se valora por más de 3.000 €</strong>.
  </p>
  ```
- Change `inv-price-right` prices:
  - Add inline style `color: var(--color-green-primary);` or class for "96 € al mes".
  - Change subtexts exactly as requested.
- In `investment-bottom-grid`:
  - Remove the left column block containing "Hemos diseñado...".
  - Update the remaining column ("Creemos que el acceso...") to be full width. Since the grid had `grid-template-columns: 1fr 1fr;` on desktop, we will add a full-width style or set `grid-column: span 2` / change the wrapper's layout to a single column or equivalent.

### 6. Signup Checklist Update
In `index.html`, update the second check item text under `#contacto` to:
`Acompañamiento garantizado en tu proyecto personal o profesional.`

### 7. Mobile Viewport Layout Adjustments
In `style.css`, under the `@media (max-width: 992px)` media query:
- Add a rule for `.hero-section` to reduce padding:
  ```css
  .hero-section {
      padding: 60px 0 40px 0;
  }
  ```
- Add a rule to center the logo and set its max-width on mobile to 160px:
  ```css
  .signup-logo-wrapper {
      max-width: 160px !important;
  }
  ```
- To adjust the mobile ordering of the signup section, move `.signup-logo-wrapper` outside of `.signup-info-content` in the `index.html` structure, making it a direct child of the grid container. On desktop, since it is a grid container with auto-flow, `.signup-logo-wrapper` will automatically wrap to the next row (aligned left/column 1), preserving its desktop layout position. On mobile, it will follow the grid stack layout and appear last (after the form block).

---
*Design is proposed.*
