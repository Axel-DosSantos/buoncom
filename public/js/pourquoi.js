// ============================================
// POURQUOI.JS - Animations page Pourquoi choisir La Buon'Com
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // ANIMATIONS GSAP
    // ============================================
    
    // Animation du hero
    gsap.from('.pourquoi-hero h1', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
    });

    gsap.from('.pourquoi-hero .intro-text', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.5,
        stagger: 0.2
    });

    gsap.from('.pourquoi-hero .highlight-promise', {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 1
    });

    // Stickers hero
    gsap.from('.hero-sticker-pourquoi', {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.2,
        delay: 0.8
    });

    // ============================================
    // SECTIONS AU SCROLL
    // ============================================
    
    // Simplicité section
    gsap.from('.simplicity-section h2', {
        scrollTrigger: {
            trigger: '.simplicity-section',
            start: 'top 80%'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.simplicity-section p', {
        scrollTrigger: {
            trigger: '.simplicity-section',
            start: 'top 80%'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.3
    });

    gsap.from('.simplicity-highlight', {
        scrollTrigger: {
            trigger: '.simplicity-highlight',
            start: 'top 85%'
        },
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Prestations carte
    gsap.from('.carte-header', {
        scrollTrigger: {
            trigger: '.carte-prestations-section',
            start: 'top 75%'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.presta-card-large', {
        scrollTrigger: {
            trigger: '.prestations-asymmetric',
            start: 'top 75%'
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Juste prix
    gsap.from('.prix-content h2', {
        scrollTrigger: {
            trigger: '.juste-prix-section',
            start: 'top 75%'
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.prix-content p', {
        scrollTrigger: {
            trigger: '.juste-prix-section',
            start: 'top 75%'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.3
    });

    gsap.from('.prix-ticket', {
        scrollTrigger: {
            trigger: '.juste-prix-section',
            start: 'top 75%'
        },
        opacity: 0,
        scale: 0.8,
        rotate: -10,
        duration: 1,
        ease: 'back.out(1.7)'
    });

    // Pédagogie
    gsap.from('.pedagogie-section h2', {
        scrollTrigger: {
            trigger: '.pedagogie-section',
            start: 'top 75%'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.pedagogie-section p', {
        scrollTrigger: {
            trigger: '.pedagogie-section',
            start: 'top 75%'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.3
    });

    gsap.from('.pedagogie-cta-box', {
        scrollTrigger: {
            trigger: '.pedagogie-cta-box',
            start: 'top 85%'
        },
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: 'back.out(1.7)'
    });

    // Expertise card
    gsap.from('.expertise-card', {
        scrollTrigger: {
            trigger: '.expertise-section',
            start: 'top 70%'
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out'
    });

    // Local badges
    gsap.from('.local-text-content h2', {
        scrollTrigger: {
            trigger: '.local-pourquoi-section',
            start: 'top 75%'
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.local-text-content p', {
        scrollTrigger: {
            trigger: '.local-pourquoi-section',
            start: 'top 75%'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.3
    });

    gsap.from('.location-card', {
        scrollTrigger: {
            trigger: '.local-badges-visual',
            start: 'top 80%'
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Conclusion
    gsap.from('.conclusion-card', {
        scrollTrigger: {
            trigger: '.conclusion-section',
            start: 'top 70%'
        },
        opacity: 0,
        scale: 0.9,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.conclusion-sticker', {
        scrollTrigger: {
            trigger: '.conclusion-section',
            start: 'top 70%'
        },
        opacity: 0,
        scale: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        delay: 0.6
    });

    // ============================================
    // SMOOTH SCROLL POUR LES ANCRES
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 100
                    },
                    ease: 'power3.inOut'
                });
            }
        });
    });

    console.log('✅ Animations pourquoi.js chargées');
});