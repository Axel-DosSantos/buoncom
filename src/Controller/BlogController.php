<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BlogController extends BasePageController
{
    // Données des articles (en dur pour l'instant, pourrait être en BDD plus tard)
    private function getArticles(): array
    {
        return [
            'communiquer-efficacement-manque-de-temps-tpe-pme' => [
                'slug' => 'communiquer-efficacement-manque-de-temps-tpe-pme',
                'image' => 'https://images.unsplash.com/photo-1553484771-047a44eee27a?w=800&q=80',
                'image_alt' => 'communiquer efficacement quand on manque de temps – checklist TPE PME',
                'categories' => ['Pédagogie', 'TPE/PME'],
                'category_colors' => ['vert-persil', 'jaune-oeuf'],
                'title' => 'Comment communiquer efficacement quand on manque de temps (spécial TPE / PME)',
                'meta_title' => 'Communiquer efficacement quand on manque de temps : méthode simple TPE/PME',
                'meta_description' => 'Manque de temps pour la com ? Découvrez une méthode simple pour TPE/PME : canaux prioritaires, messages clairs, mini-plan d\'action et options d\'externalisation.',
                'excerpt' => 'Manque de temps pour la com ? Découvrez une méthode simple pour TPE/PME : canaux prioritaires, messages clairs et options d\'externalisation.',
                'reading_time' => '8 minutes',
                'date' => '28 Jan 2026',
                'author' => 'La Buon\'Com',
            ],
        ];
    }

    #[Route('/blog', name: 'blog')]
    public function index(): Response
    {
        $articles = $this->getArticles();

        return $this->renderPage('blog.html.twig', [
            'page_title' => 'Blog - La Buon\'Com',
            'meta_description' => 'Conseils, tendances et actus communication pour TPE, PME et professions libérales. Découvrez nos articles pour améliorer votre visibilité.',
            'articles' => $articles,
        ]);
    }

    #[Route('/blog/{slug}', name: 'blog_article')]
    public function article(string $slug): Response
    {
        $articles = $this->getArticles();

        if (!isset($articles[$slug])) {
            throw $this->createNotFoundException('Article non trouvé');
        }

        $article = $articles[$slug];

        return $this->renderPage('blog/article.html.twig', [
            'page_title' => $article['meta_title'] . ' - La Buon\'Com',
            'meta_description' => $article['meta_description'],
            'article' => $article,
        ]);
    }
}
