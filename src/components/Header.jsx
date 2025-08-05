import logo from '../assets/logo.jpeg';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-20 realtive rounded-b-3xl bg-white">
      <div className="max-w-7xl mx-auto flex items-center px-4 py-2 h-16">
        {/* Logo a la izquierda con una sombra y bordes redondeados */}
        <img
          src={logo}
          alt="Quesillos Manuelita"
          className="hover:scale-105 transition-transform duration-200 h-28 mt-20 w-auto -mb-4 rounded-xl drop-shadow-2xl mr-6 flex-shrink-0"
        />

        {/* Menú de navegación alineado a la derecha */}
        <nav className="ml-auto">
          <ul className="flex gap-8 text-gray-700 font-medium">
            <li>
              <a href="#hero" className="inline-block transform-gpu transition-transform duration-200 hover:scale-110 focus:scale-115 hover:drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] ">
                Inicio
              </a>
            </li>
            <li>
              <a href="#products" className="inline-block transform-gpu transition-transform duration-200 hover:scale-110 focus:scale-115 hover:drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] ">
                Productos
              </a>
            </li>
            <li>
              <a href="#about" className="inline-block transform-gpu transition-transform duration-200 hover:scale-110 focus:scale-115 hover:drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] ">
                Sobre nosotros
              </a>
            </li>
            
            <li>
              <a href="#contact" className="inline-block transform-gpu transition-transform duration-200 hover:scale-110 focus:scale-115 hover:drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]  ">
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

