import { useSearchParams, Link } from "react-router-dom";
import logo from "../../assets/images/logos/logo.jpeg";
// 1. Importa los logos de los distribuidores
import districatarLogo from "../../assets/images/distributors/districatar-logo.png";
import pabloQuesosLogo from "../../assets/images/distributors/pablo-quesos-logo.png";

// --- DATOS DE LOS DISTRIBUIDORES ---
// Cuando tengas los logos, puedes poner la ruta en la propiedad `logoSrc`
const distributors = [
  {
    id: "districatar",
    name: "Districatar",
    area: "Medellín y Área Metropolitana",
    phone: "573042091223",
    logoSrc: districatarLogo, // 2. Asigna el logo importado
  },
  {
    id: "pabloquesos",
    name: "Pablo Quesos",
    area: "Oriente y Valle de San Nicolás",
    phone: "573042091223", // Temporal, luego añadir el de Pablo Quesos
    logoSrc: pabloQuesosLogo, // 3. Asigna el logo importado
  },
];

export default function OrderPage() {
  // Leemos el nombre del producto desde la URL (ej: /pedir?producto=Queso%20Doble%20Crema)
  const [searchParams] = useSearchParams();
  const productName = searchParams.get("producto") || "un producto";

  const whatsappMessage = `¡Hola! Vi el producto "${productName}" en su página web y me gustaría saber cómo puedo hacer un pedido. ¡Gracias!`;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-start p-4 sm:p-6 pt-12 md:pt-16">
      <div className="text-center max-w-2xl mx-auto">
        <Link to="/">
          <img
            src={logo}
            alt="Quesillos Manuelita"
            className="w-32 md:w-40 h-auto mx-auto mb-8 transition-transform hover:scale-105 rounded-2xl border-4 border-white shadow-lg"
          />
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Elige tu distribuidor
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Para continuar con tu pedido, por favor selecciona el distribuidor que
          cubre tu zona.
        </p>
      </div>

      {/* --- Tarjetas de Distribuidores --- */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {distributors.map((dist) => (
          <div
            key={dist.id}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-transform transform hover:-translate-y-2"
          >
            {/* Aquí irá el logo del distribuidor cuando lo tengas */}
            {dist.logoSrc ? (
              <img
                src={dist.logoSrc}
                alt={dist.name}
                className={`${dist.id === "districatar" ? "h-40" : "h-36"} mb-4`}
              />
            ) : (
              <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4M4 7s0 0 0 0"
                  />
                </svg>
              </div>
            )}
            <p className="mt-2 text-lg font-semibold text-primary bg-yellow-50 px-4 py-1 rounded-full">
              {dist.area}
            </p>
            <p className="mt-6 text-gray-500 flex-grow">
              Serás redirigido a WhatsApp para completar tu pedido con{" "}
              <span className="font-semibold">{dist.name}</span>.
            </p>
            <a
              href={`https://wa.me/${
                dist.phone
              }?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full inline-flex justify-center items-center gap-2 rounded-xl px-8 py-4 bg-green-500 text-white font-bold text-lg hover:bg-green-600 transition-all shadow-md"
            >
              <span>Contactar por WhatsApp</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>
          </div>
        ))}
      </div>

      <Link
        to="/"
        className="mt-12 text-gray-600 hover:text-gray-900 font-medium"
      >
        &larr; Volver a la página principal
      </Link>
    </div>
  );
}
