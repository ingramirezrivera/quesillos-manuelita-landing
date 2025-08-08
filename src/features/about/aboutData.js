import fondo from "../../assets/images/about/fondo-about.jpg";
import planta from "../../assets/images/about/planta.jpg";

export const ABOUT_SECTIONS = [
  {
    id: "historia",
    title: "Nuestra historia",
    body: "Nacimos en Santa Rosa de Osos con una misión clara: hacer quesos que sepan a hogar. Desde los primeros lotes artesanales hasta nuestra planta actual, cuidamos cada detalle.",
    media: {
      type: "image",
      src: planta,
      alt: "Planta de producción de Quesillos Manuelita",
    },
  },
  {
    id: "campo",
    title: "Compromiso con el campo",
    body: "Trabajamos de la mano con productores locales, promoviendo prácticas justas y sostenibles. Creemos en una cadena que beneficie a todos.",
    media: { type: "image", src: fondo, alt: "Campo de Santa Rosa de Osos" },
  },
  {
    id: "medio-ambiente",
    title: "Medio ambiente",
    body: "Optimizamos el uso de agua y energía, reducimos empaques y reciclamos. Cada decisión se toma pensando en el impacto ambiental.",
    media: { type: "image", src: fondo, alt: "Paisaje natural" },
  },
  {
    id: "vision",
    title: "Visión y misión",
    body: "Visión: llevar el auténtico sabor a más hogares sin perder la esencia artesanal. Misión: producir quesos de calidad, responsables con el campo y el planeta.",
    media: { type: "image", src: planta, alt: "Procesos de calidad" },
  },
  {
    id: "equipo",
    title: "Nuestro equipo",
    body: "Personas que aman lo que hacen: maestros queseros, logística, calidad, comercial y atención al cliente; todos enfocados en darte lo mejor.",
    media: { type: "image", src: planta, alt: "Equipo de trabajo" },
  },
  {
    id: "calidad",
    title: "Compromiso con la calidad",
    body: "Seguimos protocolos estrictos en cada etapa, desde la leche hasta el empaque final. La consistencia no es casualidad, es disciplina.",
    media: { type: "image", src: planta, alt: "Control de calidad" },
  },
  {
    id: "logros",
    title: "Logros",
    body: "Crecimiento sostenido, expansión de portafolio y reconocimiento de nuestros clientes: nuestra mayor medalla es tu preferencia.",
    media: { type: "image", src: planta, alt: "Logros" },
  },
];
