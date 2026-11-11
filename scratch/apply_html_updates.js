const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Meta / JSON-LD adjustments
html = html.replace(/Acompañamiento de 5 meses/g, 'Acompañamiento de 6 meses');
html = html.replace('"duration": "P5M"', '"duration": "P6M"');

// 2. Header: add cintillo container & update nav button
const headerTarget = '<header class="brand-header">';
const headerReplacement = '<header class="brand-header">\n        <!-- Contenedor estructural para Cintillo (se definirá más adelante) -->\n        <div id="header-cintillo" class="header-cintillo-container" style="display: none;"></div>';
html = html.replace(headerTarget, headerReplacement);
html = html.replace('<a href="#contacto" class="nav-btn-link"><span class="btn-text-nav">Reservar</span></a>', '<a href="#contacto" class="nav-btn-link"><span class="btn-text-nav">Apúntate</span></a>');

// 3. Hero section
const heroBadgesOld = `<div class="hero-badges">
                        <div class="hero-badge badge-date">Inicia el 8 de agosto de 2026</div>
                        <div class="hero-badge badge-limit"><span class="dot-pulse"></span>Plazas limitadas</div>
                    </div>`;
const heroBadgesNew = `<div class="hero-badges">
                        <div class="hero-badge badge-date">Próximamente</div>
                        <div class="hero-badge badge-limit"><span class="dot-pulse"></span>Lista de espera</div>
                    </div>`;
html = html.replace(heroBadgesOld, heroBadgesNew);

const heroCopyOld = `<div class="hero-copy-block">
                        <p class="highlight-p">
                            <strong>La IA puede generar contenido, pero tu voz sigue siendo irreemplazable, lo más
                                humano y más estratégico.</strong>
                        </p>
                        <p>
                            Hoy cualquiera puede generar imágenes espectaculares y textos magníficos con un prompt. El
                            desafío no está en la herramienta, porque producir nunca ha sido lo difícil. <strong>Lo
                                difícil siempre ha sido desarrollar una mirada, construir criterio y tomar las
                                decisiones que transforman una idea en una narrativa y un sistema visual capaces de
                                conectar, emocionar y perdurar.</strong>
                        </p>
                    </div>`;
const heroCopyNew = `<div class="hero-copy-block">
                        <p class="highlight-p">
                            <strong>Formación y acompañamiento especializado para fortalecer y desarrollar tu expresión creativa</strong>
                        </p>
                        <p>
                            Una experiencia para quienes quieren impulsar su expresión más allá del gusto y así poder descubrir los secretos que la convierten en un modo de revelar, pensar y hacer tanto al mundo como a sí mismos.
                        </p>
                    </div>`;
html = html.replace(heroCopyOld, heroCopyNew);

html = html.replace('<a href="#contacto" class="btn-cta-orange">Reservar mi plaza</a>', '<a href="#contacto" class="btn-cta-orange">Apúntate</a>');

// 4. Overview Section
const overviewOld = `<p class="intro-large-text">
                        <strong>VOZ CREATIVA</strong> es una experiencia de formación y acompañamiento para quienes
                        quieren <strong>fortalecer precisamente aquello que marca la diferencia en tiempos de
                            IA</strong>. Durante cinco meses <strong>aprenderás a pensar mejor, observar mejor y crear
                            con mayor intención</strong>.
                    </p>`;
const overviewNew = `<p class="intro-large-text">
                        Porque producir nunca ha sido lo difícil, lo retador es poder desarrollar una mirada, un criterio y tomar las decisiones que transformen <strong>IDEAS en SISTEMAS</strong> capaces de conectar, emocionar y perdurar.
                    </p>`;
html = html.replace(overviewOld, overviewNew);

// 5. Differentiation
const diffOld = `<p class="diff-right-text">
                        No necesitas una carrera universitaria o ser profesional, solo curiosidad, compromiso y ganas de
                        desarrollar una voz propia.
                    </p>`;
const diffNew = `<p class="diff-right-text">
                        Pero aquí no necesitas estar cursando una carrera o ser profesional, solo curiosidad, compromiso y ganas de desarrollar una voz propia.
                    </p>`;
html = html.replace(diffOld, diffNew);

// 6. Accordions
const acc02Old = `<span class="header-number">02</span>
                                <span class="header-text">Acompañamiento 1:1</span>
                                <span class="accordion-icon">+</span>
                            </button>
                            <div class="accordion-content">
                                <div class="content-inner">
                                    <p>Una sesión mensual exclusiva para ayudarte a avanzar con claridad en tus
                                        proyectos.</p>
                                </div>
                            </div>`;
const acc02New = `<span class="header-number">02</span>
                                <span class="header-text">Acompañamiento 1:1</span>
                                <span class="accordion-icon">+</span>
                            </button>
                            <div class="accordion-content">
                                <div class="content-inner">
                                    <p>Encuentros mensuales personalizados y exclusivos para ayudarte a avanzar con claridad.<br><br>Podrás desarrollar una exploración personal, una investigación, una propuesta artística o un proyecto profesional de la mano de Raquel Cartaya durante todo el proceso.</p>
                                </div>
                            </div>`;
html = html.replace(acc02Old, acc02New);

const acc03Old = `<ul class="experts-list-bullets">
                                        <li>Johanna Pérez Daza</li>
                                        <li>Humberto Valdivieso</li>
                                        <li>Elisa Martínez</li>
                                        <li>Emily Jolie</li>
                                    </ul>`;
const acc03New = `<ul class="experts-list-bullets">
                                        <li>Johanna Pérez Daza (Fotografía y comunicación)</li>
                                        <li>Humberto Valdivieso (Semiótica, curaduría e investigación)</li>
                                        <li>Elisa Martínez (Storytelling y comunicación)</li>
                                        <li>Emily Jolie (Artes)</li>
                                    </ul>`;
html = html.replace(acc03Old, acc03New);

const acc04Old = `<p>Aprende junto a personas que comparten tu interés por la creatividad, la cultura
                                        visual y el arte.</p>`;
const acc04New = `<p>Aprende junto a personas alrededor del mundo que comparten tu interés por la creatividad, el diseño, la comunicación, el arte y la cultura.</p>`;
html = html.replace(acc04Old, acc04New);

// Remove Item 06
const acc06Regex = /<!-- Item 6 -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/;
const acc06Replacement = '</div>\n                </div>\n            </div>\n        </section>';
html = html.replace(acc06Regex, acc06Replacement);

// 7. Format Section
const formatHeadingOld = `<p class="section-desc">Coordenadas del programa</p>
                    <div class="format-badges">
                        <div class="format-badge-item badge-date-purple">Inicia el 8 de agosto de 2026</div>
                        <div class="format-badge-item badge-limit-purple"><span class="dot-pulse-purple"></span>Plazas
                            limitadas</div>
                    </div>`;
const formatHeadingNew = `<p class="section-desc">...durante seis meses entrenará tu atención, afinará tu sentido crítico y liberará tu expresión.</p>
                    <div class="format-badges">
                        <div class="format-badge-item badge-date-purple">Próximamente</div>
                        <div class="format-badge-item badge-limit-purple"><span class="dot-pulse-purple"></span>Lista de espera</div>
                    </div>`;
html = html.replace(formatHeadingOld, formatHeadingNew);

const formatGridOld = `<div class="format-grid">
                    <div class="format-card">
                        <div class="format-badge">Duración</div>
                        <h3>5 meses</h3>
                        <p>Un proceso de transformación integral de tu mirada, criterio y dirección.</p>
                    </div>
                    <div class="format-card">
                        <div class="format-badge">Modalidad</div>
                        <h3>Formación en línea</h3>
                        <p>Encuentros semanales a través de Google Meet.</p>
                    </div>
                    <div class="format-card">
                        <div class="format-badge">Horario</div>
                        <h3>5:00 PM (España) / 11:00 AM (Venezuela)</h3>
                        <p>3 horas académicas (2 horas y 15 minutos) por cada encuentro.</p>
                    </div>
                    <div class="format-card">
                        <div class="format-badge">Acceso</div>
                        <h3>Acceso de por vida</h3>
                        <p>Todas las sesiones quedan grabadas para revisión posterior.</p>
                    </div>
                </div>`;
const formatGridNew = `<div class="format-grid format-grid-5cards">
                    <div class="format-card">
                        <div class="format-badge">Duración</div>
                        <h3>6 meses</h3>
                        <p>Un proceso de transformación integral de tu mirada, criterio y dirección.</p>
                    </div>
                    <div class="format-card">
                        <div class="format-badge">Modalidad</div>
                        <h3>Formato híbrido</h3>
                        <p>Trabajando para lograr un formato híbrido con presencialidad en Madrid.</p>
                    </div>
                    <div class="format-card">
                        <div class="format-badge">Horario</div>
                        <h3>5:00 PM (España) / 11:00 AM (Venezuela)</h3>
                        <p>3 horas académicas (2 horas y 15 minutos) por cada encuentro.</p>
                    </div>
                    <div class="format-card">
                        <div class="format-badge">Acceso</div>
                        <h3>Libre por 3 meses</h3>
                        <p>Grabaciones y recursos disponibles para revisión durante y tras el programa.</p>
                    </div>
                    <div class="format-card format-card-featured">
                        <div class="format-badge">Acompañamiento</div>
                        <h3>Mensual y de 1h 30min</h3>
                        <p>Conversación privada y mentoría exclusiva para impulsar tu propio universo creativo durante el proceso de formación.</p>
                    </div>
                </div>`;
html = html.replace(formatGridOld, formatGridNew);

// 8. Alumni Masterclass Block
const alumniOld = `<div class="alumni-masterclass-block">
                    <div class="alumni-badge">BONO: Encuentros impartidos por exalumnos</div>
                    <h3>Muestra de formaciones desarrolladas</h3>
                    <p class="alumni-desc">
                        <strong>Luis Rodríguez</strong> y <strong>Álvaro Campos</strong>, exalumnos de "Fotografía y Voz
                        Creativa", brindarán una primera aproximación a sus programas de formación desarrollados a
                        partir de su propia exploración y construcción autoral a través de la fotografía.
                    </p>
                    <p class="alumni-quote">
                        "No como teoría.<br>Como evidencia de lo que ocurre cuando una persona desarrolla una voz
                        propia."
                    </p>
                </div>`;
const alumniNew = `<div class="alumni-masterclass-block">
                    <div class="alumni-badge">Y CON EXALUMNOS</div>
                    <h3>Encuentros formativos</h3>
                    <p class="alumni-desc">
                        Participantes del programa de <strong>Álvaro Campos</strong> y <strong>Luis Rodríguez</strong> ofrecen encuentros formativos desarrollados desde su propia expresión creativa.
                    </p>
                </div>`;
html = html.replace(alumniOld, alumniNew);

// 9. Outcomes / Methodology Manifest
const outcomesOld = `<h2 class="section-title outcomes-title" style="margin: 0;">Al finalizar habrás desarrollado</h2>

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
                </div>`;
const outcomesNew = `<div class="methodology-manifesto">
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
                </div>`;
html = html.replace(outcomesOld, outcomesNew);

// 10. Bio link
html = html.replace(/<a href="https:\/\/raquelcartayastudio\.com\/" class="btn-conocer-mas btn-cta-primary">Conocer[\s\S]*?más<\/a>/, '<a href="https://raquelcartayastudio.com/about/" target="_blank" rel="noopener noreferrer" class="btn-conocer-mas btn-cta-primary">Conocer más</a>');

// 11. Investment Section
const invBadgesOld = `<div class="hero-badges investment-badges" style="margin-top: 16px; margin-bottom: 0;">
                            <div class="hero-badge badge-date">Inicia el 8 de agosto de 2026</div>
                            <div class="hero-badge badge-limit"><span class="dot-pulse"></span>Plazas limitadas</div>
                        </div>`;
const invBadgesNew = `<div class="hero-badges investment-badges" style="margin-top: 16px; margin-bottom: 0;">
                            <div class="hero-badge badge-date">Próximamente</div>
                            <div class="hero-badge badge-limit"><span class="dot-pulse"></span>Lista de espera</div>
                        </div>`;
html = html.replace(invBadgesOld, invBadgesNew);

// Replace price card inside investment section
const invPriceCardRegex = /<div class="price-box-card">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<!-- Row 2/;
const invPriceCardNew = `<div class="price-box-card pricing-two-tier-card">
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
                        </div>
                    </div>
                </div>
                <!-- Row 2`;
html = html.replace(invPriceCardRegex, invPriceCardNew);

const invCtaOld = `<div class="investment-cta-row">
                    <p class="investment-cta-text">Si sientes que esto es para ti, formaliza tu proceso de inscripción y
                        reserva tu plaza.</p>
                    <a href="#contacto" class="btn-cta-orange">Reservar mi plaza</a>
                </div>`;
const invCtaNew = `<div class="investment-cta-row">
                    <p class="investment-cta-text">Si también quieres que tu expresión creativa no sea solo cosa de gusto sino parte integral de quien eres y del mundo que haces, escríbenos para apuntarte a nuestra lista de espera.</p>
                    <a href="#contacto" class="btn-cta-orange">Apúntate a la lista</a>
                </div>`;
html = html.replace(invCtaOld, invCtaNew);

// 12. Contact / Signup Form Section
const signupHeadingOld = `<h2 class="section-title text-left" style="color: var(--color-text-dark);">Reserva tu plaza</h2>
                    <p
                        style="color: var(--color-text-dark); font-weight: 700; font-size: 1.05rem; line-height: 1.6; margin-bottom: 24px;">
                        Si sientes que ha llegado el momento de fortalecer tu criterio, desarrollar una voz propia y
                        crear proyectos con mayor profundidad y dirección, deja tus datos y te enviaremos toda la
                        información.</p>`;
const signupHeadingNew = `<div class="hero-badge badge-limit" style="margin-bottom: 12px; display: inline-flex;"><span class="dot-pulse"></span>Lista de espera</div>
                    <h2 class="section-title text-left" style="color: var(--color-text-dark);">Únete a la lista de espera</h2>
                    <p
                        style="color: var(--color-text-dark); font-weight: 700; font-size: 1.05rem; line-height: 1.6; margin-bottom: 24px;">
                        Si sientes que ha llegado la hora de conectar con tu propia expresión creativa, apúntate.</p>`;
html = html.replace(signupHeadingOld, signupHeadingNew);

html = html.replace('<span class="submit-btn-text">RESERVAR MI PLAZA</span>', '<span class="submit-btn-text">AÑÁDEME A LA LISTA</span>');

const successOld = `<h3 class="success-heading">Formulario enviado con éxito</h3>
                    <p class="success-desc">
                        Te hemos enviado un correo electrónico con los detalles para formalizar tu inscripción en la
                        formación de Voz Creativa. Revisa tu bandeja de entrada o spam.
                    </p>`;
const successNew = `<h3 class="success-heading">¡Te has apuntado con éxito!</h3>
                    <p class="success-desc">
                        Estás en la lista de espera prioritaria de Voz Creativa. Te notificaremos con acceso preferente tan pronto se abran las plazas de la próxima edición.
                    </p>`;
html = html.replace(successOld, successNew);

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html successfully updated!');

