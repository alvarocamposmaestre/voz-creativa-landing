const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetOld = `<div class="price-box-card">
                            <div class="price-val-wrapper"
                                style="flex-direction: column; align-items: center; text-align: center; gap: 1rem; width: 100%;">
                                <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
                                    <span class="price-val"
                                        style="font-size: 1.75rem; font-weight: 800; display: inline-flex; align-items: center; gap: 0.5rem; text-align: center; color: var(--color-green-primary);">
                                        <i data-lucide="map-pin"
                                            style="width: 24px; height: 24px; stroke-width: 2px; color: var(--color-green-primary);"></i>
                                        119 € al mes
                                    </span>
                                    <span class="price-freq"
                                        style="margin-top: 0.5rem; text-align: center; font-size: 0.72rem; letter-spacing: 0.05em; font-weight: 700; text-transform: uppercase;">DURANTE
                                        5 MESES PARA PARTICIPANTES EN ESPAÑA (INCLUYE IVA)</span>
                                </div>
                                <div
                                    style="border-top: 1px solid rgba(0,0,0,0.1); width: 100%; padding-top: 1rem; display: flex; flex-direction: column; align-items: center;">
                                    <span class="price-val"
                                        style="font-size: 1.75rem; font-weight: 800; color: var(--color-orange-primary); display: inline-flex; align-items: center; gap: 0.5rem; text-align: center;">
                                        <i data-lucide="globe"
                                            style="width: 24px; height: 24px; stroke-width: 2px; color: var(--color-orange-primary);"></i>
                                        99 € al mes
                                    </span>
                                    <span class="price-freq"
                                        style="margin-top: 0.5rem; text-align: center; color: var(--color-text-grey); font-size: 0.72rem; letter-spacing: 0.05em; font-weight: 700; text-transform: uppercase;">DURANTE
                                        5 MESES PARA PARTICIPANTES FUERA ESPAÑA</span>
                                </div>
                            </div>
                            <p class="price-sub-note" style="margin-top: 1.5rem; text-align: center;">Nuestro objetivo
                                es hacer accesible una formación integral sin renunciar a la calidad ni la atención
                                personalizada que cada participante merece.</p>
                        </div>`;

const targetNew = `<div class="price-box-card pricing-two-tier-card">
                            <div class="price-tiers-grid">
                                <div class="price-tier-column">
                                    <span class="tier-title">Formación Grupal</span>
                                    <div class="tier-price-row">
                                        <span class="price-val text-green">99 €</span>
                                        <span class="price-period">/ mes</span>
                                    </div>
                                    <span class="tier-contado-badge">o 550 € al contado</span>
                                </div>
                                <div class="tier-divider-line"></div>
                                <div class="price-tier-column price-tier-highlight">
                                    <span class="tier-title">Grupal + Acompañamiento 1:1</span>
                                    <div class="tier-price-row">
                                        <span class="price-val text-orange">249 €</span>
                                        <span class="price-period">/ mes</span>
                                    </div>
                                    <span class="tier-contado-badge">o 1.400 € al contado</span>
                                </div>
                            </div>
                            <p class="price-sub-note" style="margin-top: 1.25rem; text-align: center;">Elige el formato que mejor responda al momento de tu proyecto creativo y únete a nuestra lista de espera prioritaria.</p>
                        </div>`;

if (html.includes(targetOld)) {
  html = html.replace(targetOld, targetNew);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('Price card successfully replaced!');
} else {
  console.log('targetOld not found in index.html');
}

