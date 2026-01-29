<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PolitiqueConfidentialiteController extends BasePageController
{
    #[Route('/politique-confidentialite', name: 'politique_confidentialite')]
    public function index(): Response
    {
        return $this->renderPage('politique_confidentialite.html.twig', [
            'page_title' => 'Politique de confidentialité - La Buon\'Com',
        ]);
    }
}
