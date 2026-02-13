import { useEffect, useRef, useState } from "react";
import logo from "../assets/images/logos/logo.jpeg";

// IDs de las secciones del sitio
const SECTIONS = ["hero", "products", "about", "allies", "contact"];

const LABEL_BY_ID = {
  hero: "Inicio",
  products: "Productos",
  about: "Sobre nosotros",
  allies: "Aliados",
  contact: "Contacto",
};

export default function Header() {
  const [active, setActive] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);
  const firstLinkRef = useRef(null);
  const visibilityRef = useRef(
    SECTIONS.reduce((acc, id) => ({ ...acc, [id]: 0 }), {}),
  );

  // 🔹 Navegación con scroll suave + cerrar menú móvil
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
      setIsOpen(false);
    }
  };

  // 🔹 ScrollSpy: detecta qué sección está visible
  useEffect(() => {
    const thresholds = Array.from({ length: 11 }, (_, i) => i / 10);
    const opts = {
      root: null,
      threshold: thresholds,
      rootMargin: "-20% 0px -45% 0px",
    };
    const observer = new IntersectionObserver((entries) => {
      let changed = false;
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (!SECTIONS.includes(id)) return;
        visibilityRef.current[id] = entry.isIntersecting
          ? entry.intersectionRatio
          : 0;
        changed = true;
      });

      if (!changed) return;

      let nextActive = active;
      let maxRatio = -1;

      SECTIONS.forEach((id) => {
        const ratio = visibilityRef.current[id] || 0;
        if (ratio > maxRatio) {
          maxRatio = ratio;
          nextActive = id;
        }
      });

      if (nextActive !== active) {
        setActive(nextActive);
      }
    }, opts);

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [active]);

  // 🔹 Bloquear scroll al abrir menú móvil
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      if (firstLinkRef.current) firstLinkRef.current.focus();
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  // 🔹 Cierra menú en eventos específicos (resize, Escape, cambio de hash)
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

  // 🔹 Estilo base de los links
  const linkBase =
    "inline-block transform-gpu transition duration-200 hover:scale-110 focus:scale-110";

  const linkClass = (id) =>
    `${linkBase} ${active === id ? "text-primary font-semibold" : "text-gray-700"}`;

  return (
    <header
      className="
        sticky top-0 z-40 w-full bg-white
        rounded-b-3xl shadow-xl
        transition-all duration-300
      "
    >
      <div className="relative flex items-center px-4 h-16 md:h-16 max-w-7xl mx-auto">
        {/* 🔹 Logo */}
        <img
          src={logo}
          alt="Quesillos Manuelita"
          className="
            flex-shrink-0 rounded-xl drop-shadow-xl mr-3 z-50
            h-[84px] w-auto ml-4
            md:h-28 md:w-auto md:-mb-4 md:mr-6 mt-14
            hover:scale-105 transition-transform duration-200
          "
        />

        {/* 🔹 Navegación principal (desktop) */}
        <nav
          className="ml-auto hidden md:block"
          aria-label="Navegación principal"
        >
          <ul className="flex gap-8 font-medium text-lg">
            {SECTIONS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={linkClass(id)}
                  onClick={(e) => handleNavClick(e, id)}
                >
                  {LABEL_BY_ID[id] || id}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* 🔹 Botón hamburguesa (mobile) */}
        <button
          type="button"
          className="ml-auto inline-flex items-center justify-center md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? (
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
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-gray-700"></span>
              <span className="block w-6 h-0.5 bg-gray-700"></span>
              <span className="block w-6 h-0.5 bg-gray-700"></span>
            </div>
          )}
        </button>
      </div>

      {/* 🔹 Overlay (mobile) */}
      {isOpen && (
        <button
          aria-label="Cerrar menú"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-30"
        />
      )}

      {/* 🔹 Menú móvil */}
      <div
        id="mobile-menu"
        className={`
          md:hidden absolute mt-4 right-1 top-full z-40 text-center
          w-[78%] max-w-xs rounded-xl border shadow-xl
          bg-white/95 backdrop-blur-sm
          transition-all duration-200 origin-top-right
          ${isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <h2 id="mobile-menu-title" className="sr-only">
          Menú de navegación
        </h2>
        <ul className="px-4 py-4 space-y-8 font-medium text-xl ">
          {SECTIONS.map((id, i) => (
            <li key={id}>
              <a
                ref={i === 0 ? firstLinkRef : null}
                href={`#${id}`}
                className={linkClass(id)}
                onClick={(e) => handleNavClick(e, id)}
              >
                {LABEL_BY_ID[id] || id}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
