# Technical Design: alumni_block_full_width

This document outlines the technical design decisions for expanding the alumni masterclass block (`alumni-masterclass-block`) to the full width of the section container.

---

## 📐 Layout Updates

### 1. Sizing properties of `.alumni-masterclass-block`
In `style.css`, modify the sizing of `.alumni-masterclass-block` to remove the hardcoded width constraint and make it fill 100% of the container:

```css
.alumni-masterclass-block {
    background-color: #FFFFFF;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    padding: 40px;
    max-width: 100%; /* Changed from 760px to 100% */
    margin: 0 auto;
    text-align: center;
    color: var(--color-text-dark);
    transition: var(--transition-fast);
}
```

---
*Design is proposed.*
