document.addEventListener('DOMContentLoaded', () => {
    const book = document.querySelector('.book');
    const spreads = document.querySelectorAll('.page-spread');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentPage = 0;

    // Control de música
    const spotifyPlayer = document.getElementById('spotifyPlayer');
    const toggleButton = document.getElementById('toggleMusic');
    let isPlaying = true;

    function showPage(index) {
        // Ocultar todas las páginas
        spreads.forEach(spread => {
            spread.style.display = 'none';
            spread.classList.remove('active');
        });
        
        // Mostrar la página seleccionada
        spreads[index].style.display = 'flex';
        spreads[index].classList.add('active');
        
        // Actualizar los puntos de navegación
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        // Actualizar estado de los botones
        prevBtn.style.opacity = index === 0 ? '0.5' : '1';
        nextBtn.style.opacity = index === spreads.length - 1 ? '0.5' : '1';
        
        currentPage = index;
    }

    // Navegación con botones
    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            showPage(currentPage - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < spreads.length - 1) {
            showPage(currentPage + 1);
        }
    });

    // Navegación con puntos
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showPage(index);
        });
    });

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && currentPage < spreads.length - 1) {
            showPage(currentPage + 1);
        } else if (e.key === 'ArrowLeft' && currentPage > 0) {
            showPage(currentPage - 1);
        }
    });

    // Control de música
    function toggleMusic() {
        if (isPlaying) {
            spotifyPlayer.contentWindow.postMessage('{"command":"pause"}', '*');
            toggleButton.textContent = '🎵 Reproducir Música';
        } else {
            spotifyPlayer.contentWindow.postMessage('{"command":"play"}', '*');
            toggleButton.textContent = '🎵 Pausar Música';
        }
        isPlaying = !isPlaying;
    }

    toggleButton.addEventListener('click', toggleMusic);

    // Efectos visuales
    function addVisualEffects() {
        // Efectos en las citas
        const quotes = document.querySelectorAll('.quote');
        quotes.forEach(quote => {
            quote.addEventListener('mouseover', () => {
                quote.style.color = '#8b4513';
                quote.style.transform = 'scale(1.02)';
            });
            
            quote.addEventListener('mouseout', () => {
                quote.style.color = '#4a4a4a';
                quote.style.transform = 'scale(1)';
            });
        });

        // Crear estrellas
        const constellations = document.querySelectorAll('.constellation');
        constellations.forEach(constellation => {
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('span');
                star.classList.add('star');
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                constellation.appendChild(star);
            }
        });
    }

    // Inicialización
    function initialize() {
        // Mostrar la primera página
        showPage(0);
        
        // Agregar efectos visuales
        addVisualEffects();
        
        // Iniciar música automáticamente
        setTimeout(() => {
            spotifyPlayer.contentWindow.postMessage('{"command":"play"}', '*');
        }, 1000);
    }

    // Iniciar todo
    initialize();
}); 