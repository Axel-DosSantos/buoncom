// ========================================
// CURSOR.JS - LA BUON'COM
// Curseur personnalisé en forme de fourchette avec particules
// ========================================

// Variables globales pour le curseur
const particleColors = ['#225D2E', '#DA4D1B', '#FFC857', '#EA94A6', '#1a4725'];
let mouseX = 0, mouseY = 0;
let lastX = 0, lastY = 0;

// ========== CURSEUR FOURCHETTE SVG ==========
const cursor = document.querySelector('.custom-cursor');
const particlesContainer = document.getElementById('particles-container');

if (cursor) {
    // Suivi du mouvement de la souris
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';

        // Trail de particules si GSAP disponible
        if (typeof gsap !== 'undefined') {
            const distance = Math.sqrt(Math.pow(mouseX - lastX, 2) + Math.pow(mouseY - lastY, 2));
            if (distance > 25) {
                createParticle(mouseX, mouseY);
                lastX = mouseX;
                lastY = mouseY;
            }
        }
    });

    // Animation au clic
    document.addEventListener('mousedown', function() { 
        cursor.classList.add('clicking'); 
    });
    
    document.addEventListener('mouseup', function() { 
        cursor.classList.remove('clicking'); 
    });

    // Animation au survol d'éléments interactifs
    const interactiveElements = document.querySelectorAll('a, button, .pack-card, .extra-item, .showcase-item, .cta-button, .nav-links a, .bento-item, .main-nav a');
    
    interactiveElements.forEach(function(el) {
        el.addEventListener('mouseenter', function() { 
            cursor.classList.add('hovering'); 
        });
        
        el.addEventListener('mouseleave', function() { 
            cursor.classList.remove('hovering'); 
        });
    });
}

// ========== CRÉATION DE PARTICULES POUR LE TRAIL ==========
function createParticle(x, y) {
    if (typeof gsap === 'undefined' || !particlesContainer) return;
    
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    particle.style.backgroundColor = particleColors[Math.floor(Math.random() * particleColors.length)];
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particlesContainer.appendChild(particle);

    gsap.fromTo(particle,
        { 
            opacity: 0.7, 
            scale: 1, 
            x: 0, 
            y: 0 
        },
        {
            opacity: 0, 
            scale: 0,
            x: (Math.random() - 0.5) * 60,
            y: Math.random() * 40 + 10,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: function() { 
                particle.remove(); 
            }
        }
    );
}

// ========== DÉSACTIVER LE CURSEUR SUR MOBILE ==========
if (window.innerWidth <= 768) {
    if (cursor) cursor.style.display = 'none';
    if (particlesContainer) particlesContainer.style.display = 'none';
    document.body.style.cursor = 'auto';
    
    // Réactiver le curseur par défaut sur tous les éléments
    document.querySelectorAll('*').forEach(function(el) {
        el.style.cursor = 'auto';
    });
}

// Gérer le redimensionnement de la fenêtre
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        if (cursor) cursor.style.display = 'none';
        if (particlesContainer) particlesContainer.style.display = 'none';
        document.body.style.cursor = 'auto';
    } else {
        if (cursor) cursor.style.display = 'block';
        if (particlesContainer) particlesContainer.style.display = 'block';
        document.body.style.cursor = 'none';
    }
});