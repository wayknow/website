# WayKnow Website

> Static website for WayKnow browser tools — `wayknow.tech`

## Overview

Official website for WayKnow, a collection of privacy-first Chrome browser extensions. Pure static HTML/CSS/JS, deployed on Tencent Cloud Singapore behind Cloudflare CDN.

## Products

| Product | Description | Pricing |
|---------|-------------|---------|
| [SnapMark](./snapmark.html) | Screenshot + annotation Chrome extension (8 annotation tools, 5 capture modes, license server live) | Free + $39 lifetime |
| [ClearJSON](./clearjson.html) | JSON viewer Chrome extension (formatting, tree view, JWT decode, regex search, large files) | Free + $29 lifetime |
| [CookieClear](./cookieclear.html) | Cookie editor Chrome extension (privacy score, import/export, domain whitelist, undo, dark mode) | Always Free |

## Key Design Decisions

| Decision | Reason |
|----------|--------|
| No framework | Static site, fastest load time, easy to maintain |
| Dark theme (deep blue + teal) | Developer-focused aesthetic, conveys trust & privacy |
| Header/footer injected via JS | Avoids copy-paste across 7 HTML files |
| English only | Global audience, server in Singapore |
| No analytics | Dogfooding our privacy-first philosophy |
| `support@wayknow.tech` | Cloudflare Email Routing → Gmail |
| No subscription pricing | Both products: Free + one-time lifetime purchase only |
| SnapMark Pro $39 | Researched competitors (FireShot $99.95 lifetime, others subscription-only). Deliberately underpriced for market entry |
| ClearJSON Pro $29 | Impulse-buy price for developer tools (CSS Scan sold 1,450+ at $69) |
| CookieClear always free | Free acquisition channel for product family. No validated paid demand in cookie editor market |

## Site Structure

```
wayknow/
├── index.html                  # Homepage — product cards + shared values
├── snapmark.html               # SnapMark product page (features, pricing, comparison, FAQ)
├── clearjson.html              # ClearJSON product page (features, pricing, comparison, FAQ)
├── cookieclear.html            # CookieClear product page (free cookie editor, EditThisCookie replacement)
├── snapmark-privacy.html       # SnapMark privacy policy (Creem compliance)
├── snapmark-terms.html         # SnapMark terms of service
├── clearjson-privacy.html      # ClearJSON privacy policy (Creem compliance)
├── clearjson-terms.html        # ClearJSON terms of service
├── cookieclear-privacy.html    # CookieClear privacy policy (zero data collection)
├── cookieclear-terms.html      # CookieClear terms of service (MIT license)
├── css/
│   └── style.css               # Design system (~1000 lines, CSS variables, responsive)
├── js/
│   └── main.js                 # Header/footer injection, nav highlight, mobile menu, FAQ
├── assets/
│   ├── snapmark-logo.png       # Real SnapMark icon (128px, from extension)
│   └── clearjson-logo.svg      # ClearJSON logo (placeholder — replace when real icon available)
├── README.md
├── STATUS.md
├── DECISIONS.md                # Key decisions and rationale
└── DEPLOY.md                   # Deployment guide
```

## Tech Stack

- **HTML/CSS/JS** — zero dependencies, zero build step
- **CSS custom properties** — theme variables, dark mode
- **Responsive** — mobile-first, 768px breakpoint

## Infrastructure

```
User → Cloudflare DNS/CDN (SSL) → Tencent Cloud Singapore 2C2G Ubuntu → Nginx → /var/www/html
                                              ↓
                         api.wayknow.tech → Cloudflare Workers → D1 (SQLite)
```

- **Domain**: `wayknow.tech` (Tencent Cloud registrar, Cloudflare DNS)
- **Server**: Tencent Cloud Lightweight 2C2G, Ubuntu Server, Singapore
- **API**: `api.wayknow.tech` — Cloudflare Workers + D1 (SnapMark license server live; ClearJSON planned)
- **SSL**: Cloudflare Flexible mode + Always Use HTTPS
- **Email**: Cloudflare Email Routing (`support@wayknow.tech` → Gmail)
- **Repo**: `github.com/wayknow/website` (private)

## How to Update

```bash
# 1. Edit files locally
# 2. Commit & push
git add -A && git commit -m "message" && git push

# 3. Pull on server
ssh ubuntu@43.160.219.45 "cd /var/www/html && sudo git pull"
```

## License

Private repository. All rights reserved.
