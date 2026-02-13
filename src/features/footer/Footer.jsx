import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logos/logo.jpeg";
import { trackWhatsAppClick } from "../../utils/tracking";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* COLUMNA 1: Marca Principal */}
        <div className="flex flex-col items-start">
          <img
            src={logo}
            alt="Logo Quesillos Manuelita"
            className="w-24 h-24 rounded-2xl mb-6 shadow-lg shadow-white/5"
          />
          <h3 className="text-white text-lg font-bold mb-2">
            Quesillos Manuelita
          </h3>
          <p className="text-sm leading-relaxed mb-6 max-w-xs">
            El sabor que une tradición y frescura. Queso Mozzarella del norte
            antioqueño para tu mesa.
          </p>
        </div>

        {/* COLUMNA 2: Navegación Rápida */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6">Explora</h3>
          <ul className="space-y-4">
            <li>
              <a
                href="#hero"
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>{" "}
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 bg-slate-700 hover:bg-primary rounded-full transition-colors"></span>{" "}
                Sobre nosotros
              </a>
            </li>
            <li>
              <a
                href="#products"
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 bg-slate-700 hover:bg-primary rounded-full transition-colors"></span>{" "}
                Productos
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 bg-slate-700 hover:bg-primary rounded-full transition-colors"></span>{" "}
                Contacto
              </a>
            </li>
            <li>
              <Link
                to="/faq"
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 bg-slate-700 hover:bg-primary rounded-full transition-colors"></span>{" "}
                FAQ Preguntas frecuentes
              </Link>
            </li>
          </ul>
        </div>

        {/* COLUMNA 3: Legal */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6">Legal</h3>
          <ul className="space-y-4">
            <li>
              <Link
                to="/terminos"
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 bg-slate-700 hover:bg-primary rounded-full transition-colors"></span>{" "}
                Términos y Condiciones
              </Link>
            </li>
            <li>
              <Link
                to="/politica-datos"
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 bg-slate-700 hover:bg-primary rounded-full transition-colors"></span>{" "}
                Política de Tratamiento de Datos
              </Link>
            </li>
            <li>
              <Link
                to="/politica-cookies"
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 bg-slate-700 hover:bg-primary rounded-full transition-colors"></span>{" "}
                Política de Cookies
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new Event("open-cookie-preferences"))
                }
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 bg-slate-700 hover:bg-primary rounded-full transition-colors"></span>{" "}
                Configurar cookies
              </button>
            </li>
          </ul>
        </div>

        {/* COLUMNA 4: Distribuidor y Redes */}
        <div>
          <div className="mb-8">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4 opacity-70">
              Dónde comprar
            </h3>
            <div className="grid gap-3">
              <a
                href={`https://wa.me/573042091223?text=${encodeURIComponent("Hola, quiero información para Medellín y Área Metropolitana.")}`}
                onClick={() =>
                  trackWhatsAppClick({
                    zone: "medellin",
                    source: "footer",
                    phone: "573042091223",
                  })
                }
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 px-4 py-2 rounded-xl inline-flex items-center justify-center border border-white/10 text-sm font-semibold text-white hover:bg-primary hover:text-black hover:border-primary transition-colors"
              >
                Medellín
              </a>
              <a
                href={`https://wa.me/573009891200?text=${encodeURIComponent("Hola, quiero información para Oriente y Valle de San Nicolás.")}`}
                onClick={() =>
                  trackWhatsAppClick({
                    zone: "oriente",
                    source: "footer",
                    phone: "573009891200",
                  })
                }
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 px-4 py-2 rounded-xl inline-flex items-center justify-center border border-white/10 text-sm font-semibold text-white hover:bg-primary hover:text-black hover:border-primary transition-colors"
              >
                Oriente
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">Síguenos</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=100070905380130"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 md:p-2.5 bg-white/10 rounded-full hover:bg-primary hover:text-white transition-colors text-white"
              >
                <svg
                  className="w-6 h-6 md:w-7 md:h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/quesillosmanuelita/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 md:p-2.5 bg-white/10 rounded-full hover:bg-primary hover:text-white transition-colors text-white"
              >
                <svg
                  className="w-6 h-6 md:w-7 md:h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-slate-900 pt-8 text-center">
        <p className="text-sm text-slate-600">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-slate-400 font-semibold">
            Quesillos Manuelita S.A.S.
          </span>{" "}
          Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
