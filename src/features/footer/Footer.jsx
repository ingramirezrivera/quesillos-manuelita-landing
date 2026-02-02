import React from "react";
import logo from "../../assets/images/logos/logo.jpeg";
import logoCatar from "../../assets/images/logos/districatar-logo.png";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
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
            El sabor que une tradición y frescura. Productos lácteos del Norte
            Antioqueño para tu mesa.
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
          </ul>
        </div>

        {/* COLUMNA 3: Distribuidor y Redes */}
        <div>
          {/* Bloque Districatar */}
          <div className="mb-8">
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4 opacity-70">
              Donde comprar
            </h3>
            <div className="bg-white/5 p-4 rounded-xl inline-block border border-white/10">
              <img
                src={logoCatar}
                alt="Logo Districatar"
                className="h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Síguenos</h3>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="bg-slate-900 p-3 rounded-full text-slate-400 hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 2C4.8 2 2.8 2.8 1.3 4.3S0 7.3 0 9.5v5c0 2.2.8 4.2 2.3 5.7S4.8 22 7 22h10c2.2 0 4.2-.8 5.7-2.3S24 16.7 24 14.5v-5c0-2.2-.8-4.2-2.3-5.7S19.2 2 17 2H7zm5 5a5 5 0 110 10 5 5 0 010-10zm6.5-.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM7 4h10c1.5 0 2.9.6 3.9 1.6C22.4 6.6 23 8 23 9.5v5c0 1.5-.6 2.9-1.6 3.9-1 1-2.4 1.6-3.9 1.6H7c-1.5 0-2.9-.6-3.9-1.6C2.6 17.4 2 16 2 14.5v-5C2 8 2.6 6.6 3.6 5.6 4.6 4.6 6 4 7 4z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="bg-slate-900 p-3 rounded-full text-slate-400 hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Copyright */}
      <div className="mt-16 border-t border-slate-900 pt-8 text-center">
        <p className="text-sm text-slate-600">
          © {new Date().getFullYear()}{" "}
          <span className="text-slate-400 font-semibold">
            Quesillos Manuelita S.A.S.
          </span>{" "}
          Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
