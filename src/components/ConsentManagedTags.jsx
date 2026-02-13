import { useEffect } from "react";

const STORAGE_KEY = "qm_cookie_consent_v1";

function readConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

function removeElementById(id) {
  const node = document.getElementById(id);
  if (node) node.remove();
}

function ensureGa(consent) {
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!gaId) return;

  const analyticsAllowed = Boolean(consent?.analytics);

  if (!analyticsAllowed) {
    window[`ga-disable-${gaId}`] = true;
    removeElementById("qm-ga-loader");
    removeElementById("qm-ga-inline");
    return;
  }

  window[`ga-disable-${gaId}`] = false;
  if (document.getElementById("qm-ga-loader")) return;

  const loader = document.createElement("script");
  loader.id = "qm-ga-loader";
  loader.async = true;
  loader.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;

  const inline = document.createElement("script");
  inline.id = "qm-ga-inline";
  inline.text = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = window.gtag || gtag;
    gtag('js', new Date());
    gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    gtag('config', '${gaId}', { anonymize_ip: true });
  `;

  document.head.appendChild(loader);
  document.head.appendChild(inline);
}

function ensureMetaPixel(consent) {
  const pixelId = import.meta.env.VITE_META_PIXEL_ID;
  if (!pixelId) return;

  const marketingAllowed = Boolean(consent?.marketing);

  if (!marketingAllowed) {
    if (typeof window.fbq === "function") {
      window.fbq("consent", "revoke");
    }
    removeElementById("qm-meta-loader");
    removeElementById("qm-meta-inline");
    return;
  }

  if (document.getElementById("qm-meta-loader")) return;

  const loader = document.createElement("script");
  loader.id = "qm-meta-loader";
  loader.text = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
  `;

  const inline = document.createElement("script");
  inline.id = "qm-meta-inline";
  inline.text = `
    fbq('consent', 'grant');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `;

  document.head.appendChild(loader);
  document.head.appendChild(inline);
}

function syncTagsFromConsent() {
  const consent = readConsent();
  ensureGa(consent);
  ensureMetaPixel(consent);
}

export default function ConsentManagedTags() {
  useEffect(() => {
    syncTagsFromConsent();

    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        syncTagsFromConsent();
      }
    };

    const onConsentUpdated = () => {
      syncTagsFromConsent();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("cookie-consent-updated", onConsentUpdated);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cookie-consent-updated", onConsentUpdated);
    };
  }, []);

  return null;
}
