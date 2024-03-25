const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  reactStrictMode: true,
});

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com/v1/script.debug.js *.google.com *.google.it *.googleadservices.com *.googlesyndication.com *.googletagservices.com *.googletagmanager.com;
  child-src *.google.com *.google.it *.googleadservices.com *.googletagmanager.com *.googletagservices.com *.googlesyndication.com ;
  style-src https://fonts.googleapis.com 'self';
  object-src 'none';
  base-uri 'self';
  img-src 'self' https://media.graphassets.com blob: data:;
  media-src 'self';
  connect-src 'self' https://region1.google-analytics.com;
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
  font-src 'self' https://fonts.gstatic.com;
`;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];
