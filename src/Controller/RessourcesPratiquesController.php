<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RessourcesPratiquesController extends BasePageController
{
    #[Route('/ressources-pratiques', name: 'ressources_pratiques')]
    public function index(): Response
    {
        return $this->renderPage('ressources_pratiques.html.twig', [
            'page_title' => 'Ressources pratiques - La Buon\'Com',
        ]);
    }
}
