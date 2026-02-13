# Quesillos Manuelita Landing

Landing comercial de Quesillos Manuelita S.A.S. construida con React + Vite.

## Stack tecnico
- React 19
- Vite 7
- React Router DOM 7
- Tailwind CSS 3
- ESLint 9
- react-google-recaptcha

## Funcionalidades principales
- Home con secciones:
  - Hero
  - Productos (cards + modal + flujo a pedido)
  - About
  - Contacto
  - Footer
- Pagina de pedido por zona (`/pedir`) con salida a WhatsApp.
- Sistema de consentimiento de cookies:
  - Banner inicial
  - Panel de preferencias
  - Persistencia en `localStorage`
- Integracion de tracking condicionada por consentimiento:
  - GA4 (si hay consentimiento de analitica)
  - Meta Pixel (si hay consentimiento de marketing)
- Paginas informativas:
  - `/terminos`
  - `/politica-datos`
  - `/politica-cookies`
  - `/faq`
- SEO tecnico base:
  - Metadatos dinamicos por ruta
  - Open Graph / Twitter cards
  - `robots.txt`
  - `sitemap.xml`
  - `site.webmanifest`

## Estructura del proyecto
```txt
src/
  components/
    CookieConsent.jsx
    ConsentManagedTags.jsx
    Header.jsx
    SeoManager.jsx
    WhatsAppFloat.jsx
  features/
    about/
    contact/
    footer/
    hero/
    legal/
    order/
    products/
    reviews/      (no renderizada por defecto)
    allies/       (no renderizada por defecto)
  utils/
    tracking.js
  App.jsx
  main.jsx

public/
  robots.txt
  sitemap.xml
  site.webmanifest
  og-image.jpg
```

## Scripts
- `npm run dev`: entorno local.
- `npm run build`: build de produccion.
- `npm run preview`: previsualizar build.
- `npm run lint`: lint global del repo.

## Variables de entorno
Usar `.env.local` para desarrollo local.

Variables importantes:
- `VITE_SITE_URL`: URL publica del sitio (ej: `https://tudominio.com`).
- `VITE_BASE_PATH`: base de despliegue (`/` para dominio principal, o `/subcarpeta/`).
- `VITE_GA_MEASUREMENT_ID`: ID de GA4 (`G-XXXXXXXXXX`).
- `VITE_META_PIXEL_ID`: ID numerico del Pixel de Meta.
- `VITE_RECAPTCHA_SITE_KEY`: site key publica de Google reCAPTCHA.

Opcional ya existente:
- `GOOGLE_API_KEY`

## Tracking y conversiones
Eventos implementados en `src/utils/tracking.js`:
- `begin_checkout` + `InitiateCheckout` (Meta)
- `generate_lead` + `Lead` (Meta)

Fuentes de eventos:
- Boton "Hacer pedido" en modal de productos
- WhatsApp en:
  - Order page
  - Boton flotante
  - Contacto
  - Footer

## Cookies y cumplimiento
- El consentimiento se guarda con llave:
  - `qm_cookie_consent_v1`
- Cambios de preferencia se pueden abrir desde Footer:
  - `Configurar cookies`
- GA4/Meta no se inyectan si no hay consentimiento correspondiente.

## Seguridad
- Guia de seguridad y endurecimiento: `SECURITY.md`
- Nunca subir secretos reales al repositorio.

## SEO y salida a dominio
Checklist de publicacion:
- `docs/SEO_LAUNCH_CHECKLIST.md`

Antes de publicar con dominio:
1. Configurar `VITE_SITE_URL`.
2. Actualizar URLs absolutas en `public/robots.txt` y `public/sitemap.xml`.
3. Verificar metadatos en produccion.

## Estado de secciones
En `src/App.jsx`, las secciones `Reviews` y `Allies` estan comentadas de forma intencional.

## Recomendaciones operativas
- Mantener imagenes optimizadas en `src/assets`.
- Validar flujos de WhatsApp despues de cada cambio de numero o copy.
- Revisar legal/SEO cuando cambien politicas, rutas o dominio.
