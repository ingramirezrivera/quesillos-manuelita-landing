// src/features/products/Products.jsx
import { products } from "./productsData";

export default function Products() {
  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Título */}
        <h2 className="text-3xl font-bold mb-4">Nuestros Quesos</h2>
        <p className="text-gray-600 mb-12">
          Calidad artesanal y sabor auténtico en cada bocado.
        </p>

        {/* Grilla de productos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:scale-[1.02]"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 flex flex-col items-center">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1 text-center">
                  {product.description}
                </p>
                <a
                  href="#contact"
                  className="mt-4 inline-block bg-primary text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  Pedir ahora
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
