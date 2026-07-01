# Project Status

> Last updated: 2026-06-29

## ✅ Done

### Website (7 pages)
| Page | Status | Notes |
|------|:------:|-------|
| Homepage (`index.html`) | ✅ | Product cards, shared values, no hero (generalized for future products) |
| SnapMark product | ✅ | Features, pricing (Free + $39 lifetime), comparison table, FAQ |
| ClearJSON product | ✅ | Features, pricing (Free + $29 lifetime), comparison table, FAQ |
| SnapMark privacy | ✅ | Synced with extension's canonical privacy policy |
| SnapMark terms | ✅ | No subscription, simplified to lifetime-only |
| ClearJSON privacy | ✅ | Zero data collection, email consistent |
| ClearJSON terms | ✅ | No subscription, simplified to lifetime-only |

### Design & Content
| Item | Status | Notes |
|------|:------:|-------|
| English localization | ✅ | All content in English |
| Dark theme | ✅ | Deep blue + teal, CSS variables |
| Responsive design | ✅ | Mobile-first, 768px breakpoint |
| SnapMark real logo | ✅ | 128px PNG from extension icons |
| Pricing accuracy | ✅ | Verified against PRODUCT.md and STATUS.md from extension |
| No subscription residual | ✅ | All pages — terms, pricing, FAQ — consistent |
| Feature accuracy | ✅ | 8 annotation tools, 5 capture modes, export tiers verified |
| Email consistency | ✅ | All pages use `support@wayknow.tech` |
| Date consistency | ✅ | All pages "Last updated: June 25, 2026" |

### Infrastructure
| Item | Status | Notes |
|------|:------:|-------|
| GitHub repo | ✅ | `github.com/wayknow/website` (private) |
| Domain `wayknow.tech` | ✅ | Tencent Cloud → Cloudflare DNS |
| HTTPS | ✅ | Cloudflare Flexible SSL + Always Use HTTPS |
| Server deploy | ✅ | Tencent Cloud Singapore, Nginx, git-based updates |
| Cloudflare CDN | ✅ | Global edge caching |
| Email forwarding | ✅ | `support@wayknow.tech` → Gmail via Cloudflare |

## ⚠️ Pending — Requires External URLs

| Item | What's needed |
|------|---------------|
| SnapMark Chrome Web Store link | Replace 4 `#` placeholders in `snapmark.html` |
| ClearJSON Chrome Web Store link | Replace 4 `#` placeholders in `clearjson.html` |
| Creem purchase link (SnapMark $39) | Replace 1 `#` placeholder |
| Creem purchase link (ClearJSON $29) | Replace 1 `#` placeholder |

## ⚠️ Pending — Assets

| Item | Notes |
|------|-------|
| ClearJSON logo | Currently a placeholder SVG. Replace with real icon when ClearJSON extension has one |
| Product screenshots | Optional — add real screenshots to product pages for better conversion |

## 🔮 Future Ideas

| Idea | Notes |
|------|-------|
| Blog section | Product updates, Chrome extension tips |
| Product Hunt launch page | Dedicated landing page for launches |
| More product cards | Add new WayKnow products as they ship |
| Privacy-friendly analytics | Consider Plausible or self-hosted Umami if traffic becomes interesting |
| SnapMark Pro $49 | Consider raising price after initial traction (still well below FireShot $99.95) |
