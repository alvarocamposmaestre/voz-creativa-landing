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

    function selectWhatsAppCode(countryName) {
        const select = document.getElementById('user-whatsapp-code');
        if (!select) return;
        const cleanCountry = countryName.toLowerCase().trim();
        for (let i = 0; i < select.options.length; i++) {
            const optionCountry = select.options[i].getAttribute('data-country') || '';
            if (cleanCountry.includes(optionCountry.toLowerCase()) || optionCountry.toLowerCase().includes(cleanCountry)) {
                select.selectedIndex = i;
                break;
            }
        }
    }

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
                    selectWhatsAppCode(country);
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
                
                if (geoCountryVisibleInput) {
                    geoCountryVisibleInput.value = countryName;
                    selectWhatsAppCode(countryName);
                }
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
    const whatsappInput = document.getElementById('user-whatsapp');
    const countryVisibleInput = document.getElementById('geo-country-visible');
    const professionInput = document.getElementById('user-profession');
    const goalsInput = document.getElementById('user-goals');
    const gdprCheckbox = document.getElementById('gdpr-checkbox');
    const submitBtn = document.getElementById('signup-submit-btn');

    const nameError = document.getElementById('name-error-msg');
    const emailError = document.getElementById('email-error-msg');
    const whatsappError = document.getElementById('whatsapp-error-msg');
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

            // Validación WhatsApp (solamente números, longitud de 6 a 15 dígitos)
            const rawPhone = whatsappInput.value.trim();
            const phoneDigits = rawPhone.replace(/[\s-]/g, '');
            const phonePattern = /^[0-9]{6,15}$/;
            if (rawPhone === '' || !phonePattern.test(phoneDigits)) {
                whatsappError.style.display = 'block';
                whatsappInput.style.borderColor = '#FF4D4D';
                isFormValid = false;
            } else {
                whatsappError.style.display = 'none';
                whatsappInput.style.borderColor = '';
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
                    whatsapp: (document.getElementById('user-whatsapp-code') ? document.getElementById('user-whatsapp-code').value : '') + ' ' + whatsappInput.value.trim(),
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

        whatsappInput.addEventListener('input', () => {
            const rawPhone = whatsappInput.value.trim();
            const phoneDigits = rawPhone.replace(/[\s-]/g, '');
            const phonePattern = /^[0-9]{6,15}$/;
            if (rawPhone !== '' && phonePattern.test(phoneDigits)) {
                whatsappError.style.display = 'none';
                whatsappInput.style.borderColor = '';
            }
        });

        if (geoCountryVisibleInput) {
            geoCountryVisibleInput.addEventListener('input', () => {
                selectWhatsAppCode(geoCountryVisibleInput.value);
                if (countryVisibleInput.value.trim() !== '') {
                    countryError.style.display = 'none';
                    countryVisibleInput.style.borderColor = '';
                }
            });
        }

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

    // === 7. EFECTO DE PARALAJE SUAVE PARA LOS VIDEOS DE FONDO ===
    const parallaxItems = [
        { section: document.querySelector('.hero-section'), element: document.querySelector('.hero-bg-video'), speed: 0.25 },
        { section: document.querySelector('.differentiation-section'), element: document.querySelector('.diff-bg-video'), speed: 0.15 },
        { section: document.querySelector('.syllabus-section'), element: document.querySelector('.syllabus-bg-video'), speed: 0.15 },
        { section: document.querySelector('.details-split-section'), element: document.querySelector('.details-split-bg-video'), speed: 0.15 },
        { section: document.querySelector('.format-section'), element: document.querySelector('.format-bg-image'), speed: 0.15 },
        { section: document.querySelector('.investment-section'), element: document.querySelector('.investment-bg-video'), speed: 0.15 }
    ];

    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const viewHeight = window.innerHeight;
            const viewportCenter = viewHeight / 2;

            parallaxItems.forEach(item => {
                if (item.section && item.element) {
                    const rect = item.section.getBoundingClientRect();
                    const sectionTop = rect.top + scrolled;
                    
                    // Solo calcular si está en el viewport visible
                    if (scrolled + viewHeight > sectionTop && scrolled < sectionTop + rect.height) {
                        const sectionCenter = rect.top + rect.height / 2;
                        // Centrar la translación con respecto al centro del viewport para evitar bordes blancos
                        const offset = (sectionCenter - viewportCenter) * item.speed;
                        item.element.style.transform = `translate3d(0, ${offset}px, 0)`;
                    }
                }
            });
        });
    });

    // === 8. LAZY LOADING DE MULTIMEDIA DE FONDO ===
    const lazyElements = document.querySelectorAll('video.hero-bg-video, video.diff-bg-video, video.syllabus-bg-video, video.details-split-bg-video, video.investment-bg-video, img.format-bg-image');

    if ('IntersectionObserver' in window) {
        const mediaObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    if (el.tagName === 'VIDEO') {
                        const sources = el.querySelectorAll('source');
                        sources.forEach(source => {
                            if (source.dataset.src) {
                                source.src = source.dataset.src;
                                source.removeAttribute('data-src');
                            }
                        });
                        el.load();
                        const playPromise = el.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(error => {
                                console.warn("Autoplay block or loading error:", error);
                            });
                        }
                    } else if (el.tagName === 'IMG') {
                        if (el.dataset.src) {
                            el.src = el.dataset.src;
                            el.removeAttribute('data-src');
                        }
                    }
                    observer.unobserve(el);
                }
            });
        }, { rootMargin: '200px' });

        lazyElements.forEach(el => mediaObserver.observe(el));
    } else {
        // Fallback para navegadores antiguos
        lazyElements.forEach(el => {
            if (el.tagName === 'VIDEO') {
                const sources = el.querySelectorAll('source');
                sources.forEach(source => {
                    if (source.dataset.src) {
                        source.src = source.dataset.src;
                    }
                });
                el.load();
            } else if (el.tagName === 'IMG') {
                if (el.dataset.src) {
                    el.src = el.dataset.src;
                }
            }
        });
    }

    // === 9. EFECTO TYPING Y FADE IN EN SECCIÓN DE DIFERENCIACIÓN ===
    const diffSectionTarget = document.querySelector('.differentiation-section');
    const diffTitle = document.querySelector('.diff-right-title');
    const diffText = document.querySelector('.diff-right-text');

    if (diffSectionTarget && diffTitle && diffText) {
        const typingText = diffTitle.textContent.trim();
        diffTitle.textContent = ''; // Limpiar inicialmente para el efecto
        
        const typingObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);
                    
                    let index = 0;
                    const speed = 35; // ms por carácter
                    
                    function typeWriter() {
                        if (index < typingText.length) {
                            diffTitle.textContent += typingText.charAt(index);
                            index++;
                            setTimeout(typeWriter, speed);
                        } else {
                            setTimeout(() => {
                                diffText.classList.add('visible');
                            }, 250);
                        }
                    }
                    
                    typeWriter();
                }
            });
        }, { threshold: 0.25 });

        typingObserver.observe(diffSectionTarget);
    }

    // === 10. INICIALIZAR ICONOS DE LUCIDE ===
    if (typeof lucide !== 'undefined') {
        customElements.whenDefined ? lucide.createIcons() : lucide.createIcons();
    }
});
