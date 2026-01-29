<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PolitiqueCookiesController extends BasePageController
{
    #[Route('/politique-cookies', name: 'politique_cookies')]
    public function index(): Response
    {
        return $this->renderPage('politique_cookies.html.twig', [
            'page_title' => 'Politique de cookies - La Buon\'Com',
        ]);
    }
}
