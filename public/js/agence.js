// ============================================
// AGENCE.JS - Animations pour la page Qui sommes-nous
// Version optimisée pour les performances
// ============================================

// Attendre que tout soit chargé (y compris GSAP en defer)
window.addEventListener('load', () => {

    // Vérifier si GSAP est disponible
    if (typeof gsap === 'undefined') {
        console.warn('GSAP non chargé, animations désactivées');
        // Afficher les éléments sans animation
        document.querySelectorAll('.base-card').forEach(card => card.classList.add('visible'));
        return;
    }

    // Vérifier si l'utilisateur préfère les animations réduites
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Configuration GSAP pour de meilleures performances
    gsap.config({ force3D: true });

    // ============================================
    // ANIMATIONS GSAP (simplifiées)
    // ============================================

    if (!prefersReducedMotion) {
        // Animation du hero title
        gsap.from('.hero-title', {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: 'power2.out'
        });

        gsap.from('.hero-subtitle', {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.2
        });

        // Animation des stickers flottants (réduite)
        gsap.from('.floating-sticker', {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.3
        });
    }

    // ============================================
    // BASES CARDS - Apparition en cascade au scroll
    // ============================================
    const baseCards = document.querySelectorAll('.base-card');

    if (prefersReducedMotion) {
        // Afficher directement sans animation
        baseCards.forEach(card => card.classList.add('visible'));
    } else {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const baseCardsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = parseFloat(entry.target.dataset.delay) || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay * 500); // Réduit de 1000 à 500ms
                    baseCardsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        baseCards.forEach(card => {
            baseCardsObserver.observe(card);
        });
    }

    // ============================================
    // SECTION ANIMATIONS AU SCROLL (Optimisées)
    // ============================================

    // Vérifier que ScrollTrigger est disponible
    if (!prefersReducedMotion && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Configuration commune pour ScrollTrigger
        const scrollConfig = { start: 'top 85%', once: true };

        // Mission section
        gsap.from('.mission-section .section-title-center, .mission-section p', {
            scrollTrigger: { trigger: '.mission-section', ...scrollConfig },
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1
        });

        // Why section
        gsap.from('.why-content h2, .why-content > p', {
            scrollTrigger: { trigger: '.why-section', ...scrollConfig },
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1
        });

        gsap.from('.deco-main', {
            scrollTrigger: { trigger: '.why-visual', ...scrollConfig },
            opacity: 0,
            scale: 0.8,
            duration: 0.6
        });

        // Problem card
        gsap.from('.problem-card', {
            scrollTrigger: { trigger: '.problem-section', ...scrollConfig },
            opacity: 0,
            y: 30,
            duration: 0.6
        });

        // Prestations cards
        gsap.from('.presta-card', {
            scrollTrigger: { trigger: '.carte-section', ...scrollConfig },
            opacity: 0,
            y: 30,
            duration: 0.4,
            stagger: 0.1
        });

        // Local section
        gsap.from('.local-text h2, .local-text p', {
            scrollTrigger: { trigger: '.local-section', ...scrollConfig },
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1
        });

        gsap.from('.location-badge, .leaflet-map-container', {
            scrollTrigger: { trigger: '.local-visual', ...scrollConfig },
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.15
        });

        // Final CTA
        gsap.from('.final-cta-card', {
            scrollTrigger: { trigger: '.final-cta-section', ...scrollConfig },
            opacity: 0,
            y: 30,
            duration: 0.6
        });
    }

    // ============================================
    // SMOOTH SCROLL POUR LES ANCRES (natif, plus performant)
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: prefersReducedMotion ? 'auto' : 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    console.log('✅ Animations agence.js chargées (optimisé)');
});