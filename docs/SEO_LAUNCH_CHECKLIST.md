# SEO Launch Checklist (Cuando ya tengan dominio)

1. Configurar variables de entorno en produccion:
- `VITE_SITE_URL=https://tudominio.com`
- `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
- `VITE_META_PIXEL_ID=123456789012345`

2. Ajustar URLs absolutas:
- `public/robots.txt`: actualizar `Sitemap:`
- `public/sitemap.xml`: reemplazar `https://quesillosmanuelita.com` por el dominio real.

3. Verificar sitemap y robots en navegador:
- `https://tudominio.com/robots.txt`
- `https://tudominio.com/sitemap.xml`

4. Google Search Console:
- Crear propiedad del dominio.
- Enviar `sitemap.xml`.
- Solicitar indexacion de `/`, `/pedir`, `/terminos`, `/politica-datos`, `/politica-cookies`.

5. Meta / Facebook:
- Verificar dominio en Business Manager.
- Validar Pixel con Test Events.

6. Validaciones SEO tecnicas:
- Revisar `title`, `description`, `canonical` y `og:url` por ruta.
- Probar preview en WhatsApp/Facebook con `og:image`.

7. Cookies y cumplimiento:
- Confirmar que GA4 y Meta Pixel solo cargan tras consentimiento.
- Revisar funcionamiento de `Configurar cookies`.
