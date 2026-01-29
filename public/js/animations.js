/**
 * La Buon'Com - Animations GSAP 
 * 
 */

// Enregistrer les plugins GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ============================================
// CONFIGURATION GLOBALE
// ============================================
const CONFIG = {
    ease: {
        smooth: "power3.out",
        bounce: "elastic.out(1, 0.5)",
        snap: "power4.out",
        slowMo: "slow(0.7, 0.7, false)"
    },
    duration: {
        fast: 0.4,
        normal: 0.8,
        slow: 1.2,
        verySlow: 2
    }
};

// ============================================
// LOADER / PRELOADER
// ============================================
class Preloader {
    constructor() {
        this.init();
    }

    init() {
        // Créer le preloader
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = `
            <div class="preloader-content">
                <div class="preloader-logo">La Buon'<span>C</span>om</div>
                <div class="preloader-bar">
                    <div class="preloader-progress"></div>
                </div>
                <div class="preloader-text">Préparation des ingrédients...</div>
            </div>
        `;
        document.body.prepend(preloader);

        // Animation du preloader
        const tl = gsap.timeline();

        tl.to('.preloader-progress', {
            width: '100%',
            duration: 1.5,
            ease: CONFIG.ease.smooth
        })
        .to('.preloader-text', {
            opacity: 0,
            duration: 0.3
        })
        .to('.preloader-logo', {
            scale: 1.2,
            duration: 0.3
        })
        .to('.preloader-logo', {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in"
        })
        .to('.preloader', {
            yPercent: -100,
            duration: 1,
            ease: CONFIG.ease.snap,
            onComplete: () => {
                preloader.remove();
                this.startPageAnimations();
            }
        });
    }

    startPageAnimations() {
        // Déclencher les animations de la page
        document.body.classList.add('loaded');
        window.dispatchEvent(new Event('preloaderComplete'));
    }
}

// ============================================
// CURSEUR PERSONNALISÉ
// ============================================
class CustomCursor {
    constructor() {
        this.cursor = null;
        this.cursorFollower = null;
        this.cursorText = null;
        this.init();
    }

    init() {
        // Créer les éléments du curseur
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';

        this.cursorFollower = document.createElement('div');
        this.cursorFollower.className = 'custom-cursor-follower';

        this.cursorText = document.createElement('div');
        this.cursorText.className = 'custom-cursor-text';
        this.cursorFollower.appendChild(this.cursorText);

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorFollower);

        this.bindEvents();
    }

    bindEvents() {
        // Suivre la souris
        document.addEventListener('mousemove', (e) => {
            gsap.to(this.cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });

            gsap.to(this.cursorFollower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3
            });
        });

        // Effet sur les liens
        document.querySelectorAll('a, button, .service-card, .concept-card, .testimonial-card').forEach(el => {
            el.addEventListener('mouseenter', () => this.onHover(el));
            el.addEventListener('mouseleave', () => this.onLeave());
        });

        // Effet sur les boutons CTA
        document.querySelectorAll('.btn-primary, .btn-secondary, .btn-cta').forEach(el => {
            el.addEventListener('mouseenter', () => this.onButtonHover());
            el.addEventListener('mouseleave', () => this.onLeave());
        });

        // Effet magnétique sur les boutons
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
            btn.addEventListener('mousemove', (e) => this.magnetEffect(e, btn));
            btn.addEventListener('mouseleave', (e) => this.resetMagnet(btn));
        });
    }

    onHover(el) {
        gsap.to(this.cursor, {
            scale: 0,
            duration: 0.3
        });
        gsap.to(this.cursorFollower, {
            scale: 2,
            backgroundColor: 'rgba(218, 77, 27, 0.1)',
            borderColor: 'var(--rouge-tomate)',
            duration: 0.3
        });
    }

    onButtonHover() {
        gsap.to(this.cursor, {
            scale: 0,
            duration: 0.3
        });
        gsap.to(this.cursorFollower, {
            scale: 3,
            backgroundColor: 'rgba(34, 93, 46, 0.1)',
            borderColor: 'var(--vert-percil)',
            duration: 0.3
        });
        this.cursorText.textContent = 'Click';
        gsap.to(this.cursorText, { opacity: 1, duration: 0.3 });
    }

    onLeave() {
        gsap.to(this.cursor, {
            scale: 1,
            duration: 0.3
        });
        gsap.to(this.cursorFollower, {
            scale: 1,
            backgroundColor: 'transparent',
            borderColor: 'var(--vert-percil)',
            duration: 0.3
        });
        gsap.to(this.cursorText, { opacity: 0, duration: 0.3 });
    }

    magnetEffect(e, btn) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: CONFIG.ease.smooth
        });
    }

    resetMagnet(btn) {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: CONFIG.ease.bounce
        });
    }
}

// ============================================
// ANIMATIONS HERO
// ============================================
class HeroAnimations {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('preloaderComplete', () => {
            this.animateHero();
        });
    }

    animateHero() {
        const tl = gsap.timeline({ defaults: { ease: CONFIG.ease.smooth } });

        // Animation du label
        tl.from('.hero-label', {
            y: 30,
            opacity: 0,
            duration: CONFIG.duration.normal
        })

        // Animation du titre avec effet de révélation
        .from('.hero-title', {
            y: 100,
            opacity: 0,
            duration: CONFIG.duration.slow,
            ease: CONFIG.ease.snap
        }, "-=0.4")

        // Animation du sous-titre
        .from('.hero-subtitle', {
            y: 50,
            opacity: 0,
            duration: CONFIG.duration.normal
        }, "-=0.6")

        // Animation des boutons CTA avec rebond
        .from('.hero-ctas .btn-primary', {
            scale: 0,
            rotation: -10,
            duration: CONFIG.duration.normal,
            ease: CONFIG.ease.bounce
        }, "-=0.4")

        .from('.hero-ctas .btn-secondary', {
            scale: 0,
            rotation: 10,
            duration: CONFIG.duration.normal,
            ease: CONFIG.ease.bounce
        }, "-=0.6")

        // Animation de la décoration hero
        .from('.hero-decoration', {
            scale: 0,
            rotation: 180,
            duration: CONFIG.duration.slow,
            ease: CONFIG.ease.bounce
        }, "-=0.8");

        // Animations des stickers flottants
        this.animateStickers();
    }

    animateStickers() {
        // Animation aléatoire pour chaque sticker
        document.querySelectorAll('.sticker').forEach((sticker, index) => {
            gsap.to(sticker, {
                y: "random(-30, 30)",
                x: "random(-20, 20)",
                rotation: "random(-15, 15)",
                duration: "random(3, 6)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.2
            });
        });
    }
}

// ============================================
// ANIMATIONS AU SCROLL
// ============================================
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.animateSections();
        this.animateServiceCards();
        this.animateConceptSection();
        this.animateTestimonials();
        this.animateCTA();
        this.animateParallax();
        this.animateTextReveal();
    }

    animateSections() {
        // Animation des headers de section
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header.querySelector('.section-label'), {
                scrollTrigger: {
                    trigger: header,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                x: -50,
                opacity: 0,
                duration: CONFIG.duration.normal,
                ease: CONFIG.ease.smooth
            });

            gsap.from(header.querySelector('h2'), {
                scrollTrigger: {
                    trigger: header,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: CONFIG.duration.normal,
                delay: 0.2,
                ease: CONFIG.ease.smooth
            });

            if (header.querySelector('p')) {
                gsap.from(header.querySelector('p'), {
                    scrollTrigger: {
                        trigger: header,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    },
                    y: 30,
                    opacity: 0,
                    duration: CONFIG.duration.normal,
                    delay: 0.4,
                    ease: CONFIG.ease.smooth
                });
            }
        });
    }

    animateServiceCards() {
        const cards = gsap.utils.toArray('.service-card');

        cards.forEach((card, index) => {
            // Animation d'entrée
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 100,
                opacity: 0,
                rotation: index % 2 === 0 ? -5 : 5,
                scale: 0.8,
                duration: CONFIG.duration.normal,
                delay: index * 0.15,
                ease: CONFIG.ease.smooth
            });

            // Animation de l'icône
            gsap.from(card.querySelector('.service-icon'), {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                scale: 0,
                rotation: 360,
                duration: CONFIG.duration.slow,
                delay: index * 0.15 + 0.3,
                ease: CONFIG.ease.bounce
            });

            // Effet 3D au hover
            card.addEventListener('mousemove', (e) => this.tiltCard(e, card));
            card.addEventListener('mouseleave', () => this.resetTilt(card));
        });
    }

    tiltCard(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 1000,
            duration: 0.3,
            ease: CONFIG.ease.smooth
        });
    }

    resetTilt(card) {
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: CONFIG.ease.bounce
        });
    }

    animateConceptSection() {
        // Animation du texte concept
        gsap.from('.concept-text', {
            scrollTrigger: {
                trigger: '.concept',
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            x: -100,
            opacity: 0,
            duration: CONFIG.duration.slow,
            ease: CONFIG.ease.smooth
        });

        // Animation des cartes concept avec stagger
        gsap.from('.concept-card', {
            scrollTrigger: {
                trigger: '.concept-visual',
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            x: 100,
            opacity: 0,
            stagger: 0.2,
            duration: CONFIG.duration.normal,
            ease: CONFIG.ease.smooth
        });

        // Animation des emojis
        gsap.utils.toArray('.concept-emoji').forEach((emoji, index) => {
            gsap.from(emoji, {
                scrollTrigger: {
                    trigger: emoji,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                scale: 0,
                rotation: -180,
                duration: CONFIG.duration.normal,
                delay: index * 0.2,
                ease: CONFIG.ease.bounce
            });
        });

        // Animation des items de liste
        gsap.from('.concept-list li', {
            scrollTrigger: {
                trigger: '.concept-list',
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            x: -50,
            opacity: 0,
            stagger: 0.15,
            duration: CONFIG.duration.normal,
            ease: CONFIG.ease.smooth
        });
    }

    animateTestimonials() {
        const testimonials = gsap.utils.toArray('.testimonial-card');

        testimonials.forEach((card, index) => {
            // Effet flip à l'entrée
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                rotationY: 90,
                opacity: 0,
                duration: CONFIG.duration.slow,
                delay: index * 0.2,
                ease: CONFIG.ease.smooth
            });

            // Animation des étoiles
            gsap.from(card.querySelector('.testimonial-stars'), {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                scale: 0,
                duration: CONFIG.duration.normal,
                delay: index * 0.2 + 0.3,
                ease: CONFIG.ease.bounce
            });
        });
    }

    animateCTA() {
        // Animation du contenu CTA
        gsap.from('.cta-content h2', {
            scrollTrigger: {
                trigger: '.cta-section',
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: CONFIG.duration.normal,
            ease: CONFIG.ease.smooth
        });

        gsap.from('.cta-content p', {
            scrollTrigger: {
                trigger: '.cta-section',
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: CONFIG.duration.normal,
            delay: 0.2,
            ease: CONFIG.ease.smooth
        });

        gsap.from('.cta-section .btn-primary', {
            scrollTrigger: {
                trigger: '.cta-section',
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            scale: 0,
            duration: CONFIG.duration.normal,
            delay: 0.4,
            ease: CONFIG.ease.bounce
        });
    }

    animateParallax() {
        // Parallax sur les stickers
        gsap.utils.toArray('.sticker').forEach(sticker => {
            gsap.to(sticker, {
                scrollTrigger: {
                    trigger: sticker.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                },
                y: -100,
                ease: "none"
            });
        });

        // Parallax sur le hero pattern
        gsap.to('.hero-pattern', {
            scrollTrigger: {
                trigger: '.hero',
                start: "top top",
                end: "bottom top",
                scrub: 1
            },
            y: 200,
            ease: "none"
        });
    }

    animateTextReveal() {
        // Animation de révélation pour les titres h2
        gsap.utils.toArray('h2').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                clipPath: "inset(100% 0% 0% 0%)",
                y: 50,
                duration: CONFIG.duration.slow,
                ease: CONFIG.ease.snap
            });
        });
    }
}

// ============================================
// ANIMATIONS HEADER
// ============================================
class HeaderAnimations {
    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }

    init() {
        this.scrollEffect();
        this.logoAnimation();
        this.navLinksAnimation();
    }

    scrollEffect() {
        let lastScrollY = 0;

        ScrollTrigger.create({
            start: "top -80",
            onUpdate: (self) => {
                const scrollY = window.scrollY;

                if (scrollY > lastScrollY && scrollY > 200) {
                    // Scrolling down
                    gsap.to(this.header, {
                        y: -100,
                        duration: 0.3,
                        ease: CONFIG.ease.smooth
                    });
                } else {
                    // Scrolling up
                    gsap.to(this.header, {
                        y: 0,
                        duration: 0.3,
                        ease: CONFIG.ease.smooth
                    });
                }

                lastScrollY = scrollY;
            }
        });

        // Shrink effect
        ScrollTrigger.create({
            start: "top -50",
            onEnter: () => {
                gsap.to(this.header, {
                    padding: "0.5rem 0",
                    duration: 0.3
                });
            },
            onLeaveBack: () => {
                gsap.to(this.header, {
                    padding: "0",
                    duration: 0.3
                });
            }
        });
    }

    logoAnimation() {
        const logo = document.querySelector('.logo');

        logo.addEventListener('mouseenter', () => {
            gsap.to(logo, {
                scale: 1.05,
                duration: 0.3,
                ease: CONFIG.ease.bounce
            });
            gsap.to('.logo-highlight', {
                rotation: 10,
                scale: 1.2,
                duration: 0.3,
                ease: CONFIG.ease.bounce
            });
        });

        logo.addEventListener('mouseleave', () => {
            gsap.to(logo, {
                scale: 1,
                duration: 0.3,
                ease: CONFIG.ease.smooth
            });
            gsap.to('.logo-highlight', {
                rotation: 0,
                scale: 1,
                duration: 0.3,
                ease: CONFIG.ease.smooth
            });
        });
    }

    navLinksAnimation() {
        const links = document.querySelectorAll('.nav-menu a:not(.btn-cta)');

        links.forEach(link => {
            // Créer l'élément de soulignement
            const underline = document.createElement('span');
            underline.className = 'nav-underline';
            link.style.position = 'relative';
            link.appendChild(underline);

            link.addEventListener('mouseenter', () => {
                gsap.to(underline, {
                    width: '100%',
                    duration: 0.3,
                    ease: CONFIG.ease.smooth
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(underline, {
                    width: '0%',
                    duration: 0.3,
                    ease: CONFIG.ease.smooth
                });
            });
        });
    }
}

// ============================================
// EFFET SMOOTH SCROLL
// ============================================
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Smooth scroll pour les ancres
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));

                if (target) {
                    gsap.to(window, {
                        scrollTo: {
                            y: target,
                            offsetY: 80
                        },
                        duration: 1,
                        ease: CONFIG.ease.smooth
                    });
                }
            });
        });
    }
}

// ============================================
// ANIMATIONS FOOTER
// ============================================
class FooterAnimations {
    constructor() {
        this.init();
    }

    init() {
        gsap.from('.footer-column', {
            scrollTrigger: {
                trigger: '.footer',
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            stagger: 0.15,
            duration: CONFIG.duration.normal,
            ease: CONFIG.ease.smooth
        });

        gsap.from('.footer-logo', {
            scrollTrigger: {
                trigger: '.footer',
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            scale: 0.8,
            opacity: 0,
            duration: CONFIG.duration.normal,
            ease: CONFIG.ease.bounce
        });
    }
}

// ============================================
// EFFET DE RÉVÉLATION AU SCROLL
// ============================================
class RevealOnScroll {
    constructor() {
        this.init();
    }

    init() {
        // Ajouter la classe reveal à tous les éléments à animer
        const elements = document.querySelectorAll(
            '.service-card, .concept-card, .testimonial-card, .section-header'
        );

        elements.forEach(el => {
            el.classList.add('reveal');
        });
    }
}

// ============================================
// PATTERN DIVIDER ANIMATION
// ============================================
class PatternAnimation {
    constructor() {
        this.init();
    }

    init() {
        gsap.utils.toArray('.pattern-divider').forEach(divider => {
            gsap.to(divider, {
                scrollTrigger: {
                    trigger: divider,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                },
                backgroundPosition: "200px 100px",
                ease: "none"
            });
        });
    }
}

// ============================================
// TEXTE ANIMÉ (Scramble Effect)
// ============================================
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// ============================================
// INITIALISATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si on est sur mobile pour le curseur
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Initialiser le preloader
    new Preloader();

    // Initialiser le curseur personnalisé (desktop uniquement)
    if (!isMobile) {
        new CustomCursor();
        document.body.classList.add('custom-cursor-enabled');
    }

    // Initialiser les animations après le preloader
    window.addEventListener('preloaderComplete', () => {
        new HeroAnimations();
        new ScrollAnimations();
        new HeaderAnimations();
        new FooterAnimations();
        new RevealOnScroll();
        new PatternAnimation();
    });
});

// ============================================
// UTILITAIRES
// ============================================

// Fonction pour ajouter des délais aléatoires
function randomDelay(min = 0, max = 0.5) {
    return Math.random() * (max - min) + min;
}

// Fonction pour créer des animations de rebond
function createBounceAnimation(element, options = {}) {
    const defaults = {
        scale: 1.1,
        duration: 0.3,
        ease: CONFIG.ease.bounce
    };

    const settings = { ...defaults, ...options };

    element.addEventListener('mouseenter', () => {
        gsap.to(element, {
            scale: settings.scale,
            duration: settings.duration,
            ease: settings.ease
        });
    });

    element.addEventListener('mouseleave', () => {
        gsap.to(element, {
            scale: 1,
            duration: settings.duration,
            ease: settings.ease
        });
    });
}
