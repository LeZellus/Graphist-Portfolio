/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';

import "@phosphor-icons/web/bold";

// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-cube';

document.addEventListener("DOMContentLoaded", function () {
    // Sélectionner la première slide active
    const activeSlide = document.querySelector('.swiper-slide-active');
    const colorHex = activeSlide.getAttribute('data-color');
    applyShades(colorHex); // Appliquer la couleur dès le chargement
});

const swiper = new Swiper(".mySwiper", {
    modules: [Pagination, Autoplay, EffectFade],
    effect: "fade",
    
    fadeEffect: {
        crossFade: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 1,
    },
    autoplay: {
        autoplay:true,
        delay: 3000,
        pauseOnMouseEnter: true,
    },
    on: {
        slideChangeTransitionStart: function () {
            console.log("coucou")
            // Lorsque la slide change, applique les shades à la nouvelle slide active
            const activeSlide = document.querySelector('.swiper-slide-active');
            const colorHex = activeSlide.getAttribute('data-color');
            applyShades(colorHex);
        }
    }
});

// Fonction qui génère un shade (exemple basique)
function generateShade(hexColor, shadeFactor) {
    // Exemple d'une fonction qui fonce la couleur. À ajuster selon ton implémentation.
    let r = parseInt(hexColor.slice(1, 3), 16);
    let g = parseInt(hexColor.slice(3, 5), 16);
    let b = parseInt(hexColor.slice(5, 7), 16);

    // Appliquer un facteur de shade (ici, assombrit la couleur)
    r = Math.max(0, Math.min(255, r - shadeFactor));
    g = Math.max(0, Math.min(255, g - shadeFactor));
    b = Math.max(0, Math.min(255, b - shadeFactor));

    // Retourner la nouvelle couleur au format hexadécimal
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// Fonction principale qui applique les shades
function applyShades(colorHex) {
    const shadedColor = generateShade(colorHex, 60);

    const sectionBorder = document.querySelector('.data-color-border');
    sectionBorder.style.borderColor = shadedColor;

    const sectionBackground = document.querySelector('.data-color-background');
    sectionBackground.style.backgroundColor = colorHex;
    sectionBackground.style.color = shadedColor;

    const sectionNav = document.querySelector('.data-color-nav');
    sectionNav.style.backgroundColor = colorHex;
    sectionNav.style.color = shadedColor;

    const body = document.body
    body.style.backgroundColor = colorHex;

    
    const bulletShadeds = document.querySelectorAll('.swiper-pagination-bullet');
    bulletShadeds.forEach((element) => {
        element.style.backgroundColor = shadedColor;
    });

    const textShadeds = document.querySelectorAll('.data-color-text');
    textShadeds.forEach((element) => {
        element.style.color = shadedColor;
    });
}
