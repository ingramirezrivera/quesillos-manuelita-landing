import { useEffect, useRef, useState } from "react";
import { slides } from "./slides";

export default function Hero() {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [videoErrored, setVideoErrored] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  const videoSlide = slides[0];
  const activeVideoSrc =
    isMobile && videoSlide.mobileVideoSrc
      ? videoSlide.mobileVideoSrc
      : videoSlide.videoSrc;

  // Preload poster image
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



  // Keep track of viewport changes to switch video source
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = (event) => {
      setIsMobile(event.matches);
    };

    updateViewport(mediaQuery);
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  // Use IntersectionObserver to delay loading until near viewport
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

  // Handle video source changes without unmounting the video element
  useEffect(() => {
    if (!shouldLoadVideo || !videoRef.current) return;
    
    const video = videoRef.current;
    
    // Only update if the source actually changed
    if (video.src && !video.src.includes(activeVideoSrc)) {
      setIsVideoPlaying(false);
      setIsBuffering(false);
      setVideoErrored(false);
      
      video.src = activeVideoSrc;
      video.load();
      
      const playPromise = video.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {});
      }
    }
  }, [activeVideoSrc, shouldLoadVideo]);

  // Initial play trigger
  useEffect(() => {
    if (!shouldLoadVideo || !videoRef.current) return;
    const video = videoRef.current;
    if (videoErrored) return;

    // Set src if it hasn't been set yet
    if (!video.src && activeVideoSrc) {
       video.src = activeVideoSrc;
    }

    const playPromise = video.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }
  }, [shouldLoadVideo, videoErrored, activeVideoSrc]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="
        relative -mt-6 h-[85vh] md:h-[95vh] overflow-hidden
        rounded-b-3xl
      "
    >
      <div className="absolute inset-0 bg-slate-900">
        {/* Always keep the poster as the base background. */}
        <img
          src={videoSlide.poster}
          alt={videoSlide.alt}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
          fetchPriority="high"
        />
        
        {shouldLoadVideo && !videoErrored && (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              isVideoPlaying ? "opacity-100" : "opacity-0"
            }`}
            preload="auto"
            autoPlay
            muted
            loop
            playsInline
            onLoadStart={() => {
              setIsBuffering(true);
            }}
            onCanPlay={() => {
              setIsBuffering(false);
              const video = videoRef.current;
              if (!video) return;
              const playPromise = video.play();
              if (playPromise?.catch) playPromise.catch(() => {});
            }}
            onPlaying={() => {
              setIsBuffering(false);
              setIsVideoPlaying(true);
            }}
            onWaiting={() => {
               setIsBuffering(true);
            }}
            onStalled={() => {
               setIsBuffering(true);
            }}
            onError={() => {
              setVideoErrored(true);
              setIsVideoPlaying(false);
              setIsBuffering(false);
            }}
          >
          </video>
        )}
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <SlideItem slide={videoSlide} isActive={true} />
      </div>

      {/* Show a loading spinner if we are supposed to load the video but it has stalled or hasn't started playing yet. 
          Placed at the very end with z-30 to guarantee it overlays absolutely everything. */}
      {shouldLoadVideo && (!isVideoPlaying || isBuffering) && !videoErrored && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-30 transition-opacity duration-300 pointer-events-none">
           <div className="w-16 h-16 border-4 border-white/20 border-t-primary rounded-full animate-spin shadow-xl"></div>
        </div>
      )}
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
