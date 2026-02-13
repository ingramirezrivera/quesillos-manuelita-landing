# Security Notes

## Current scope
This is a frontend SPA (React + Vite). It does not store customer data server-side in this repository.

## Sensitive data
- Never commit real keys/tokens.
- Use `.env.local` only for local development.
- Keep `.env.example` with placeholders.

If a key was exposed, rotate it immediately.

## Analytics and privacy
- GA4 and Meta Pixel are loaded only after cookie consent.
- Do not send PII to analytics events (phone numbers, emails, IDs, full names).

## External links
- Keep `target="_blank"` links with `rel="noopener noreferrer"`.

## Deployment hardening (recommended)
Configure security headers at hosting/CDN level:
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: geolocation=(), microphone=(), camera=()`
- `Content-Security-Policy` tuned for:
  - your domain
  - Google Analytics / Tag Manager domains
  - Meta Pixel domains
  - reCAPTCHA domains

## Dependency hygiene
- Run `npm audit` periodically.
- Keep dependencies updated (especially analytics and recaptcha packages).

## Incident response basics
If you detect suspicious behavior:
1. Revoke/rotate exposed keys.
2. Disable affected integrations.
3. Review recent code and deployment changes.
4. Re-enable with corrected configuration.
