const nextTranslate = require('next-translate');

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  reactStrictMode: true,
  ...nextTranslate(),
};

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google.com *.google.it *.googleadservices.com *.googlesyndication.com *.googletagservices.com *.googletagmanager.com;
  child-src *.google.com *.google.it *.googleadservices.com *.googletagmanager.com *.googletagservices.com *.googlesyndication.com ;
  style-src https://fonts.googleapis.com 'self' 'unsafe-inline' *.googleapis.com *.stripe.com;
  object-src 'none';
  base-uri 'none';
  img-src * blob: data:;
  media-src 'self';
  connect-src *;
  font-src 'self' https://fonts.gstatic.com;
`;

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  // Opt-out of Google FLoC: https://amifloced.org/
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];
