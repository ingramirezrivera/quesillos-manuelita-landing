import { useEffect, useRef, useState } from "react";
import { slides } from "./slides";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;
  const timerRef = useRef(null);
  const lastIndex = useRef(0);

  const goTo = (i) => {
    lastIndex.current = index;
    setIndex((i + total) % total);
  };
  const next = () => {
    lastIndex.current = index;
    setIndex((i) => (i + 1) % total);
  };
  const prev = () => {
    lastIndex.current = index;
    setIndex((i) => (i - 1 + total) % total);
  };

  // Autoplay
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 4500);
    return () => clearInterval(timerRef.current);
  }, [paused, total]);

  // Pausar si la pestaña no está visible
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Teclado: ← y →
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Deslizar en móvil
  const startX = useRef(0);
  const onPointerDown = (e) => {
    startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  };
  const onPointerUp = (e) => {
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
    const dx = endX - startX.current;
    const threshold = 40;
    if (dx > threshold) prev();
    if (dx < -threshold) next();
  };

  return (
    <section
      id="hero"
      role="region"
      aria-roledescription="carousel"
      aria-label="Galería planta Quesillos Manuelita"
      className="relative -mt-6 h-[70vh] md:h-[85vh] overflow-hidden"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchEnd={onPointerUp}
    >
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((s, i) => {
          const isActive = i === index;
          return (
            <div
              key={s.id}
              aria-hidden={!isActive}
              aria-label={`Slide ${i + 1} de ${total}`}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              <picture>
                <source
                  media="(min-width:768px)"
                  srcSet={s.desktop}
                  type="image/webp"
                />
                <img
                  src={s.mobile}
                  alt={s.alt}
                  className={`h-full w-full object-cover transform-gpu will-change-transform ${
                    isActive
                      ? "animate-zoomSlow"
                      : i === lastIndex.current
                        ? "scale-[1.08]"
                        : "scale-100"
                  }`}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                />
              </picture>

              {/* Gradiente */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Overlay */}
              <div className="absolute inset-0 flex items-end">
                <div className="max-w-7xl mx-auto px-4 w-full pb-8 md:pb-12">
                  <div className="max-w-xl text-white">
                    <h1 className="text-2xl md:text-5xl font-bold drop-shadow">
                      {s.title}
                    </h1>
                    <p className="mt-2 md:mt-3 text-sm md:text-lg opacity-95">
                      {s.text}
                    </p>
                    <div className="mt-4 flex gap-3">
                      <a
                        href="#about"
                        className="inline-flex items-center rounded-lg px-4 py-2 bg-primary text-black font-medium hover:bg-yellow-500"
                      >
                        Conócenos
                      </a>
                      <a
                        href="#products"
                        className="inline-flex items-center rounded-lg px-4 py-2 bg-white/90 text-gray-900 font-medium hover:bg-white"
                      >
                        Nuestros productos
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Flechas */}
      <button
        aria-label="Slide anterior"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 hover:bg-black/50 p-2 text-white"
      >
        ‹
      </button>
      <button
        aria-label="Slide siguiente"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 hover:bg-black/50 p-2 text-white"
      >
        ›
      </button>

      {/* Bullets */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir al slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              i === index ? "bg-white" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
