# Project Status

> Last updated: 2026-07-08

## ✅ Done

### Website (14 pages)
| Page | Status | Notes |
|------|:------:|-------|
| Homepage (`index.html`) | ✅ | Product cards (SnapMark, ClearJSON, CookieClear), shared values, no hero |
| SnapMark product | ✅ | Features, pricing (Free + $39 lifetime), comparison table, FAQ. License server live at `api.wayknow.tech/snapmark` |
| ClearJSON product | ✅ | Features, pricing (Free + $29 lifetime), comparison table, FAQ |
| CookieClear product | ✅ | Features, FAQ. Completely free — no Pro tier. MV3-native, privacy-first. |
| SnapMark privacy | ✅ | Synced with extension's canonical privacy policy |
| SnapMark terms | ✅ | No subscription, simplified to lifetime-only |
| ClearJSON privacy | ✅ | Zero data collection, Pro license verification (api.wayknow.tech), email consistent |
| ClearJSON terms | ✅ | No subscription, simplified to lifetime-only |
| CookieClear privacy | ✅ | Zero data collection, MIT open source, zero network requests |
| CookieClear terms | ✅ | Free, MIT license, no payment processing |
| Support page | ✅ | support@wayknow.tech, FAQ links, refund policy |
| ColorPeek product | ✅ | Features, pricing (Free + $19 lifetime), comparison table, FAQ. macOS desktop app |
| ColorPeek privacy | ✅ | Zero data collection, Pro license verification only |
| ColorPeek terms | ✅ | Lifetime-only, 3-Mac activation, 14-day refund |

### Design & Content
| Item | Status | Notes |
|------|:------:|-------|
| English localization | ✅ | All content in English |
| Dark theme | ✅ | Deep blue + teal, CSS variables |
| Responsive design | ✅ | Mobile-first, 768px breakpoint |
| SnapMark real logo | ✅ | 128px PNG from extension icons |
| Pricing accuracy | ✅ | Verified against PRODUCT.md and STATUS.md from extension |
| No subscription residual | ✅ | All pages — terms, pricing, FAQ — consistent |
| Feature accuracy | ✅ | SnapMark: 8 tools, 5 capture modes, Timer Pro-only. ClearJSON: JWT decode, regex search, 10 free themes. CookieClear: privacy score, classification, undo, whitelist |
| CookieClear logo | ✅ | 128px PNG from extension icons |
| Email consistency | ✅ | All pages use `support@wayknow.tech` |
| Date consistency | ✅ | Privacy policies "Last updated: July 3, 2026"; other pages "Last updated: June 25, 2026" |

### Infrastructure
| Item | Status | Notes |
|------|:------:|-------|
| GitHub repo | ✅ | `github.com/wayknow/website` (private) |
| Domain `wayknow.tech` | ✅ | Tencent Cloud → Cloudflare DNS |
| HTTPS | ✅ | Cloudflare Flexible SSL + Always Use HTTPS |
| Server deploy | ✅ | Tencent Cloud Singapore, Nginx, git-based updates |
| Cloudflare CDN | ✅ | Global edge caching |
| Email forwarding | ✅ | `support@wayknow.tech` → Gmail via Cloudflare |
| CLAUDE.md | ✅ | Project context for Claude Code (aligned with ClearJSON's format) |
| SnapMark CWS submission | ✅ | v1.1.0 published. [CWS link](https://chromewebstore.google.com/detail/snapmark-screenshot-annot/eppopiophjmfnoimmaklpbmkfmgpfgmj). Search ranking: indexed but low (12+ same-name products ahead). SEO optimization planned for v1.2.0 |
| SnapMark License API | ✅ | `api.wayknow.tech/snapmark` (Cloudflare Workers + D1), 4 endpoints |
| ClearJSON License API | ✅ | `api.wayknow.tech/clearjson` (Cloudflare Workers + D1), v0.3.0, 136 tests passing |
| ClearJSON CWS submission | ⏳ | v1.0.0 submitted 2026-07-07, awaiting review |
| CookieClear CWS submission | ⏳ | v1.0.0 submitted, 76 tests passing, awaiting review |
| ColorPeek product page | 🚧 | Planned. macOS color picker app, in development |

## ⚠️ Pending — Requires External URLs

| Item | What's needed |
|------|---------------|
| SnapMark Chrome Web Store link | ✅ Available. Replace 4 `#` placeholders in `snapmark.html` with real CWS URL |
| ClearJSON Chrome Web Store link | ⏳ Replace 4 `#` placeholders in `clearjson.html` after CWS approval |
| CookieClear Chrome Web Store link | ⏳ Replace 2 `#` placeholders in `cookieclear.html` after CWS approval |
| ColorPeek product page | 🚧 New page needed: `colorpeek.html` |
| Creem purchase link (SnapMark $39) | ⏳ Replace 1 `#` placeholder. License server ready — Creem webhook → auto-issue key |
| Creem purchase link (ClearJSON $29) | ⏳ Replace 1 `#` placeholder |
| ColorPeek Creem purchase link ($19) | 🚧 New purchase link needed |

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
