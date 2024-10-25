<?php

namespace App\Entity;

use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    /**
     * @var Collection<int, Creation>
     */
    #[ORM\OneToMany(targetEntity: Creation::class, mappedBy: 'category')]
    private Collection $creations;

    #[ORM\Column(length: 255)]
    private ?string $slug = null;

    public function __construct()
    {
        $this->creations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, Creation>
     */
    public function getCreations(): Collection
    {
        return $this->creations;
    }

    public function addCreation(Creation $creation): static
    {
        if (!$this->creations->contains($creation)) {
            $this->creations->add($creation);
            $creation->setCategory($this);
        }

        return $this;
    }

    public function removeCreation(Creation $creation): static
    {
        if ($this->creations->removeElement($creation)) {
            // set the owning side to null (unless already changed)
            if ($creation->getCategory() === $this) {
                $creation->setCategory(null);
            }
        }

        return $this;
    }

    public function __toString()
    {
        return $this->name;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): static
    {
        $this->slug = $slug;

        return $this;
    }
}
