// src/features/hero/slides.js

import heroVideo from "../../assets/videos/hero-intro.mp4";
import posterHero from "../../assets/images/hero/poster-hero.jpg";

export const slides = [
  {
    id: "hero-video-01",
    type: "video",
    videoSrc: heroVideo,
    videoSources: [{ src: heroVideo, type: "video/mp4" }],
    poster: posterHero,
    title: "Del arte del ordeño a la perfección del queso",
    text: "Un recorrido real por la creación del auténtico tipo queso Mozzarella",
    alt: "Video del ordeño y proceso del quesillo",
  },
];

