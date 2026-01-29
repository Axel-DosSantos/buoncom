<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

abstract class BasePageController extends AbstractController
{
    protected function renderPage(string $template, array $context = []): Response
    {
        return $this->render($template, $context);
    }
}
