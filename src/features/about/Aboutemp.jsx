// src/features/about/About.jsx
import { useEffect, useRef, useState } from "react";
import { ABOUT_SECTIONS } from "./aboutData";
import fondo from "../../assets/images/about/fondo-about.jpg";

export default function About() {
  const [idx, setIdx] = useState(0);
  const total = ABOUT_SECTIONS.length;

  const timerRef = useRef(null);
  const pausedRef = useRef(false);
  const trackRef = useRef(null);

  // refs para swipe
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchDeltaX = useRef(0);
  const isSwiping = useRef(false);

  const goTo = (i) => setIdx((i + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);
  const prev = () => setIdx((i) => (i - 1 + total) % total);

  // autoplay
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) next();
    }, 20000);
    return () => clearInterval(timerRef.current);
  }, [total]);

  // pausar cuando la pestaña no está visible
  useEffect(() => {
    const onVis = () => {
      pausedRef.current = document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // teclado (desktop)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, []);

  // swipe móvil
  const SWIPE_THRESHOLD = 40;
  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
    touchDeltaX.current = 0;
    isSwiping.current = false;
    pausedRef.current = true;
  };
  const onTouchMove = (e) => {
    const t = e.touches[0];
    const dx = t.clientX - touchStartX.current;
    const dy = t.clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy)) {
      isSwiping.current = true;
      touchDeltaX.current = dx;
      e.preventDefault();
    }
  };
  const onTouchEnd = () => {
    if (isSwiping.current) {
      if (touchDeltaX.current <= -SWIPE_THRESHOLD) next();
      else if (touchDeltaX.current >= SWIPE_THRESHOLD) prev();
    }
    isSwiping.current = false;
    touchDeltaX.current = 0;
    pausedRef.current = false;
  };

  const s = ABOUT_SECTIONS[idx];

  return (
    <section
      id="about"
      className="relative py-24 text-white overflow-hidden mt-16 md:mt-24 z-0"
    >
      <img
        src={fondo}
        alt="Campo Santa Rosa de Osos"
        className="absolute inset-0 w-full h-full object-cover z-0"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="relative z-20 w-full px-0">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
          Sobre Nosotros
        </h2>

        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Presentación sobre nosotros"
          tabIndex={0}
          className="relative bg-white/10 backdrop-blur-sm shadow py-6 px-0 md:p-6 select-none touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          // 👇 Pausa/reanuda en desktop por hover
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
        >
          {/* Contenedor del slide */}
          <div className="relative">
            {/* Flechas: ocultas en mobile, visibles en md+ */}
            <button
              onClick={prev}
              aria-label="Anterior"
              className="hidden md:inline-flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-3 bg-white/90 text-primary hover:bg-primary hover:text-white transition-colors p-2 rounded-full shadow-lg z-30"
            >
              {/* SVG chevron izquierdo */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M15.75 19.5a.75.75 0 0 1-.53-.22l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 1 1 1.06 1.06L10.81 12l5.47 5.47a.75.75 0 0 1-.53 1.03Z" />
              </svg>
            </button>

            <button
              onClick={next}
              aria-label="Siguiente"
              className="hidden md:inline-flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-3 bg-white/90 text-primary hover:bg-primary hover:text-white transition-colors p-2 rounded-full shadow-lg z-30"
            >
              {/* SVG chevron derecho */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8.25 19.5a.75.75 0 0 0 .53-.22l6-6a.75.75 0 0 0 0-1.06l-6-6a.75.75 0 1 0-1.06 1.06L13.19 12l-5.47 5.47a.75.75 0 0 0 .53 1.03Z" />
              </svg>
            </button>

            {/* Slide actual */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-stretch px-3 md:px-6">
              {/* Media */}
              <div className="relative overflow-hidden shadow-lg w-full h-64 md:h-[420px] rounded-t-2xl md:rounded-none md:rounded-tl-2xl md:rounded-bl-2xl">
                {s.media?.type === "video" ? (
                  <video
                    src={s.media.src}
                    poster={s.media.poster}
                    className="h-full w-full object-cover"
                    controls
                  />
                ) : (
                  <img
                    src={s.media?.src}
                    alt={s.media?.alt || s.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>

              {/* Texto con altura consistente */}
              <div className="bg-white/10 backdrop-blur-sm shadow p-5 md:p-6 min-h-[420px] md:h-[420px] overflow-auto flex flex-col justify rounded-b-2xl md:rounded-none md:rounded-tr-2xl md:rounded-r-2xl">
                <h3 className="text-3xl md:text-4xl font-bold text-center pb-4">
                  {s.title}
                </h3>
                <p className="md:text-xl mt-3 text-white/90 leading-relaxed text-justify md:px-8">
                  {s.body}
                </p>
              </div>
            </div>
          </div>

          {/* Bullets */}
          <div className="mt-5 flex justify-center gap-2.5">
            {ABOUT_SECTIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir a la sección ${i + 1}`}
                className={`h-3.5 w-3.5 rounded-full shadow-md shadow-black/40 transition
                  ${i === idx ? "bg-primary" : "bg-primary/50 hover:bg-primary/80"}`}
              />
            ))}
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mx-12 md:mx-64">
          <KPI className="text-3xl" number="15+" label="Años de experiencia" />
          <KPI
            className="text-3xl"
            number="500k+"
            label="Litros procesados al año"
          />
          <KPI
            className="text-3xl"
            number="300+"
            label="Familias beneficiadas"
          />
        </div>
      </div>
    </section>
  );
}

function KPI({ number, label }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow p-6 text-center hover:shadow-lg transition">
      <div className="text-3xl font-bold text-primary mb-2">{number}</div>
      <p className="text-white/80 text-sm">{label}</p>
    </div>
  );
}
