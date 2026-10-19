```javascript
/* =========================================
   NEXO 3D - JAVASCRIPT PRINCIPAL
   Proyecto: Desarrollo de Software V
========================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // 1. SELECCIÓN DE ELEMENTOS
    // =========================================

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navItems = document.querySelectorAll("#nav-links a");
    const currentYear = document.getElementById("current-year");

    // Activa las mejoras visuales solo cuando JavaScript funciona.
    document.documentElement.classList.add("js-ready");


    // =========================================
    // 2. MENÚ DE NAVEGACIÓN PARA MÓVILES
    // =========================================

    function closeMenu() {
        if (!menuToggle || !navLinks) {
            return;
        }

        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");

        document.body.classList.remove("menu-open");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    }

    function openMenu() {
        if (!menuToggle || !navLinks) {
            return;
        }

        navLinks.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Cerrar menú");

        document.body.classList.add("menu-open");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        }
    }

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });

        // Cierra el menú al seleccionar una sección.
        navItems.forEach((item) => {

            item.addEventListener("click", () => {
                closeMenu();
            });

        });

        // Cierra el menú al pulsar Escape.
        document.addEventListener("keydown", (event) => {

            if (
                event.key === "Escape" &&
                menuToggle.getAttribute("aria-expanded") === "true"
            ) {
                closeMenu();
                menuToggle.focus();
            }

        });

        // Cierra el menú al hacer clic fuera de él.
        document.addEventListener("click", (event) => {

            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            const clickedInsideMenu =
                navLinks.contains(event.target) ||
                menuToggle.contains(event.target);

            if (isOpen && !clickedInsideMenu) {
                closeMenu();
            }

        });

        // Si la pantalla vuelve al tamaño de escritorio,
        // restablece el estado del menú móvil.
        window.addEventListener("resize", () => {

            if (window.innerWidth > 760) {
                closeMenu();
            }

        });

    }


    // =========================================
    // 3. ANIMACIONES AL DESPLAZARSE
    // =========================================

    const revealElements = document.querySelectorAll(
        [
            ".section-heading",
            ".technology-card",
            ".about-visual",
            ".about-content",
            ".publication-card",
            ".recommendations-content",
            ".resource-card",
            ".cta-content"
        ].join(",")
    );

    // Evita ocultar contenido si el navegador no
    // admite IntersectionObserver.
    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    }


    // =========================================
    // 4. AÑO AUTOMÁTICO EN EL PIE DE PÁGINA
    // =========================================

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // =========================================
    // 5. EFECTO DE MOVIMIENTO EN TARJETAS
    // =========================================

    const interactiveCards = document.querySelectorAll(
        ".technology-card, .publication-card"
    );

    // Solo se activa en dispositivos con puntero preciso,
    // para evitar movimientos incómodos en teléfonos.
    const hasFinePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    if (hasFinePointer) {

        interactiveCards.forEach((card) => {

            card.addEventListener("mousemove", (event) => {

                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateY = ((x - centerX) / centerX) * 2;
                const rotateX = ((centerY - y) / centerY) * 2;

                card.style.transform =
                    `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

            });

            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    }


    // =========================================
    // 6. NAVEGACIÓN POR SECCIONES
    // =========================================

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const href = link.getAttribute("href");

            if (!href || href === "#") {
                return;
            }

            const target = document.querySelector(href);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "start"
                });

                // Actualiza el fragmento de la URL sin
                // provocar un salto brusco de pantalla.
                if (window.location.hash !== href) {
                    history.pushState(null, "", href);
                }

            }

        });

    });


    // =========================================
    // 7. MENSAJE DE INICIALIZACIÓN
    // =========================================

    console.info(
        "NEXO 3D está listo. ¡Explora el futuro de la tecnología!"
    );

});
```