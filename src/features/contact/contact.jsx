import { Link } from "react-router-dom";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha"; // 1. Importamos la librería
import logo from "../../assets/images/contact/districatar-logo.png";
import logoCheese from "../../assets/images/distributors/distri-cheese-logo.jpeg";
import { trackWhatsAppClick } from "../../utils/tracking";

export default function Contact() {
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  // Estado para verificar si el captcha fue resuelto
  const [isVerified, setIsVerified] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [acceptDataPolicy, setAcceptDataPolicy] = useState(false);

  // 2. Función que se ejecuta cuando el usuario resuelve el captcha
  const handleCaptchaChange = (value) => {
    // Si 'value' existe, significa que Google confirmó que es humano
    if (value) {
      setIsVerified(true);
    } else {
      // Si el captcha expira o falla
      setIsVerified(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hablemos de negocios
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            ¿Tienes dudas sobre nuestros productos o quieres ser aliado? Estamos
            listos para atenderte.
          </p>
        </div>

        {/* --- TARJETA PRINCIPAL --- */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 min-h-[600px]">
          {/* COLUMNA IZQUIERDA (INFO) */}
          <div className="lg:col-span-2 bg-slate-900 text-white p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 rounded-full bg-white/5 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6">
                Información de Contacto
              </h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Llena el formulario y nuestro equipo comercial se pondrá en
                contacto contigo en menos de 24 horas.
              </p>

              <div className="space-y-6">
                {/* WhatsApp con desplegable inline */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setIsWhatsAppOpen((v) => !v)}
                    className="w-full flex items-center justify-between gap-4 group transition-transform hover:translate-x-1"
                    aria-expanded={isWhatsAppOpen}
                    aria-controls="whatsapp-options"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-[#25D366] p-3 rounded-lg text-white shadow-lg shadow-green-500/20 group-hover:shadow-green-500/40 transition-all">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          className="w-7 h-7"
                        >
                          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-white">WhatsApp</p>
                        <p className="text-slate-400 text-sm mt-1">
                          Elige tu zona de atención
                        </p>
                      </div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-5 h-5 text-slate-300 transition-transform ${isWhatsAppOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>

                  {isWhatsAppOpen && (
                    <div id="whatsapp-options" className="grid gap-2 pl-[60px]">
                      <a
                        href={`https://wa.me/573042091223?text=${encodeURIComponent("Hola, quiero información para Medellín y Área Metropolitana.")}`}
                        onClick={() => trackWhatsAppClick({ zone: "medellin", source: "contact_section", phone: "573042091223" })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-lg bg-[#25D366] text-white font-semibold px-4 py-2.5 hover:bg-[#20bd5a] transition-colors"
                      >
                        Medellín
                      </a>
                      <a
                        href={`https://wa.me/573009891200?text=${encodeURIComponent("Hola, quiero información para Oriente y Valle de San Nicolás.")}`}
                        onClick={() => trackWhatsAppClick({ zone: "oriente", source: "contact_section", phone: "573009891200" })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-lg bg-[#25D366] text-white font-semibold px-4 py-2.5 hover:bg-[#20bd5a] transition-colors"
                      >
                        Oriente
                      </a>
                    </div>
                  )}
                </div>

                {/* Escríbenos */}
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Escríbenos</p>
                    <p className="text-slate-400 text-sm mt-1">
                      contacto@quesillosmanuelita.com
                    </p>
                  </div>
                </div>

                {/* Sede */}
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Sede Principal</p>
                    <p className="text-slate-400 text-sm mt-1">
                      Santa Rosa de Osos, Antioquia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Logos */}
            <div className="relative z-10 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex gap-4">
                <div className="bg-white p-2 rounded-lg inline-block">
                  <img
                    src={logo}
                    alt="Districatar Logo"
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <div className="bg-white p-2 rounded-lg inline-block">
                  <img
                    src={logoCheese}
                    alt="Distri Cheese Logo"
                    className="h-12 w-auto object-contain"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                {/* Redes Sociales... */}
                <a
                  href="https://www.facebook.com/profile.php?id=100070905380130"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2 md:p-2.5 bg-white/10 rounded-full hover:bg-primary hover:text-white transition-colors text-white"
                >
                  <svg
                    className="w-6 h-6 md:w-7 md:h-7"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/quesillosmanuelita/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2 md:p-2.5 bg-white/10 rounded-full hover:bg-primary hover:text-white transition-colors text-white"
                >
                  <svg
                    className="w-6 h-6 md:w-7 md:h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA (FORMULARIO) */}
          <div className="lg:col-span-3 p-8 md:p-12">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1">
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nombre completo
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition"
                  placeholder="Ej. Juan Pérez"
                  required
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="contact-phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Teléfono
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition"
                  placeholder="Ej. 300 123 4567"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Correo electrónico
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition"
                  placeholder="Ej. correo@empresa.com"
                  required
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  ¿En qué podemos ayudarte?
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
                  placeholder="Escribe aquí tu mensaje..."
                  required
                />
              </div>

              {/* 3. AQUÍ ESTÁ EL COMPONENTE RECAPTCHA */}
              <div className="col-span-1 md:col-span-2 flex justify-center md:justify-start">
                {recaptchaSiteKey ? (
                  <ReCAPTCHA
                    sitekey={recaptchaSiteKey}
                    onChange={handleCaptchaChange}
                  />
                ) : (
                  <div className="w-full max-w-md rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    Falta configurar reCAPTCHA. Define{" "}
                    <code className="font-semibold">
                      VITE_RECAPTCHA_SITE_KEY
                    </code>{" "}
                    en <code className="font-semibold">.env.local</code>.
                  </div>
                )}
              </div>

              {/* 4. BOTÓN (Deshabilitado hasta verificar) */}
              <div className="col-span-1 md:col-span-2">
                <label className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptDataPolicy}
                    onChange={(e) => setAcceptDataPolicy(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>
                    Autorizo el tratamiento de mis datos personales conforme a la{" "}
                    <Link
                      to="/politica-datos"
                      className="text-primary font-semibold hover:underline"
                    >
                      Política de Tratamiento de Datos
                    </Link>{" "}
                    de Quesillos Manuelita S.A.S.
                  </span>
                </label>
              </div>

              <div className="col-span-1 md:col-span-2 mt-2">
                <button
                  type="submit"
                  disabled={!recaptchaSiteKey || !isVerified || !acceptDataPolicy}
                  className={`w-full md:w-auto font-bold px-8 py-4 rounded-xl transition-all shadow-lg transform ${
                    isVerified && acceptDataPolicy
                      ? "bg-primary text-black hover:bg-yellow-400 hover:shadow-yellow-500/30 hover:-translate-y-1 cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                  }`}
                >
                  Enviar Mensaje
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}






