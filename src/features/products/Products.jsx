// src/features/products/Products.jsx
import { useEffect, useRef, useState } from "react";
import { products } from "./productsData";
import logo from "../../assets/images/logos/logo.jpeg"; // ajusta la ruta si es distinta

export default function Products() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);

  const handleOpen = (product) => {
    setSelected(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  // Manejo de ESC, scroll del body y foco inicial
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && handleClose();
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.classList.add("overflow-hidden");
      setTimeout(() => dialogRef.current?.focus(), 0);
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
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
              <button
                type="button"
                onClick={() => handleOpen(product)}
                className="block w-full h-64 overflow-hidden group"
                aria-label={`Ver detalles de ${product.name}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>

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

      {/* Modal */}
      {open && selected && (
        <>
          {/* Fondo blur con click para cerrar */}
          <button
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            aria-label="Cerrar modal"
            onClick={handleClose}
          />

          {/* Contenedor del modal */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Detalles de ${selected.name}`}
            ref={dialogRef}
            tabIndex={-1}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-5xl rounded-2xl bg-white shadow-xl relative overflow-visible">
              {/* Logo sobresaliente (solo desktop) */}
              <img
                src={logo}
                alt="Quesillos Manuelita"
                className="hidden md:block absolute -left-10 -top-12 h-28 w-auto rounded-xl shadow-lg z-10"
              />

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Imagen del producto */}
                <ModalImages selected={selected} />

                {/* Información */}
                <div className="p-6 flex flex-col">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold">{selected.name}</h3>
                    <button
                      onClick={handleClose}
                      className="ml-3 rounded-md p-2 hover:bg-gray-100"
                      aria-label="Cerrar"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-gray-600 mt-2">{selected.description}</p>

                  {Array.isArray(selected.specs) &&
                    selected.specs.length > 0 && (
                      <ul className="mt-4 space-y-1 text-sm text-gray-700 text-left list-disc list-inside">
                        {selected.specs.map((s, idx) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ul>
                    )}

                  <div className="mt-auto pt-6">
                    <a
                      href="#contact"
                      className="inline-flex items-center rounded-lg px-4 py-2 bg-primary text-black font-medium hover:bg-yellow-500"
                    >
                      Pedir ahora
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

/** Subcomponente para imagen principal/alternativa */
function ModalImages({ selected }) {
  const [showAlt, setShowAlt] = useState(false);
  const canToggle = Boolean(selected.imageAlt);

  return (
    <div className="relative h-64 md:h-full bg-gray-50">
      <img
        src={showAlt && canToggle ? selected.imageAlt : selected.image}
        alt={selected.name}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {canToggle && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center">
          <button
            onClick={() => setShowAlt((v) => !v)}
            className="rounded-full bg-white/90 px-3 py-1 text-sm shadow hover:bg-white"
            aria-label="Cambiar imagen del producto"
          >
            {showAlt ? "Ver imagen principal" : "Ver otra foto"}
          </button>
        </div>
      )}
    </div>
  );
}
