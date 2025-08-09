// src/features/hero/slides.js
import d1 from "../../assets/images/hero/desktop/hero-01.jpg";
import d2 from "../../assets/images/hero/desktop/hero-02.jpeg";
import d3 from "../../assets/images/hero/desktop/hero-03.jpg";

import m1 from "../../assets/images/hero/mobile/hero-mobile-01.jpg";
import m2 from "../../assets/images/hero/mobile/hero-mobile-02.jpeg";
import m3 from "../../assets/images/hero/mobile/hero-mobile-03.jpg";

export const slides = [
  {
    id: "hero-01",
    title: "Un queso tipo Mozzarella con el sabor de una región",
    text: "Del campo a tu mesa, con la tradición y el sabor de Antioquia.",
    desktop: d1,
    mobile: m1,
    alt: "Amanecer en una finca lechera de Antioquia",
  },
  {
    id: "hero-02",
    title: "Una pasión que se transforma en sabor",
    text: "Cada día trabajamos para ofrecerte lo mejor de nuestra tierra.",
    desktop: d2,
    mobile: m2,
    alt: "Ingreso de leche a los tanques de producción",
  },
  {
    id: "hero-03",
    title: "El ingrediente que lo cambia todo",
    text: "Con quesillos Manuelita darás el toque de sabor que tu negocio necesita.",
    desktop: d3,
    mobile: m3,
    alt: "Línea de empaque de quesillos",
  },
];
