<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FormulesCommunicationController extends BasePageController
{
    #[Route('/formules-communication', name: 'formules_communication')]
    public function index(): Response
    {
        return $this->renderPage('formules_communication.html.twig', [
            'page_title' => 'Formules de communication - La Buon\'Com',
        ]);
    }
}
