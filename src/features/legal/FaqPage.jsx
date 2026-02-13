import { Link } from "react-router-dom";
import logo from "../../assets/images/logos/logo.jpeg";
import fondo from "../../assets/images/about/fondo-about.jpg";

const FAQ_ITEMS = [
  {
    q: "1. ¿Qué es el queso tipo mozzarella?",
    a: "Es un queso de pasta hilada, suave y elástico, ideal para gratinar, fundir y usar en perros calientes, hamburguesas, quesadillas, pizzas, lasañas, sándwiches y preparaciones calientes.",
  },
  {
    q: "2. ¿Cuál es la temperatura ideal de conservación?",
    a: "Debe mantenerse refrigerado entre 0 C y 4 C para conservar calidad, textura y seguridad.",
  },
  {
    q: "3. ¿Se puede congelar la mozzarella?",
    a: "No, no se puede congelar bien empacada. Puede perder sus características organolépticas y textura. Es mejor consumirla fresca para disfrutar su sabor y calidad óptimos.",
  },
  {
    q: "4. ¿Cuánto tiempo dura en refrigeración una vez abierto?",
    a: "Depende del empaque y manejo. Como regla práctica, consumir en pocos días y siempre conservar en recipiente limpio y bien cerrado.",
  },
  {
    q: "5. ¿Qué pasa si se rompe la cadena de frío?",
    a: "Si permanece mucho tiempo a temperatura ambiente, aumenta el riesgo de deterioro. Debe regresarse al frío lo antes posible o descartarse si hay duda de inocuidad.",
  },
  {
    q: "6. ¿Cómo manipularla de forma higiénica?",
    a: "Usar manos limpias, utensilios desinfectados y superficies sanitizadas. Evitar contaminación cruzada con carnes crudas u otros alimentos sin cocción.",
  },
  {
    q: "7. ¿Se puede dejar lista porcionada para servicio?",
    a: "Sí, en porciones cerradas y refrigeradas. Rotular fecha/hora de porcionado ayuda a controlar frescura y merma.",
  },
  {
    q: "8. ¿Cómo mejorar el rendimiento en pizza?",
    a: "Usar corte uniforme, controlar gramaje por porcion y escurrir humedad si la receta lo requiere. Esto mejora cobertura y fundido parejo.",
  },
  {
    q: "9. ¿Por qué a veces suelta agua al fundir?",
    a: "Puede deberse a choque térmico, exceso de humedad o temperatura de horneado no equilibrada. Ajustar horno y manejo previo mejora el resultado.",
  },
  {
    q: "10. ¿Se puede rallar para usar después?",
    a: "Sí. Guardar refrigerada en recipiente hermético y usar en corto tiempo para evitar deshidratación y pérdida de textura.",
  },
  {
    q: "11. ¿Cuál es la mejor forma de descongelar?",
    a: "Descongelar en refrigeración, nunca a temperatura ambiente. Luego usar en preparaciones calientes para mejor experiencia.",
  },
  {
    q: "12. ¿Cómo identificar que no está apta para consumo?",
    a: "Cambios fuertes de olor, color inusual, moho o textura anormal son señales de deterioro. En esos casos, no consumir.",
  },
  {
    q: "13. ¿Qué buenas prácticas aplicar en negocio o restaurante?",
    a: "Aplicar FIFO (primero en entrar, primero en salir), control de temperaturas, limpieza de equipos y trazabilidad por lotes.",
  },
  {
    q: "14. ¿La mozzarella sirve para preparaciones frías?",
    a: "Sí, puede usarse en ensaladas y sándwiches. Mantener siempre refrigerada hasta el momento de servir.",
  },
  {
    q: "15. ¿Cómo transportar mozzarella de forma segura?",
    a: "En nevera o conservadora con frío suficiente para mantener 0 C a 4 C durante todo el trayecto.",
  },
  {
    q: "16. ¿Qué recomendaciones hay para negocios con alto volumen?",
    a: "Planificar inventario por rotación semanal, estandarizar porciones y mantener protocolo de limpieza para reducir merma y variación de calidad.",
  },
  {
    q: "17. ¿Puedo mezclarla con otros quesos para pizza?",
    a: "Sí, combinar con otros quesos puede mejorar perfil de sabor y gratinado. Ajustar porcentaje según receta y costo objetivo.",
  },
  {
    q: "18. ¿Qué hacer si necesito asesoría para mi negocio?",
    a: "Puedes escribir por WhatsApp a Medellín u Oriente y el equipo comercial te apoya con presentaciones y atención por zona.",
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden">
        <img
          src={fondo}
          alt="Fondo Quesillos Manuelita"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/75" />

        <div className="relative max-w-6xl mx-auto px-6 py-14 md:py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-200 hover:text-white mb-8"
          >
            <span>&larr;</span>
            <span>Volver al inicio</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <img
              src={logo}
              alt="Quesillos Manuelita"
              className="w-24 h-24 rounded-2xl border-4 border-white/40 shadow-xl"
            />
            <div>
              <p className="text-primary font-bold uppercase tracking-wider text-sm">
                Guía de Manipulación
              </p>
              <h1 className="text-white text-3xl md:text-5xl font-extrabold mt-2">
                Preguntas Frecuentes (FAQ)
              </h1>
              <p className="text-slate-200 mt-3 max-w-3xl">
                Resolvemos dudas frecuentes sobre queso tipo mozzarella:
                almacenamiento, cadena de frío, uso en cocina y buenas prácticas
                de manipulación.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {FAQ_ITEMS.map((item) => (
            <article
              key={item.q}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                {item.q}
              </h2>
              <p className="text-slate-600 leading-relaxed">{item.a}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Nota importante
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Esta guía es informativa y complementa buenas prácticas de
            manipulación de alimentos. Para operación comercial, aplica siempre
            los protocolos sanitarios vigentes y normativa local.
          </p>
          <p className="text-slate-500 text-sm mt-4">
            Última actualización: febrero de 2026.
          </p>
        </div>
      </section>
    </main>
  );
}
