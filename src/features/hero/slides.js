// src/features/hero/slides.js

// Importación del video (CORRECTA según tu carpeta)
import heroVideo from "../../assets/videos/hero-intro.mp4";
import posterHero from "../../assets/images/hero/poster-hero.jpg";

export const slides = [
  {
    id: "hero-video-01",
    type: "video",
    videoSrc: heroVideo, // usamos la importación real
    poster: posterHero,
    title: "Del ordeño artesanal al queso perfecto",
    text: "Un recorrido real por la creación del auténtico quesillo antioqueño.",
    alt: "Video del ordeño y proceso del quesillo",
  },
];
