# Technical Design: landing_page_copy_updates

This document outlines the technical design decisions for the landing page copy updates, WhatsApp form field integration, revised legal modal, and the addition of secondary brand colors (Orange and Purple).

---

## 📐 Layout & Color Updates

1. **Inside Section (Lo que encontrarás dentro):**
   * Background: Gradient from Orange (`#FF7432`) to a darker orange/red shade (`#E05316` or similar) in the bottom-left corner.
   * CSS class: `.inside-section`
   ```css
   .inside-section {
       background: radial-gradient(circle at bottom left, #E05316 0%, #FF7432 100%);
       border: none;
   }
   ```

2. **Experts Section (Encuentros con expertos):**
   * Background: Gradient from Purple (`#7C45C4`) to a darker purple shade (`#5E2CA3` or similar) in the bottom-left corner.
   * CSS class: `.experts-section`
   ```css
   .experts-section {
       background: radial-gradient(circle at bottom left, #5E2CA3 0%, #7C45C4 100%);
       border: none;
       color: #FFFFFF;
   }
   .experts-section .section-title, .experts-section .section-desc {
       color: #FFFFFF;
   }
   ```

3. **Buttons Hover States:**
   * Transition on hover for all primary CTA/Reservar buttons to an orange gradient: from `#FF7432` to a darker orange (`#E05316`) on the bottom-left corner.
   ```css
   .btn-cta-primary:hover, .nav-btn-link:hover, .form-submit-btn:hover {
       background: radial-gradient(circle at bottom left, #E05316 0%, #FF7432 100%);
       transform: translateY(-2px);
       box-shadow: 0 10px 25px rgba(255, 116, 50, 0.4);
   }
   ```

4. **Pricing and Scarcity:**
   * Centered pricing text.
   * Spanish flag `🇪🇸` emoji next to "96 € al mes".
   * Earth America `🌎` emoji next to "80 € al mes" in orange `#FF7432`.
   * Equal height/formatting layout for the two investment detail columns.

5. **Legal Modal:**
   * Negrita for "**VOZ CREATIVA**" using `<strong>VOZ CREATIVA</strong>` tags.
   * Replace "WATSAPP" with "WhatsApp".
