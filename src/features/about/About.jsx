// src/features/about/About.jsx

import { useEffect, useRef, useState } from "react";
import { ABOUT_SECTIONS } from "./aboutData"; // 📦 Fuente de datos (id, title, body, media)
import fondo from "../../assets/images/about/fondo-about.jpg";

export default function About() {
  // 🔢 Índice actual de la diapositiva visible
  const [idx, setIdx] = useState(0);
  const total = ABOUT_SECTIONS.length;

  // ⏱️ Control del autoplay y pausa
  const timerRef = useRef(null);
  const pausedRef = useRef(false);

  // ⌨️ Referencia al contenedor "track" para capturar teclas ← →
  const trackRef = useRef(null);

  // 👉 Helpers de navegación
  const goTo = (i) => setIdx((i + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);
  const prev = () => setIdx((i) => (i - 1 + total) % total);

  // ▶️ Autoplay universal (desktop y mobile)
  // - Avanza cada 5s
  // - Respeta la pausa (pausedRef)
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) next();
    }, 20000); // ⏲️ Ajusta la velocidad del autoplay aquí (ms)
    return () => clearInterval(timerRef.current);
  }, [total]);

  // 🛑 Pausar autoplay cuando la pestaña no está visible (ahorra recursos y evita saltos al volver)
  useEffect(() => {
    const onVis = () => {
      pausedRef.current = document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // ⌨️ Navegación con teclado (cuando el contenedor tiene foco: tab o click)
  // - ArrowRight → siguiente
  // - ArrowLeft  → anterior
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

  // 📌 Diapositiva activa
  const s = ABOUT_SECTIONS[idx];

  return (
    <section
      id="about"
      // 🖼️ Sección a pantalla ancha con fondo y overlay oscuro
      className="relative py-24 text-white overflow-hidden mt-16 md:mt-24 z-0"
    >
      {/* 🏞️ Imagen de fondo (lazy) */}
      <img
        src={fondo}
        alt="Campo Santa Rosa de Osos"
        className="absolute inset-0 w-full h-full object-cover z-0"
        loading="lazy"
        decoding="async"
      />
      {/* 🌓 Overlay para contraste de texto */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* 📦 Contenido principal (puedes cambiar a max-w-7xl si quieres limitar ancho) */}
      <div className="relative z-20 w-full px-0">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
          Sobre Nosotros
        </h2>

        {/* 🎞️ Contenedor de la presentación (una sola diapositiva visible) 
            Accesible: role/aria + tabIndex para permitir foco y teclado */}
        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Presentación sobre nosotros"
          tabIndex={0}
          // 🎨 Fondo translúcido, blur y sombra. Si quieres bordes responsivos como el modal:
          // añade `rounded-none md:rounded-2xl` aquí (o el radio que prefieras).
          className="relative bg-white/10 backdrop-blur-sm shadow py-6 px-0 md:p-6"
        >
          {/* 🧩 Slide actual en 2 columnas (mobile apila, desktop dos columnas) */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch px-3 md:px-6">
            {/* 🖼️ Media (imagen o video)
                📏 ALTURA: ajusta aquí para controlar el alto del cuadro de media.
                - Móvil: h-64
                - Desktop: md:h-[420px]
                Mantén el mismo alto en el panel de texto para que queden parejos. */}
            <div className="relative overflow-hidden shadow-lg w-full h-64 md:h-[420px] rounded-t-2xl md:rounded-none md:rounded-tl-2xl md:rounded-bl-2xl ">
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

            {/* 📝 Panel de texto
                📏 ALTURA: iguala las clases de altura a las del media para que se mantengan alineados.
                🟡 Bordes responsivos:
                - Mobile: `rounded-b-2xl` (solo abajo)
                - Desktop: `md:rounded-tr-2xl md:rounded-r-2xl` (solo derecha) */}
            <div className=" bg-white/10  backdrop-blur-sm shadow p-5 md:p-6 h-90 md:h-[420px] overflow-auto flex flex-col justify rounded-b-2xl md:rounded-none md:rounded-tr-2xl md:rounded-r-2xl">
              {/* 🏷️ Subtítulo centrado */}
              <h3 className="text-3xl md:text-4xl font-bold text-center pb-4">
                {s.title}
              </h3>
              {/* ✍️ Descripción justificada (ajusta a tu gusto: text-left, text-center, etc.) */}
              <p className="md:text-xl mt-3 text-white/90 leading-relaxed text-justify md:px-8">
                {s.body}
              </p>
            </div>
          </div>

          {/* 🔘 Bullets de navegación (amarillos). 
              - Activo: bg-primary
              - Inactivo: bg-primary/50 con hover */}
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

        {/* 🏆 KPIs / Logros (puedes editar valores y textos) 
            - Si quieres centrarlos más en pantallas grandes, ajusta `mx-12 md:mx-24` */}
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

// 🧮 Tarjeta KPI simple (número + etiqueta)
// - Si quieres que herede el mismo ancho/alto, puedes añadir clases extras aquí
function KPI({ number, label }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow p-6 text-center hover:shadow-lg transition">
      <div className="text-3xl font-bold text-primary mb-2">{number}</div>
      <p className="text-white/80 text-sm">{label}</p>
    </div>
  );
}
