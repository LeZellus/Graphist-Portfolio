document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-modal');
    
    if (!modal || !modalImg || !closeBtn) return;
    
    let scale = 1;
    let isDragging = false;
    let startX, startY, translateX = 0, translateY = 0;
    
    // Reset des transformations
    function resetTransform() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
        modalImg.style.cursor = 'zoom-in';
    }
    
    // Appliquer les transformations
    function updateTransform() {
        modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
    
    // Obtenir les coordonnées relatives à l'image
    function getImageCoords(clientX, clientY) {
        const rect = modalImg.getBoundingClientRect();
        return {
            x: (clientX - rect.left - rect.width / 2) / scale,
            y: (clientY - rect.top - rect.height / 2) / scale
        };
    }
    
    // Ouvrir le modal
    document.querySelectorAll('.carousel-image').forEach(img => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            resetTransform();
            
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            document.body.style.position = 'fixed';
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.width = '100%';
        });
    });
    
    // Zoom avec la molette
    modalImg.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        const imageCoords = getImageCoords(e.clientX, e.clientY);
        const delta = e.deltaY > 0 ? 0.8 : 1.25;
        const newScale = Math.min(Math.max(scale * delta, 1), 4);
        
        if (newScale !== scale) {
            // Calculer le nouveau translate pour garder le point sous la souris
            const scaleRatio = newScale / scale;
            translateX = translateX * scaleRatio - imageCoords.x * (newScale - scale);
            translateY = translateY * scaleRatio - imageCoords.y * (newScale - scale);
            scale = newScale;
            
            if (scale === 1) {
                translateX = 0;
                translateY = 0;
            }
            
            updateTransform();
            modalImg.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
        }
    });
    
    // Zoom au clic simple
    modalImg.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (scale === 1) {
            const imageCoords = getImageCoords(e.clientX, e.clientY);
            scale = 2;
            translateX = -imageCoords.x * scale;
            translateY = -imageCoords.y * scale;
            updateTransform();
            modalImg.style.cursor = 'grab';
        } else {
            resetTransform();
        }
    });
    
    // Début du drag
    modalImg.addEventListener('mousedown', function(e) {
        if (scale > 1) {
            e.preventDefault();
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            modalImg.style.cursor = 'grabbing';
        }
    });
    
    // Drag en cours
    document.addEventListener('mousemove', function(e) {
        if (isDragging && scale > 1) {
            e.preventDefault();
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            updateTransform();
        }
    });
    
    // Fin du drag
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            modalImg.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
        }
    });
    
    // Éviter la sélection pendant le drag
    modalImg.addEventListener('dragstart', function(e) {
        e.preventDefault();
    });
    
    // Support tactile basique pour mobile
    let touchStartDistance = 0;
    let touchStartScale = 1;
    let touchStartTranslate = { x: 0, y: 0 };
    
    modalImg.addEventListener('touchstart', function(e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            touchStartDistance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            touchStartScale = scale;
            touchStartTranslate = { x: translateX, y: translateY };
        } else if (e.touches.length === 1 && scale > 1) {
            const touch = e.touches[0];
            startX = touch.clientX - translateX;
            startY = touch.clientY - translateY;
            isDragging = true;
        }
    });
    
    modalImg.addEventListener('touchmove', function(e) {
        e.preventDefault();
        
        if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            
            scale = Math.min(Math.max(touchStartScale * (distance / touchStartDistance), 1), 4);
            
            if (scale === 1) {
                translateX = 0;
                translateY = 0;
            } else {
                const scaleRatio = scale / touchStartScale;
                translateX = touchStartTranslate.x * scaleRatio;
                translateY = touchStartTranslate.y * scaleRatio;
            }
            
            updateTransform();
        } else if (e.touches.length === 1 && isDragging && scale > 1) {
            const touch = e.touches[0];
            translateX = touch.clientX - startX;
            translateY = touch.clientY - startY;
            updateTransform();
        }
    });
    
    modalImg.addEventListener('touchend', function(e) {
        if (e.touches.length === 0) {
            isDragging = false;
        }
    });
    
    // Fermer le modal
    function closeModal() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        resetTransform();
        
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    // Double-clic pour reset
    modalImg.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        resetTransform();
    });
    
    // Fermer avec Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});