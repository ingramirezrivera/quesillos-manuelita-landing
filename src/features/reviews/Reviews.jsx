const comments = [
  {
    id: 1,
    name: "Pizzeria Don Carlo",
    handle: "@doncarlopizza",
    platform: "Instagram",
    text: "El Baño María nos funciona excelente en servicio. Mantiene el queso en punto y mejora la velocidad en horas pico.",
    product: "Baño María",
    likes: 128,
    time: "Hace 2 días",
  },
  {
    id: 2,
    name: "Burger Station MDE",
    handle: "@burgerstationmde",
    platform: "Facebook",
    text: "El tipo cheddar para hamburguesas funde parejo y da un sabor brutal. Nuestros clientes lo piden siempre.",
    product: "Tipo cheddar para hamburguesas",
    likes: 97,
    time: "Hace 4 días",
  },
  {
    id: 3,
    name: "Masa y Horno",
    handle: "@masayhorno",
    platform: "Instagram",
    text: "Probamos el especial pizza y se nota la calidad. Buen estiramiento, gratinado uniforme y sabor consistente.",
    product: "Especial pizza",
    likes: 143,
    time: "Hace 1 semana",
  },
  {
    id: 4,
    name: "Casa Tabla Gourmet",
    handle: "@casatablagourmet",
    platform: "Facebook",
    text: "Los quesos especiales para tablas tienen gran presentación y muy buen balance de sabor para eventos.",
    product: "Quesos especiales para tablas",
    likes: 86,
    time: "Hace 1 semana",
  },
  {
    id: 5,
    name: "La Esquina del Sabor",
    handle: "@laesquinadelsabor",
    platform: "Instagram",
    text: "Nos cambiamos a Quesillos Manuelita y mejoramos rendimiento en cocina. Producto estable y muy buen soporte comercial.",
    product: "Línea mozzarella",
    likes: 112,
    time: "Hace 2 semanas",
  },
  {
    id: 6,
    name: "Food Truck 76",
    handle: "@foodtruck76",
    platform: "Instagram",
    text: "Muy recomendado para preparaciones calientes. El tipo cheddar y el especial pizza responden excelente en plancha y horno.",
    product: "Cheddar + Especial pizza",
    likes: 75,
    time: "Hace 2 semanas",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Lo que dicen en redes
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg">
            Comentarios de clientes sobre Baño María, especial pizza, tipo
            cheddar para hamburguesas y quesos especiales para tablas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comments.map((c) => (
            <article
              key={c.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary/30 text-slate-800 font-bold flex items-center justify-center">
                    {c.name
                      .split(" ")
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 leading-tight">
                      {c.name}
                    </p>
                    <p className="text-sm text-slate-500">{c.handle}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                  {c.platform}
                </span>
              </div>

              <p className="text-slate-700 mt-4 leading-relaxed">{c.text}</p>

              <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                <span className="font-medium text-primary">{c.product}</span>
                <span>{c.time}</span>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 text-sm text-slate-500">
                {c.likes} me gusta
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


