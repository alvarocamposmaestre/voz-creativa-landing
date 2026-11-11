const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Find the section where we appended NUEVAS ADAPTACIONES
const target = '/* ==========================================================================\n   NUEVAS ADAPTACIONES: KEYNOTE LANDING CORRECTIONS\n   ========================================================================== */';
const idx = css.indexOf(target);

const newStyles = `/* ==========================================================================
   NUEVAS ADAPTACIONES: KEYNOTE LANDING CORRECTIONS
   ========================================================================== */

/* --- 1. HEADER CINTILLO PLACEHOLDER --- */
.header-cintillo-container {
    width: 100%;
    background-color: var(--color-green-primary);
    color: #1C1B19;
    padding: 8px 16px;
    font-size: 0.88rem;
    font-weight: 700;
    text-align: center;
    letter-spacing: 0.02em;
}

/* --- 2. FORMAT GRID 5 CARDS (TODAS CON EL MISMO ESTILO) --- */
.format-grid-5cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
}

@media (min-width: 640px) and (max-width: 991px) {
    .format-grid-5cards {
        grid-template-columns: repeat(2, 1fr);
    }
    .format-grid-5cards .format-card:last-child {
        grid-column: span 2;
    }
}

@media (min-width: 992px) {
    .format-grid-5cards {
        grid-template-columns: repeat(6, 1fr);
    }
    
    .format-grid-5cards .format-card:nth-child(1),
    .format-grid-5cards .format-card:nth-child(2),
    .format-grid-5cards .format-card:nth-child(3) {
        grid-column: span 2;
    }
    
    .format-grid-5cards .format-card:nth-child(4) {
        grid-column: 2 / span 2;
    }
    
    .format-grid-5cards .format-card:nth-child(5) {
        grid-column: 4 / span 2;
    }
}

/* --- 3. METHODOLOGY MANIFESTO SECTION (SUSTITUCIÓN DE DETAILS-SPLIT) --- */
.methodology-section {
    position: relative;
    overflow: hidden;
    padding: 80px 0;
}

.methodology-bg-video {
    position: absolute;
    top: -10%;
    left: 0;
    width: 100%;
    height: 120%;
    object-fit: cover;
    z-index: 0;
    pointer-events: none;
    opacity: 0.14;
    mix-blend-mode: multiply;
    will-change: transform;
}

.methodology-container {
    position: relative;
    z-index: 1;
    max-width: 1080px;
    margin: 0 auto;
}

.methodology-manifesto {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 24px;
    width: 100%;
}

.manifesto-kicker {
    display: inline-block;
    color: var(--color-green-primary);
    font-family: var(--font-body);
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.manifesto-title {
    font-size: clamp(1.5rem, 2.8vw, 2.1rem);
    line-height: 1.25;
    margin: 0;
    color: var(--color-text-white);
    max-width: 760px;
}

.manifesto-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 12px;
    width: 100%;
}

@media (min-width: 768px) {
    .manifesto-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }
}

.manifesto-item {
    display: flex;
    align-items: flex-start;
    text-align: left;
    gap: 16px;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(209, 205, 200, 0.7);
    border-radius: 12px;
    padding: 22px 24px;
    transition: var(--transition-smooth);
}

.manifesto-item:hover {
    transform: translateY(-3px);
    border-color: var(--color-green-primary);
    box-shadow: 0 10px 28px rgba(34, 179, 83, 0.1);
}

.manifesto-num {
    font-family: var(--font-body);
    font-size: 1.2rem;
    font-weight: 900;
    color: var(--color-green-primary);
    line-height: 1;
    margin-top: 2px;
    flex-shrink: 0;
}

.manifesto-item p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.55;
    color: var(--color-text-white);
}

.manifesto-item strong {
    color: var(--color-text-white);
    letter-spacing: 0.02em;
}

.manifesto-banner {
    margin-top: 16px;
    padding: 22px 28px;
    background: #1C1B19;
    border-radius: 12px;
    border-left: 5px solid var(--color-green-primary);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
    width: 100%;
    max-width: 860px;
}

.manifesto-banner p {
    margin: 0;
    font-family: var(--font-body);
    font-weight: 800;
    font-size: 0.95rem;
    line-height: 1.5;
    color: #FFFFFF;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

/* --- 4. PRICING STACKED CARD (TIERS VERTICALES ORGANIZADOS) --- */
.pricing-stacked-card {
    max-width: 440px !important;
    padding: 36px 30px !important;
    background-color: #FFFFFF;
    border-radius: 14px;
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(209, 205, 200, 0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.price-tier-stacked-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    width: 100%;
    padding: 4px 0;
}

.price-tier-heading {
    font-family: var(--font-body);
    font-size: 0.92rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--color-text-white);
}

.price-tier-amount {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 6px;
}

.price-tier-amount .price-val {
    font-size: 2.35rem;
    font-weight: 900;
    line-height: 1.1;
    letter-spacing: -0.02em;
}

.text-green {
    color: var(--color-green-primary);
}

.text-orange {
    color: var(--color-orange-primary);
}

.price-tier-amount .price-freq {
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--color-text-grey);
    text-transform: none;
    letter-spacing: normal;
}

.price-contado-tag {
    display: inline-block;
    padding: 4px 14px;
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 999px;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--color-text-grey);
    letter-spacing: 0.02em;
    margin-top: 2px;
}

.price-tier-stacked-divider {
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.08);
    margin: 10px 0;
}
`;

if (idx !== -1) {
  css = css.substring(0, idx) + newStyles;
} else {
  css += '\n' + newStyles;
}

fs.writeFileSync('style.css', css, 'utf8');
console.log('style.css successfully updated!');

