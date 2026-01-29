<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(): Response
    {
        return $this->render('home.html.twig', [
            'services' => [
                [
                    'icon' => '🍝',
                    'title' => 'Stratégie de marque',
                    'description' => 'Comme une recette familiale, nous construisons l\'ADN de votre marque avec authenticité.'
                ],
                [
                    'icon' => '🍕',
                    'title' => 'Création de contenu',
                    'description' => 'Des contenus savoureux et engageants, préparés avec soin pour votre audience.'
                ],
                [
                    'icon' => '🧑‍🍳',
                    'title' => 'Accompagnement digital',
                    'description' => 'Un chef à vos côtés pour orchestrer votre présence en ligne.'
                ],
            ],
            'testimonials' => [
                [
                    'name' => 'Marie L.',
                    'company' => 'Bella Vita Restaurant',
                    'text' => 'La Buon\'Com a transformé notre communication. Leur approche créative et leur expertise nous ont permis de doubler notre clientèle en 6 mois.'
                ],
                [
                    'name' => 'Thomas R.',
                    'company' => 'Tech Startup',
                    'text' => 'Une équipe qui comprend vraiment les enjeux. Ils ont su traduire notre vision tech en messages accessibles et impactants.'
                ]
            ]
        ]);
    }
}