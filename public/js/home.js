// ========================================
// HOME.JS - LA BUON'COM
// JavaScript principal pour la page d'accueil
// ========================================

// ========== VARIABLES GLOBALES ==========
let selectedPack = null;
let selectedExtras = new Set();

// ========== FALLBACK - Cacher le loader après 4 secondes si GSAP non chargé ==========
setTimeout(function() {
    const loader = document.querySelector('.intro-loader');
    if (loader && loader.style.display !== 'none' && typeof gsap === 'undefined') {
        loader.style.transition = 'opacity 0.5s';
        loader.style.opacity = '0';
        setTimeout(function() {
            loader.style.display = 'none';
            document.querySelector('nav').style.transform = 'translateY(0)';
            document.querySelectorAll('.hero-subtitle, .hero h1, .hero-description, .cta-button').forEach(function(el) {
                el.style.opacity = '1';
            });
        }, 500);
    }
}, 4000);

// ========== SYSTÈME DE SÉLECTION (Addition) ==========
function updateTicketDate() {
    const dateEl = document.getElementById('addition-date');
    if (dateEl) {
        const now = new Date();
        dateEl.textContent = now.toLocaleDateString('fr-FR', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }
}

// Initialiser la date
updateTicketDate();
setInterval(updateTicketDate, 60000);

function updateAdditionTicket() {
    const additionContent = document.getElementById('addition-content');
    const footerSection = document.getElementById('addition-footer-section');
    if (!additionContent) return;

    if (!selectedPack) {
        additionContent.innerHTML = '<div class="addition-empty">Sélectionnez un pack pour commencer votre commande...</div>';
        if (footerSection) footerSection.style.display = 'none';
        return;
    }

    // Afficher la section footer avec email et bouton
    if (footerSection) footerSection.style.display = 'block';

    let itemsHtml = '<div class="addition-item" style="animation: slideIn 0.3s ease"><span class="addition-item-name">1x ' + selectedPack.name + '</span></div>';

    let extrasCount = 0;
    selectedExtras.forEach(function(extraId) {
        const extraEl = document.querySelector('.extra-item[data-extra="' + extraId + '"]');
        if (extraEl) {
            const name = extraEl.querySelector('.extra-name').textContent;
            extrasCount++;
            itemsHtml += '<div class="addition-item" style="animation: slideIn 0.3s ease; animation-delay: ' + (extrasCount * 0.1) + 's"><span class="addition-item-name">+ ' + name + '</span></div>';
        }
    });

    additionContent.innerHTML = '<div class="addition-items">' + itemsHtml + '</div>';
}

function initPackCardsSystem() {
    const packCards = document.querySelectorAll('.pack-card');
    const extraItems = document.querySelectorAll('.extra-item');
    const mailBtn = document.getElementById('addition-mail-btn');
    const emailInput = document.getElementById('addition-email');

    // Gestion de la sélection des packs
    packCards.forEach(function(card) {
        card.addEventListener('click', function(e) {
            e.stopPropagation();

            packCards.forEach(function(c) {
                c.classList.remove('selected');
            });
            this.classList.add('selected');

            if (typeof gsap !== 'undefined') {
                gsap.fromTo(this, 
                    { scale: 1 }, 
                    { scale: 1.02, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }
                );
            }

            selectedPack = {
                name: this.querySelector('.pack-name').textContent
            };
            updateAdditionTicket();
        });
    });

    // Gestion de la sélection des extras
    extraItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            const extraId = this.dataset.extra;

            if (selectedExtras.has(extraId)) {
                selectedExtras.delete(extraId);
                this.classList.remove('selected');
            } else {
                selectedExtras.add(extraId);
                this.classList.add('selected');
                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(this, 
                        { scale: 1 }, 
                        { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }
                    );
                }
            }
            updateAdditionTicket();
        });
    });

    // Bouton d'envoi email
    if (mailBtn && emailInput) {
        mailBtn.addEventListener('click', function() {
            const email = emailInput.value.trim();

            if (!email || !email.includes('@')) {
                emailInput.style.borderColor = 'var(--rouge-tomate)';
                emailInput.focus();
                return;
            }

            if (!selectedPack) {
                alert('Veuillez sélectionner un pack');
                return;
            }

            // Construire le contenu de l'email
            let emailBody = 'Pack sélectionné: ' + selectedPack.name;
            selectedExtras.forEach(function(extraId) {
                const extraEl = document.querySelector('.extra-item[data-extra="' + extraId + '"]');
                if (extraEl) {
                    const name = extraEl.querySelector('.extra-name').textContent;
                    emailBody += '%0A+ ' + name;
                }
            });
            emailBody += '%0A%0AEmail client: ' + email;

            // Ouvrir le client email
            window.location.href = 'mailto:hello@labuoncom.fr?subject=Demande de devis - ' + selectedPack.name + '&body=' + emailBody;
        });

        emailInput.addEventListener('input', function() {
            this.style.borderColor = '#ddd';
        });
    }
}

// Initialiser le système de pack-cards
initPackCardsSystem();

// ========== HEADER ADAPTATIF ==========
const nav = document.querySelector('nav');
const darkSections = document.querySelectorAll('.concept-section, .site-footer');

function updateNavStyle() {
    if (!nav) return;

    const scrollPos = window.scrollY;
    const navHeight = nav.offsetHeight;

    // Ajouter le fond quand on scroll
    if (scrollPos > 50) {
        nav.classList.add('nav-scrolled');
        nav.classList.remove('nav-light', 'nav-dark');
    } else {
        nav.classList.remove('nav-scrolled');

        // Détecter si on est sur une section sombre
        let onDarkSection = false;
        darkSections.forEach(function(section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= navHeight && rect.bottom >= navHeight) {
                onDarkSection = true;
            }
        });

        if (onDarkSection) {
            nav.classList.add('nav-light');
            nav.classList.remove('nav-dark');
        } else {
            nav.classList.add('nav-dark');
            nav.classList.remove('nav-light');
        }
    }
}

window.addEventListener('scroll', updateNavStyle);
window.addEventListener('resize', updateNavStyle);
// Initialiser après le loader
setTimeout(updateNavStyle, 100);

// ========== MENU MOBILE ==========
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuItems = document.querySelectorAll('.nav-links > li');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Gestion des sous-menus en mobile
    menuItems.forEach(function(item) {
        const submenu = item.querySelector('.submenu');
        if (submenu) {
            item.querySelector('a').addEventListener('click', function(e) {
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    item.classList.toggle('open');
                }
            });
        }
    });
}

// ========== GSAP ANIMATIONS ==========
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Animation intro
    (function() {
        const introTl = gsap.timeline();

        introTl
            // Animation du logo
            .to('.intro-logo img', {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: 'back.out(1.5)'
            }, 0)

            // Disparition du loader après 0.8s
            .to('.intro-loader', {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.inOut'
            }, 0.8)

            // Masquer le loader
            .set('.intro-loader', { display: 'none' })

            // Animations du contenu principal
            .to('nav', { y: 0, duration: 0.5, ease: 'power2.out' })
            .to('.hero h1', { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3')
            .to('.hero-description', { opacity: 1, duration: 0.4 }, '-=0.2')
            .to('.cta-button', { opacity: 1, duration: 0.3 }, '-=0.1');
    })();

    // Animation du scroll indicator
    gsap.to('.scroll-indicator', {
        opacity: 1,
        duration: 1,
        delay: 3.5,
        ease: 'power2.out'
    });

    // Fade out du contenu hero au scroll
    gsap.to('.hero-content', {
        y: -100,
        opacity: 0,
        scrollTrigger: { 
            trigger: '.hero', 
            start: 'top top', 
            end: '50% top', 
            scrub: true 
        }
    });

    gsap.to('.scroll-indicator', {
        opacity: 0,
        scrollTrigger: { 
            trigger: '.hero', 
            start: '10% top', 
            end: '30% top', 
            scrub: true 
        }
    });

    // Bento Grid Animations
    gsap.from('.bento-header h2', {
        scrollTrigger: { 
            trigger: '.bento-header', 
            start: 'top 80%', 
            toggleActions: 'play none none none' 
        },
        opacity: 0, 
        y: 30, 
        duration: 0.6
    });

    gsap.from('.bento-header p', {
        scrollTrigger: { 
            trigger: '.bento-header', 
            start: 'top 80%', 
            toggleActions: 'play none none none' 
        },
        opacity: 0, 
        y: 20, 
        duration: 0.6, 
        delay: 0.2
    });

    // Animation séquentielle des cellules Bento
    gsap.utils.toArray('.bento-item').forEach(function(item, i) {
        const number = item.querySelector('.bento-number');
        const icon = item.querySelector('.bento-icon');
        const title = item.querySelector('.bento-title');
        const desc = item.querySelector('.bento-desc');
        const sticker = item.querySelector('.bento-sticker');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });

        // Animation de la cellule
        tl.from(item, {
            opacity: 0,
            scale: 0.8,
            y: 50,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'back.out(1.4)'
        });

        // Animation du numéro
        if (number) {
            tl.from(number, {
                opacity: 0,
                scale: 0.5,
                duration: 0.4,
                ease: 'back.out(1.5)'
            }, '-=0.3');
        }

        // Animation de l'icône
        if (icon) {
            tl.from(icon, {
                opacity: 0,
                rotation: -20,
                scale: 0.5,
                duration: 0.4,
                ease: 'back.out(1.7)'
            }, '-=0.2');
        }

        // Animation du titre et description
        if (title) {
            tl.from(title, {
                opacity: 0,
                x: -20,
                duration: 0.4
            }, '-=0.2');
        }

        if (desc) {
            tl.from(desc, {
                opacity: 0,
                y: 10,
                duration: 0.4
            }, '-=0.2');
        }

        // Animation du sticker
        if (sticker) {
            tl.from(sticker, {
                opacity: 0,
                scale: 0,
                rotation: -30,
                duration: 0.5,
                ease: 'back.out(2)'
            }, '-=0.3');
        }
    });

    // Showcase animations - Effet masque reveal
    gsap.utils.toArray('.showcase-item').forEach(function(item, i) {
        const reveal = item.querySelector('.showcase-reveal');
        const img = item.querySelector('img');
        const content = item.querySelector('.showcase-content');

        // Couleurs alternées pour les masques
        const colors = ['#225D2E', '#DA4D1B', '#FFC857', '#225D2E'];
        if (reveal) reveal.style.background = colors[i % 4];

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });

        tl.set(img, { scale: 1.3 })
          .set(content, { opacity: 0, y: 30 })
          .fromTo(reveal,
            { x: '-101%' },
            { x: '0%', duration: 0.4, ease: 'power3.inOut', delay: i * 0.08 }
          )
          .to(reveal,
            { x: '101%', duration: 0.4, ease: 'power3.inOut' }
          )
          .to(img,
            { scale: 1, duration: 0.5, ease: 'power2.out' },
            '-=0.4'
          )
          .to(content,
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
            '-=0.3'
          );

        // Hover effects
        item.addEventListener('mouseenter', function() {
            gsap.to(img, { scale: 1.1, duration: 0.6, ease: 'power2.out' });
            gsap.to(content, { y: -10, duration: 0.4, ease: 'power2.out' });
        });
        item.addEventListener('mouseleave', function() {
            gsap.to(img, { scale: 1, duration: 0.6, ease: 'power2.out' });
            gsap.to(content, { y: 0, duration: 0.4, ease: 'power2.out' });
        });
    });

    // Concept animations
    gsap.from('.concept-content', {
        y: 50, 
        opacity: 0,
        scrollTrigger: { 
            trigger: '.concept-section', 
            start: 'top 60%', 
            end: 'center center', 
            scrub: 1 
        }
    });

    // Services animations - Pack Cards
    gsap.from('.services-header h2', {
        scale: 0.5, 
        opacity: 0,
        scrollTrigger: { 
            trigger: '.services-header', 
            start: 'top 70%', 
            end: 'top 50%', 
            scrub: 1 
        }
    });

    // Animation des pack-cards
    gsap.utils.toArray('.pack-card').forEach(function(card, i) {
        gsap.from(card, {
            scrollTrigger: { 
                trigger: card, 
                start: 'top 85%', 
                toggleActions: 'play none none none' 
            },
            opacity: 0, 
            y: 50, 
            duration: 0.6, 
            delay: i * 0.15, 
            ease: 'back.out(1.2)'
        });
    });

    // Animation de la section extras
    gsap.from('.extras-wrapper', {
        scrollTrigger: { 
            trigger: '.extras-wrapper', 
            start: 'top 85%', 
            toggleActions: 'play none none none' 
        },
        opacity: 0, 
        y: 30, 
        duration: 0.6
    });

    // Animation des extra items
    gsap.utils.toArray('.extra-item').forEach(function(item, i) {
        gsap.from(item, {
            scrollTrigger: { 
                trigger: item, 
                start: 'top 90%', 
                toggleActions: 'play none none none' 
            },
            opacity: 0, 
            x: -30, 
            duration: 0.4, 
            delay: i * 0.1, 
            ease: 'power2.out'
        });
    });

    // Animation de l'addition
    gsap.from('.addition', {
        scrollTrigger: { 
            trigger: '.addition', 
            start: 'top 85%', 
            toggleActions: 'play none none none' 
        },
        opacity: 0, 
        x: 50, 
        duration: 0.8, 
        ease: 'back.out(1.2)'
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, { 
                    duration: 1, 
                    scrollTo: { y: target, offsetY: 100 }, 
                    ease: 'power3.inOut' 
                });
            }
        });
    });
} else {
    // Fallback sans GSAP - afficher le contenu basique
    document.body.style.cursor = 'auto';
}