<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AgenceController extends BasePageController
{
    #[Route('/agence/qui-sommes-nous', name: 'agence_qui_sommes_nous')]
    public function quiSommesNous(): Response
    {
        return $this->renderPage('agence/qui-sommes-nous.html.twig', [
            'page_title' => 'Qui sommes-nous - La Buon\'Com',
        ]);
    }

    #[Route('/agence/notre-concept', name: 'agence_concept')]
    public function concept(): Response
    {
        return $this->renderPage('agence/concept.html.twig', [
            'page_title' => 'Notre concept : la communication mijotée - La Buon\'Com',
        ]);
    }

    #[Route('/agence/notre-methode', name: 'agence_methode')]
    public function methode(): Response
    {
        return $this->renderPage('agence/methode.html.twig', [
            'page_title' => 'Notre méthode - La Buon\'Com',
        ]);
    }

    #[Route('/agence/pourquoi-la-buoncom', name: 'agence_pourquoi')]
    public function pourquoi(): Response
    {
        return $this->renderPage('agence/pourquoi.html.twig', [
            'page_title' => 'Pourquoi choisir La Buon\'Com',
        ]);
    }

    // Redirection de l'ancienne route /agence vers qui-sommes-nous
    #[Route('/agence', name: 'agence')]
    public function index(): Response
    {
        return $this->redirectToRoute('agence_qui_sommes_nous');
    }
}