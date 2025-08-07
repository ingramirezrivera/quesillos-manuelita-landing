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

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 4500);
    return () => clearInterval(timerRef.current);
  }, [paused, total]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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

  useEffect(() => {
    const preloadSrc = (src) => {
      if (!src) return;
      const img = new Image();
      img.decoding = "async";
      img.loading = "eager";
      img.src = src;
    };
    const nextIdx = (index + 1) % total;
    const prevIdx = (index - 1 + total) % total;
    preloadSrc(slides[nextIdx]?.mobile);
    preloadSrc(slides[nextIdx]?.desktop);
    preloadSrc(slides[prevIdx]?.mobile);
    preloadSrc(slides[prevIdx]?.desktop);
  }, [index, total]);

  return (
    <section
      id="hero"
      role="region"
      aria-roledescription="carousel"
      aria-label="Galería planta Quesillos Manuelita"
      className="
        relative -mt-6 h-[70vh] md:h-[85vh] overflow-hidden
        rounded-b-3xl
      "
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchEnd={onPointerUp}
    >
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((s, i) => {
          const isActive = i === index;
          const isFirst = i === 0;
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
                  loading={isFirst ? "eager" : "lazy"}
                  fetchPriority={isFirst ? "high" : "auto"}
                  decoding="async"
                  draggable={false}
                />
              </picture>

              {/* Gradiente inferior */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Overlay con sombra */}
              <div className="absolute inset-0 flex items-end">
                <div className="max-w-7xl mx-auto px-4 w-full pb-14 sm:pb-16 md:pb-24 lg:pb-28">
                  <div className="max-w-xl text-white shadow-md shadow-black/40 rounded-lg p-4 bg-black/20">
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

      {/* Bullets amarillos con sombra */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir al slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`
              h-3.5 w-3.5 rounded-full shadow-md shadow-black/40 transition
              ${
                i === index ? "bg-primary" : "bg-primary/50 hover:bg-primary/80"
              }
            `}
          />
        ))}
      </div>
    </section>
  );
}
