<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\CategoryRepository;

class CategoryController extends AbstractController
{
    #[Route('/categorie/{slug}', name: 'app_category')]
    public function showCategory(
        string $slug,
        CategoryRepository $categoryRepository
    ): Response {
        
        $category = $categoryRepository->findOneBy(['slug' => $slug]);
    
        if (!$category) {
            throw $this->createNotFoundException('La catégorie demandée n\'existe pas.');
        }
    
        return $this->render('home/index.html.twig', [
            'category' => $category,
            'creations' => $category->getCreations(), // suppose que `Category` a une relation bidirectionnelle avec `Creation`
        ]);
    }
}
