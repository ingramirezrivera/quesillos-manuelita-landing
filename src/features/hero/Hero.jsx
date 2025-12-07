import { useState } from "react";
import { slides } from "./slides";

export default function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Solo tenemos un slide, el del video.
  const videoSlide = slides[0];

  return (
    <section
      id="hero"
      className="
        relative -mt-6 h-[85vh] md:h-[95vh] overflow-hidden
        rounded-b-3xl
      "
    >
      {/* Fondo de video */}
      <div className="absolute inset-0">
        {/* 1. Imagen de póster que se muestra siempre al inicio */}
        <img
          src={videoSlide.poster}
          alt={videoSlide.alt}
          className="h-full w-full object-cover"
        />
        {/* 2. El video está encima pero es invisible hasta que carga */}
        <video
          key={videoSlide.videoSrc}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={videoSlide.videoSrc}
          autoPlay
          // 3. Cuando puede empezar, se hace visible
          onCanPlay={() => setIsVideoLoaded(true)}
          muted
          loop
          playsInline
        />
      </div>

      {/* Capa de la tarjeta de texto */}
      <div className="absolute inset-0">
        <SlideItem slide={videoSlide} isActive={true} />
      </div>
    </section>
  );
}

function SlideItem({ slide, isActive }) {
  return (
    <div
      aria-hidden={!isActive}
      className="absolute inset-0" // Ya no necesita transición de opacidad
    >
      {/* Gradiente inferior para legibilidad */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Overlay con sombra y texto */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto px-4 w-full pb-8 sm:pb-10 md:pb-12 lg:pb-10">
          <div className="max-w-xl text-white shadow-md shadow-black/40 rounded-lg p-4 bg-black/15 backdrop-blur-10">
            <h1 className="text-2xl md:text-5xl font-bold drop-shadow">
              {slide.title}
            </h1>
            <p className="mt-2 md:mt-3 text-sm md:text-lg opacity-95">
              {slide.text}
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
}
