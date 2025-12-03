import { useEffect, useRef, useState } from "react";
import { products } from "./productsData";
import logo from "../../assets/images/logos/logo.jpeg"; // Asegúrate de que esta ruta sea correcta

export default function Products() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);

  const handleOpen = (product) => {
    setSelected(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  // Manejo de la tecla ESC y bloqueo del scroll trasero
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && handleClose();
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.classList.add("overflow-hidden");
      // Foco al modal para accesibilidad
      setTimeout(() => dialogRef.current?.focus(), 0);
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Quesos</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Calidad artesanal y sabor auténtico en cada bocado. Descubre la
          variedad perfecta para tus recetas.
        </p>

        {/* --- Grilla de productos --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <button
                type="button"
                onClick={() => handleOpen(product)}
                className="block w-full h-64 overflow-hidden group relative"
                aria-label={`Ver detalles de ${product.name}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay sutil al pasar el mouse */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </button>

              <div className="p-5 flex flex-col items-center">
                <h3 className="text-xl font-bold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2 text-center line-clamp-2">
                  {product.description}
                </p>
                <button
                  type="button"
                  onClick={() => handleOpen(product)}
                  className="mt-5 inline-block bg-primary text-black font-medium px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors shadow-sm"
                >
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Modal Detallado --- */}
      {open && selected && (
        <>
          {/* Fondo oscuro (backdrop) */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Contenedor del modal */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Detalles de ${selected.name}`}
            ref={dialogRef}
            tabIndex={-1}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl relative overflow-visible animate-fadeIn">
              {/* Logo Flotante (Desktop) */}
              <img
                src={logo}
                alt="Quesillos Manuelita"
                className="hidden md:block absolute -left-6 -top-10 h-24 w-auto rounded-xl shadow-lg z-50 border-2 border-white"
              />
              {/* Logo Flotante (Móvil) */}
              <img
                src={logo}
                alt="Quesillos Manuelita"
                className="md:hidden absolute left-4 -top-10 h-20 w-auto rounded-lg shadow-lg z-50 border-2 border-white"
              />

              {/* Botón Cerrar Flotante (Móvil) */}
              <button
                onClick={handleClose}
                className="md:hidden absolute right-2 top-2 z-50 bg-white/80 rounded-full p-2 text-gray-600 hover:text-red-500"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
                {/* COLUMNA 1: Imagen (Componente Optimizado) */}
                <ModalImages selected={selected} />

                {/* COLUMNA 2: Información */}
                <div className="p-8 md:p-10 flex flex-col justify-center text-left">
                  <div className="hidden md:flex items-start justify-between mb-4">
                    <h3 className="text-3xl font-bold text-gray-900">
                      {selected.name}
                    </h3>
                    <button
                      onClick={handleClose}
                      className="text-gray-400 hover:text-gray-700 transition-colors p-1"
                      aria-label="Cerrar"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Título en móvil (ya que el de arriba está oculto) */}
                  <h3 className="md:hidden text-2xl font-bold text-gray-900 mb-4 mt-2">
                    {selected.name}
                  </h3>

                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {selected.description}
                  </p>

                  {/* Especificaciones */}
                  {Array.isArray(selected.specs) &&
                    selected.specs.length > 0 && (
                      <div className="bg-gray-50 rounded-xl p-5 mb-8 border border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                          Características
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                          {selected.specs.map((s, idx) => (
                            <li key={idx} className="flex items-center">
                              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  <div className="mt-auto">
                    <a
                      href={`https://wa.me/573042091223?text=${encodeURIComponent(
                        `Hola, estoy interesado en el ${selected.name} que vi en su web.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full md:w-auto inline-flex justify-center items-center gap-2 rounded-xl px-8 py-4 bg-primary text-black font-bold text-lg hover:bg-yellow-400 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                      <span>Pedir por WhatsApp</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

// --- SUBCOMPONENTE DE IMÁGENES (OPTIMIZADO PARA TU SITUACIÓN) ---
function ModalImages({ selected }) {
  const [showAlt, setShowAlt] = useState(false);
  // Solo permitimos alternar si existe imageAlt
  const canToggle = Boolean(selected.imageAlt);

  return (
    <div className="relative h-80 md:h-full bg-white md:rounded-l-2xl overflow-hidden group">
      {/* IMAGEN PRINCIPAL: 'object-cover' es la clave para que se vea asombrosa */}
      <img
        src={showAlt && canToggle ? selected.imageAlt : selected.image}
        alt={selected.name}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />

      {/* Botones de alternancia (Solo aparecen si hay 2 fotos) */}
      {canToggle && (
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-4 z-20">
          {[false, true].map((isAlt, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setShowAlt(isAlt);
              }}
              aria-label={
                isAlt ? "Ver imagen alternativa" : "Ver imagen principal"
              }
              className={`h-4 w-4 rounded-full border-2 border-white shadow-lg transition-all transform hover:scale-125 
                ${showAlt === isAlt ? "bg-primary scale-110" : "bg-white/60 hover:bg-white"}`}
            />
          ))}
        </div>
      )}

      {/* Sombra suave abajo para que los botones resalten */}
      {canToggle && (
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      )}
    </div>
  );
}
