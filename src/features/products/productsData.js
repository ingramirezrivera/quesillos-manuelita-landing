import mozarella from "../../assets/images/products/queso-mozarella.jpg";
import mozarellaAlt from "../../assets/images/products/queso-mozarella-alt.jpg";
import pizza from "../../assets/images/products/queso-mozarella-pizza.jpg";
import pizzaAlt from "../../assets/images/products/queso-mozarella-pizza-alt.jpg";
import cheddar from "../../assets/images/products/queso-cheddar.jpg";
import cheddarAlt from "../../assets/images/products/queso-cheddar-alt.jpg";
import especial from "../../assets/images/products/queso-especial.jpg";
import especialAlt from "../../assets/images/products/queso-especial-alt.jpeg";
import videoBanoMaria from "../../assets/videos/video-bano-maria.mp4";

export const products = [
  {
    id: "mozarella",
    name: "Queso Mozzarella Baño Maria",
    description:
      "Fondo elástico y sabor lácteo, diseñado para no cortarse ni quemarse.",
    videoSrc: videoBanoMaria,
    videoSources: [
      { src: videoBanoMaria, type: "video/mp4" },
    ],
    image: mozarella,
    imageAlt: mozarellaAlt,
    specs: [
      "Características: Fondo elástico, suave, brillante y homogéneo.",
      "Rendimiento: Diseñado para no cortarse ni quemarse.",
      "Sabor: Fibroso en paladar con esencia de gran sabor lácteo.",
    ],
  },
  {
    id: "mozarella-pizza",
    name: "Queso Mozzarella Tipo Pizza",
    description:
      "Fundido mágico y gran capacidad de gratinar con alta resistencia al calor.",
    image: pizza,
    imageAlt: pizzaAlt,
    specs: [
      "Perfil: Fresco, semigraso y semiduro (leche semidescremada).",
      "Cualidades: Elasticidad, fundido mágico y gran capacidad de gratinar.",
      "Sabor: Suave, lácteo y ligeramente ácido.",
      "Usos: Wraps, sanduches, pizzas, palitos de queso, empanadas.",
    ],
  },
  {
    id: "cheddar",
    name: "Queso Tipo Cheddar",
    description: "Textura mantecosa y color uniforme, ideal para hamburguesas.",
    image: cheddar,
    imageAlt: cheddarAlt,
    specs: [
      "Perfil: Queso duro, de pasta compacta, denso y hojaldrado.",
      "Textura: Ligeramente mantecosa y fundente.",
      "Apariencia: Color uniforme característico.",
      "Usos: Hamburguesas, palitos de queso.",
    ],
  },
  {
    id: "especial",
    name: "Queso Finas Hierbas",
    description: "Mezcla exclusiva de especias y tomates secos, muy versátil.",
    image: especial,
    imageAlt: especialAlt,
    specs: [
      "Perfil: Queso semigraso y semiduro.",
      "Mezcla exclusiva: Pimienta negra, pimienta roja, albahaca y tomates secos.",
      "Versatilidad: Ideal para elevar el sabor de tus preparaciones.",
      "Usos: Tablas de quesos, palitos de queso y recetas gourmet.",
    ],
  },
];

