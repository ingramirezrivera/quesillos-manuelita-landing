// src/features/products/productsData.js
import mozarella from "../../assets/images/products/queso-mozarella.jpg";
import pizza from "../../assets/images/products/queso-mozarella-pizza.jpg";
import cheddar from "../../assets/images/products/queso-cheddar.jpg";

export const products = [
  {
    id: "mozarella",
    name: "Queso Mozarella",
    description:
      "Textura suave y sabor auténtico, ideal para tus recetas favoritas.",
    image: mozarella,
  },
  {
    id: "mozarella-pizza",
    name: "Queso Mozarella para Pizza",
    description:
      "Perfecto para lograr ese gratinado irresistible en cada bocado.",
    image: pizza,
  },
  {
    id: "cheddar",
    name: "Queso Cheddar",
    description: "Sabor intenso y cremoso, ideal para hamburguesas y salsas.",
    image: cheddar,
  },
];
