# Deploy Automatico a Hostinger (GitHub Actions)

Este proyecto despliega automaticamente a Hostinger via FTP con:
- `.github/workflows/deploy.yml`

## 1) Secrets requeridos en GitHub
Ir a:
- `Repo > Settings > Secrets and variables > Actions > New repository secret`

Crear estos secrets:
- `HOSTINGER_FTP_SERVER`: host FTP (ej: `ftp.tudominio.com`)
- `HOSTINGER_FTP_USERNAME`: usuario FTP
- `HOSTINGER_FTP_PASSWORD`: password FTP
- `HOSTINGER_FTP_PORT`: normalmente `21`
- `HOSTINGER_FTP_TARGET_DIR`: ruta remota, normalmente `/public_html/`
- `VITE_GA_MEASUREMENT_ID`: ID GA4 (si aplica)
- `VITE_META_PIXEL_ID`: ID de Meta Pixel (si aplica)
- `VITE_RECAPTCHA_SITE_KEY`: site key publica de reCAPTCHA

## 2) Flujo de despliegue
1. Hacer commit y push a `main`.
2. GitHub Action corre:
   - `npm ci`
   - `npm run build`
   - sube `dist/` a Hostinger

## 3) Verificacion
- Revisar `Actions` en GitHub (job en verde).
- Abrir:
  - `https://www.quesillosmanuelita.com/`
  - rutas internas: `/pedir`, `/faq`, `/politica-cookies`

## 4) Notas
- `dangerous-clean-slate: true` limpia archivos viejos en el directorio remoto antes de subir.
- Mantener `public/.htaccess` en el proyecto para rutas SPA.
