# Technical Design: landing_page_creation

This document details the visual style, file structure, interactive collapsible accordions, placeholder images strategy, and webhook configuration.

---

## 📐 Visual Identity & Colors

The design will adopt the brand palette of Raquel Cartaya Studio:
* **Background Dark:** `#161513`
* **Surface Input:** `#201E1B`
* **Text White:** `#FFFFFF`
* **Text Muted/Grey:** `#B4B0A7`
* **Accent Green (Primary):** `#22B353`
* **Accent Purple:** `#6B22B3`
* **Accent Gold:** `#B37922`
* **Fonts:** `Avenir LT Pro` (Light, Roman, Medium, Heavy, Black) loaded locally.

---

## ✏️ Interactive Accordions (Collapsibles)

To present deep text content (such as syllabus items and program details) without overwhelming the reader:
* We will use HTML5 `<details>` and `<summary>` elements or custom JS accordion blocks. Custom JS classes will allow us to style transitions with smooth height expansion.
* Affected sections:
  1. **"Lo que encontrarás dentro"** (Accordions for mentoring, guest speakers list, community details).
  2. **"En lo que trabajaremos"** (Syllabus details toggle).

---

## 🖼️ Placeholder Images Strategy

We will need **3 placeholder images**. They will be defined as follows:

1. **`assets/hero-visual.png`:**
   * *Concept:* Abstract, premium representation of "Visual Storytelling and Creative Direction in the era of AI". A composition showing a human eye, geometric design wireframes, photography crop marks, and soft green/purple light grids.
   * *Location:* Hero Section (right side column).
2. **`assets/raquel-portrait.jpg`:**
   * *Concept:* High-quality professional portrait of Raquel Cartaya, creative director of the program. Warm lighting, artistic style.
   * *Location:* "Sobre Mí" (Biografía) Section.
3. **`assets/syllabus-preview.png`:**
   * *Concept:* Visual graphic representing the sign theory, rhetorics, and visual mythologies (symbols, film synthesis, photography grids).
   * *Location:* "En lo que trabajaremos" Section.

---

## 🌐 Webhook Integration

The registration form will send JSON payloads asynchronously via Fetch API to the configured Make.com webhook:
* **URL:** `https://hook.us2.make.com/r4923rfq2knvtv24zxg0shd66tci7o2i`
* **Fields:**
  * `nombre` (Full Name)
  * `email` (Email address)
  * `pais` (Country)
  * `profesion` (Area of interest or profession)
  * `objetivo` (What they would like to develop during the program)
  * `evento` (Hardcoded as "VOZ CREATIVA FORMACIÓN")
  * `fecha_registro` (ISO timestamp)
