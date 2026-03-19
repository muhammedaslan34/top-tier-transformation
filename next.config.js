/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development';

// ---------------------------------------------------------------------------
// Content-Security-Policy
//
// TUNING NOTES:
//   - script-src: 'unsafe-inline' is required because Next.js injects inline
//     bootstrap scripts for hydration. To remove it, add nonce-based CSP via
//     middleware (see: https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy).
//     'unsafe-eval' is added in dev mode only (React/Turbopack needs it for
//     callstack reconstruction and HMR). It is NOT included in production.
//   - style-src: 'unsafe-inline' is required for Tailwind CSS inline styles.
//   - Google Fonts requires:
//       style-src  → https://fonts.googleapis.com
//       font-src   → https://fonts.gstatic.com
//   - Cloudflare Turnstile requires:
//       script-src  → https://challenges.cloudflare.com
//       frame-src   → https://challenges.cloudflare.com
//       connect-src → https://challenges.cloudflare.com
//   - Resend is server-side only (API routes → Resend servers), so it needs
//     no CSP allowance — those calls never originate from the browser.
//   - If you add Google Fonts, analytics, or CDN assets later, add the
//     corresponding origins to the relevant directives.
// ---------------------------------------------------------------------------
const ContentSecurityPolicy = `
  default-src 'self';

  script-src
    'self'
    'unsafe-inline'
    ${isDev ? "'unsafe-eval'" : ''}
    https://challenges.cloudflare.com;

  style-src
    'self'
    'unsafe-inline'
    https://fonts.googleapis.com;

  img-src
    'self'
    data:
    blob:;

  font-src
    'self'
    https://fonts.gstatic.com;

  connect-src
    'self'
    https://challenges.cloudflare.com;

  frame-src
    https://challenges.cloudflare.com;

  frame-ancestors 'self';

  base-uri 'self';

  form-action 'self';

  object-src 'none';

  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, ' ')  // collapse whitespace so the header value is a single line
  .trim();

const securityHeaders = [
  // ---------------------------------------------------------------------------
  // Strict-Transport-Security (HSTS)
  // Forces HTTPS for 1 year, including subdomains.
  // `preload` opts the domain into browser HSTS preload lists.
  // Only add this in production — it would break http://localhost in dev.
  // ---------------------------------------------------------------------------
  ...(isDev
    ? []
    : [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains; preload',
        },
      ]),

  // ---------------------------------------------------------------------------
  // Content-Security-Policy
  // Controls which resources the browser is allowed to load.
  // ---------------------------------------------------------------------------
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },

  // ---------------------------------------------------------------------------
  // X-Frame-Options
  // Prevents this site from being embedded in iframes on other origins.
  // Redundant with frame-ancestors in CSP, but kept for older browser compat.
  // ---------------------------------------------------------------------------
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },

  // ---------------------------------------------------------------------------
  // X-Content-Type-Options
  // Prevents browsers from MIME-sniffing a response away from the declared
  // Content-Type, which can lead to XSS via crafted responses.
  // ---------------------------------------------------------------------------
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },

  // ---------------------------------------------------------------------------
  // Referrer-Policy
  // Sends the full URL as referrer for same-origin requests, but only the
  // origin (no path/query) for cross-origin requests. Balances analytics
  // fidelity with privacy.
  // ---------------------------------------------------------------------------
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },

  // ---------------------------------------------------------------------------
  // Permissions-Policy
  // Opts out of powerful browser APIs that this site does not need.
  // Add `microphone=()` or `geolocation=self` etc. if you later use them.
  // ---------------------------------------------------------------------------
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'browsing-topics=()',
      // interest-cohort=() is a no-op — FLoC was killed; Topics API is
      // already blocked by browsing-topics=() above.
      'payment=()',
      'usb=()',
      'bluetooth=()',
    ].join(', '),
  },

  // ---------------------------------------------------------------------------
  // X-DNS-Prefetch-Control
  // Controls browser DNS prefetching. 'on' is reasonable for performance
  // on a public marketing/SaaS site. Set to 'off' for high-privacy apps.
  // ---------------------------------------------------------------------------
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },

  // ---------------------------------------------------------------------------
  // X-Permitted-Cross-Domain-Policies
  // Prevents Adobe Flash / Acrobat from loading cross-domain policy files,
  // which could otherwise exfiltrate data from this origin.
  // ---------------------------------------------------------------------------
  {
    key: 'X-Permitted-Cross-Domain-Policies',
    value: 'none',
  },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    // `domains` is deprecated in Next.js 13+. Use remotePatterns instead.
    // Add entries here if you serve <Image> from external URLs, e.g.:
    // { protocol: 'https', hostname: 'cdn.example.com' }
    remotePatterns: [],
  },
  // Enable standalone output for Docker
  output: 'standalone',
  // Enable experimental features if needed
  experimental: {
    // Add any experimental features here
  },

  async headers() {
    return [
      {
        // Apply security headers to every route
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
