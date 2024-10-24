document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const navButtons = document.querySelectorAll('.slide-dot');
    const totalSlides = slides.length;
    const maxDots = 5;
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            navButtons[i]?.classList.remove('active'); // Vérifier si le bouton existe
        });

        slides[index].classList.add('active');
        navButtons[index]?.classList.add('active');

        // Change body and h1 color with transition
        const bgColor = slides[index].getAttribute('data-bg-color');
        const titleColor = slides[index].getAttribute('data-title-color');
        document.body.style.backgroundColor = bgColor;
        document.querySelector('h1').style.color = titleColor;
        
        updateNavDots(index);
    }

    function updateNavDots(index) {
        const midPoint = Math.floor(maxDots / 2);
        const start = Math.max(0, index - midPoint);
        const end = Math.min(totalSlides, start + maxDots);

        navButtons.forEach((button, i) => {
            if (i >= start && i < end) {
                button.style.display = 'inline-block';
            } else {
                button.style.display = 'none';
            }
        });
    }

    navButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            currentSlide = index;
            showSlide(index);
        });
    });

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // Auto slide every 15 seconds
    setInterval(nextSlide, 15000);

    // Set initial colors and display
    showSlide(0);


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
