<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FaqController extends BasePageController
{
    #[Route('/faq', name: 'faq')]
    public function index(): Response
    {
        $faqs = [
            [
                'question' => 'Quels sont vos délais de réalisation ?',
                'answer' => 'Les délais varient selon le type de projet. Pour un logo, comptez environ 2 semaines. Un site web vitrine prend généralement 4 à 6 semaines. Nous vous communiquons un planning détaillé dès le début du projet.',
            ],
            [
                'question' => 'Comment se déroule un projet type ?',
                'answer' => 'Chaque projet suit notre méthode en 4 étapes : L\'Inspiration (brief et écoute), La Préparation (stratégie et proposition), La Cuisson (création et ajustements), Le Service (livraison et suivi). Vous êtes impliqué à chaque étape clé.',
            ],
            [
                'question' => 'Proposez-vous un accompagnement sur le long terme ?',
                'answer' => 'Absolument ! Nous proposons des formules de community management mensuel, de maintenance de site web, et d\'accompagnement stratégique continu. Nous pouvons devenir votre département communication externalisé.',
            ],
            [
                'question' => 'Quels sont vos tarifs ?',
                'answer' => 'Nos tarifs dépendent de la complexité de chaque projet. Nous proposons des formules à partir de 500€ et des prestations à la carte. Contactez-nous pour obtenir un devis personnalisé gratuit.',
            ],
            [
                'question' => 'Travaillez-vous avec tous types d\'entreprises ?',
                'answer' => 'Oui ! Nous accompagnons des entreprises de toutes tailles : auto-entrepreneurs, TPE, PME, associations... Chaque projet est unique et nous adaptons notre approche à vos besoins et votre budget.',
            ],
            [
                'question' => 'Êtes-vous basés où ?',
                'answer' => 'Nous avons deux implantations : Évry-Courcouronnes en Île-de-France et Valbonne – Sophia Antipolis dans les Alpes-Maritimes. Nous travaillons également à distance avec des clients partout en France.',
            ],
            [
                'question' => 'Comment puis-je vous contacter ?',
                'answer' => 'Vous pouvez nous joindre par téléphone au 01 76 21 77 59, par email à hello@labuoncom.fr, ou via notre formulaire de contact. Nous répondons sous 24h en jours ouvrés.',
            ],
        ];

        return $this->renderPage('faq.html.twig', [
            'page_title' => 'FAQ - La Buon\'Com',
            'faqs' => $faqs,
        ]);
    }
}
