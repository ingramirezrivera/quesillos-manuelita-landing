import { useEffect, useRef, useState } from "react";
import logo from "../assets/images/logos/logo.jpeg";

const SECTIONS = ["hero", "products", "about", "contact"];

export default function Header() {
  const [active, setActive] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);
  const firstLinkRef = useRef(null);

  // Click en links: scroll suave + marcar activo + cerrar menú
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
      setIsOpen(false);
    }
  };

  // Scroll-Spy con IntersectionObserver
  useEffect(() => {
    const opts = { root: null, threshold: 0.6 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (entry.isIntersecting) setActive(id);
      });
    }, opts);

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Bloquear scroll del body cuando el menú esté abierto
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      // Al abrir, mover foco al primer link para accesibilidad
      if (firstLinkRef.current) firstLinkRef.current.focus();
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  // Cerrar en resize a desktop, con Escape y al cambiar hash
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    const onHash = () => setIsOpen(false);

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", onHash);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const linkBase =
    "inline-block transform-gpu transition duration-200 " +
    "hover:scale-110 focus:scale-110 hover:drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)] " +
    "focus:drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]";

  const linkClass = (id) =>
    `${linkBase} ${
      active === id ? "text-primary font-semibold" : "text-gray-700"
    }`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 relative rounded-b-3xl">
      <div className="relative flex items-center px-4 h-16 md:h-16 max-w-7xl mx-auto">
        {/* Logo */}
        <img
          src={logo}
          alt="Quesillos Manuelita"
          className="
            flex-shrink-0 rounded-xl drop-shadow-xl mr-3 z-50
            h-[78px] w-auto ml-4
            md:h-28 md:w-auto md:-mb-4 md:mr-6 mt-14 hover:scale-105 transition-transform duration-200
          "
        />

        {/* NAV DESKTOP */}
        <nav
          className="ml-auto hidden md:block"
          aria-label="Navegación principal"
        >
          <ul className="flex gap-8 font-medium">
            <li>
              <a
                href="#hero"
                className={linkClass("hero")}
                onClick={(e) => handleNavClick(e, "hero")}
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#products"
                className={linkClass("products")}
                onClick={(e) => handleNavClick(e, "products")}
              >
                Productos
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={linkClass("about")}
                onClick={(e) => handleNavClick(e, "about")}
              >
                Sobre nosotros
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={linkClass("contact")}
                onClick={(e) => handleNavClick(e, "contact")}
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>

        {/* BOTÓN HAMBURGUESA (MÓVIL) */}
        <button
          type="button"
          className="ml-auto inline-flex items-center justify-center md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? (
            // Icono cerrar (X)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            // Icono hamburguesa
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* OVERLAY (MÓVIL) - Cierra al tocar fuera */}
      {isOpen && (
        <button
          aria-label="Cerrar menú"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-30"
        />
      )}

      {/* MENÚ MÓVIL (panel) */}
      <div
        id="mobile-menu"
        className={`
          md:hidden absolute mt-4 right-1 top-full z-40 text-center
          w-[78%] max-w-xs rounded-xl border shadow-xl
          bg-white/95 backdrop-blur-sm
          transition-all duration-10 origin-top-right
          ${
            isOpen
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <h2 id="mobile-menu-title" className="sr-only">
          Menú de navegación
        </h2>
        <ul className="px-4 py-4 space-y-4 font-medium">
          <li>
            <a
              ref={firstLinkRef}
              href="#hero"
              className={linkClass("hero")}
              onClick={(e) => handleNavClick(e, "hero")}
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="#products"
              className={linkClass("products")}
              onClick={(e) => handleNavClick(e, "products")}
            >
              Productos
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={linkClass("about")}
              onClick={(e) => handleNavClick(e, "about")}
            >
              Sobre nosotros
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={linkClass("contact")}
              onClick={(e) => handleNavClick(e, "contact")}
            >
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
