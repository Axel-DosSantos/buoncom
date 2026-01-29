<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ServiceController extends BasePageController
{
    #[Route('/services', name: 'services')]
    public function index(): Response
    {
        return $this->renderPage('services.html.twig', [
            'page_title' => 'Services',
            'heading' => 'Nos services',
        ]);
    }
}
