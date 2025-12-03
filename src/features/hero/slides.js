// src/features/hero/slides.js

// Importación de las imágenes existentes
import d1 from "../../assets/images/hero/desktop/hero-01.jpg";
import d2 from "../../assets/images/hero/desktop/hero-02.jpeg";
import d3 from "../../assets/images/hero/desktop/hero-03.jpg";

import m1 from "../../assets/images/hero/mobile/hero-mobile-01.jpg";
import m2 from "../../assets/images/hero/mobile/hero-mobile-02.jpeg";
import m3 from "../../assets/images/hero/mobile/hero-mobile-03.jpg";

// Importación del video (CORRECTA según tu carpeta)
import heroVideo from "../../assets/videos/hero-intro.mp4";

// Si más adelante pones poster:
// import heroPoster from "../../assets/videos/hero-intro-poster.jpg";

export const slides = [
  {
    id: "hero-video-01",
    type: "video",
    videoSrc: heroVideo, // usamos la importación real
    // poster: heroPoster,      // opcional si quieres añadir poster
    title: "Del ordeño artesanal al queso perfecto",
    text: "Un recorrido real por la creación del auténtico quesillo antioqueño.",
    alt: "Video del ordeño y proceso del quesillo",
  },

  {
    id: "hero-01",
    type: "image",
    title: "Un queso tipo Mozzarella con el sabor de una región",
    text: "Del campo a tu mesa, con la tradición y el sabor de Antioquia.",
    desktop: d1,
    mobile: m1,
    alt: "Amanecer en una finca lechera de Antioquia",
  },

  {
    id: "hero-02",
    type: "image",
    title: "Una pasión que se transforma en sabor",
    text: "Cada día trabajamos para ofrecerte lo mejor de nuestra tierra.",
    desktop: d2,
    mobile: m2,
    alt: "Ingreso de leche a los tanques de producción",
  },

  {
    id: "hero-03",
    type: "image",
    title: "El ingrediente que lo cambia todo",
    text: "Con quesillos Manuelita darás el toque de sabor que tu negocio necesita.",
    desktop: d3,
    mobile: m3,
    alt: "Línea de empaque de quesillos",
  },
];
