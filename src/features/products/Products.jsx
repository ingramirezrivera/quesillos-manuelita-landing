import { useEffect, useRef, useState } from "react";
import { products } from "./productsData";
import { Link } from "react-router-dom";
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
              className="flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <button
                type="button"
                onClick={() => handleOpen(product)}
                className="block w-auto h-100 overflow-hidden group relative"
                aria-label={`Ver detalles de ${product.name}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                {/* Overlay sutil al pasar el mouse */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </button>

              <div className="p-5 flex flex-col items-center flex-grow">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 h-14">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 text-center line-clamp-2">
                    {product.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpen(product)}
                  className="mt-auto inline-block bg-primary text-black font-medium px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors shadow-sm"
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
            // Alineamos al inicio, añadimos padding superior y permitimos scroll
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 overflow-y-auto"
          >
            {/* Contenedor de la tarjeta del modal con margen superior para el logo */}
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl relative animate-fadeIn">
              {/* Logo Flotante (Desktop) */}
              <img
                src={logo}
                alt="Quesillos Manuelita"
                className="hidden md:block absolute -left-6 -top-12 h-24 w-auto rounded-xl shadow-lg z-50 border-2 border-white"
              />
              {/* Logo Flotante (Móvil) */}
              <img
                src={logo}
                alt="Quesillos Manuelita"
                className="md:hidden absolute left-4 -top-12 h-20 w-auto rounded-lg shadow-lg z-50 border-2 border-white"
              />

              {/* Botón Cerrar Flotante (Móvil) */}
              <button
                onClick={handleClose}
                // Ajustado para estar dentro del modal y no sobre el logo
                className="md:hidden absolute right-3 -top-9 z-50 bg-white/80 rounded-full p-1 text-gray-600 hover:text-red-500"
              >
                ✕
              </button>

              {/* Contenedor con altura máxima y scroll */}
              <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto rounded-2xl">
                {/* COLUMNA 1: Imagen (Componente Optimizado) */}
                <ModalImages selected={selected} />

                {/* COLUMNA 2: Información */}
                <div className="p-8 md:p-10 flex flex-col text-left">
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
                    <Link
                      to={`/pedir?producto=${encodeURIComponent(selected.name)}`}
                      className="w-full md:w-auto inline-flex justify-center items-center gap-2 rounded-xl px-8 py-4 bg-primary text-black font-bold text-lg hover:bg-yellow-400 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                      <span>Hacer pedido</span>
                    </Link>
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
  // Estado para la galería de imágenes (si no hay video)
  const [showAltImage, setShowAltImage] = useState(false);
  // Estado para controlar la reproducción del video
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  // Estado para saber si el video ya se reprodujo una vez (para el efecto sorpresa)
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  const hasVideo = Boolean(selected.videoSrc);
  const canToggleImages = Boolean(selected.imageAlt);

  // Reinicia el estado cuando el producto seleccionado cambia
  useEffect(() => {
    setHasPlayedOnce(false);
    setIsPlayingVideo(false);
    setShowAltImage(false);
  }, [selected.id]);

  // Reproduce el video automáticamente después de 3 segundos
  useEffect(() => {
    let timer;
    if (hasVideo) {
      timer = setTimeout(() => {
        setIsPlayingVideo(true);
      }, 3000); // 3 segundos de espera
    }

    // Limpia el temporizador si el componente se desmonta o el producto cambia
    return () => {
      clearTimeout(timer);
    };
  }, [selected.id, hasVideo]);

  const handlePlayVideo = (e) => {
    e.stopPropagation();
    if (hasVideo) {
      setIsPlayingVideo(true);
    }
  };

  const handleVideoEnd = () => {
    setIsPlayingVideo(false);
    setHasPlayedOnce(true); // Marcamos que ya se reprodujo
  };

  return (
    <div className="relative h-80 md:h-full bg-white md:rounded-l-2xl overflow-hidden group">
      {/* Lógica con Video */}
      {hasVideo && (
        <>
          <img
            src={selected.image}
            alt={selected.name}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ${
              isPlayingVideo ? "opacity-0" : "opacity-100"
            }`}
          />
          {/* El botón de play solo aparece si el video no se está reproduciendo Y ya se vio al menos una vez */}
          {!isPlayingVideo && hasPlayedOnce && (
            <button
              onClick={handlePlayVideo}
              // Se muestra al pasar el mouse
              className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Reproducir video"
            >
              <div className="bg-white/80 rounded-full p-4 shadow-lg">
                <svg
                  className="w-12 h-12 text-black"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}
          <video
            src={selected.videoSrc}
            onEnded={handleVideoEnd}
            autoPlay
            controls
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isPlayingVideo ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
        </>
      )}

      {/* Lógica sin Video (Galería de imágenes) */}
      {!hasVideo && (
        <>
          <img
            src={
              showAltImage && canToggleImages
                ? selected.imageAlt
                : selected.image
            }
            alt={selected.name}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          {canToggleImages && (
            <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-4 z-20">
              {[false, true].map((isAlt, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAltImage(isAlt);
                  }}
                  aria-label={
                    isAlt ? "Ver imagen alternativa" : "Ver imagen principal"
                  }
                  className={`h-4 w-4 rounded-full border-2 border-white shadow-lg transition-all transform hover:scale-125 ${showAltImage === isAlt ? "bg-primary scale-110" : "bg-white/60 hover:bg-white"}`}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Sombra suave abajo para que los botones de la galería resalten */}
      {!hasVideo && canToggleImages && (
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      )}
    </div>
  );
}
