// src/features/hero/slides.js
import d1 from "../../assets/images/hero/desktop/planta-01.jpg";
import d2 from "../../assets/images/hero/desktop/planta-02.jpg";
import d3 from "../../assets/images/hero/desktop/planta-03.jpg";

import m1 from "../../assets/images/hero/mobile/planta-01.jpg";
import m2 from "../../assets/images/hero/mobile/planta-02.jpg";
import m3 from "../../assets/images/hero/mobile/planta-03.jpg";

export const slides = [
  {
    id: "planta-01",
    title: "Quesillos hechos con tradición",
    text: "Proceso artesanal con estándares de calidad.",
    desktop: d1,
    mobile: m1,
    alt: "Operario trabajando el cuajado en la planta",
  },
  {
    id: "planta-02",
    title: "Materia prima seleccionada",
    text: "Leche fresca y control de temperatura en cada etapa.",
    desktop: d2,
    mobile: m2,
    alt: "Ingreso de leche a los tanques de producción",
  },
  {
    id: "planta-03",
    title: "Listos para tu mesa",
    text: "Empaque higiénico y distribución eficiente.",
    desktop: d3,
    mobile: m3,
    alt: "Línea de empaque de quesillos",
  },
];
