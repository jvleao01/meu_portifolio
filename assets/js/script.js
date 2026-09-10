// Interatividade & Animações do Portfólio

document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
    const header = document.querySelector('.header');

    // --- MENU MOBILE TOGGLE ---
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });
    }

    // --- NAVEGAÇÃO RÁPIDA E SUAVE COM EFEITO DE ROLAGEM DINÂMICA ---
    function smoothScrollTo(targetEl, duration = 650) {
        const headerHeight = header ? header.offsetHeight : 70;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        // Efeito de aceleração e desaceleração rápida e suave (easeInOutCubic)
        function easeInOutCubic(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                window.scrollTo(0, targetPosition);
            }
        }

        requestAnimationFrame(animation);
    }

    allAnchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Verifica se é um ID interno da página
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();

                    // Fechar menu mobile ao clicar
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        if (mobileToggle) {
                            const icon = mobileToggle.querySelector('i');
                            if (icon) {
                                icon.classList.add('fa-bars');
                                icon.classList.remove('fa-xmark');
                            }
                        }
                    }

                    // Navega rapidamente de maneira extremamente fluida
                    smoothScrollTo(targetElement, 600);
                }
            }
        });
    });

    // --- DESTACAR ITEM DA NAVBAR ATIVO ---
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActive() {
        const scrollY = window.pageYOffset;
        const headerHeight = header ? header.offsetHeight : 70;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - headerHeight - 80;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });

        // Modifica a barra superior durante a rolagem
        if (header) {
            if (scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }
    }

    window.addEventListener('scroll', scrollActive);
    scrollActive();

    // --- ANIMAÇÃO DE REVELAÇÃO AO ROLAR (SCROLL REVEAL) ---
    const revealElements = document.querySelectorAll(
        '.section-header, .hero-content, .hero-image-wrapper, .about-image-wrapper, .about-content, .university-content, .university-image-wrapper, .service-card, .skill-card, .project-card, .contact-card, .contact-socials'
    );

    revealElements.forEach(el => el.classList.add('reveal-on-scroll'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
});
