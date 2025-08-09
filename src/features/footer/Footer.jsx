import React from "react";
import logo from "../../assets/images/logos/logo.jpeg";
import logoCatar from "../../assets/images/logos/districatar-logo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + descripción */}
        <div>
          <img
            src={logo}
            alt="Logo Quesillos Manuelita"
            className="w-24 mb-4 rounded-xl"
          />
          <p className="text-sm text-gray-400">
            Quesillos Manuelita - El sabor que une tradición y frescura.
          </p>
        </div>

        {/* Enlaces útiles */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Navegación</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="#hero" className="hover:text-white">
                Inicio
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white">
                Sobre nosotros
              </a>
            </li>
            <li>
              <a href="#products" className="hover:text-white">
                Productos
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <img
            src={logoCatar}
            alt="Logo"
            className="w-40 h-30 mb-0 object-contain"
          />
          <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-300 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 2C4.8 2 2.8 2.8 1.3 4.3S0 7.3 0 9.5v5c0 2.2.8 4.2 2.3 5.7S4.8 22 7 22h10c2.2 0 4.2-.8 5.7-2.3S24 16.7 24 14.5v-5c0-2.2-.8-4.2-2.3-5.7S19.2 2 17 2H7zm5 5a5 5 0 110 10 5 5 0 010-10zm6.5-.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM7 4h10c1.5 0 2.9.6 3.9 1.6C22.4 6.6 23 8 23 9.5v5c0 1.5-.6 2.9-1.6 3.9-1 1-2.4 1.6-3.9 1.6H7c-1.5 0-2.9-.6-3.9-1.6C2.6 17.4 2 16 2 14.5v-5C2 8 2.6 6.6 3.6 5.6 4.6 4.6 6 4 7 4z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-300 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.6 9.1 8.3 9.9v-7H8v-3h2.3V9.5c0-2.3 1.4-3.5 3.4-3.5 1 0 2 .2 2 .2v2.2H14c-1.1 0-1.5.7-1.5 1.4V12H16l-.5 3h-2v7c4.7-.8 8.3-4.9 8.3-9.9z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Derechos de autor */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Quesillos Manuelita. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
