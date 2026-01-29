/* ============================================
   FAQ.JS - INTERACTIONS PAGE FAQ
   ============================================ */

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    
    // Toggle FAQ Items (Accordéon)
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', function() {
            toggleFAQ(this);
        });
    });
    
    // Recherche en temps réel
    const searchInput = document.getElementById('faqSearch');
    const searchBtn = document.getElementById('faqSearchBtn');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(searchFAQ, 300));
        
        // Recherche sur Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchFAQ();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', searchFAQ);
    }
    
    // Animation au scroll pour les catégories
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.faq-category').forEach(category => {
        observer.observe(category);
    });
    
    // Deep linking : ouvrir automatiquement une question si URL contient un hash
    const hash = window.location.hash;
    if (hash) {
        const targetItem = document.querySelector(hash);
        if (targetItem && targetItem.classList.contains('faq-item')) {
            setTimeout(() => {
                targetItem.classList.add('active');
                targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        }
    }
    
    // Ajouter des IDs uniques aux questions pour le deep linking
    document.querySelectorAll('.faq-item').forEach((item, index) => {
        if (!item.id) {
            const category = item.dataset.category || 'q';
            item.id = `${category}-${index + 1}`;
        }
    });
    
});

// Toggle FAQ Item (Accordéon)
function toggleFAQ(button) {
    const faqItem = button.closest('.faq-item');
    const wasActive = faqItem.classList.contains('active');
    
    // Fermer tous les autres items de la même catégorie (optionnel)
    // const category = faqItem.closest('.faq-category');
    // category.querySelectorAll('.faq-item.active').forEach(item => {
    //     if (item !== faqItem) {
    //         item.classList.remove('active');
    //     }
    // });
    
    // Toggle l'item cliqué
    if (wasActive) {
        faqItem.classList.remove('active');
    } else {
        faqItem.classList.add('active');
        
        // Scroll smooth vers l'item ouvert après l'animation
        setTimeout(() => {
            const header = document.querySelector('.site-header');
            const headerHeight = header ? header.offsetHeight : 0;
            const itemTop = faqItem.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            window.scrollTo({
                top: itemTop,
                behavior: 'smooth'
            });
        }, 300);
    }
}

// Fonction de recherche dans la FAQ
function searchFAQ() {
    const searchInput = document.getElementById('faqSearch');
    const searchTerm = searchInput.value.toLowerCase().trim();
    const faqItems = document.querySelectorAll('.faq-item');
    const categories = document.querySelectorAll('.faq-category');
    
    let visibleCount = 0;
    
    if (searchTerm === '') {
        // Réinitialiser : tout afficher
        faqItems.forEach(item => {
            item.classList.remove('hidden', 'highlighted');
        });
        categories.forEach(cat => {
            cat.style.display = 'block';
        });
        hideNoResults();
        return;
    }
    
    // Parcourir tous les items
    faqItems.forEach(item => {
        const questionText = item.querySelector('.faq-q-text').textContent.toLowerCase();
        const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();
        
        if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
            item.classList.remove('hidden');
            item.classList.add('highlighted');
            visibleCount++;
        } else {
            item.classList.add('hidden');
            item.classList.remove('highlighted');
        }
    });
    
    // Masquer les catégories vides
    categories.forEach(category => {
        const visibleItems = category.querySelectorAll('.faq-item:not(.hidden)');
        if (visibleItems.length === 0) {
            category.style.display = 'none';
        } else {
            category.style.display = 'block';
        }
    });
    
    // Si aucun résultat
    if (visibleCount === 0) {
        showNoResults();
    } else {
        hideNoResults();
    }
}

// Afficher message "Aucun résultat"
function showNoResults() {
    let noResultsDiv = document.getElementById('noResultsMessage');
    
    if (!noResultsDiv) {
        noResultsDiv = document.createElement('div');
        noResultsDiv.id = 'noResultsMessage';
        noResultsDiv.style.cssText = `
            text-align: center;
            padding: 4rem 2rem;
            font-size: 1.2rem;
            color: #999;
        `;
        noResultsDiv.innerHTML = `
            <p style="font-size: 3rem; margin-bottom: 1rem;">🔍</p>
            <p><strong>Aucun résultat trouvé</strong></p>
            <p style="font-size: 1rem; margin-top: 0.5rem;">Essayez avec d'autres mots-clés ou <a href="#" id="clearSearchLink" style="color: var(--rouge-tomate); text-decoration: underline;">effacez la recherche</a></p>
        `;
        document.querySelector('.faq-container').appendChild(noResultsDiv);
        
        // Ajouter event listener pour le lien "effacer"
        document.getElementById('clearSearchLink').addEventListener('click', function(e) {
            e.preventDefault();
            clearSearch();
        });
    }
    
    noResultsDiv.style.display = 'block';
}

// Masquer message "Aucun résultat"
function hideNoResults() {
    const noResultsDiv = document.getElementById('noResultsMessage');
    if (noResultsDiv) {
        noResultsDiv.style.display = 'none';
    }
}

// Effacer la recherche
function clearSearch() {
    document.getElementById('faqSearch').value = '';
    searchFAQ();
}

// Fonction utilitaire : debounce pour optimiser la recherche
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}