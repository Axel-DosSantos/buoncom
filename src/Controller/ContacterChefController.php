<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ContacterChefController extends BasePageController
{
    #[Route('/contacter-chef', name: 'contacter_chef')]
    public function index(): Response
    {
        return $this->renderPage('contacter_chef.html.twig', [
            'page_title' => 'Contacter un chef - La Buon\'Com',
        ]);
    }
}
