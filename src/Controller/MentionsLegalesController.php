<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MentionsLegalesController extends BasePageController
{
    #[Route('/mentions-legales', name: 'mentions_legales')]
    public function index(): Response
    {
        return $this->renderPage('mentions_legales.html.twig', [
            'page_title' => 'Mentions légales - La Buon\'Com',
        ]);
    }
}
