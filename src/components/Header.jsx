export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <nav>
          <ul className="flex gap-6 text-gray-700 font-medium">
            <li><a href="#hero" className="hover:text-primary">Inicio</a></li>
            <li><a href="#about" className="hover:text-primary">Sobre nosotros</a></li>
            <li><a href="#products" className="hover:text-primary">Productos</a></li>
            <li><a href="#contact" className="hover:text-primary">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

