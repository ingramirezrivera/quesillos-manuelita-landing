import { useEffect, useState } from 'react';
import logo from '../assets/logo.jpeg';

const SECTIONS = ['hero', 'products', 'about', 'contact'];

export default function Header() {
  const [active, setActive] = useState('hero');
  const [isOpen, setIsOpen] = useState(false);

  // Click en links: scroll suave + marcar activo
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActive(id);
      setIsOpen(false); // cerrar menú en móvil
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

  const linkBase =
    'inline-block transform-gpu transition duration-200 ' +
    'hover:scale-110 focus:scale-110 hover:drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)] ' +
    'focus:drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]';

  const linkClass = (id) =>
    `${linkBase} ${active === id ? 'text-primary font-semibold' : 'text-gray-700'}`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-20 realtive rounded-b-3xl bg-white">
      <div className="relative flex items-center px-4 h-16 md:h-16 max-w-7xl mx-auto">
        {/* Logo: grande y sobresaliente en desktop; compacto en móvil */}
        <img
          src={logo}
          alt="Quesillos Manuelita"
          className="
            flex-shrink-0 rounded-xl drop-shadow-xl mr-3
            h-16 w-auto ml-4             /* móvil */
            md:h-28 md:w-auto md:-mb-4 md:mr-6 mt-14 hover:scale-105 transition-transform duration-200 /* desktop: grande y sobresale abajo */
          "
        />

        {/* NAV DESKTOP */}
        <nav className="ml-auto hidden md:block">
          <ul className="flex gap-8 font-medium">
            <li><a href="#hero"     className={linkClass('hero')}     onClick={(e)=>handleNavClick(e,'hero')}>Inicio</a></li>
            <li><a href="#products" className={linkClass('products')} onClick={(e)=>handleNavClick(e,'products')}>Productos</a></li>
            <li><a href="#about"    className={linkClass('about')}    onClick={(e)=>handleNavClick(e,'about')}>Sobre nosotros</a></li>
            <li><a href="#contact"  className={linkClass('contact')}  onClick={(e)=>handleNavClick(e,'contact')}>Contacto</a></li>
          </ul>
        </nav>

        {/* BOTÓN HAMBURGUESA (MÓVIL) */}
        <button
          type="button"
          className="ml-auto inline-flex items-center justify-center md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          <span className="sr-only">Abrir menú</span>
          {isOpen ? (
            /* Icono cerrar (X) */
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            /* Icono hamburguesa */
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>
      </div>

      {/* MENÚ MÓVIL (panel) */}
      <div
        id="mobile-menu"
        className={`
          md:hidden border-t bg-white/95 backdrop-blur
          transition-all duration-200 overflow-hidden
          ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <ul className="px-4 py-3 space-y-3 font-medium">
          <li><a href="#hero"     className={linkClass('hero')}     onClick={(e)=>handleNavClick(e,'hero')}>Inicio</a></li>
          <li><a href="#products" className={linkClass('products')} onClick={(e)=>handleNavClick(e,'products')}>Productos</a></li>
          <li><a href="#about"    className={linkClass('about')}    onClick={(e)=>handleNavClick(e,'about')}>Sobre nosotros</a></li>
          <li><a href="#contact"  className={linkClass('contact')}  onClick={(e)=>handleNavClick(e,'contact')}>Contacto</a></li>
        </ul>
      </div>
    </header>
  );
}
