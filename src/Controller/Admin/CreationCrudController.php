<?php

namespace App\Controller\Admin;

use App\Entity\Creation;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\SlugField;
use Vich\UploaderBundle\Form\Type\VichImageType;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;

class CreationCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Creation::class;
    }

    
    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('title', 'Titre'),
            TextareaField::new('description', 'Description'),
            DateTimeField::new('createdAt', "Date de création")->hideWhenUpdating()->hideOnIndex(),
            DateTimeField::new('updatedAt', "Date de mise à jour")->hideOnForm(),
            TextField::new('imageFile', "Image")->setFormType(VichImageType::class)->hideOnIndex(),
            ImageField::new('file', "Image")->setBasePath("/uploads/creations/")->onlyOnIndex(),
            SlugField::new('slug', "Url de la création")->setTargetFieldName('title')->hideOnIndex(),
            AssociationField::new('category', "Catégorie")
        ];
    }
    
}
