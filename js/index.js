    // --- ABOUT ---
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


    // --- RATÓN "VIEW PROJECT" --
        const cursorLabel = document.querySelector('.cursor-label');
        const hoverTargets = document.querySelectorAll('.media__wrapper, .div__content_driv img');
        const DEFAULT_LABEL = 'View project';

        if (cursorLabel) {
            document.addEventListener('mousemove', (e) => {
                cursorLabel.style.transform =
                    `translate(${e.clientX - cursorLabel.offsetWidth / 2}px, ${e.clientY - cursorLabel.offsetHeight / 2}px)`;
            });

            hoverTargets.forEach((el) => {
                el.addEventListener('mouseenter', () => {
                    // Si el elemento tiene data-label usa ese texto, si no el de por defecto
                    cursorLabel.textContent = el.dataset.label || DEFAULT_LABEL;
                    cursorLabel.classList.add('is-visible');
                });
                el.addEventListener('mouseleave', () => cursorLabel.classList.remove('is-visible'));
            });
        }

// --- AVISO "COMING SOON" EN MÓVIL (tap) ---
const toast = document.createElement('div');
toast.className = 'cursor-label cursor-label--toast';
toast.setAttribute('aria-hidden', 'true');
document.body.appendChild(toast);

let toastTimer;

function hideToast() {
    toast.classList.remove('is-visible');
    clearTimeout(toastTimer);
}

document.querySelectorAll('[data-label]').forEach((el) => {
    el.addEventListener('click', () => {
        // Solo en táctil (se comprueba al hacer click, no al cargar)
        if (!window.matchMedia('(hover: none)').matches && !window.matchMedia('(pointer: coarse)').matches) return;

        const rect = el.getBoundingClientRect();

        toast.textContent = el.dataset.label;

        toast.style.transform =
            `translate(${rect.left + rect.width / 2 - toast.offsetWidth / 2}px, ${rect.top + rect.height / 2 - toast.offsetHeight / 2}px)`;

        toast.classList.add('is-visible');

        clearTimeout(toastTimer);
        toastTimer = setTimeout(hideToast, 1500);
    });
});

window.addEventListener('scroll', hideToast, { passive: true });

