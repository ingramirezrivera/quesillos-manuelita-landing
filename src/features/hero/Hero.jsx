import { useEffect, useRef, useState } from "react";
import { slides } from "./slides";

export default function Hero() {
  const [isPosterLoaded, setIsPosterLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [videoErrored, setVideoErrored] = useState(false);
  const sectionRef = useRef(null);
  const posterRef = useRef(null);
  const videoRef = useRef(null);

  // Solo tenemos un slide, el del video.
  const videoSlide = slides[0];

  useEffect(() => {
    const preloadId = "hero-poster-preload";
    if (document.getElementById(preloadId)) return;

    const link = document.createElement("link");
    link.id = preloadId;
    link.rel = "preload";
    link.as = "image";
    link.href = videoSlide.poster;
    document.head.appendChild(link);
  }, [videoSlide.poster]);

  useEffect(() => {
    if (!isPosterLoaded) return;

    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        setShouldLoadVideo(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isPosterLoaded]);

  useEffect(() => {
    if (!shouldLoadVideo) return;
    const video = videoRef.current;
    if (!video) return;

    setIsVideoPlaying(false);
    setVideoErrored(false);
    video.load();
    const playPromise = video.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        setAutoplayBlocked(true);
      });
    }
  }, [shouldLoadVideo]);

  useEffect(() => {
    // Si la imagen venia cacheada, marcamos el estado inmediatamente.
    if (posterRef.current?.complete) {
      setIsPosterLoaded(true);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="
        relative -mt-6 h-[85vh] md:h-[95vh] overflow-hidden
        rounded-b-3xl
      "
    >
      {/* Fondo de video */}
      <div className="absolute inset-0">
        {/* 1. Imagen de poster que se muestra siempre al inicio */}
        <img
          ref={posterRef}
          src={videoSlide.poster}
          alt={videoSlide.alt}
          className="h-full w-full object-cover"
          fetchPriority="high"
          onLoad={() => setIsPosterLoaded(true)}
          onError={() => setIsPosterLoaded(true)}
        />

        {/* 2. El video esta encima pero es invisible hasta que carga */}
        {shouldLoadVideo && !videoErrored && (
          <video
            ref={videoRef}
            key={videoSlide.videoSrc}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              isVideoPlaying ? "opacity-100" : "opacity-0"
            }`}
            preload="metadata"
            poster={videoSlide.poster}
            autoPlay
            // Evita mostrar capa negra: solo hacemos fade-in cuando ya esta reproduciendo.
            onPlaying={() => setIsVideoPlaying(true)}
            onWaiting={() => setIsVideoPlaying(false)}
            onStalled={() => setIsVideoPlaying(false)}
            onSuspend={() => setIsVideoPlaying(false)}
            onError={() => {
              setVideoErrored(true);
              setIsVideoPlaying(false);
            }}
            muted
            loop
            playsInline
          >
            {(videoSlide.videoSources || []).map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>
        )}

        {autoplayBlocked && (
          <button
            type="button"
            onClick={() => {
              const video = videoRef.current;
              if (!video) return;
              setAutoplayBlocked(false);
              video.muted = true;
              video.play().then(() => setIsVideoPlaying(true)).catch(() => {});
            }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/25 text-white"
            aria-label="Reproducir video del hero"
          >
            <span className="rounded-full bg-white/90 px-5 py-3 text-black font-semibold">
              Reproducir video
            </span>
          </button>
        )}
      </div>

      {/* Capa de la tarjeta de texto */}
      <div className="absolute inset-0">
        <SlideItem slide={videoSlide} isActive={true} />
      </div>

      {!isPosterLoaded && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <div className="relative h-14 w-14" aria-label="Cargando">
            <span className="absolute inset-0 rounded-full border-2 border-primary/80 border-t-transparent animate-spin" />
            <span className="absolute inset-2 rounded-full border border-white/30" />
          </div>
        </div>
      )}
    </section>
  );
}

function SlideItem({ slide, isActive }) {
  return (
    <div
      aria-hidden={!isActive}
      className="absolute inset-0" // Ya no necesita transicion de opacidad
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


