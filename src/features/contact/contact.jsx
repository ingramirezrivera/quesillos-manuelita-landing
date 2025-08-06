import logo from "../../assets/images/logos/logo.jpeg";

export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl text-center font-bold mb-4">Contáctanos</h2>

        <p className="text-gray-700 text-center mx-auto mb-10 max-w-2xl">
          Escríbenos para resolver tus dudas o peticiones. Llena todos los
          campos correctamente para facilitar que nos contactemos contigo para
          darte respuesta lo más pronto posible.
        </p>

        {/* Contenedor de formulario e información */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulario */}
          <form className="grid grid-cols-1 gap-6 bg-white rounded-xl shadow-md p-6">
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Teléfono"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Mensaje"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="submit"
              className="bg-primary text-black font-semibold px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Enviar mensaje
            </button>
          </form>

          {/* Información de contacto */}

          <div className="flex flex-col justify-center items-center gap-6 text-gray-800 bg-white rounded-xl shadow-md p-6 h-full">
            <div className="flex justify-center items-center gap-4">
              <img
                src={logo}
                alt="Logo"
                className="w-20 h-20 mb-8 object-contain"
              />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg">Teléfono</h3>
              <p className="text-gray-600 mt-1">+57 312 345 6789</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg">Correo</h3>
              <p className="text-gray-600 mt-1">
                contacto@quesillosmanuelita.com
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg">Síguenos</h3>
              <div className="flex justify-center gap-4 mt-2">
                <a href="#" aria-label="Instagram">
                  <svg
                    className="w-6 h-6 text-gray-600 hover:text-primary transition"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 2C4.8 2 2.8 2.8 1.3 4.3S0 7.3 0 9.5v5c0 2.2.8 4.2 2.3 5.7S4.8 22 7 22h10c2.2 0 4.2-.8 5.7-2.3S24 16.7 24 14.5v-5c0-2.2-.8-4.2-2.3-5.7S19.2 2 17 2H7zm5 5a5 5 0 110 10 5 5 0 010-10zm6.5-.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM7 4h10c1.5 0 2.9.6 3.9 1.6C22.4 6.6 23 8 23 9.5v5c0 1.5-.6 2.9-1.6 3.9-1 1-2.4 1.6-3.9 1.6H7c-1.5 0-2.9-.6-3.9-1.6C2.6 17.4 2 16 2 14.5v-5C2 8 2.6 6.6 3.6 5.6 4.6 4.6 6 4 7 4z" />
                  </svg>
                </a>
                <a href="#" aria-label="Facebook">
                  <svg
                    className="w-6 h-6 text-gray-600 hover:text-primary transition"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.6 9.1 8.3 9.9v-7H8v-3h2.3V9.5c0-2.3 1.4-3.5 3.4-3.5 1 0 2 .2 2 .2v2.2H14c-1.1 0-1.5.7-1.5 1.4V12H16l-.5 3h-2v7c4.7-.8 8.3-4.9 8.3-9.9z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
