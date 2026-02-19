import { useEffect } from "react";
import logo from "../../assets/images/logos/logo.jpeg";
import { trackEvent, trackWhatsAppClick } from "../../utils/tracking";

const CONTACT_ZONES = [
  {
    id: "medellin",
    label: "Medellín",
    subtitle: "Área Metropolitana",
    phone: "573042091223",
  },
  {
    id: "oriente",
    label: "Oriente",
    subtitle: "Valle de San Nicolás",
    phone: "573009891200",
  },
];

function buildMessage(zoneLabel) {
  return `¡Hola! Vi su marca y me interesa conocer más sobre sus productos. Me brindan información por favor.`;
}

export default function WhatsAppRedesPage() {
  useEffect(() => {
    trackEvent("view_whatsapp_social_hub", {
      source: "social_redirect",
      page: "whatsappredes",
    });
  }, []);

  return (
    <main className="relative min-h-[100svh] md:min-h-[100dvh] bg-slate-950 text-white overflow-hidden px-2 py-2 sm:px-4 sm:py-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.22),_transparent_35%),radial-gradient(circle_at_80%_20%,_rgba(16,185,129,0.22),_transparent_35%),linear-gradient(145deg,_#020617_0%,_#0f172a_45%,_#111827_100%)]" />
      <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-yellow-300/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100svh-1rem)] sm:min-h-[calc(100svh-2rem)] md:min-h-[calc(100dvh-2rem)] w-full max-w-md items-center">
        <div className="w-full bg-white/10 border border-white/20 rounded-3xl p-6 md:p-10 backdrop-blur-md shadow-2xl">
          <div className="text-center">
            <img
              src={logo}
              alt="Quesillos Manuelita"
              width="512"
              height="512"
              decoding="async"
              className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-2xl border-4 border-white/70 shadow-xl object-cover"
            />

            <p className="mt-6 text-yellow-300 font-semibold uppercase tracking-[0.22em] text-xs md:text-sm">
              Quesillos Manuelita
            </p>
            <h1 className="mt-3 text-3xl md:text-5xl font-black leading-tight">
              Elige tu zona de WhatsApp
            </h1>
          </div>

          <div className="mt-10 max-w-xl mx-auto flex flex-col gap-4">
            {CONTACT_ZONES.map((zone) => {
              const message = buildMessage(zone.label);
              const whatsappUrl = `https://wa.me/${
                zone.phone
              }?text=${encodeURIComponent(message)}`;

              return (
                <a
                  key={zone.id}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent("select_whatsapp_zone", {
                      zone: zone.id,
                      source: "social_whatsapp_hub",
                    });
                    trackWhatsAppClick({
                      zone: zone.id,
                      source: "social_whatsapp_hub",
                      productName: "muestra redes sociales",
                    });
                  }}
                  className="w-full rounded-xl bg-green-500 hover:bg-green-600 transition-colors duration-200 text-white text-center font-bold text-2xl py-4 shadow-lg"
                >
                  {zone.label}
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
