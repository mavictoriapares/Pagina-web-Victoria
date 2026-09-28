document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('aboutTrigger');
    const overlay = document.querySelector('.about-overlay');

    function togglePanel() {
        const isOpen = overlay.classList.toggle('is-open');
        document.body.classList.toggle('no-scroll', isOpen);
    }

    function closePanel() {
        overlay.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
    }

    // Botón About: abre y cierra
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        togglePanel();
    });

    // Solo cierra si el clic es en el fondo, no dentro de la tarjeta
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePanel();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePanel();
    });
});