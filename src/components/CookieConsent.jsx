import { useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "qm_cookie_consent_v1";

function readStoredConsent() {
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

function persistConsent(consent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
}

export default function CookieConsent() {
  const [storedConsent, setStoredConsent] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const existing = readStoredConsent();
    if (existing) {
      setStoredConsent(existing);
      return;
    }
    setShowBanner(true);
  }, []);

  useEffect(() => {
    const onOpenPanel = () => {
      const existing = readStoredConsent();
      if (existing) {
        setAnalyticsEnabled(Boolean(existing.analytics));
        setMarketingEnabled(Boolean(existing.marketing));
      }
      setShowBanner(false);
      setShowPanel(true);
    };

    window.addEventListener("open-cookie-preferences", onOpenPanel);
    return () =>
      window.removeEventListener("open-cookie-preferences", onOpenPanel);
  }, []);

  const hasConsent = useMemo(() => Boolean(storedConsent), [storedConsent]);

  const saveConsent = (analytics, marketing) => {
    const consent = {
      essential: true,
      analytics,
      marketing,
      consentVersion: "1.0",
      updatedAt: new Date().toISOString(),
    };

    persistConsent(consent);
    window.dispatchEvent(
      new CustomEvent("cookie-consent-updated", { detail: consent }),
    );
    setStoredConsent(consent);
    setShowBanner(false);
    setShowPanel(false);
  };

  const acceptAll = () => saveConsent(true, true);

  const openPanelFromBanner = () => {
    setAnalyticsEnabled(Boolean(storedConsent?.analytics));
    setMarketingEnabled(Boolean(storedConsent?.marketing));
    setShowPanel(true);
    setShowBanner(false);
  };

  const closePanel = () => {
    setShowPanel(false);
    if (!storedConsent) {
      setShowBanner(true);
    }
  };

  useEffect(() => {
    if (!showPanel) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowPanel(false);
        if (!storedConsent) {
          setShowBanner(true);
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [showPanel, storedConsent]);

  if (!showBanner && !showPanel && hasConsent) return null;

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-4 left-4 right-4 z-[120] md:left-auto md:right-6 md:max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl p-5">
          <h3 className="text-slate-900 font-bold text-lg">
            Preferencias de cookies
          </h3>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Usamos cookies esenciales, de analítica y marketing para medir
            campañas en redes sociales y mejorar tu experiencia.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={acceptAll}
              className="px-4 py-2.5 rounded-xl bg-primary text-black font-bold hover:bg-yellow-400"
            >
              Aceptar
            </button>
            <button
              type="button"
              onClick={openPanelFromBanner}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
            >
              Personalizar
            </button>
          </div>
        </div>
      )}

      {showPanel && (
        <div className="fixed inset-0 z-[130]">
          <button
            type="button"
            aria-label="Cerrar panel de cookies"
            className="absolute inset-0 bg-black/40"
            onClick={closePanel}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-panel-title"
            className="absolute inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 w-auto md:w-full md:max-w-xl bg-white rounded-2xl shadow-2xl p-6"
          >
            <h3
              id="cookie-panel-title"
              className="text-slate-900 font-bold text-xl"
            >
              Panel de cookies
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Puedes cambiar tus preferencias en cualquier momento.
            </p>
            <button
              type="button"
              onClick={closePanel}
              ref={closeButtonRef}
              aria-label="Cerrar panel"
              className="absolute right-4 top-4 rounded-full border border-slate-300 p-2 text-slate-600 hover:bg-slate-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="mt-5 space-y-4">
              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">
                      Cookies esenciales
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      Necesarias para el funcionamiento del sitio.
                    </p>
                  </div>
                  <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                    Siempre activas
                  </span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4">
                <label className="flex items-start justify-between gap-4 cursor-pointer">
                  <div>
                    <p className="font-semibold text-slate-900">
                      Cookies de analítica
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      Nos ayudan a medir tráfico y rendimiento del sitio.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={analyticsEnabled}
                    onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </label>
              </div>

              <div className="border border-slate-200 rounded-xl p-4">
                <label className="flex items-start justify-between gap-4 cursor-pointer">
                  <div>
                    <p className="font-semibold text-slate-900">
                      Cookies de marketing
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      Permiten medir conversiones de campañas en redes sociales.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={marketingEnabled}
                    onChange={(e) => setMarketingEnabled(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </label>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={acceptAll}
                className="px-4 py-2.5 rounded-xl bg-primary text-black font-bold hover:bg-yellow-400"
              >
                Aceptar todo
              </button>
              <button
                type="button"
                onClick={() => saveConsent(analyticsEnabled, marketingEnabled)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
              >
                Guardar preferencias
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
