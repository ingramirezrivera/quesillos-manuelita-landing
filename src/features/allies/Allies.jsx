const allies = [
  { id: "comfama", name: "Comfama", logo: "/allies/comfama.svg" },
  { id: "sura", name: "Grupo SURA", logo: "/allies/grupo-sura.svg" },
  {
    id: "ccm",
    name: "Cámara de Comercio de Medellín",
    logo: "/allies/camara-comercio-medellin.svg",
  },
];

export default function Allies() {
  return (
    <section id="allies" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestros aliados
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Construimos confianza junto a organizaciones que impulsan el
            crecimiento empresarial y la calidad en Antioquia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allies.map((ally) => (
            <article
              key={ally.id}
              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-24 bg-white rounded-xl border border-slate-200 flex items-center justify-center px-4">
                <img
                  src={ally.logo}
                  alt={`Logo ${ally.name}`}
                  className="max-h-14 w-auto object-contain"
                  loading="lazy"
                />
              </div>
              <p className="mt-4 text-center font-semibold text-slate-800">
                {ally.name}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

