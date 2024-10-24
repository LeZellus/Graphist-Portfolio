document.addEventListener('DOMContentLoaded', function() {
        const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const navMenu = document.querySelector('.nav-menu');

    // Ouvrir le menu
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active'); // Ajoute ou retire la classe active
    });

    // Fermer le menu
    menuClose.addEventListener('click', function() {
        navMenu.classList.remove('active'); // Retire la classe active
    });

    // Fermer le menu si l'utilisateur clique à l'extérieur
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            navMenu.classList.remove('active'); // Retire la classe active si on clique en dehors
        }
    });
});
