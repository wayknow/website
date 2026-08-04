# Project Status

> Last updated: 2026-08-04

## ✅ Done

### Website (23 pages)
| Page | Status | Notes |
|------|:------:|-------|
| Homepage (`index.html`) | ✅ | Product cards (SnapMark, ClearJSON, ColorPeek), shared values, no hero |
| SnapMark product | ✅ | v1.4.0: 7 capture modes (incl. Clean & Capture, Batch Capture), 8 annotation tools, text tool with IME (Chinese/Japanese/Korean) + 17 fonts + 9 sizes. CWS + Edge store links, pricing (Free + $39 lifetime, free undo now 100 steps), comparison table, FAQ. License server live at `api.wayknow.tech/snapmark`. Page synced from extension 2026-08-03 |
| ClearJSON product | ✅ | v1.1.2: features, MCP server section (10 tools, `npx -y clearjson-mcp`), pricing (Free + $29 lifetime), comparison table (incl. JSON Pretty Pro), FAQ. CWS + Edge store links, Edge published. Glama score A/A/B. npm package published. |
| CrumbKit product | ✅ | v1.0.1: design system alignment, tabs permission removed, cross-promo (ClearJSON + SnapMark) in extension. Features, FAQ. Free, MV3-native. Published 2026-07-20, v1.0.1 2026-07-29. |
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
| ColorPeek product | ✅ | v1.0 maintenance: free (4 formats, 50-color history, auto-copy on pick), Pro (8 formats, 242-color Tailwind palette, unlimited history, custom palettes, global shortcut, clipboard image pick). Pricing (Free + $19 lifetime), comparison table (Sip/ColorSlurp/Pika), FAQ, DMG download. License server at `api.wayknow.tech/colorpeek`. Auto-copy feature added 2026-07-30. |
| ColorPeek privacy | ✅ | Zero data collection, Pro license verification only |
| ColorPeek terms | ✅ | Lifetime-only, 3-Mac activation, 14-day refund |
| Blog page | ✅ | 5 real posts, newsletter signup, proper SEO. `blog.html` |
| Blog: JSON Formatter Alternatives | ✅ | Competitive comparison → ClearJSON. `blog/json-formatter-alternatives.html` |
| Blog: SnapMark Screenshot Tool | ✅ | Competitive comparison → SnapMark. Data corrected 2026-08-03: undo 100 steps both Free and Pro (v1.4.0 aligned free undo from 20→100). `blog/snapmark-screenshot-tool.html` |
| Blog: CrumbKit Cookie Editor | ✅ | EditThisCookie story → CrumbKit. `blog/crumbkit-cookie-editor.html` |
| Blog: ColorPeek Mac Picker | ✅ | Product launch → ColorPeek. `blog/colorpeek-mac-color-picker.html` |
| Blog: Local-First Matters | ✅ | Brand philosophy → all products. `blog/local-first-matters.html` |
| Newsletter signup | ✅ | On homepage and blog page. Posts to `api.wayknow.tech/subscribe` |

### Design & Content
| Item | Status | Notes |
|------|:------:|-------|
| English localization | ✅ | All content in English |
| Dark theme | ✅ | `#0f172a` slate-900 + blue primary + emerald green success, CSS variables, finalized 2026-07-29 |
| Responsive design | ✅ | Mobile-first, 768px breakpoint |
| SnapMark real logo | ✅ | 128px PNG from extension icons |
| Pricing accuracy | ✅ | Verified against PRODUCT.md and STATUS.md from extension |
| No subscription residual | ✅ | All pages — terms, pricing, FAQ — consistent |
| Feature accuracy | ✅ | SnapMark v1.4.0: 7 capture modes, 8 annotation tools, text tool IME + 17 fonts + 9 sizes, free undo 100 steps (was 20), Timer/color picker Pro-only. ClearJSON: JWT decode, regex search, 10 free themes. CrumbKit: 3 permissions (cookies, storage, activeTab; no tabs), privacy score, classification, undo, whitelist. |
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
| Design system alignment | ✅ | Colors (bg #0f172a, primary #3B82F6, accent #10b981), buttons flat blue, no gradient, card radius 16px, prefers-reduced-motion, IntersectionObserver, stagger, utility classes (.section-alt, .btn-block, .tag-free) |
| Product screenshots | ✅ | All 4 product pages have real screenshots/images (logo + hero layout) |
| Homepage product card CTAs | ✅ | Single "Install Free →" / "Download Free →" button per card (2026-07-22) |
| ColorPeek Creem payment ($19) | ✅ | Linked to `creem.io/payment/prod_w1VD8FO1zNXbPgQqkJ8zA`. DMG download section live. License server deployed |
| SnapMark CWS submission | ✅ | v1.4.0 approved 2026-08-04 (IME text tool + 17 fonts + 9 sizes + delete button scaling). [CWS link](https://chromewebstore.google.com/detail/snapmark-full-page-screen/eppopiophjmfnoimmaklpbmkfmgpfgmj). 7 capture modes, 8 annotation tools, SEO title/description optimized, Creem Payout activated, full payment pipeline live |
| SnapMark Edge Add-ons | ⚠️ | v1.2.1 审核未通过（测试 key 设备数超限 3 台，已修复）。v1.3.2 已重新提交审核。v1.4.0 Edge zip 已打包，等 v1.3.2 审核结果出来后提交。Edge Store ID: `0RDCKBDS022S`. [Edge link](https://microsoftedge.microsoft.com/addons/detail/eodjafakbolkcgjnhjhekfmnnghblfhj) |
| SnapMark License API | ✅ | `api.wayknow.tech/snapmark` (Cloudflare Workers + D1), 4 endpoints |
| ClearJSON License API | ✅ | `api.wayknow.tech/clearjson` (Cloudflare Workers + D1), v0.3.0, 136 tests passing |
| ClearJSON CWS submission | ✅ | v1.0.0 published 2026-07-10. [CWS link](https://chromewebstore.google.com/detail/clearjson/bgcicghmdpefapfdeghgealacphkgobk) |
| ClearJSON Edge Add-ons | ✅ | v1.1.2 published on Edge Add-ons. Edge Store ID: `kdebbkdldjhhboafpflimanekmhinelg`. [Edge link](https://microsoftedge.microsoft.com/addons/detail/clearjson/kdebbkdldjhhboafpflimanekmhinelg) |
| CrumbKit CWS submission | ✅ | v1.0.0 published 2026-07-20, v1.0.1 published 2026-07-29. [CWS link](https://chromewebstore.google.com/detail/crumbkit/ggnfjnagciaomejccfjceniohpdkcbjl). v1.0.0 submitted with `tabs` in manifest — passed review anyway. `tabs` removed in v1.0.1 (design system alignment + cross-promo). Website permissions text corrected 2026-07-30. |

## 🚧 Pending

_No pending items. All tracked tasks are complete._

## 🔮 Future Ideas

| Idea | Notes |
|------|-------|
| Blog section ✅ | Product updates, Chrome extension tips. Blog page created with CWS install buttons on product cards and newsletter signup (2026-07-22) |
| Product Hunt launch page | ❌ Won't do — all 4 products already launched on PH. No new products in pipeline. |
| More product cards | Add new WayKnow products as they ship |
| Privacy-friendly analytics | ✅ Cloudflare Web Analytics enabled — zero-code, privacy-first. LCP 956ms, INP 100% Good, CLS 0. All Core Web Vitals pass. (2026-07-30) |
| SnapMark Pro price raise | Consider raising to $49 after initial traction (still well below FireShot $99.95). Currently $39 with full payment pipeline live |
