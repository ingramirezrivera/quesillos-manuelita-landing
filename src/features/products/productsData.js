import mozarella from "../../assets/images/products/queso-mozarella.jpg";
import mozarellaAlt from "../../assets/images/products/queso-mozarella-alt.jpg";
import pizza from "../../assets/images/products/queso-mozarella-pizza.jpg";
import pizzaAlt from "../../assets/images/products/queso-mozarella-pizza-alt.jpg";
import cheddar from "../../assets/images/products/queso-cheddar.jpg";
import cheddarAlt from "../../assets/images/products/queso-cheddar-alt.jpg";
import especial from "../../assets/images/products/queso-especial.jpg";
import especialAlt from "../../assets/images/products/queso-especial-alt.jpeg";

export const products = [
  {
    id: "mozarella",
    name: "Queso Especial Baño Maria",
    description: "Textura suave y sabor auténtico, perfecto para baño María.",
    image: mozarella,
    imageAlt: mozarellaAlt, // ← nueva foto alternativa
    specs: [
      "Humedad: 52–60%",
      "Maduración: Fresco",
      "Presentación: Bloque 2500 gr",
    ],
  },
  {
    id: "mozarella-pizza",
    name: "Queso Especial tipo Pizza",
    description:
      "Gratinado uniforme y estiramiento ideal, el sabor ideal para tus preparaciones.",
    image: pizza,
    imageAlt: pizzaAlt,
    specs: [
      "Fusión: Alta",
      "Elasticidad: Alta",
      "Presentación: Bloque 2500 gr",
    ],
  },
  {
    id: "cheddar",
    name: "Queso Especial tipo Cheddar",
    description: "Sabor intenso y cremoso para hamburguesas.",
    image: cheddar,
    imageAlt: cheddarAlt,
    specs: [
      "Maduración: 2–3 meses",
      "Color: Amarillo anaranjado",
      "Presentación: Bloque 2500 gr",
    ],
  },
  {
    id: "especial",
    name: "Linea de queso especial",
    description: "Pimienta roja, y finas hierbas, ideal para tabla de quesos.",
    image: especial,
    imageAlt: especialAlt,
    specs: [
      "Maduración: 2–3 meses",
      "Color: Amarillo anaranjado",
      "Presentación: Bloque 2500 gr",
    ],
  },
];
