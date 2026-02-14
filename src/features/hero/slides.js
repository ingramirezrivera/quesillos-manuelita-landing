// src/features/hero/slides.js

import posterHero from "../../assets/images/hero/poster-hero.jpg";

export const slides = [
  {
    id: "hero-video-01",
    type: "video",
    videoSrc: "/videos/hero-intro.optimized.mp4",
    videoSources: [{ src: "/videos/hero-intro.optimized.mp4", type: "video/mp4" }],
    poster: posterHero,
    title: "Del arte del ordeño a la perfección del queso",
    text: "Un recorrido real por la creación del auténtico tipo queso Mozzarella",
    alt: "Video del ordeño y proceso del quesillo",
  },
];

