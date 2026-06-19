# EARS Requirements: copy_and_layout_polishing

This specification defines the copy updates, text bolding, marquee item removals, expert section formatting, bio button visibility on desktop, pricing styling, and alignment adjustments for the Voz Creativa landing page.

---

## 🎯 Requirements Specification

### Feature Scope & Traceability Table

| ID | Type | Condition / Trigger | System Response (Shall...) | Verified By (Test ID) |
| :- | :--- | :------------------ | :------------------------- | :-------------------- |
| **R_HERO_BOLD_HIGHLIGHT** | Ubiquitous | *None* | The system shall display the highlight paragraph in the Hero section in bold text. | `T_HERO_BOLD_HIGHLIGHT_VERIFY` |
| **R_HERO_BOLD_DESCRIPTION** | Ubiquitous | *None* | The system shall display the specified sentence in the Hero description paragraph in bold text. | `T_HERO_BOLD_DESCRIPTION_VERIFY` |
| **R_TEMARIO_REMOVE_ITEM** | Ubiquitous | *None* | The system shall remove "Fotografía y narrativas" from the syllabus marquee loops. | `T_TEMARIO_REMOVE_ITEM_VERIFY` |
| **R_HUMBERTO_BIO_UPDATE** | Ubiquitous | *None* | The system shall display Humberto Valdivieso's description as "Semiólogo y curador de arte contemporáneo y diseño". | `T_HUMBERTO_BIO_UPDATE_VERIFY` |
| **R_EXPERTS_NAME_SPLIT** | Ubiquitous | *None* | The system shall format the names of the four experts so that their first name is on the first line and their surnames are on the second line. | `T_EXPERTS_NAME_SPLIT_VERIFY` |
| **R_RAQUEL_BIO_BUTTON_DESKTOP**| Ubiquitous | *None* | The system shall display the "Conocer más" button in Raquel Cartaya's bio on both desktop and mobile viewports. | `T_RAQUEL_BIO_BUTTON_DESKTOP_VERIFY` |
| **R_INVESTMENT_SCARCITY_REPLACE**| Ubiquitous | *None* | The system shall replace the previous left column content (reduced assistance, 25 seats, 5 scholarships occupied) in the Investment section with the "Hemos diseñado..." text, with the specified phrase in bold. | `T_INVESTMENT_SCARCITY_REPLACE_VERIFY` |
| **R_INVESTMENT_PRICING_STYLE**| Ubiquitous | *None* | The system shall display "96 € al mes" in green (`--color-green-primary`), update its subtext to "DURANTE 5 MESES PARA PARTICIPANTES EN ESPAÑA (INCLUYE IVA)", and update the "80 € al mes" subtext to "DURANTE 5 MESES PARA PARTICIPANTES FUERA ESPAÑA". | `T_INVESTMENT_PRICING_STYLE_VERIFY` |
| **R_INVESTMENT_BOX_LAYOUT** | Ubiquitous | *None* | The system shall remove the "Hemos diseñado..." box from the bottom row of the Investment section and make the "Creemos que el acceso..." box span the full width of the section. | `T_INVESTMENT_BOX_LAYOUT_VERIFY` |
| **R_SIGNUP_CHECKLIST_UPDATE** | Ubiquitous | *None* | The signup section checklist item shall read: "Acompañamiento garantizado en tu proyecto personal o profesional." | `T_SIGNUP_CHECKLIST_UPDATE_VERIFY` |
| **R_HERO_MOBILE_PADDING** | Ubiquitous | When viewed on mobile devices (viewport width <= 992px) | The system shall reduce the top padding of the Hero section to 60px to decrease the space above the logo. | `T_HERO_MOBILE_PADDING_VERIFY` |
| **R_SIGNUP_MOBILE_ORDER** | Ubiquitous | When viewed on mobile devices (viewport width <= 992px) | The system shall stack the signup elements in the following order: text first, form second, and logo third. | `T_SIGNUP_MOBILE_ORDER_VERIFY` |
| **R_SIGNUP_LOGO_SIZE_MOBILE** | Ubiquitous | When viewed on mobile devices (viewport width <= 992px) | The system shall reduce the maximum width of the signup logo to 160px. | `T_SIGNUP_LOGO_SIZE_MOBILE_VERIFY` |

---
*Requirements are proposed for verification.*
