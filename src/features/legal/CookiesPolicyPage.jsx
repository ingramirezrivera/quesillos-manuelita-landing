import { Link } from "react-router-dom";
import logo from "../../assets/images/logos/logo.jpeg";
import fondo from "../../assets/images/about/fondo-about.jpg";

export default function CookiesPolicyPage() {
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
                Privacidad y Publicidad Digital
              </p>
              <h1 className="text-white text-3xl md:text-5xl font-extrabold mt-2">
                Política de Cookies
              </h1>
              <p className="text-slate-200 mt-3 max-w-3xl">
                Esta política explica cómo Quesillos Manuelita S.A.S. utiliza
                cookies y tecnologías similares para analizar tráfico, medir
                campañas en redes sociales y mejorar la experiencia del usuario.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              1. Qué son las cookies
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Son archivos pequeños que se almacenan en tu dispositivo al
              navegar en este sitio. Permiten recordar preferencias, medir
              interacciones y analizar el rendimiento.
            </p>
          </article>

          <article className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              2. Tipos de cookies que usamos
            </h2>
            <ul className="text-slate-600 leading-relaxed list-disc pl-5 space-y-1">
              <li>Esenciales: necesarias para funcionamiento básico.</li>
              <li>Analítica: miden tráfico y comportamiento de navegación.</li>
              <li>Marketing: miden conversiones y campañas publicitarias.</li>
            </ul>
          </article>

          <article className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              3. Finalidades principales
            </h2>
            <ul className="text-slate-600 leading-relaxed list-disc pl-5 space-y-1">
              <li>Medir tráfico y rendimiento del sitio.</li>
              <li>Optimizar contenidos y conversión digital.</li>
              <li>Medir resultados de anuncios en Facebook e Instagram.</li>
              <li>Mejorar segmentación de campañas pagas.</li>
            </ul>
          </article>

          <article className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              4. Herramientas de terceros
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Podemos usar Google Analytics y Meta Pixel, entre otras
              herramientas de medición. Estas plataformas procesan datos de
              navegación bajo sus propias políticas.
            </p>
          </article>

          <article className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              5. Gestión de consentimiento
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Las cookies no esenciales (analítica y marketing) solo se activan
              cuando el usuario acepta en el banner o guarda preferencias desde
              el panel de cookies. Puedes cambiar tu decisión en cualquier
              momento desde "Configurar cookies".
            </p>
          </article>

          <article className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              6. Cómo desactivar cookies
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Puedes bloquear o eliminar cookies en la configuración de tu
              navegador. Ten en cuenta que algunas funciones esenciales pueden
              verse afectadas.
            </p>
          </article>
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            7. Relación con protección de datos
          </h2>
          <p className="text-slate-600 leading-relaxed">
            El uso de cookies se integra con nuestra{" "}
            <Link
              to="/politica-datos"
              className="text-primary font-semibold hover:underline"
            >
              Política de Tratamiento de Datos
            </Link>
            , donde se detallan derechos del titular y canales de contacto.
          </p>
        </div>

        <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            8. Actualizaciones
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Esta política puede actualizarse por cambios técnicos, legales o
            comerciales. Publicaremos siempre la versión vigente en este sitio.
          </p>
          <p className="text-slate-500 text-sm mt-4">
            Última actualización: febrero de 2026.
          </p>
        </div>
      </section>
    </main>
  );
}


