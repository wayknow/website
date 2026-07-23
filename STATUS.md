# Project Status

> Last updated: 2026-07-23

## ✅ Done

### Website (18 pages)
| Page | Status | Notes |
|------|:------:|-------|
| Homepage (`index.html`) | ✅ | Product cards (SnapMark, ClearJSON, ColorPeek), shared values, no hero |
| SnapMark product | ✅ | v1.3.0: 6 capture modes (incl. Clean & Capture), 8 annotation tools, Edge store link, pricing (Free + $39 lifetime), comparison table, FAQ. License server live at `api.wayknow.tech/snapmark` |
| ClearJSON product | ✅ | Features, pricing (Free + $29 lifetime), comparison table, FAQ |
| CrumbKit product | ✅ | Clean rebrand of the original CookieClear project. Features, FAQ. Free, MV3-native. Published 2026-07-20. |
| SnapMark privacy | ✅ | Synced with extension's canonical privacy policy |
| SnapMark terms | ✅ | Updated July 9 2026: 10 sections, MIT license, Creem payment |
| SnapMark refund | ✅ | 14-day conditional refund: technical issues, feature discrepancies, billing errors |
| ClearJSON privacy | ✅ | Zero data collection, Pro license verification (api.wayknow.tech), email consistent |
| ClearJSON terms | ✅ | No subscription, simplified to lifetime-only |
| ClearJSON refund | ✅ | 14-day conditional refund: technical issues, feature discrepancies, billing errors |
| ColorPeek refund | ✅ | 14-day conditional refund: technical issues, feature discrepancies, billing errors |
| Support page | ✅ | support@wayknow.tech, FAQ links, refund summaries for all products |
| CrumbKit privacy | ✅ | Zero data collection, MIT open source, zero network requests |
| CrumbKit terms | ✅ | Free, MIT license, no payment processing |
| ColorPeek product | ✅ | Features, pricing (Free + $19 lifetime), comparison table, FAQ, download DMG. Creem payment live. macOS desktop app |
| ColorPeek privacy | ✅ | Zero data collection, Pro license verification only |
| ColorPeek terms | ✅ | Lifetime-only, 3-Mac activation, 14-day refund |
| Blog page | ✅ | 3 placeholder posts, newsletter signup, proper SEO. `blog.html` |
| Newsletter signup | ✅ | On homepage and blog page. Posts to `api.wayknow.tech/subscribe` |

### Design & Content
| Item | Status | Notes |
|------|:------:|-------|
| English localization | ✅ | All content in English |
| Dark theme | ✅ | Deep blue + teal, CSS variables |
| Responsive design | ✅ | Mobile-first, 768px breakpoint |
| SnapMark real logo | ✅ | 128px PNG from extension icons |
| Pricing accuracy | ✅ | Verified against PRODUCT.md and STATUS.md from extension |
| No subscription residual | ✅ | All pages — terms, pricing, FAQ — consistent |
| Feature accuracy | ✅ | SnapMark: 6 capture modes (incl. Clean & Capture), 8 annotation tools, Timer Pro-only, color picker Pro-only (6 presets free). ClearJSON: JWT decode, regex search, 10 free themes. CrumbKit: privacy score, classification, undo, whitelist |
| CrumbKit logo | ✅ | 128px PNG from extension icons |
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
| SnapMark CWS submission | ✅ | v1.3.0 approved. [CWS link](https://chromewebstore.google.com/detail/snapmark-full-page-screen/eppopiophjmfnoimmaklpbmkfmgpfgmj). 6 capture modes (added Clean & Capture Pro-only), 8 annotation tools, SEO title/description optimized, Creem Payout activated, full payment pipeline live |
| SnapMark Edge Add-ons | ✅ | [Edge link](https://microsoftedge.microsoft.com/addons/detail/eodjafakbolkcgjnhjhekfmnnghblfhj). Listing "coming soon" — published in CWS, pending Edge review |
| SnapMark License API | ✅ | `api.wayknow.tech/snapmark` (Cloudflare Workers + D1), 4 endpoints |
| ClearJSON License API | ✅ | `api.wayknow.tech/clearjson` (Cloudflare Workers + D1), v0.3.0, 136 tests passing |
| ClearJSON CWS submission | ✅ | v1.0.0 published 2026-07-10. [CWS link](https://chromewebstore.google.com/detail/clearjson/bgcicghmdpefapfdeghgealacphkgobk) |
| CrumbKit CWS submission | ✅ | v1.0.0 published 2026-07-20. [CWS link](https://chromewebstore.google.com/detail/crumbkit/ggnfjnagciaomejccfjceniohpdkcbjl). Submitted with `tabs` in manifest — passed review anyway. `tabs` removed proactively in repo for next update. |

## 🚧 Pending

| Item | Notes |
|------|-------|
| ColorPeek Creem purchase link ($19) | ✅ Linked to `creem.io/payment/prod_w1VD8FO1zNXbPgQqkJ8zA`. DMG download section live. License server deployed at `api.wayknow.tech/colorpeek`. |
| Product screenshots | Optional — add real screenshots to product pages for better conversion |
| Homepage product card CTAs | ✅ Single "Install Free →" / "Download Free →" button per card. Product name + icon are clickable links to product page. Matches CWS/industry standard — card educates, one CTA converts (2026-07-22) |

## 🔮 Future Ideas

| Idea | Notes |
|------|-------|
| Blog section ✅ | Product updates, Chrome extension tips. Blog page created with CWS install buttons on product cards and newsletter signup (2026-07-22) |
| Product Hunt launch page | Dedicated landing page for launches |
| More product cards | Add new WayKnow products as they ship |
| Privacy-friendly analytics | Consider Plausible or self-hosted Umami if traffic becomes interesting |
| SnapMark Pro price raise | Consider raising to $49 after initial traction (still well below FireShot $99.95). Currently $39 with full payment pipeline live |
