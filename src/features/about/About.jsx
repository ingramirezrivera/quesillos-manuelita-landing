import { useRef } from "react";
import { ABOUT_SECTIONS } from "./aboutData";
import fondo from "../../assets/images/about/fondo-about.jpg";

export default function About() {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const scrollAmount = direction === "left" ? -320 : 320;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const stats = [
    { number: "15+", label: "Años de experiencia", icon: "calendar" },
    { number: "500k+", label: "Litros procesados/año", icon: "drop" },
    { number: "300+", label: "Familias beneficiadas", icon: "users" },
    { number: "2024", label: "Premio Nacional", icon: "award" },
  ];

  const getSectionIcon = (id) => {
    const iconClasses = "w-10 h-10 text-primary";
    switch (id) {
      case "historia":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClasses}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25L13.292 19.5m0-14.25v14.25"
            />
          </svg>
        );
      case "nuestra-mision":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClasses}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
            />
          </svg>
        );
      case "nuestra-vision":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClasses}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        );
      case "producción":
      case "produccion":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClasses}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
            />
          </svg>
        );
      case "equipo":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClasses}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
            />
          </svg>
        );
      case "calidad":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClasses}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 1.043-3.296A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            />
          </svg>
        );
      case "medio-ambiente":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={iconClasses}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a9.004 9.004 0 0 1 8.716-6.747M12 3a9.004 9.004 0 0 0-8.716 6.747"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="about" className="relative w-full overflow-hidden bg-slate-50">
      <style>{`
        @keyframes infinite-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-infinite-scroll { display: flex; width: max-content; animation: infinite-scroll 20s linear infinite; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- SECCIÓN HERO --- */}
      <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src={fondo}
            alt="Fondo Nosotros"
            className="w-full h-full object-cover brightness-50"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-50 z-10" />
        </div>
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-0 md:mt-10">
          <span className="text-primary font-bold tracking-wider uppercase text-sm bg-white/10 backdrop-blur-md px-4 py-1 rounded-full border border-white/20 text-white mb-4 inline-block">
            Nuestra Esencia
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Tradición que <span className="text-primary">construye</span>{" "}
            futuro.
          </h2>
          <p className="text-slate-200 text-lg md:text-xl leading-relaxed md:mb-48">
            Más que una empresa, somos una familia dedicada a llevar calidad a
            tu mesa. Conoce la historia y los valores que nos impulsan cada día.
          </p>
        </div>

        {/* KPI DESKTOP */}
        <div className="hidden md:block absolute -bottom-16 w-full z-30 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4 bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            {stats.map((stat, index) => (
              <KPI key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>

      {/* KPI MOBILE */}
      <div className="md:hidden relative z-30 -mt-10 mb-12 overflow-hidden w-full">
        <div className="bg-white py-6 shadow-xl border-y border-slate-100">
          <div className="animate-infinite-scroll hover:[animation-play-state:paused]">
            {[...stats, ...stats].map((stat, index) => (
              <div key={index} className="flex-shrink-0 w-64 mx-4">
                <KPI {...stat} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- FLASHCARDS (SECCIONES) --- */}
      <div className="pt-10 md:pt-32 pb-20 px-0 md:px-6 max-w-7xl mx-auto relative z-20">
        <div
          ref={carouselRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-scroll md:overflow-visible snap-x md:snap-mandatory hide-scrollbar px-6 md:px-0 pb-8"
        >
          {ABOUT_SECTIONS.map((section, index) => {
            return (
              <div
                key={index}
                // CAMBIO REALIZADO: min-w-[95%] para que la tarjeta sea más ancha en móvil
                className="w-[95%] shrink-0 md:min-w-0 snap-center group bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Contenedor de TEXTO */}
                <div className="p-8 pb-0 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors shrink-0">
                      {getSectionIcon(section.id)}
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-slate-800 group-hover:text-primary transition-colors">
                      {section.title}
                    </h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-base mb-6">
                    {section.body}
                  </p>
                </div>

                {/* Imagen Full Width */}
                <div className="h-56 md:h-64 w-full relative mt-auto">
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
                  <img
                    src={section.media?.src || fondo}
                    alt={section.title}
                    // CAMBIO APLICADO: Agregamos 'block' para eliminar espacios inferiores
                    className="w-full h-full object-cover block"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Botones de control móvil */}
        <div className="flex justify-center gap-4 md:hidden px-6">
          <button
            onClick={() => scroll("left")}
            aria-label="Anterior"
            className="bg-white border border-slate-200 text-primary p-3 rounded-full shadow-lg active:scale-95 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Siguiente"
            className="bg-primary text-white p-3 rounded-full shadow-lg shadow-primary/30 active:scale-95 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function KPI({ number, label, icon }) {
  /* ... tu componente KPI sin cambios ... */
  const icons = {
    calendar: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    ),
    drop: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
      />
    ),
    users: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    ),
    award: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0V5.625a2.625 2.625 0 11-5.25 0v2.875"
      />
    ),
  };
  return (
    <div className="flex flex-col items-center justify-center text-center p-2">
      <div className="text-primary mb-4 bg-primary/10 p-5 rounded-full inline-flex items-center justify-center shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          {icons[icon] || icons.calendar}
        </svg>
      </div>
      <div className="text-4xl font-extrabold text-slate-800 whitespace-nowrap">
        {number}
      </div>
      <p className="text-slate-500 text-sm font-medium uppercase tracking-wide mt-2">
        {label}
      </p>
    </div>
  );
}
