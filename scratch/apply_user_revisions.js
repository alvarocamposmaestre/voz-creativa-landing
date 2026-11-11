const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Format Card: remove format-card-featured class so it has the exact same style as "Libre por 3 meses"
html = html.replace(
    '<div class="format-card format-card-featured">',
    '<div class="format-card">'
);

// 2. Replace details-split-section with the methodology manifesto block
const sDetailsStart = html.indexOf('<!-- Detailed Accompaniment & Flexibility -->');
const sOutcomesStart = html.indexOf('<!-- Outcomes Section (List of results) -->');

if (sDetailsStart === -1 || sOutcomesStart === -1) {
    console.error('Markers not found!');
    process.exit(1);
}

const newMethodologySection = `<!-- Methodology Manifesto Section -->
        <section class="methodology-section" id="metodologia">
            <video autoplay loop muted playsinline class="methodology-bg-video"
                poster="assets/details-split-image.jpeg">
                <source data-src="assets/details-split-video.mp4" type="video/mp4">
            </video>
            <div class="container methodology-container">
                <div class="methodology-manifesto">
                    <span class="manifesto-kicker">NO SOLO ES FORMACIÓN,</span>
                    <h2 class="section-title manifesto-title">Es acompañamiento especializado que te ayudará a:</h2>
                    <div class="manifesto-grid">
                        <div class="manifesto-item">
                            <span class="manifesto-num">01</span>
                            <p><strong>RECONOCER</strong> tus patrones creativos y conectar con otros.</p>
                        </div>
                        <div class="manifesto-item">
                            <span class="manifesto-num">02</span>
                            <p><strong>VALIDAR</strong> tus formas de sentir y hacer, descubrir su valor para tu expresión.</p>
                        </div>
                        <div class="manifesto-item">
                            <span class="manifesto-num">03</span>
                            <p><strong>REVELAR</strong> tu mirada, proponer y potenciar un lenguaje propio.</p>
                        </div>
                        <div class="manifesto-item">
                            <span class="manifesto-num">04</span>
                            <p><strong>INTEGRAR</strong> desde tu expresión quién eres y lo que haces en el mundo.</p>
                        </div>
                    </div>
                    <div class="manifesto-banner">
                        <p>ASÍ SE DESARROLLA TU PROPIA VOZ CREATIVA, CONECTANDO BELLEZA Y CONOCIMIENTO.</p>
                    </div>
                </div>
            </div>
        </section>

        `;

// Replace details-split-section
html = html.substring(0, sDetailsStart) + newMethodologySection + html.substring(sOutcomesStart);

// 3. Restore outcomes-section to original content with Raquel's bio (link to about)
const sOutcomesNow = html.indexOf('<!-- Outcomes Section (List of results) -->');
const sInversionNow = html.indexOf('<!-- Investment & Scarcity Section -->');

const originalOutcomesSection = `<!-- Outcomes Section (List of results) -->
        <section class="outcomes-section">
            <div class="container outcomes-container">
                <h2 class="section-title outcomes-title" style="margin: 0;">Al finalizar habrás desarrollado</h2>

                <div class="outcomes-list" style="margin-top: 0;">
                    <div class="outcome-list-item">
                        <span class="outcome-icon"><i data-lucide="eye"></i></span>
                        <span>Una mirada más consciente y profunda.</span>
                    </div>
                    <div class="outcome-list-item">
                        <span class="outcome-icon"><i data-lucide="sparkles"></i></span>
                        <span>Mayor criterio visual y conceptual.</span>
                    </div>
                    <div class="outcome-list-item">
                        <span class="outcome-icon"><i data-lucide="cpu"></i></span>
                        <span>Herramientas para trabajar con IA sin perder autenticidad.</span>
                    </div>
                    <div class="outcome-list-item">
                        <span class="outcome-icon"><i data-lucide="brain"></i></span>
                        <span>Pensamiento crítico y capacidad de análisis.</span>
                    </div>
                    <div class="outcome-list-item">
                        <span class="outcome-icon"><i data-lucide="palette"></i></span>
                        <span>Un proyecto creativo desarrollado.</span>
                    </div>
                    <div class="outcome-list-item">
                        <span class="outcome-icon"><i data-lucide="megaphone"></i></span>
                        <span>Una voz más clara y segura.</span>
                    </div>
                </div>

                <div class="outcomes-right-visual">
                    <div class="outcomes-right-card">
                        <div class="avatar-frame" style="width: 200px; height: 200px; margin: 0 auto;">
                            <div class="avatar-glow-frame" style="border-color: var(--color-green-primary);"></div>
                            <img src="assets/raquel-portrait.webp" alt="Retrato Raquel Cartaya - Directora"
                                class="avatar-img-custom">
                        </div>
                        <div class="avatar-caption" style="margin-top: 0; max-width: 320px;">
                            <h4
                                style="color: var(--color-text-dark); font-family: var(--font-heading); font-size: 1.35rem; font-weight: 800; margin-bottom: 6px; letter-spacing: -0.01em;">
                                Raquel Cartaya</h4>
                            <span
                                style="display: block; color: var(--color-green-primary); font-size: 0.88rem; font-weight: 700; font-style: italic; margin-bottom: 8px;">Docente
                                de Voz Creativa</span>
                            <p
                                style="color: var(--color-text-grey); font-size: 0.85rem; font-weight: 300; font-style: italic; line-height: 1.6; margin: 0;">
                                Profesional multidisciplinario con más de 13 años de experiencia en la práctica y
                                enseñanza de la fotografía, el teatro, la semiótica y la comunicación visual para
                                distintas audiencias.
                            </p>
                            <a href="https://raquelcartayastudio.com/about/" target="_blank" rel="noopener noreferrer"
                                class="btn-conocer-mas btn-cta-primary">Conocer más</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        `;

html = html.substring(0, sOutcomesNow) + originalOutcomesSection + html.substring(sInversionNow);

// 4. Update price-box-card to stacked layout (vertical tiers)
const oldPriceBoxStart = html.indexOf('<div class="price-box-card pricing-two-tier-card">');
const oldPriceBoxEnd = html.indexOf('</div>\n                    </div>\n                </div>\n\n                <!-- Row 2');

const newStackedPriceBox = `<div class="price-box-card pricing-stacked-card">
                            <div class="price-val-wrapper"
                                style="flex-direction: column; align-items: center; text-align: center; gap: 1.25rem; width: 100%;">
                                <!-- Tier 1: Grupal -->
                                <div class="price-tier-stacked-block">
                                    <span class="price-tier-heading">Formación Grupal</span>
                                    <div class="price-tier-amount">
                                        <span class="price-val text-green">99 €</span>
                                        <span class="price-freq">al mes</span>
                                    </div>
                                    <span class="price-contado-tag">o 550 € al contado</span>
                                </div>

                                <!-- Horizontal Divider Line -->
                                <div class="price-tier-stacked-divider"></div>

                                <!-- Tier 2: Grupal + 1:1 -->
                                <div class="price-tier-stacked-block">
                                    <span class="price-tier-heading">Grupal + Acompañamiento 1:1</span>
                                    <div class="price-tier-amount">
                                        <span class="price-val text-orange">249 €</span>
                                        <span class="price-freq">al mes</span>
                                    </div>
                                    <span class="price-contado-tag">o 1.400 € al contado</span>
                                </div>
                            </div>
                            
                        </div>`;

html = html.substring(0, oldPriceBoxStart) + newStackedPriceBox + html.substring(oldPriceBoxEnd);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated index.html with all requested structure!');

