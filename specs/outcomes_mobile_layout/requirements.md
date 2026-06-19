# EARS Requirements: outcomes_mobile_layout

This specification defines the functional requirements for correcting the mobile layout order of the Outcomes section, adding a "Conocer más" button in Raquel Cartaya's bio linked to her official site, and centering the logo in the "Reserva tu plaza" section.

---

## 🎯 Requirements Specification

### Feature Scope & Traceability Table

| ID | Type | Condition / Trigger | System Response (Shall...) | Verified By (Test ID) |
| :- | :--- | :------------------ | :------------------------- | :-------------------- |
| **R_OUTCOMES_MOBILE_ORDER** | Ubiquitous | When the page is viewed on a mobile device (viewport width <= 992px) | The system shall display the Outcomes section title first, followed by the outcomes list items, and finally the Raquel Cartaya bio card at the bottom. | `T_OUTCOMES_MOBILE_ORDER_VERIFY` |
| **R_CONOCER_MAS_BUTTON_DOM** | Ubiquitous | *None* | The system shall include an anchor button (`<a>`) with the text "Conocer más" pointing to `https://raquelcartayastudio.com/` right after the description paragraph of Raquel Cartaya. | `T_CONOCER_MAS_BUTTON_DOM_VERIFY` |
| **R_CONOCER_MAS_BUTTON_STYLE** | Ubiquitous | *None* | The button shall be styled with the green brand gradient (from `--color-green-light` to `--color-green-primary`) and be hidden (`display: none`) on desktop viewports. | `T_CONOCER_MAS_BUTTON_STYLE_VERIFY` |
| **R_CONOCER_MAS_BUTTON_MOBILE** | Ubiquitous | When the page is viewed on a mobile device (viewport width <= 992px) | The button shall become visible (`display: inline-flex`). | `T_CONOCER_MAS_BUTTON_MOBILE_VERIFY` |
| **R_FINAL_LOGO_CENTERED** | Ubiquitous | *None* | The system shall center the branded logo image (`.signup-logo-wrapper`) inside its container in the "Reserva tu plaza" section. | `T_FINAL_LOGO_CENTERED_VERIFY` |

---
*Requirements are updated.*
