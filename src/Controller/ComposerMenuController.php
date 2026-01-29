<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class ComposerMenuController extends BasePageController
{
    #[Route('/composer-menu', name: 'composer_menu')]
    public function index(): Response
    {
        return $this->renderPage('composer_menu.html.twig', [
            'page_title' => 'Composez votre menu - La Buon\'Com',
        ]);
    }

    #[Route('/composer-menu/submit', name: 'composer_menu_submit', methods: ['POST'])]
    public function submit(Request $request, MailerInterface $mailer): JsonResponse
    {
        // Récupérer les données du formulaire
        $nom = $request->request->get('nom');
        $entreprise = $request->request->get('entreprise');
        $email = $request->request->get('email');
        $telephone = $request->request->get('telephone');
        $objectifs = $request->request->all('objectifs') ?? [];
        $menu = $request->request->all('menu') ?? [];
        $disponibilite = $request->request->all('disponibilite') ?? [];

        // Construire le contenu de l'email
        $content = "Nouvelle commande depuis le site La Buon'Com\n\n";
        $content .= "=== INFORMATIONS CLIENT ===\n";
        $content .= "Nom : {$nom}\n";
        $content .= "Entreprise : {$entreprise}\n";
        $content .= "Email : {$email}\n";
        $content .= "Téléphone : {$telephone}\n\n";

        if (!empty($objectifs)) {
            $content .= "=== OBJECTIFS ===\n";
            foreach ($objectifs as $obj) {
                $content .= "- {$obj}\n";
            }
            $content .= "\n";
        }

        if (!empty($menu)) {
            $content .= "=== MENU SÉLECTIONNÉ ===\n";
            foreach ($menu as $item) {
                $content .= "- {$item}\n";
            }
            $content .= "\n";
        }

        if (!empty($disponibilite)) {
            $content .= "=== DISPONIBILITÉ ===\n";
            foreach ($disponibilite as $dispo) {
                $content .= "- {$dispo}\n";
            }
        }

        try {
            // Email à l'équipe
            $emailToTeam = (new Email())
                ->from('noreply@labuoncom.fr')
                ->to('hello@labuoncom.fr')
                ->subject('Nouvelle commande - ' . $nom)
                ->text($content);

            $mailer->send($emailToTeam);

            // Email de confirmation au client
            $confirmationContent = "Bonjour {$nom},\n\n";
            $confirmationContent .= "Merci pour votre commande ! Nous revenons rapidement vers vous.\n\n";
            $confirmationContent .= "Voici le récapitulatif de votre demande :\n\n";
            $confirmationContent .= $content;
            $confirmationContent .= "\n\nL'équipe La Buon'Com";

            $emailToClient = (new Email())
                ->from('hello@labuoncom.fr')
                ->to($email)
                ->subject('Merci pour votre commande - La Buon\'Com')
                ->text($confirmationContent);

            $mailer->send($emailToClient);

            return new JsonResponse(['success' => true]);
        } catch (\Exception $e) {
            return new JsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}
