import logo from "../../assets/images/contact/districatar-logo.png";
// 👇 IMPORTANTE: Asegúrate de que la ruta y el nombre del archivo sean correctos
import logoCheese from "../../assets/images/contact/distri-cheese-logo.png";

export default function Contact() {
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

        {/* --- TARJETA PRINCIPAL (Split Layout) --- */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 min-h-[600px]">
          {/* 1. COLUMNA INFORMACIÓN (Oscura / Corporativa) */}
          <div className="lg:col-span-2 bg-slate-900 text-white p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Decoración de fondo (Círculos sutiles) */}
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
                {/* Teléfono */}
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Llámanos</p>
                    <p className="text-slate-400 text-sm mt-1">
                      +57 304 209 1223
                    </p>
                  </div>
                </div>

                {/* Correo */}
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

                {/* Ubicación (Opcional, agrega confianza) */}
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

            {/* Footer de la columna izquierda con Logo y Redes */}
            <div className="relative z-10 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              {/* --- AQUÍ ESTÁN LOS DOS LOGOS JUNTOS --- */}
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
                <a
                  href="#"
                  className="p-2 bg-white/10 rounded-full hover:bg-primary hover:text-white transition-colors text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="p-2 bg-white/10 rounded-full hover:bg-primary hover:text-white transition-colors text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.072 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.072 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* 2. COLUMNA FORMULARIO (Limpio y Blanco) */}
          <div className="lg:col-span-3 p-8 md:p-12">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  placeholder="Ej. Juan Pérez"
                  required
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  placeholder="Ej. 300 123 4567"
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  placeholder="Ej. correo@empresa.com"
                  required
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ¿En qué podemos ayudarte?
                </label>
                <textarea
                  name="message"
                  rows="4"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                  placeholder="Escribe aquí tu mensaje..."
                  required
                />
              </div>

              <div className="col-span-1 md:col-span-2 mt-4">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-primary text-black font-bold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/30 transform hover:-translate-y-1"
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
