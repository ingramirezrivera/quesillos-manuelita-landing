import { useEffect, useRef, useState } from "react";
import { products } from "./productsData";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logos/logo.jpeg";

export default function Products() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);

  const productsRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const suppressNextCardClickRef = useRef(false);

  const handleOpen = (product) => {
    setSelected(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  const scroll = (direction) => {
    if (productsRef.current) {
      const { current } = productsRef;
      const cardWidth = current.firstElementChild?.clientWidth || 300;
      const gap = 24;
      const step = cardWidth + gap;
      const scrollAmount = direction === "left" ? -step : step;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleCardTouchStart = (e) => {
    const touch = e.touches?.[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    suppressNextCardClickRef.current = false;
  };

  const handleCardTouchMove = (e) => {
    const touch = e.touches?.[0];
    if (!touch) return;
    const dx = Math.abs(touch.clientX - touchStartRef.current.x);
    const dy = Math.abs(touch.clientY - touchStartRef.current.y);
    if (dx > 8 || dy > 8) suppressNextCardClickRef.current = true;
  };

  const handleCardClick = (product) => {
    if (suppressNextCardClickRef.current) {
      suppressNextCardClickRef.current = false;
      return;
    }
    handleOpen(product);
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && handleClose();
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.classList.add("overflow-hidden");
      setTimeout(() => dialogRef.current?.focus(), 0);
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <section id="products" className="py-16 bg-white relative z-20">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-7xl mx-auto px-0 md:px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 px-4">
          Nuestros Quesos
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto px-4">
          Calidad artesanal y sabor auténtico en cada bocado. Descubre la
          variedad perfecta para tus recetas.
        </p>

        {/* --- CONTENEDOR DE PRODUCTOS --- */}
        <div
          ref={productsRef}
          className="relative z-[70] flex md:grid md:grid-cols-4 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-proximity hide-scrollbar px-6 md:px-0 pb-8 w-full"
          style={{
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-x pan-y",
            overscrollBehaviorX: "contain",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              onTouchStart={handleCardTouchStart}
              onTouchMove={handleCardTouchMove}
              // CAMBIO 1: Agregué 'group' AQUÍ (en la tarjeta padre).
              // Ahora el hover se activa tocando CUALQUIER PARTE de la tarjeta.
              className="min-w-[85%] md:min-w-0 snap-center flex flex-col bg-white rounded-xl overflow-hidden shadow-lg md:hover:shadow-2xl transition-all duration-300 transform md:hover:-translate-y-1 border border-gray-100 group"
            >
              <div
                onClick={() => handleCardClick(product)}
                // CAMBIO 2: Quité 'group' de aquí para evitar confusiones, ya que ahora lo maneja el padre.
                className="block w-auto h-100 overflow-hidden relative cursor-pointer select-none"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  // El scale-110 reacciona al 'group' del padre (la tarjeta completa)
                  className="w-full h-full object-cover transition-transform duration-500 select-none md:group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
              </div>

              <div
                onTouchStart={handleCardTouchStart}
                onTouchMove={handleCardTouchMove}
                className="p-5 flex flex-col items-center flex-grow select-none"
              >
                <div className="mb-4 w-full">
                  <h3 className="text-xl font-bold text-gray-800 h-auto md:h-14 flex items-center justify-center">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 text-center line-clamp-2 px-2">
                    {product.description}
                  </p>
                </div>
                <button
                  type="button"
                  onTouchStart={handleCardTouchStart}
                  onTouchMove={handleCardTouchMove}
                  onClick={() => handleCardClick(product)}
                  className="mt-auto inline-block bg-primary text-black font-medium px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors shadow-sm"
                >
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- BOTONES DE CONTROL PARA MÓVIL --- */}
        <div className="relative z-[80] flex justify-center gap-4 md:hidden px-6 mt-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Anterior"
            className="bg-white border border-gray-200 text-gray-700 p-3 rounded-full shadow-lg active:scale-95 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Siguiente"
            className="bg-primary text-white p-3 rounded-full shadow-lg shadow-primary/30 active:scale-95 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* --- Modal Detallado (Sin Cambios) --- */}
      {open && selected && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
            onClick={handleClose}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Detalles de ${selected.name}`}
            ref={dialogRef}
            tabIndex={-1}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 overflow-y-auto"
          >
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl relative animate-fadeIn">
              <img
                src={logo}
                alt="Quesillos Manuelita"
                className="hidden md:block absolute -left-6 -top-12 h-24 w-auto rounded-xl shadow-lg z-50 border-2 border-white"
              />
              <img
                src={logo}
                alt="Quesillos Manuelita"
                className="md:hidden absolute left-4 -top-12 h-20 w-auto rounded-lg shadow-lg z-50 border-2 border-white"
              />
              <button
                onClick={handleClose}
                className="md:hidden absolute right-3 -top-9 z-50 bg-white/80 rounded-full p-1 text-gray-600 hover:text-red-500"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto rounded-2xl">
                <ModalImages selected={selected} />
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
                  <h3 className="md:hidden text-2xl font-bold text-gray-900 mb-4 mt-2">
                    {selected.name}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {selected.description}
                  </p>
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
                      to={`/pedir?producto=${encodeURIComponent(
                        selected.name,
                      )}`}
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

function ModalImages({ selected }) {
  const [showAltImage, setShowAltImage] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  const hasVideo = Boolean(selected.videoSrc);
  const canToggleImages = Boolean(selected.imageAlt);

  useEffect(() => {
    setHasPlayedOnce(false);
    setIsPlayingVideo(false);
    setShowAltImage(false);
  }, [selected.id]);

  useEffect(() => {
    let timer;
    if (hasVideo) {
      timer = setTimeout(() => {
        setIsPlayingVideo(true);
      }, 3000);
    }
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
    setHasPlayedOnce(true);
  };

  return (
    <div className="relative h-80 md:h-full bg-white md:rounded-l-2xl overflow-hidden group">
      {hasVideo && (
        <>
          <img
            src={selected.image}
            alt={selected.name}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ${
              isPlayingVideo ? "opacity-0" : "opacity-100"
            }`}
          />
          {!isPlayingVideo && hasPlayedOnce && (
            <button
              onClick={handlePlayVideo}
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

      {!hasVideo && (
        <>
          <img
            src={
              showAltImage && canToggleImages
                ? selected.imageAlt
                : selected.image
            }
            alt={selected.name}
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 md:group-hover:scale-105"
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
                  className={`h-4 w-4 rounded-full border-2 border-white shadow-lg transition-all transform hover:scale-125 ${
                    showAltImage === isAlt
                      ? "bg-primary scale-110"
                      : "bg-white/60 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          )}
        </>
      )}

      {!hasVideo && canToggleImages && (
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      )}
    </div>
  );
}
