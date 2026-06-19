# EARS Requirements: landing_page_copy_updates

This specification defines the functional requirements for the copy, pricing, experts list, form fields, and privacy policy updates in the **Voz Creativa** sales landing page.

---

## 🎯 Requirements Specification

### Feature Scope & Traceability Table

| ID | Type | Condition / Trigger | System Response (Shall...) | Verified By (Test ID) |
| :- | :--- | :------------------ | :------------------------- | :-------------------- |
| **R_HERO_COPY** | Ubiquitous | *None* | The system shall display the new text regarding the AI capabilities, prompt limits, developing criterion/voice in the Hero copy block. | `T_HERO_COPY_VERIFY` |
| **R_HEART_COPY** | Ubiquitous | *None* | The system shall display the text "Para quienes quieren reconectar con lo que realmente aman hacer." on the heart audience card. | `T_HEART_COPY_VERIFY` |
| **R_ACC_COPY_01** | Ubiquitous | *None* | The system shall display the updated title and text for item 01 (without subtitle): "Formación a través de encuentros irrepetibles: Más que clases, son espacios..." | `T_ACC_01_VERIFY` |
| **R_ACC_COPY_03** | Ubiquitous | *None* | The system shall remove "Sin quienes nos acompañarán en esta primera edición" in accordion 3. | `T_ACC_03_VERIFY` |
| **R_SYLLABUS_TITLE** | Ubiquitous | *None* | The system shall display the syllabus section header as "El conocimiento que ampliará tu mirada y fortalecerá tu voz creativa". | `T_SYLLABUS_TITLE_VERIFY` |
| **R_SYLLABUS_ITEM** | Ubiquitous | *None* | The system shall include "Fotografía e IA" as a marquee card in the syllabus section. | `T_SYLLABUS_ITEM_VERIFY` |
| **R_FORMAT_CARDS** | Ubiquitous | *None* | The system shall update the duration description, modality description, and hours description on the format cards. | `T_FORMAT_CARDS_VERIFY` |
| **R_EXPERTS_TEXT** | Ubiquitous | *None* | The system shall update the subtitle/description in the experts section to "Cada mes tendrás acceso a profesionales..." and replace the "Invitado confirmado" text for Johanna, Humberto, Elisa, and Emily with their respective professional profiles. | `T_EXPERTS_TEXT_VERIFY` |
| **R_ALUMNI_BONO** | Ubiquitous | *None* | The system shall label the alumni section as "BONO" and use the updated copy: "Luis Rodríguez y Álvaro Campos, exalumnos...", and separate the quote "No como teoría. Como evidencia de lo que ocurre cuando una persona desarrolla una voz propia." into two lines after the first period. | `T_ALUMNI_BONO_VERIFY` |
| **R_INVESTMENT_PRICING** | Ubiquitous | *None* | The system shall show centered pricing values: "96 € al mes 🇪🇸" and "durante 5 meses (incluye IVA)", and in a new line "80 € al mes 🌎" styled in orange (#FF7432) and "para participantes fuera de España". The bottom paragraphs shall be aligned with same formatting. | `T_INVESTMENT_PRICING_VERIFY` |
| **R_FORM_WHATSAPP** | Ubiquitous | *None* | The system shall include a WhatsApp number field in the signup form, make it required, validate it, and include it in the serialized payload sent to the Make.com webhook. | `T_FORM_WHATSAPP_VERIFY` |
| **R_PRIVACY_GDPR** | Ubiquitous | *None* | The system shall display the updated Privacy Policy text with "Raquel Cartaya" as responsible and WhatsApp references correctly written. | `T_PRIVACY_GDPR_VERIFY` |
| **R_FOOTER_COPYRIGHT** | Ubiquitous | *None* | The footer shall display the updated copyright string: "© 2026 Raquel Cartaya". | `T_FOOTER_COPYRIGHT_VERIFY` |
| **R_BRAND_SECONDARY** | Ubiquitous | *None* | The system shall color the inside section orange (#FF7432) with a gradient, the experts section purple (#7C45C4) with a gradient, and add button hover states transitioning to orange gradients. | `T_SECONDARY_COLORS` |

---
*Requirements are locked and verified.*
