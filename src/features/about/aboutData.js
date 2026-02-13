import equipo from "../../assets/images/about/equipo.png";
import calidad from "../../assets/images/about/calidad.jpg";
import somos from "../../assets/images/about/somos.jpg";
import quesos from "../../assets/images/about/quesos.jpg";
import produccion from "../../assets/images/about/produccion.jpg";
// NOTA: Asegúrate de tener una imagen para la visión o reutiliza una existente (ej: planta)
import vision from "../../assets/images/about/vision.jpg";

export const ABOUT_SECTIONS = [
  {
    id: "historia",
    title: "¿Quiénes somos?",
    body: "Quesillos Manuelita S.A.S. es más que una empresa; es un sueño hecho realidad en el corazón de Antioquia. Fundada el 1 de noviembre de 2017, en Santa Rosa de Osos, donde la tradición y la innovación se entrelazan para crear productos lácteos de calidad excepcional.",
    media: {
      type: "image",
      src: somos,
      alt: "Planta de producción de Quesillos Manuelita",
    },
  },
  {
    id: "nuestra-mision",
    title: "Nuestra misión",
    body: "En Quesillos Manuelita S.A.S elaboramos y comercializamos Queso Mozzarella con un equipo de trabajo íntegro, comprometido con la excelencia en la producción, comercialización y la calidad integral, contribuyendo al bienestar de nuestros empleados, la satisfacción de aliados estratégicos, creando experiencias únicas para los clientes y con un profundo respeto por las normas y el medio ambiente.",
    media: { type: "image", src: quesos, alt: "Campo de Santa Rosa de Osos" },
  },
  // --- NUEVA SECCIÓN AGREGADA: VISIÓN ---
  {
    id: "nuestra-vision",
    title: "Nuestra Visión",
    body: "Ser reconocidos a nivel nacional como los embajadores del sabor lácteo de Santa Rosa de Osos. Nos proyectamos hacia el futuro innovando con nuevas líneas de productos saludables y expandiendo nuestra red de distribución, manteniendo siempre la esencia artesanal y el compromiso social que nos caracteriza como familia.",
    media: {
      type: "image",
      src: vision, // Si no tienes imagen 'vision.jpg', cambia esto por 'planta' o 'produccion' temporalmente
      alt: "Proyección futuro Quesillos Manuelita",
    },
  },
  // --------------------------------------
  {
    id: "producción",
    title: "Producción",
    body: "En Quesillos Manuelita se procesan más de 600.000 litros de leche al mes, convirtiéndola en una empresa dinamizadora de la economía y que aporta socialmente a la generación de empleo del norte de Antioquia. Gracias a esto, se procesan más de 10.000 bloques de queso a la semana, los cuales llegan a nuestros principales clientes que en su mayoría son restaurantes, locales de comida rápida y negocios de venta de fritos y panadería.",
    media: { type: "image", src: produccion, alt: "Paisaje natural" },
  },
  {
    id: "equipo",
    title: "Nuestro equipo",
    body: "Personas que aman lo que hacen: maestros queseros, logística, calidad, comercial y atención al cliente; todos enfocados en darte lo mejor. Nuestro equipo de trabajo está conformado por: 28 empleados directos, 20 empleados indirectos, Pequeños y Medianos Ganaderos",
    media: { type: "image", src: equipo, alt: "Equipo de trabajo" },
  },
  {
    id: "calidad",
    title: " Calidad y Sostenibilidad:",
    body: "La calidad de nuestro queso mozzarella es galardonada, logrando puntuaciones sobresalientes en el Premio Nacional del Queso y el Arequipe CNLM 2024. Cada bloque es el resultado de un proceso cuidadoso que honra el trabajo del campo y respeta los más altos estándares de calidad. Somos una empresa líder en sostenibilidad ambiental y alimentaria en Antioquia, gracias a nuestra apuesta por la energía solar y el manejo responsable de residuos.",
    media: { type: "image", src: calidad, alt: "Control de calidad" },
  },
];



