import { useEffect, useRef, useState } from "react";
import { slides } from "./slides";

// Minimum seconds of buffer required before we start playing
const BUFFER_THRESHOLD_SECONDS = 3;
// Maximum time (ms) to wait for the video to buffer before giving up
const LOADING_TIMEOUT_MS = 15000;

export default function Hero() {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false); // true = video faded in and playing
  const [videoErrored, setVideoErrored] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const hasStartedPlaying = useRef(false); // once true, never show spinner again
  const bufferCheckInterval = useRef(null);
  const loadingTimeout = useRef(null);

  const videoSlide = slides[0];
  const activeVideoSrc =
    isMobile && videoSlide.mobileVideoSrc
      ? videoSlide.mobileVideoSrc
      : videoSlide.videoSrc;

  // ─── Detect slow connections ───
  useEffect(() => {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      const checkSpeed = () => {
        const slow = ["slow-2g", "2g"].includes(conn.effectiveType);
        setIsSlowConnection(slow);
      };
      checkSpeed();
      conn.addEventListener("change", checkSpeed);
      return () => conn.removeEventListener("change", checkSpeed);
    }
  }, []);

  // ─── Preload poster image ───
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

  // ─── Track viewport for video source switching ───
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = (event) => setIsMobile(event.matches);

    updateViewport(mediaQuery);
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  // ─── IntersectionObserver: start loading when hero is near viewport ───
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

  // ─── Buffer-first playback strategy ───
  useEffect(() => {
    if (!shouldLoadVideo || isSlowConnection || videoErrored) return;

    const video = videoRef.current;
    if (!video) return;

    // Set the source only if it hasn't been set yet or changed
    const currentSrc = video.getAttribute("src") || "";
    if (!currentSrc.includes(activeVideoSrc)) {
      hasStartedPlaying.current = false;
      setIsVideoReady(false);
      video.src = activeVideoSrc;
      video.load();
    }

    // Check buffer progress periodically
    const checkBuffer = () => {
      if (!video || hasStartedPlaying.current) {
        clearInterval(bufferCheckInterval.current);
        return;
      }

      try {
        if (video.buffered.length > 0) {
          const bufferedEnd = video.buffered.end(video.buffered.length - 1);
          if (bufferedEnd >= BUFFER_THRESHOLD_SECONDS) {
            // Enough buffer! Start playing.
            clearInterval(bufferCheckInterval.current);
            clearTimeout(loadingTimeout.current);

            const playPromise = video.play();
            if (playPromise?.catch) {
              playPromise.catch(() => {
                // Autoplay blocked — just show the poster
                setVideoErrored(true);
              });
            }
          }
        }
      } catch {
        // buffered.end() can throw if nothing is buffered yet — ignore
      }
    };

    bufferCheckInterval.current = setInterval(checkBuffer, 500);

    // Timeout: if video can't buffer enough in 15 seconds, give up
    loadingTimeout.current = setTimeout(() => {
      if (!hasStartedPlaying.current) {
        clearInterval(bufferCheckInterval.current);
        // Don't mark as errored — just stop trying, poster stays visible
        setVideoErrored(true);
      }
    }, LOADING_TIMEOUT_MS);

    return () => {
      clearInterval(bufferCheckInterval.current);
      clearTimeout(loadingTimeout.current);
    };
  }, [shouldLoadVideo, activeVideoSrc, isSlowConnection, videoErrored]);

  // ─── Handle video source changes (viewport resize) ───
  useEffect(() => {
    if (!shouldLoadVideo || !videoRef.current) return;

    const video = videoRef.current;
    const currentSrc = video.getAttribute("src") || "";

    if (currentSrc && !currentSrc.includes(activeVideoSrc)) {
      hasStartedPlaying.current = false;
      setIsVideoReady(false);
      setVideoErrored(false);

      video.src = activeVideoSrc;
      video.load();
    }
  }, [activeVideoSrc, shouldLoadVideo]);

  // Determine whether to show the initial spinner:
  // Only before the video has EVER started playing. Once it plays, never show again.
  const showInitialSpinner =
    shouldLoadVideo &&
    !isSlowConnection &&
    !hasStartedPlaying.current &&
    !isVideoReady &&
    !videoErrored;

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
        {/* Poster image — always visible as base layer */}
        <img
          src={videoSlide.poster}
          alt={videoSlide.alt}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />

        {/* Video element — always in DOM when loading, opacity controlled */}
        {shouldLoadVideo && !videoErrored && !isSlowConnection && (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              isVideoReady ? "opacity-100" : "opacity-0"
            }`}
            preload="auto"
            muted
            loop
            playsInline
            onPlaying={() => {
              // First time playing: mark as started, fade in, never show spinner again
              hasStartedPlaying.current = true;
              setIsVideoReady(true);
            }}
            onError={() => {
              setVideoErrored(true);
              setIsVideoReady(false);
            }}
            // We intentionally do NOT listen to onWaiting/onStalled.
            // If the video stutters after starting, it just freezes on the last frame.
            // This is much better UX than flashing a spinner repeatedly.
          >
          </video>
        )}
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <SlideItem slide={videoSlide} isActive={true} />
      </div>

      {/* Initial loading spinner — ONLY shown before video has ever played.
          Once it starts playing, this never appears again even if it buffers. */}
      {showInitialSpinner && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-30 pointer-events-none">
          <div className="w-14 h-14 border-4 border-white/20 border-t-primary rounded-full animate-spin shadow-xl"></div>
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
