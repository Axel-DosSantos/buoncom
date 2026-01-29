<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RealisationsController extends BasePageController
{
    #[Route('/realisations', name: 'realisations')]
    public function index(): Response
    {
        return $this->renderPage('realisations.html.twig', [
            'page_title' => 'Réalisations - La Buon\'Com',
        ]);
    }
}
