# Guide IA - La Buon'Com

Ce document répertorie toutes les bonnes pratiques à suivre pour le développement du site La Buon'Com. À fournir à l'IA pour assurer la cohérence du projet.

---

## 1. Arborescence du projet

```
labuoncom/
├── config/                     # Configuration Symfony
│   ├── packages/               # Configuration des bundles
│   ├── routes.yaml             # Routes (attribute-based)
│   └── services.yaml           # Services
├── public/                     # Fichiers publics (document root)
│   ├── assets/                 # Assets graphiques
│   │   ├── logos/              # Logos SVG et PNG
│   │   ├── mains/              # Mains colorées (PNG)
│   │   ├── motifs/             # Carreaux et patterns
│   │   ├── stickers/           # Stickers décoratifs
│   │   └── autres/             # Autres éléments graphiques
│   ├── js/                     # JavaScript
│   │   └── animations.js       # Animations GSAP
│   └── index.php               # Point d'entrée
├── src/
│   ├── Controller/             # Controllers Symfony
│   │   ├── BasePageController.php      # Controller de base
│   │   ├── HomeController.php          # Page d'accueil
│   │   ├── AgenceController.php        # Page agence
│   │   ├── BlogController.php          # Blog
│   │   ├── FaqController.php           # FAQ
│   │   ├── ContactController.php       # Contact
│   │   ├── ServicesALaCarteController.php
│   │   ├── FormulesCommunicationController.php
│   │   ├── ComposerMenuController.php  # Formulaire menu
│   │   ├── ContacterChefController.php # Formulaire RDV
│   │   └── ...
│   └── Kernel.php
├── templates/                  # Templates Twig
│   ├── base.html.twig          # Template de base (header/footer inclus)
│   ├── home.html.twig          # Page d'accueil
│   ├── agence.html.twig        # Page agence
│   ├── blog.html.twig          # Blog
│   ├── faq.html.twig           # FAQ
│   └── ...
└── var/                        # Cache et logs
```

---

## 2. Variables CSS (Charte graphique)

Toutes les couleurs doivent utiliser les variables CSS définies dans `base.html.twig`. Ne jamais utiliser de couleurs en dur.

```css
:root {
    --vert-percil: #225D2E;      /* Vert principal - confiance, nature */
    --creme-fouettee: #FFF1DC;   /* Crème - fond principal */
    --rouge-tomate: #DA4D1B;     /* Rouge - CTA, accent */
    --jaune-oeuf: #FFC857;       /* Jaune - mise en avant */
    --noir-olive: #0B0B09;       /* Noir - texte principal */
    --rose-bonbon: #EA94A6;      /* Rose - accent secondaire */
}
```

### Utilisation des couleurs

| Couleur | Usage |
|---------|-------|
| `--vert-percil` | Headers, titres h2, boutons secondaires, éléments de confiance |
| `--creme-fouettee` | Background principal, texte sur fond foncé |
| `--rouge-tomate` | CTA principaux, accents, liens hover |
| `--jaune-oeuf` | Mise en avant, étoiles, highlights |
| `--noir-olive` | Texte principal, footer background |
| `--rose-bonbon` | Accents féminins, certaines sections (FAQ hero) |

---

## 3. Typographie

```css
/* Titres */
font-family: 'Montserrat', sans-serif;
font-weight: 600 | 800;

/* Corps de texte */
font-family: 'Libre Baskerville', serif;
font-weight: 400 | 700;
```

### Tailles de police

```css
h1 { font-size: 3.5rem; }  /* Mobile: 2.2rem */
h2 { font-size: 2.5rem; }  /* Mobile: 1.8rem */
h3 { font-size: 1.5rem; }
p  { font-size: 1rem; line-height: 1.6; }
```

---

## 4. Classes de composants réutilisables

### Boutons

Utiliser les classes définies dans `base.html.twig` :

```html
<!-- Bouton principal (rouge) -->
<a href="#" class="btn btn-primary">Texte</a>

<!-- Bouton secondaire (outline vert) -->
<a href="#" class="btn btn-secondary">Texte</a>

<!-- Bouton CTA header (jaune) -->
<a href="#" class="btn btn-cta-header">Composer mon menu</a>

<!-- Bouton large -->
<a href="#" class="btn btn-primary btn-large">Texte</a>
```

### Conteneurs

```html
<div class="container">
    <!-- Contenu centré max-width: 1200px -->
</div>

<main class="main-content">
    <!-- Contenu principal avec padding-top pour header fixe -->
</main>
```

### Stickers décoratifs

```html
<div class="sticker sticker-tomato" style="top: 10%; right: 15%;"></div>
<div class="sticker sticker-leaf" style="top: 70%; left: 10%;"></div>
<div class="sticker sticker-star" style="top: 30%; left: 5%;"></div>
<div class="sticker sticker-circle" style="top: 20%; right: 10%;"></div>
<div class="sticker sticker-wave" style="bottom: 15%; left: 8%;"></div>
```

---

## 5. Approche Mobile-First

**IMPORTANT** : Toujours développer en mobile-first.

### Ordre des media queries

```css
/* Styles de base = mobile */
.element {
    padding: 1rem;
    flex-direction: column;
}

/* Tablette */
@media (min-width: 768px) {
    .element {
        padding: 2rem;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .element {
        flex-direction: row;
        padding: 3rem;
    }
}
```

### Breakpoints

| Breakpoint | Cible |
|------------|-------|
| < 600px | Mobile petit |
| 600px - 768px | Mobile large |
| 768px - 1024px | Tablette |
| > 1024px | Desktop |

---

## 6. Éléments graphiques (Charte visuelle)

### Assets disponibles

#### Logos (`/assets/logos/`)
- `Logo principal.svg` - Logo couleur
- `Logo blanc.svg` - Logo blanc (pour fonds foncés)
- `Logo noir.svg` - Logo noir
- `Logo sticker.svg` - Version sticker
- `Favicon La Buon'Com.png` - Favicon

#### Mains colorées (`/assets/mains/`)
- `Main jaune.png`
- `Main rose.png`
- `Main rouge.png`
- `Main verte.png`

**Usage** : Éléments décoratifs flottants, illustrations de sections

#### Motifs/Carreaux (`/assets/motifs/`)
- `Carreaux roses.png`
- `Carreaux rouges.png`
- `Carreaux verts.png`
- `motif main jaune.png`
- `Motif main vert.png`
- `tete.png`

**Usage** : Backgrounds de sections, overlays décoratifs

#### Stickers (`/assets/stickers/`)
- `Sticker main jaune/rose/rouge/verte.png`
- `Sticker O.png`
- `Sticker_etoiles.png`
- `Sticker_tete.png`

**Usage** : Éléments décoratifs ponctuels

### Utilisation dans Twig

```twig
<img src="{{ asset('assets/logos/Logo principal.svg') }}" alt="La Buon'Com">
<img src="{{ asset('assets/mains/Main jaune.png') }}" alt="" class="decorative-hand">
```

### Background avec motif

```css
.section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('{{ asset('assets/motifs/Carreaux verts.png') }}');
    background-size: cover;
    opacity: 0.1;
}
```

---

## 7. Structure des templates Twig

### Template de base

Tous les templates doivent étendre `base.html.twig` :

```twig
{% extends 'base.html.twig' %}

{% block title %}Titre de la page - La Buon'Com{% endblock %}

{% block stylesheets %}
<style>
    /* Styles spécifiques à cette page */
</style>
{% endblock %}

{% block body %}
    <!-- Contenu de la page -->
{% endblock %}

{% block javascripts %}
<script>
    // JavaScript spécifique à cette page
</script>
{% endblock %}
```

### Blocs disponibles

| Bloc | Description |
|------|-------------|
| `title` | Titre de la page |
| `stylesheets` | CSS spécifique à la page |
| `header` | Surcharge du header (rare) |
| `body` | Contenu principal |
| `footer` | Surcharge du footer (rare) |
| `javascripts` | JS spécifique à la page |

### Le header et footer sont automatiquement inclus

Le template `base.html.twig` inclut automatiquement :
- Le header avec navigation et CTAs
- Le footer avec tous les liens

Pas besoin de les redéfinir dans chaque page.

---

## 8. Routes et Controllers

### Convention de nommage

| URL | Nom de route | Controller |
|-----|--------------|------------|
| `/` | `app_home` | HomeController |
| `/agence` | `agence` | AgenceController |
| `/services-a-la-carte` | `services_a_la_carte` | ServicesALaCarteController |
| `/formules-communication` | `formules_communication` | FormulesCommunicationController |
| `/blog` | `blog` | BlogController |
| `/faq` | `faq` | FaqController |
| `/contact` | `contact` | ContactController |
| `/composer-menu` | `composer_menu` | ComposerMenuController |
| `/contacter-chef` | `contacter_chef` | ContacterChefController |
| `/realisations` | `realisations` | RealisationsController |
| `/ressources-pratiques` | `ressources_pratiques` | RessourcesPratiquesController |
| `/mentions-legales` | `mentions_legales` | MentionsLegalesController |
| `/politique-confidentialite` | `politique_confidentialite` | PolitiqueConfidentialiteController |
| `/politique-cookies` | `politique_cookies` | PolitiqueCookiesController |

### Liens dans Twig

```twig
<a href="{{ path('app_home') }}">Accueil</a>
<a href="{{ path('agence') }}#concept">Notre concept</a>
<a href="{{ path('services_a_la_carte') }}">Services à la carte</a>
```

---

## 9. Animations GSAP

Le site utilise GSAP pour les animations. Les librairies sont chargées dans `base.html.twig` :

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
```

### Pattern d'animation standard

```javascript
// Animation au scroll
gsap.from('.element', {
    scrollTrigger: {
        trigger: '.element',
        start: 'top 85%'
    },
    opacity: 0,
    y: 50,
    duration: 0.6,
    ease: 'power3.out'
});

// Animation staggered
gsap.from('.card', {
    scrollTrigger: { trigger: '.cards-container', start: 'top 80%' },
    opacity: 0,
    y: 30,
    duration: 0.5,
    stagger: 0.1
});
```

---

## 10. Bonnes pratiques générales

### DO ✅

- Utiliser les variables CSS pour les couleurs
- Utiliser les classes `.btn`, `.btn-primary`, etc. pour les boutons
- Développer mobile-first
- Utiliser les éléments graphiques (mains, carreaux) pour le décor
- Étendre `base.html.twig` pour chaque page
- Utiliser `{{ path('route_name') }}` pour les liens
- Utiliser `{{ asset('path') }}` pour les assets
- Ajouter des stickers décoratifs dans les sections
- Utiliser GSAP pour les animations

### DON'T

- Ne pas mettre de couleurs en dur (#225D2E) → utiliser var(--vert-percil)
- Ne pas créer de nouveaux boutons sans utiliser les classes existantes
- Ne pas développer desktop-first
- Ne pas oublier les éléments décoratifs de la charte
- Ne pas recréer le header/footer dans chaque template
- Ne pas utiliser de liens en dur (/agence) → utiliser path()
- Ne pas charger GSAP plusieurs fois
- Ne pas mettre de styles inline (style="") sauf pour positionnement stickers
- **Ne jamais utiliser d'emojis** : les emojis ne font pas professionnel. Utiliser des icônes SVG, des stickers ou des caractères simples (comme le check mark) à la place

---

## 11. Thème culinaire

Le site a une thématique "communication culinaire". Respecter le vocabulaire :

| Terme technique | Terme culinaire |
|-----------------|-----------------|
| Services | Menu, Carte |
| Équipe | Chefs, Brigade |
| Processus | Recette, Méthode |
| Prix | Addition |
| Contact | Réserver une table |
| CTA principal | "Composer mon menu" |
| CTA secondaire | "Contacter un chef" |

---

## 12. Checklist avant commit

- [ ] Variables CSS utilisées (pas de couleurs en dur)
- [ ] Classes de composants réutilisées
- [ ] Template étend base.html.twig
- [ ] Liens utilisent path()
- [ ] Assets utilisent asset()
- [ ] Éléments décoratifs présents (stickers, mains)
- [ ] Mobile-first respecté
- [ ] Animations GSAP cohérentes
- [ ] Vocabulaire culinaire respecté
## 13. Dépendances Symfony requises

### Composants essentiels

Le projet nécessite les composants Symfony suivants :
```bash
composer require symfony/asset
composer require symfony/twig-bundle
composer require symfony/form
composer require symfony/validator
composer require symfony/mailer
```

### symfony/asset

**Obligatoire** pour utiliser la fonction `{{ asset() }}` dans les templates Twig.

Cette fonction génère automatiquement les URLs correctes pour les fichiers statiques (images, CSS, JS) :
```twig
