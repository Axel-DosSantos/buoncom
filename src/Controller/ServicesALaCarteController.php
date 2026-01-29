<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ServicesALaCarteController extends BasePageController
{
    #[Route('/services-a-la-carte', name: 'services_a_la_carte')]
    public function index(): Response
    {
        return $this->renderPage('services_a_la_carte.html.twig', [
            'page_title' => 'Services à la carte - La Buon\'Com',
        ]);
    }
}
