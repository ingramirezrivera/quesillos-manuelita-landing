import { Link } from "react-router-dom";
import logo from "../../assets/images/logos/logo.jpeg";
import fondo from "../../assets/images/about/fondo-about.jpg";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden">
        <img
          src={fondo}
          alt="Fondo Quesillos Manuelita"
          decoding="async"
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
              decoding="async"
              className="w-24 h-24 rounded-2xl border-4 border-white/40 shadow-xl"
            />
            <div>
              <p className="text-primary font-bold uppercase tracking-wider text-sm">
                Información Legal
              </p>
              <h1 className="text-white text-3xl md:text-5xl font-extrabold mt-2">
                Términos y Condiciones
              </h1>
              <p className="text-slate-200 mt-3 max-w-3xl">
                Quesillos Manuelita S.A.S. establece los presentes términos para
                regular el uso de este sitio web y la gestión de solicitudes
                comerciales y de pedidos por canales digitales.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              1. Uso del sitio
            </h2>
            <p className="text-slate-600 leading-relaxed">
              El contenido del sitio tiene fines informativos y comerciales. Al
              navegar en esta página, el usuario acepta utilizarla de forma
              responsable, sin afectar su funcionamiento ni vulnerar derechos de
              terceros.
            </p>
          </article>

          <article className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              2. Productos y disponibilidad
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Las imágenes, descripciones y presentaciones de productos son
              referenciales. La disponibilidad y condiciones de entrega pueden
              variar por zona, distribuidor y fecha de solicitud.
            </p>
          </article>

          <article className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              3. Pedidos y atención por WhatsApp
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Los pedidos se gestionan con distribuidores autorizados. El envío
              de mensajes por WhatsApp implica aceptación de contacto comercial
              para atender la solicitud en Medellín, Oriente u otras zonas
              habilitadas.
            </p>
          </article>

          <article className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              4. Precios y condiciones comerciales
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Los precios, promociones, cantidades mínimas y tiempos de entrega
              son definidos por el distribuidor correspondiente y pueden cambiar
              sin previo aviso según condiciones del mercado.
            </p>
          </article>

          <article className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              5. Protección de datos
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Los datos compartidos por formularios o mensajería se utilizan
              únicamente para contacto, cotización y atención de pedidos, en
              cumplimiento de la normativa aplicable de protección de datos.
            </p>
          </article>

          <article className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              6. Propiedad intelectual
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Marcas, logotipos, fotografías y textos publicados en este sitio
              pertenecen a Quesillos Manuelita S.A.S. o a sus titulares
              autorizados. Su uso no autorizado está prohibido.
            </p>
          </article>
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            7. Vigencia y modificaciones
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Quesillos Manuelita S.A.S. podrá actualizar estos términos en
            cualquier momento para mejorar la información y el servicio. Se
            recomienda revisarlos periódicamente.
          </p>
          <p className="text-slate-500 text-sm mt-4">
            Última actualización: diciembre de 2025.
          </p>
        </div>
      </section>
    </main>
  );
}


