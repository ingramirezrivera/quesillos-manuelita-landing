import { StarIcon, ClockIcon, SparklesIcon } from "@heroicons/react/24/outline";
import fondo from "../../assets/images/about/fondo-about.jpg";
import planta from "../../assets/images/about/planta.jpg";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 text-white overflow-hidden mt-16 md:mt-24 z-0"
    >
      {/* Imagen de fondo */}
      <img
        src={fondo}
        alt="Campo Santa Rosa de Osos"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Contenido */}
      <div className="relative z-20 max-w-7xl mx-auto px-4">
        {/* Bloque principal: Imagen + Texto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          {/* Imagen de la planta */}
          <div className="overflow-hidden rounded-xl shadow-lg z-20 relative">
            <img
              src={planta}
              alt="Planta de producción de Quesillos Manuelita"
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          {/* Texto */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-white">
              Sobre Nosotros
            </h2>
            <p className="text-white/90 mb-6 leading-relaxed">
              En Quesillos Manuelita, combinamos la tradición artesanal con la
              mejor tecnología para ofrecer quesos de la más alta calidad.
              Nuestra pasión por el sabor y el compromiso con nuestros clientes
              nos distinguen.
            </p>
            <a
              href="#contact"
              className="inline-block bg-primary text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Contáctanos
            </a>
          </div>
        </div>

        {/* Tarjetas de valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta 1 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow p-6 text-center hover:shadow-lg transition">
            <div className="bg-primary/20 h-20 w-20 mx-auto rounded-full mb-4 flex items-center justify-center">
              <StarIcon className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Calidad</h3>
            <p className="text-white/80 text-sm">
              Garantizamos quesos frescos y con el mejor sabor.
            </p>
          </div>

          {/* Tarjeta 2 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow p-6 text-center hover:shadow-lg transition">
            <div className="bg-primary/20 h-20 w-20 mx-auto rounded-full mb-4 flex items-center justify-center">
              <ClockIcon className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Tradición</h3>
            <p className="text-white/80 text-sm">
              Elaboración artesanal siguiendo recetas familiares.
            </p>
          </div>

          {/* Tarjeta 3 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow p-6 text-center hover:shadow-lg transition">
            <div className="bg-primary/20 h-20 w-20 mx-auto rounded-full mb-4 flex items-center justify-center">
              <SparklesIcon className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Sabor</h3>
            <p className="text-white/80 text-sm">
              El auténtico gusto que nos distingue.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
