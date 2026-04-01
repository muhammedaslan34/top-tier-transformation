# Security Headers — Implementation Guide

This document covers every security header configured in this Next.js 15 app,
why each one exists, how the nonce-based CSP works, and how to extend or port
it to another project.

---

## Architecture Overview

Security headers are split across two files with a strict rule:

| File | Responsibility |
|---|---|
| `middleware.ts` | `Content-Security-Policy` — generated **per-request** with a nonce |
| `next.config.js` | All other security headers — set **statically** on every response |

**Why the split?** `next.config.js` headers are applied after middleware runs.
If CSP were defined in both places, `next.config.js` would silently overwrite
the nonce-based one from middleware, destroying the nonce mechanism entirely.

---

## Content-Security-Policy (middleware.ts)

### How the nonce works

1. Middleware runs on every HTML request.
2. `crypto.randomUUID()` generates a cryptographically random value, base64-encoded into a **nonce**.
3. The nonce is embedded into the `script-src` directive: `'nonce-<value>'`.
4. The nonce is also forwarded as the `x-nonce` request header.
5. Next.js reads `x-nonce` internally and stamps it onto every inline `<script>` it injects (hydration bootstrap, route prefetch, server actions).
6. The browser only executes scripts whose `nonce` attribute matches the one in the CSP header.
7. Because each page load gets a **unique** nonce, injected scripts from XSS attacks (which don't know the nonce) are blocked.

### CSP directives explained

```
default-src 'self'
```
Deny-by-default fallback. Any directive not explicitly listed falls back to `'self'` only.

---

```
script-src 'self' 'nonce-{nonce}' 'strict-dynamic' 'unsafe-inline'
           ['unsafe-eval']  [https://third-party.com]
```

| Token | Purpose |
|---|---|
| `'self'` | Same-origin scripts. Fallback for very old browsers. |
| `'nonce-{nonce}'` | The core security mechanism. Only scripts carrying this per-request token execute in modern browsers. |
| `'strict-dynamic'` | Propagates trust from a nonce-d script to scripts it loads dynamically. Required for Next.js chunk loading. |
| `'unsafe-inline'` | Ignored by CSP Level 2+ browsers when a nonce is present. Kept as a silent fallback for ancient browsers only. |
| `'unsafe-eval'` | **Dev only.** React and Turbopack need `eval()` for HMR and callstack reconstruction. Absent in production. |
| `https://challenges.cloudflare.com` | Cloudflare Turnstile widget. URL allowlists are ignored by browsers that honour `strict-dynamic`, but kept as fallback for others. |

---

```
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
```
`'unsafe-inline'` is required for Tailwind CSS and Framer Motion, which both
inject styles at runtime. `fonts.googleapis.com` is needed for the Google Fonts
stylesheet loaded via `<link>` in the root layout.

---

```
img-src 'self' data: blob:
```
`data:` allows base64-encoded inline images. `blob:` allows `createObjectURL`
patterns used by some file preview libraries.

---

```
font-src 'self' https://fonts.gstatic.com
```
`fonts.gstatic.com` serves the actual font files referenced by the Google Fonts
stylesheet. Self-hosted fonts only need `'self'`.

---

```
connect-src 'self' https://challenges.cloudflare.com
```
Controls `fetch`, `XMLHttpRequest`, WebSocket, and `EventSource`. Includes
Cloudflare for Turnstile verification pings. Resend is **not** listed here
because email sending happens server-side only (API route → Resend servers) —
the browser never talks to Resend directly.

---

```
frame-src https://challenges.cloudflare.com
```
Cloudflare Turnstile renders its challenge inside an iframe from this origin.

---

```
frame-ancestors 'self'
```
Only your own pages may embed this site in an iframe. This is the modern
replacement for `X-Frame-Options` in CSP-aware browsers.

---

```
base-uri 'self'
```
Prevents an attacker from injecting a `<base href="https://evil.com">` tag
to redirect all relative URLs to a malicious origin.

---

```
form-action 'self'
```
Form submissions are only permitted to same-origin endpoints. Blocks phishing
attacks that hijack `<form action>`.

---

```
object-src 'none'
```
Completely blocks `<object>`, `<embed>`, and `<applet>` elements — historically
the most dangerous plugin vectors.

---

```
upgrade-insecure-requests
```
Instructs the browser to silently upgrade any `http://` sub-resource request
to `https://`. Defense-in-depth for mixed-content scenarios.

---

## Other Security Headers (next.config.js)

### Strict-Transport-Security
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```
Forces HTTPS for 1 year on the domain and all subdomains. `preload` submits
the domain to browser HSTS preload lists (Chrome, Firefox, Safari) so the
first-ever request is also protected. **Production only** — omitted in
development so `http://localhost` still works.

---

### X-Frame-Options
```
X-Frame-Options: SAMEORIGIN
```
Legacy clickjacking defence. Prevents this site from being embedded in an
iframe on a different origin. Redundant with `frame-ancestors 'self'` in CSP,
but kept for browsers that parse `X-Frame-Options` but not CSP.

---

### X-Content-Type-Options
```
X-Content-Type-Options: nosniff
```
Prevents browsers from MIME-sniffing a response away from its declared
`Content-Type`. Without this, a browser might execute a JavaScript file
served as `text/plain`, enabling XSS via crafted responses.

---

### Referrer-Policy
```
Referrer-Policy: strict-origin-when-cross-origin
```
Sends the full URL as `Referer` for same-origin navigation (useful for
analytics) but only the bare origin for cross-origin requests (no path or
query string leaked to third parties).

---

### Permissions-Policy
```
Permissions-Policy: camera=(), microphone=(), geolocation=(),
                    browsing-topics=(), payment=(), usb=(), bluetooth=()
```
Opts out of browser APIs this site does not use. If a compromised dependency
calls `navigator.mediaDevices` or `navigator.geolocation`, the browser refuses
the request outright. Add `microphone=self` etc. if you later need those APIs.

---

### X-DNS-Prefetch-Control
```
X-DNS-Prefetch-Control: on
```
Allows browsers to prefetch DNS for linked origins, improving perceived
performance on a public site. Set to `off` for high-privacy applications.

---

### X-Permitted-Cross-Domain-Policies
```
X-Permitted-Cross-Domain-Policies: none
```
Blocks Adobe Flash and Acrobat from loading cross-domain policy files from
this origin, preventing a legacy class of cross-domain data theft.

---

## Middleware Matcher

```ts
matcher: [
  {
    source: "/((?!_next/static|_next/image|favicon\\.ico|icon\\.png).*)",
    missing: [
      { type: "header", key: "next-router-prefetch" },
      { type: "header", key: "purpose", value: "prefetch" },
    ],
  },
],
```

| Exclusion | Reason |
|---|---|
| `_next/static` | Bundled JS/CSS — static assets, no nonce needed |
| `_next/image` | Image optimisation API responses |
| `favicon.ico`, `icon.png` | Static files served directly |
| `next-router-prefetch` header | Prefetch requests never render HTML — generating a throwaway nonce for them is wasteful |
| `purpose: prefetch` | Same reason, different header name used by some browsers |

---

## Third-Party Domain Reference

| Service | Browser-visible | CSP directives required |
|---|---|---|
| **Cloudflare Turnstile** | Yes (JS + iframe) | `script-src`, `frame-src`, `connect-src` → `https://challenges.cloudflare.com` |
| **Resend** | No (server-side only) | None |
| **Google Fonts** | Yes | `style-src` → `https://fonts.googleapis.com` · `font-src` → `https://fonts.gstatic.com` |
| **Vercel Analytics** *(if added)* | Yes | `connect-src` → `https://vitals.vercel-insights.com` |
| **Google Analytics** *(if added)* | Yes | `script-src` → `https://www.googletagmanager.com` · `connect-src` → `https://www.google-analytics.com` |

---

## How to Add a New Third-Party Script

1. Find the script's origin (e.g. `https://cdn.example.com`).
2. Add it to `script-src` inside `buildCsp()` in `middleware.ts`.
3. If the script loads an iframe, also add it to `frame-src`.
4. If the script makes API calls from the browser, also add it to `connect-src`.
5. Load it via `next/script` with the nonce:

```tsx
// app/layout.tsx
const nonce = (await headers()).get("x-nonce") ?? "";

<Script src="https://cdn.example.com/widget.js" nonce={nonce} strategy="afterInteractive" />
```

---

## Browser Verification Checklist

- [ ] Open any page. DevTools → Network → select the HTML document → **Response Headers**.
      Confirm `content-security-policy` is present and contains `'nonce-...'`.
- [ ] Reload the page. The nonce value should be **different** each time.
- [ ] DevTools → **Console**. No `Refused to load` CSP violations on a clean page.
- [ ] Navigate to the contact form. Cloudflare Turnstile should load without CSP errors.
- [ ] Run the production domain through [securityheaders.io](https://securityheaders.io).
      Expected score: **A** or **A+**.
- [ ] Confirm `Strict-Transport-Security` is absent on `http://localhost` (dev guard working).

---

## Porting to Another Next.js 15 App

Three files are needed. Follow this order:

1. **Copy `middleware.ts`** to the project root. Customise `buildCsp()`:
   - Remove third-party domains you don't use.
   - Add domains your app needs.
   - Keep `'nonce-{nonce}'`, `'strict-dynamic'`, and `'unsafe-inline'` as-is.

2. **Copy the `securityHeaders` array** into your `next.config.js`.
   Do **not** include `Content-Security-Policy` — middleware handles it.

3. **Make your root layout async** and read the nonce:

```tsx
import { headers } from "next/headers";

export default async function RootLayout({ children }) {
  const nonce = (await headers()).get("x-nonce") ?? "";
  // pass nonce={nonce} to any <Script> components
  return <html><body>{children}</body></html>;
}
```

### The one rule you must not break

> **Never define `Content-Security-Policy` in `next.config.js`.**
> It runs after middleware and overwrites the nonce, silently breaking
> the entire security model without any error or warning.
