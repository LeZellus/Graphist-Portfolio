<?php

namespace App\Repository;

use App\Entity\Category;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Category>
 */
class CategoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Category::class);
    }

    public function findAllCategoryNamesAndSlugsWithCreations(): array
{
        $qb = $this->createQueryBuilder('c')
            ->innerJoin('c.creations', 'cr') // Assure-toi que 'creations' est le bon nom de la relation
            ->addSelect('cr') // On sélectionne aussi les créations si nécessaire
            ->groupBy('c.id') // Regroupement par catégorie
            ->select('c.name, c.slug')
            ->getQuery();

        return $qb->getResult();
    }
}
