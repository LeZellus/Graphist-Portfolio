<?php

namespace App\Repository;

use App\Entity\Creation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Creation>
 */
class CreationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Creation::class);
    }

    public function findRandomCreations(int $limit = 10): array
{
        // Récupérer le nombre total
        $totalCount = $this->createQueryBuilder('c')
            ->select('COUNT(c.id)')
            ->getQuery()
            ->getSingleScalarResult();
        
        if ($totalCount <= $limit) {
            return $this->findAll();
        }
        
        // Générer des offsets aléatoires
        $randomOffsets = [];
        for ($i = 0; $i < $limit; $i++) {
            $randomOffsets[] = rand(0, $totalCount - 1);
        }
        $randomOffsets = array_unique($randomOffsets);
        
        // Récupérer les créations
        return $this->createQueryBuilder('c')
            ->where('c.id IN (:ids)')
            ->setParameter('ids', array_slice($randomOffsets, 0, $limit))
            ->getQuery()
            ->getResult();
    }
}
