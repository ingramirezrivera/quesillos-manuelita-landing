import { useEffect } from "react";

function getSafeSiteUrl() {
  const raw = import.meta.env.VITE_SITE_URL || "https://quesillosmanuelita.com";
  try {
    return new URL(raw).toString().replace(/\/$/, "");
  } catch {
    return "https://quesillosmanuelita.com";
  }
}

const SITE_URL = getSafeSiteUrl();

const BASE_PATH = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

const SEO_BY_PATH = {
  "/": {
    title: "Quesillos Manuelita | Quesillos tipo mozzarella",
    description:
      "Quesillos tipo mozzarella con la mejor calidad y sabor del Norte de Antioquia para Colombia.",
  },
  "/pedir": {
    title: "Pedir por WhatsApp | Quesillos Manuelita",
    description:
      "Selecciona tu distribuidor para pedir por WhatsApp en Medellin y Oriente. Atencion rapida para pedidos comerciales.",
  },
  "/terminos": {
    title: "Terminos y Condiciones | Quesillos Manuelita",
    description:
      "Consulta los terminos y condiciones de uso del sitio web y de atencion comercial de Quesillos Manuelita S.A.S.",
  },
  "/politica-datos": {
    title: "Politica de Tratamiento de Datos | Quesillos Manuelita",
    description:
      "Conoce como Quesillos Manuelita S.A.S. recolecta, usa y protege datos personales conforme a la normativa colombiana.",
  },
  "/politica-cookies": {
    title: "Politica de Cookies | Quesillos Manuelita",
    description:
      "Informacion sobre cookies esenciales, analitica y marketing usadas por Quesillos Manuelita para mejorar la experiencia y medir campanas.",
  },
  "/faq": {
    title: "FAQ Mozzarella | Quesillos Manuelita",
    description:
      "Preguntas frecuentes sobre queso tipo mozzarella: conservacion, cadena de frio, manipulacion higienica, rendimiento y uso en cocina.",
  },
};

function setMeta(attr, key, value) {
  if (!value) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setCanonical(url) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

function setJsonLd() {
  const id = "qm-seo-jsonld";
  let script = document.getElementById(id);
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Quesillos Manuelita S.A.S.",
        url: `${SITE_URL}${BASE_PATH || ""}`,
        logo: `${SITE_URL}${BASE_PATH}/og-image.jpg`,
        sameAs: [
          "https://www.facebook.com/profile.php?id=100070905380130",
          "https://www.instagram.com/quesillosmanuelita/",
        ],
      },
      {
        "@type": "WebSite",
        name: "Quesillos Manuelita",
        url: `${SITE_URL}${BASE_PATH || ""}`,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}${BASE_PATH || ""}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  script.textContent = JSON.stringify(jsonLd);
}

export default function SeoManager({ pathname }) {
  useEffect(() => {
    const config = SEO_BY_PATH[pathname] || SEO_BY_PATH["/"];
    const url = new URL(
      `${BASE_PATH}${pathname === "/" ? "/" : pathname}`,
      SITE_URL,
    ).toString();
    const imageUrl = `${SITE_URL}${BASE_PATH}/og-image.jpg`;

    document.title = config.title;
    setCanonical(url);

    setMeta("name", "description", config.description);
    setMeta("name", "robots", "index,follow,max-image-preview:large");

    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "Quesillos Manuelita");
    setMeta("property", "og:locale", "es_CO");
    setMeta("property", "og:title", config.title);
    setMeta("property", "og:description", config.description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", imageUrl);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", config.title);
    setMeta("name", "twitter:description", config.description);
    setMeta("name", "twitter:image", imageUrl);

    setJsonLd();
  }, [pathname]);

  return null;
}
