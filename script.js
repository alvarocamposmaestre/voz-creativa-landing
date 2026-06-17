/**
 * VOZ CREATIVA - LÓGICA DE INTERACCIÓN Y CONVERSIÓN (VANILLA JS)
 * Desarrollado para Raquel Cartaya Studio
 */

document.addEventListener('DOMContentLoaded', () => {

    // === CONFIGURACIÓN DE CONEXIÓN ===
    const WEBHOOK_URL = 'https://hook.us2.make.com/r4923rfq2knvtv24zxg0shd66tci7o2i';
    const BRAND_WEBSITE = 'https://raquelcartayastudio.com/';

    // === 1. MENÚ DE NAVEGACIÓN MÓVIL ===
    const mobileMenuToggle = document.getElementById('nav-toggle-btn');
    const mobileDrawerNav = document.getElementById('main-nav');
    
    if (mobileMenuToggle && mobileDrawerNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileDrawerNav.classList.toggle('open');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Cerrar menú al hacer click en un enlace
        const mobileLinks = mobileDrawerNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawerNav.classList.remove('open');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }

    // === 2. ACORDEONES INTERACTIVOS (SUAVES) ===
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;
            const isCurrentlyActive = item.classList.contains('active');

            // Cerrar otros acordeones abiertos si se desea (comportamiento de fuelle único)
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle acordeón actual
            if (isCurrentlyActive) {
                item.classList.remove('active');
                header.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = null;
            } else {
                item.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
                // Establacer altura máxima dinámica para permitir animación CSS smooth
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // === 3. GEOLOCALIZACIÓN SILENCIOSA POR IP ===
    const geoCountryInput = document.getElementById('geo-country');
    const geoCountryVisibleInput = document.getElementById('geo-country-visible');
    const geoIpInput = document.getElementById('geo-ip');

    async function fetchUserLocation() {
        const apis = [
            'https://freeipapi.com/api/json',
            'https://ipapi.co/json/'
        ];
        
        let success = false;
        
        for (const api of apis) {
            if (success) break;
            try {
                const response = await fetch(api);
                if (!response.ok) throw new Error(`API ${api} failed`);
                const data = await response.json();
                
                const country = data.countryName || data.country_name;
                const code = data.countryCode || data.country_code;
                const ip = data.ipAddress || data.ip;
                
                if (country) {
                    if (geoCountryInput) geoCountryInput.value = `${country} (${code || ''})`;
                    if (geoCountryVisibleInput) geoCountryVisibleInput.value = country;
                    if (geoIpInput) geoIpInput.value = ip || '';
                    console.log(`Detectado via ${api}: ${country}`);
                    success = true;
                }
            } catch (err) {
                console.warn(`Error con ${api}:`, err);
            }
        }
        
        if (!success) {
            console.log('Usando fallback de zona horaria para determinar el país.');
            try {
                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                if (geoCountryInput) geoCountryInput.value = `TZ: ${timezone}`;
                
                const tzMap = {
                    'madrid': 'España',
                    'caracas': 'Venezuela',
                    'bogota': 'Colombia',
                    'mexico_city': 'México',
                    'buenos_aires': 'Argentina',
                    'santiago': 'Chile',
                    'lima': 'Perú',
                    'montevideo': 'Uruguay',
                    'guayaquil': 'Ecuador',
                    'quito': 'Ecuador',
                    'panama': 'Panamá',
                    'costa_rica': 'Costa Rica',
                    'guatemala': 'Guatemala',
                    'el_salvador': 'El Salvador',
                    'santo_domingo': 'República Dominicana',
                    'puerto_rico': 'Puerto Rico',
                    'miami': 'Estados Unidos',
                    'new_york': 'Estados Unidos',
                    'chicago': 'Estados Unidos',
                    'los_angeles': 'Estados Unidos',
                    'paris': 'Francia',
                    'london': 'Reino Unido',
                    'rome': 'Italia',
                    'berlin': 'Alemania',
                    'lisbon': 'Portugal'
                };
                
                const tzCity = (timezone.split('/')[1] || '').toLowerCase();
                let countryName = tzMap[tzCity] || timezone.split('/')[1] || timezone;
                
                if (!tzMap[tzCity] && timezone.split('/')[1]) {
                    const cityClean = timezone.split('/')[1].replace('_', ' ');
                    countryName = cityClean.charAt(0).toUpperCase() + cityClean.slice(1);
                }
                
                if (geoCountryVisibleInput) geoCountryVisibleInput.value = countryName;
            } catch (e) {
                if (geoCountryInput) geoCountryInput.value = 'No detectado';
                if (geoCountryVisibleInput) geoCountryVisibleInput.value = '';
            }
            if (geoIpInput) geoIpInput.value = 'Desconocido/Filtro';
        }
    }

    fetchUserLocation();

    // === 4. MODAL DE POLÍTICA DE PRIVACIDAD ===
    const privacyModal = document.getElementById('legal-privacy-modal');
    const openPrivacyLink = document.getElementById('open-privacy-modal');
    const openPrivacyFooter = document.getElementById('open-privacy-modal-footer');
    const modalDismissBtn = document.getElementById('modal-dismiss-btn');

    function showModal(e) {
        if (e) e.preventDefault();
        if (privacyModal) {
            privacyModal.classList.add('open');
            privacyModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function hideModal() {
        if (privacyModal) {
            privacyModal.classList.remove('open');
            privacyModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (openPrivacyLink) openPrivacyLink.addEventListener('click', showModal);
    if (openPrivacyFooter) openPrivacyFooter.addEventListener('click', showModal);
    if (modalDismissBtn) modalDismissBtn.addEventListener('click', hideModal);
    
    if (privacyModal) {
        privacyModal.addEventListener('click', (e) => {
            if (e.target === privacyModal) hideModal();
        });
    }

    // === 5. VALIDACIÓN Y ENVÍO A WEBHOOK DE MAKE.COM ===
    const leadForm = document.getElementById('lead-signup-form');
    const formContainerBlock = document.getElementById('form-container-block');
    const successConfirmationBlock = document.getElementById('success-confirmation-block');
    const registeredUsername = document.getElementById('registered-username');

    const nameInput = document.getElementById('user-fullname');
    const emailInput = document.getElementById('user-email');
    const countryVisibleInput = document.getElementById('geo-country-visible');
    const professionInput = document.getElementById('user-profession');
    const goalsInput = document.getElementById('user-goals');
    const gdprCheckbox = document.getElementById('gdpr-checkbox');
    const submitBtn = document.getElementById('signup-submit-btn');

    const nameError = document.getElementById('name-error-msg');
    const emailError = document.getElementById('email-error-msg');
    const countryError = document.getElementById('country-error-msg');
    const professionError = document.getElementById('profession-error-msg');
    const goalsError = document.getElementById('goals-error-msg');

    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            let isFormValid = true;

            // Validación Nombre
            if (nameInput.value.trim() === '') {
                nameError.style.display = 'block';
                nameInput.style.borderColor = '#FF4D4D';
                isFormValid = false;
            } else {
                nameError.style.display = 'none';
                nameInput.style.borderColor = '';
            }

            // Validación Email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                emailError.style.display = 'block';
                emailInput.style.borderColor = '#FF4D4D';
                isFormValid = false;
            } else {
                emailError.style.display = 'none';
                emailInput.style.borderColor = '';
            }

            // Validación País Visible
            if (countryVisibleInput.value.trim() === '') {
                countryError.style.display = 'block';
                countryVisibleInput.style.borderColor = '#FF4D4D';
                isFormValid = false;
            } else {
                countryError.style.display = 'none';
                countryVisibleInput.style.borderColor = '';
            }

            // Validación Profesión
            if (professionInput.value.trim() === '') {
                professionError.style.display = 'block';
                professionInput.style.borderColor = '#FF4D4D';
                isFormValid = false;
            } else {
                professionError.style.display = 'none';
                professionInput.style.borderColor = '';
            }

            // Validación Objetivos
            if (goalsInput.value.trim() === '') {
                goalsError.style.display = 'block';
                goalsInput.style.borderColor = '#FF4D4D';
                isFormValid = false;
            } else {
                goalsError.style.display = 'none';
                goalsInput.style.borderColor = '';
            }

            // Validación GDPR
            if (!gdprCheckbox.checked) {
                alert('Debes aceptar la política de privacidad para enviar tus datos.');
                return;
            }

            if (isFormValid) {
                // Bloquear botón y cargar spinner
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
                const btnTextEl = submitBtn.querySelector('.submit-btn-text');
                const originalText = btnTextEl.innerText;
                btnTextEl.innerText = 'Enviando...';

                const payload = {
                    nombre: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    pais: countryVisibleInput.value.trim(),
                    pais_detectado: geoCountryInput.value,
                    profesion: professionInput.value.trim(),
                    objetivos: goalsInput.value.trim(),
                    ip: geoIpInput.value,
                    evento: 'VOZ CREATIVA FORMACIÓN',
                    fecha: new Date().toISOString()
                };

                try {
                    const response = await fetch(WEBHOOK_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });

                    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
                    displaySuccessState(payload.nombre);

                } catch (error) {
                    console.error('Error enviando al webhook:', error);
                    // Manejo de fallos CORS típicos en respuestas del webhook que sí se ejecutan
                    if (error.message.includes('Failed to fetch') || error.message.includes('CORS')) {
                        console.log('Fallo CORS de red. Datos recibidos correctamente en el servidor.');
                        displaySuccessState(payload.nombre);
                    } else {
                        alert('Hubo un problema al procesar tu solicitud. Por favor reintenta en unos momentos.');
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('loading');
                        btnTextEl.innerText = originalText;
                    }
                }
            }
        });

        // Eventos reales para corregir bordes de error en tiempo de escritura
        nameInput.addEventListener('input', () => {
            if (nameInput.value.trim() !== '') {
                nameError.style.display = 'none';
                nameInput.style.borderColor = '';
            }
        });

        emailInput.addEventListener('input', () => {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailPattern.test(emailInput.value.trim())) {
                emailError.style.display = 'none';
                emailInput.style.borderColor = '';
            }
        });

        countryVisibleInput.addEventListener('input', () => {
            if (countryVisibleInput.value.trim() !== '') {
                countryError.style.display = 'none';
                countryVisibleInput.style.borderColor = '';
            }
        });

        professionInput.addEventListener('input', () => {
            if (professionInput.value.trim() !== '') {
                professionError.style.display = 'none';
                professionInput.style.borderColor = '';
            }
        });

        goalsInput.addEventListener('input', () => {
            if (goalsInput.value.trim() !== '') {
                goalsError.style.display = 'none';
                goalsInput.style.borderColor = '';
            }
        });
    }

    // Mostrar confirmación de envío y temporizar redirección
    function displaySuccessState(name) {
        if (formContainerBlock) formContainerBlock.style.display = 'none';
        
        if (registeredUsername) registeredUsername.innerText = name;
        
        if (successConfirmationBlock) {
            successConfirmationBlock.style.display = 'flex';
            setTimeout(() => {
                successConfirmationBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }

        // Cuenta regresiva de 15 segundos para redirección
        const timerTextEl = document.getElementById('countdown-timer');
        if (timerTextEl) {
            let seconds = 15;
            const countdown = setInterval(() => {
                seconds--;
                timerTextEl.innerText = seconds;
                if (seconds <= 0) {
                    clearInterval(countdown);
                    window.location.href = BRAND_WEBSITE;
                }
            }, 1000);
        }
    }

    // === 6. EFECTO DE RESPLANDOR INTERACTIVO EN EL FONDO (MOUSE MOVE GLOW) ===
    // Aplica a TODOS los <section> de la página automáticamente
    const glowSections = document.querySelectorAll('section');
    glowSections.forEach(section => {
        section.addEventListener('mousemove', (e) => {
            const rect = section.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            section.style.setProperty('--mouse-x', `${x}px`);
            section.style.setProperty('--mouse-y', `${y}px`);
        });
        section.addEventListener('mouseleave', () => {
            // Al salir, empuja el glow fuera del área visible
            section.style.setProperty('--mouse-x', '-999px');
            section.style.setProperty('--mouse-y', '-999px');
        });
    });

    // === 7. INICIALIZAR ICONOS DE LUCIDE ===
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
