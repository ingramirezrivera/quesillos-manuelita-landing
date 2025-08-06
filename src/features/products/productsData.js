import mozarella from "../../assets/images/products/queso-mozarella.jpg";
import mozarellaAlt from "../../assets/images/products/queso-mozarella-alt.jpg";
import pizza from "../../assets/images/products/queso-mozarella-pizza.jpg";
import pizzaAlt from "../../assets/images/products/queso-mozarella-pizza-alt.jpg";
import cheddar from "../../assets/images/products/queso-cheddar.jpg";
import cheddarAlt from "../../assets/images/products/queso-cheddar-alt.jpg";

export const products = [
  {
    id: "mozarella",
    name: "Queso Mozarella",
    description:
      "Textura suave y sabor auténtico, ideal para tus recetas favoritas.",
    image: mozarella,
    imageAlt: mozarellaAlt, // ← nueva foto alternativa
    specs: [
      "Humedad: 52–60%",
      "Maduración: Fresco",
      "Presentación: Bloque 1 kg",
    ],
  },
  {
    id: "mozarella-pizza",
    name: "Queso Mozarella para Pizza",
    description: "Gratinado uniforme y estiramiento ideal.",
    image: pizza,
    imageAlt: pizzaAlt,
    specs: ["Fusión: Alta", "Elasticidad: Alta", "Presentación: Bloque 2.5 kg"],
  },
  {
    id: "cheddar",
    name: "Queso Cheddar",
    description: "Sabor intenso y cremoso para hamburguesas y salsas.",
    image: cheddar,
    imageAlt: cheddarAlt,
    specs: [
      "Maduración: 2–3 meses",
      "Color: Amarillo anaranjado",
      "Presentación: Barra 1 kg",
    ],
  },
];
