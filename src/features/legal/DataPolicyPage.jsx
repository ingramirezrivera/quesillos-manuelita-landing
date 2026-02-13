import { Link } from "react-router-dom";
import logo from "../../assets/images/logos/logo.jpeg";
import fondo from "../../assets/images/about/fondo-about.jpg";

export default function DataPolicyPage() {
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
                Privacidad y Datos
              </p>
              <h1 className="text-white text-3xl md:text-5xl font-extrabold mt-2">
                Politica de Tratamiento de Datos
              </h1>
              <p className="text-slate-200 mt-3 max-w-3xl">
                En Quesillos Manuelita S.A.S. protegemos tu informacion
                personal. Esta politica explica como recolectamos, usamos y
                protegemos tus datos, incluyendo su uso para analitica digital y
                fortalecimiento de nuestras redes sociales.
              </p>
              <p className="text-slate-300 mt-2 text-sm">
                Marco normativo base: Ley 1581 de 2012, Decreto 1377 de 2013 y
                normas concordantes en Colombia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              1. Responsable del tratamiento
            </h2>
            <ul className="text-slate-600 leading-relaxed list-disc pl-5 space-y-1">
              <li>Razon social: Quesillos Manuelita S.A.S.</li>
              <li>Domicilio: Santa Rosa de Osos, Antioquia, Colombia.</li>
              <li>Correo: contacto@quesillosmanuelita.com</li>
              <li>WhatsApp Medellin: +57 304 209 1223</li>
              <li>WhatsApp Oriente: +57 300 989 1200</li>
            </ul>
          </article>

          <article className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              2. Datos que recolectamos
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Podemos recolectar datos como nombre, telefono, correo
              electronico, ciudad, mensajes enviados y datos tecnicos de
              navegacion.
            </p>
          </article>

          <article className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              3. Finalidades del tratamiento
            </h2>
            <ul className="text-slate-600 leading-relaxed list-disc pl-5 space-y-1">
              <li>Atender solicitudes comerciales y de contacto.</li>
              <li>Gestionar pedidos con distribuidores autorizados.</li>
              <li>Mejorar la experiencia del sitio web.</li>
              <li>Realizar analitica para optimizar campanas y contenido.</li>
              <li>Medir rendimiento de estrategias digitales y comerciales.</li>
            </ul>
          </article>

          <article className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              4. Base de autorizacion
            </h2>
            <p className="text-slate-600 leading-relaxed">
              El tratamiento se realiza con tu autorizacion previa, expresa e
              informada al enviar formularios o aceptar herramientas de
              analitica y marketing.
            </p>
          </article>

          <article className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              5. Datos sensibles y menores
            </h2>
            <p className="text-slate-600 leading-relaxed">
              No solicitamos datos sensibles ni de menores de edad de forma
              intencional desde este sitio. Si se detecta una captura
              accidental, se gestionara su eliminacion en el menor tiempo
              razonable.
            </p>
          </article>

          <article className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              6. Transferencia y uso por terceros
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Algunos datos de navegacion pueden ser procesados por plataformas
              de analitica y publicidad digital. No comercializamos bases de
              datos personales.
            </p>
          </article>

          <article className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm md:col-span-2">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              7. Derechos del titular
            </h2>
            <ul className="text-slate-600 leading-relaxed list-disc pl-5 space-y-1">
              <li>Conocer, actualizar y rectificar tus datos personales.</li>
              <li>Solicitar prueba de la autorizacion otorgada.</li>
              <li>Ser informado sobre el uso de tus datos.</li>
              <li>Revocar autorizacion y solicitar supresion cuando aplique.</li>
              <li>Acceder gratuitamente a tus datos personales.</li>
              <li>Presentar quejas ante la SIC por incumplimientos.</li>
            </ul>
          </article>
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            8. Consultas y reclamos (procedimiento)
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Puedes presentar consultas o reclamos sobre tus datos por estos
            canales:
          </p>
          <ul className="text-slate-600 leading-relaxed list-disc pl-5 mt-3 space-y-1">
            <li>Correo: contacto@quesillosmanuelita.com</li>
            <li>WhatsApp Medellin: +57 304 209 1223</li>
            <li>WhatsApp Oriente: +57 300 989 1200</li>
          </ul>
          <p className="text-slate-600 leading-relaxed mt-3">
            Atenderemos consultas en maximo diez (10) dias habiles y reclamos
            en maximo quince (15) dias habiles, conforme a la normativa
            colombiana vigente.
          </p>
        </div>

        <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            9. Vigencia y actualizaciones
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Esta politica puede actualizarse por cambios operativos, tecnicos o
            regulatorios. La version vigente sera siempre la publicada en este
            sitio web.
          </p>
          <p className="text-slate-500 text-sm mt-4">
            Ultima actualizacion: febrero de 2026.
          </p>
        </div>
      </section>
    </main>
  );
}
