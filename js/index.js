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


// --- OCULTAR HEADER Y GRID AL SCROLLEAR ---
const hideOnScroll = document.querySelectorAll('.header, .div__section_grid:has(img)');
const showOnScroll = document.querySelectorAll('.div__section_grid:not(:has(img))');
const SHOW_AFTER = 300; // px de scroll antes de que aparezcan los tags

let lastScrollY = window.pageYOffset;
let ticking = false;

function onScroll() {
    const currentY = Math.max(window.pageYOffset, 0);
    const aboutOpen = document.querySelector('.about-overlay.is-open');
    const delta = currentY - lastScrollY;

    // Tags de proyecto: aparecen tras SHOW_AFTER px, siempre
    showOnScroll.forEach(el =>
        el.classList.toggle('is-visible', currentY > SHOW_AFTER && !aboutOpen)
    );

    if (aboutOpen) {
        lastScrollY = currentY;
        return;
    }

    if (currentY <= 80) {
        hideOnScroll.forEach(el => el.classList.remove('is-hidden'));
        lastScrollY = currentY;
        return;
    }

    if (Math.abs(delta) > 6) {
        const shouldHide = delta > 0;
        hideOnScroll.forEach(el => el.classList.toggle('is-hidden', shouldHide));
        lastScrollY = currentY;
    }
}

window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
        onScroll();
        ticking = false;
    });
}, { passive: true });

onScroll(); // estado correcto al cargar

