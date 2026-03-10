import { useEffect, useRef, useState } from "react";
import { slides } from "./slides";

export default function Hero() {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoErrored, setVideoErrored] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  const videoSlide = slides[0];
  const activeVideoSrc =
    isMobile && videoSlide.mobileVideoSrc
      ? videoSlide.mobileVideoSrc
      : videoSlide.videoSrc;
  const activeVideoSources = [{ src: activeVideoSrc, type: "video/mp4" }];

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
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = (event) => {
      setIsMobile(event.matches);
      setIsVideoPlaying(false);
      setVideoErrored(false);
    };

    updateViewport(mediaQuery);
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        setShouldLoadVideo(true);
        observer.disconnect();
      },
      { threshold: 0.15, rootMargin: "200px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo) return;
    const video = videoRef.current;
    if (!video || videoErrored) return;

    const playPromise = video.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }
  }, [shouldLoadVideo, videoErrored]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="
        relative -mt-6 h-[85vh] md:h-[95vh] overflow-hidden
        rounded-b-3xl
      "
    >
      <div className="absolute inset-0">
        {!isVideoPlaying && (
          <img
            src={videoSlide.poster}
            alt={videoSlide.alt}
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
        )}

        {shouldLoadVideo && !videoErrored && (
          <video
            ref={videoRef}
            key={activeVideoSrc}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              isVideoPlaying ? "opacity-100" : "opacity-0"
            }`}
            preload="metadata"
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => {
              const video = videoRef.current;
              if (!video) return;
              const playPromise = video.play();
              if (playPromise?.catch) playPromise.catch(() => {});
            }}
            onPlaying={() => setIsVideoPlaying(true)}
            onWaiting={() => setIsVideoPlaying(false)}
            onStalled={() => setIsVideoPlaying(false)}
            onError={() => {
              setVideoErrored(true);
              setIsVideoPlaying(false);
            }}
          >
            {activeVideoSources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>
        )}
      </div>

      <div className="absolute inset-0">
        <SlideItem slide={videoSlide} isActive={true} />
      </div>
    </section>
  );
}

function SlideItem({ slide, isActive }) {
  return (
    <div aria-hidden={!isActive} className="absolute inset-0">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

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
