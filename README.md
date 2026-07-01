# WayKnow Website

> Static website for WayKnow browser tools — `wayknow.tech`

## Overview

This is the official website for WayKnow, a collection of privacy-first browser extensions. The site is pure static HTML/CSS/JS, deployed on Tencent Cloud behind Cloudflare CDN.

## Products

| Product | Description | Pricing |
|---------|-------------|---------|
| [SnapMark](./snapmark.html) | Screenshot + annotation Chrome extension | Free + $39 lifetime |
| [ClearJSON](./clearjson.html) | JSON viewer Chrome extension | Free + $29 lifetime |

## Site Structure

```
wayknow/
├── index.html                  # Homepage
├── snapmark.html               # SnapMark product page
├── clearjson.html              # ClearJSON product page
├── snapmark-privacy.html       # SnapMark privacy policy (Creem compliance)
├── snapmark-terms.html         # SnapMark terms of service
├── clearjson-privacy.html      # ClearJSON privacy policy (Creem compliance)
├── clearjson-terms.html        # ClearJSON terms of service
├── css/
│   └── style.css               # Design system (~1000 lines)
├── js/
│   └── main.js                 # Header/footer injection, nav, FAQ
├── assets/
│   ├── snapmark-logo.png       # SnapMark logo (placeholder)
│   └── clearjson-logo.svg      # ClearJSON logo (placeholder)
├── README.md
├── STATUS.md
└── DEPLOY.md
```

## Tech Stack

- **HTML/CSS/JS** — zero dependencies, zero build step
- **Dark theme** — deep blue + teal gradient, CSS custom properties
- **Responsive** — mobile-first, 768px breakpoint

## Key Design Decisions

| Decision | Reason |
|----------|--------|
| No framework | Static site, no SPA needed. Fastest possible load time. |
| Header/footer injected via JS | Avoids copy-paste across 7 HTML files. |
| All content hardcoded in HTML | No CMS overhead. Edits tracked in git. |
| No analytics | Dogfooding our own privacy-first philosophy. |

## How to Update

1. Edit files locally
2. `git add -A && git commit -m "message" && git push`
3. SSH to server: `cd /var/www/html && sudo git pull`

See [DEPLOY.md](./DEPLOY.md) for full deployment guide.

## Infrastructure

```
User → Cloudflare DNS/CDN → Tencent Cloud Singapore (Nginx) → /var/www/html
```

- **Domain**: wayknow.tech (registered via Tencent Cloud, DNS managed by Cloudflare)
- **Server**: Tencent Cloud 2C2G Ubuntu Server (Singapore)
- **CDN/SSL**: Cloudflare (Flexible SSL mode)
- **Email**: Cloudflare Email Routing (support@wayknow.tech → Gmail)

## License

Private repository. All rights reserved.
