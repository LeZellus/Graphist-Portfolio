<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\CreationRepository;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(CreationRepository $creationRepository): Response
    {
        $creations = $creationRepository->findRandomCreations(10);

        return $this->render('home/index.html.twig', [
            'creations' => $creations,
        ]);
    }
}
