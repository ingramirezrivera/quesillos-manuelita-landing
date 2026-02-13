function getSafeWindow() {
  if (typeof window === "undefined") return null;
  return window;
}

export function trackEvent(eventName, params = {}) {
  const w = getSafeWindow();
  if (!w) return;

  if (typeof w.gtag === "function") {
    w.gtag("event", eventName, params);
  }

  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event: eventName, ...params });
  }
}

export function trackOrderIntent({ productName = "", source = "" } = {}) {
  trackEvent("begin_checkout", {
    source,
    item_name: productName,
  });

  const w = getSafeWindow();
  if (w && typeof w.fbq === "function") {
    w.fbq("track", "InitiateCheckout", {
      content_name: productName || "Producto",
      source,
    });
  }
}

export function trackWhatsAppClick({
  zone = "",
  source = "",
  productName = "",
} = {}) {
  const safeZone = String(zone).toLowerCase().slice(0, 40);
  const safeSource = String(source).toLowerCase().slice(0, 60);
  const safeProduct = String(productName).slice(0, 120);

  trackEvent("generate_lead", {
    method: "whatsapp",
    zone: safeZone,
    source: safeSource,
    product_name: safeProduct,
  });

  const w = getSafeWindow();
  if (w && typeof w.fbq === "function") {
    w.fbq("track", "Lead", {
      channel: "whatsapp",
      zone: safeZone,
      source: safeSource,
      content_name: safeProduct || "WhatsApp Lead",
    });
  }
}

