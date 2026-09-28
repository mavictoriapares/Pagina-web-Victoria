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
        // Fotos del index (.media__wrapper) y del grid (imágenes de .div__content_driv)
        const hoverTargets = document.querySelectorAll('.media__wrapper, .div__content_driv img');

        if (cursorLabel) {
            // La etiqueta sigue al ratón (se centra restando la mitad de su tamaño)
            document.addEventListener('mousemove', (e) => {
                cursorLabel.style.transform =
                    `translate(${e.clientX - cursorLabel.offsetWidth / 2}px, ${e.clientY - cursorLabel.offsetHeight / 2}px)`;
            });

            // Se muestra al entrar en una foto y se oculta al salir
            hoverTargets.forEach((el) => {
                el.addEventListener('mouseenter', () => cursorLabel.classList.add('is-visible'));
                el.addEventListener('mouseleave', () => cursorLabel.classList.remove('is-visible'));
            });
        }