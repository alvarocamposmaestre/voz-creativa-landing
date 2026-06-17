# EARS Requirements: landing_page_creation

This specification defines the functional requirements for the **Voz Creativa** sales landing page.

---

## 🎯 Requirements Specification

### Feature Scope & Traceability Table

| ID | Type | Condition / Trigger | System Response (Shall...) | Verified By (Test ID) |
| :- | :--- | :------------------ | :------------------------- | :-------------------- |
| **R_BRAND** | Ubiquitous | *None* | The system shall display the brand Logo SVG, import Avenir LT Pro fonts, and load background and text colors matching Raquel Cartaya Studio guidelines. | `T_BRAND_STYLE` |
| **R_HERO** | Ubiquitous | *None* | The system shall display the main program statement about Visual Storytelling and IA, alongside a primary button to register for information. | `T_HERO_DISPLAY` |
| **R_COLLAPSE**| Event-Driven | When the user clicks an accordion header, | the system shall toggle the active class and smoothly expand or collapse the corresponding content block. | `T_ACCORDION_TOGGLE` |
| **R_INVEST** | Ubiquitous | *None* | The system shall highlight the investment info (80 €/USD per month) and scarcity elements (maximum 25 participants, 5 scholarships already taken). | `T_PRICING_VISIBILITY` |
| **R_IP_LOC** | Event-Driven | When the landing page loads, | the system shall perform a background API query to detect the user's country and IP, filling in the hidden form inputs. | `T_GEOLOCATION` |
| **R_FORM** | Event-Driven | When a user submits the signup form with valid inputs, | the system shall post the serialized JSON payload to the Make.com webhook URL and show the success confirmation block. | `T_FORM_WEBHOOK` |

---
*Requirements are locked and verified.*
