# Project Status

> Last updated: 2026-08-12 (2nd update)

## ✅ Done

### Website (30 pages)
| Page | Status | Notes |
|------|:------:|-------|
| Homepage (`index.html`) | ✅ | Product cards (SnapMark, ClearJSON, CrumbKit, ColorPeek, CSSPick), shared values, no hero |
| SnapMark product | ✅ | v1.4.0: 7 capture modes (incl. Clean & Capture, Batch Capture), 8 annotation tools, text tool with IME (Chinese/Japanese/Korean) + 17 fonts + 9 sizes. CWS + Edge store links, pricing (Free + $39 lifetime, free undo now 100 steps), comparison table, FAQ. License server live at `api.wayknow.tech/snapmark`. Page synced from extension 2026-08-03 |
| ClearJSON product | ✅ | v1.1.4: features, MCP server section (10 tools, `npx -y clearjson-mcp`), pricing (Free + $29 lifetime), comparison table (incl. JSON Pretty Pro), FAQ. CWS + Edge store links, both stores live. Glama score A/A/B. npm package published. |
| CrumbKit product | ✅ | v1.2.0: batch operations (multi-delete + bulk-edit), one-click copy, cookie profiles, side panel, scheduled auto-cleanup, Set-Cookie interceptor, CHIPS partitioned cookies, 6 export formats (JSON/Netscape/cURL/CSV/Puppeteer/Set-Cookie). Features, FAQ, always free, MV3-native. Published 2026-07-20, v1.2.0 2026-08-07. |
| SnapMark privacy | ✅ | Synced with extension's canonical privacy policy |
| SnapMark terms | ✅ | Updated July 9 2026: 10 sections, MIT license, Creem payment |
| SnapMark refund | ✅ | 14-day conditional refund: technical issues, feature discrepancies, billing errors |
| ClearJSON privacy | ✅ | Zero data collection, Pro license verification (api.wayknow.tech), email consistent |
| ClearJSON terms | ✅ | No subscription, simplified to lifetime-only |
| ClearJSON refund | ✅ | 14-day conditional refund: technical issues, feature discrepancies, billing errors |
| ColorPeek refund | ✅ | 14-day conditional refund: technical issues, feature discrepancies, billing errors |
| Support page | ✅ | support@wayknow.tech, FAQ links, refund summaries for all products. FAQ anchor links fixed 2026-08-07 (added `id="faq"` to all 4 product pages — 8 links were dead). CSSPick added to product help + refund sections 2026-08-11 |
| CrumbKit privacy | ✅ | Zero data collection, MIT open source, zero network requests. Permissions updated 2026-08-07 for v1.2.0: removed `tabs` (dropped in v1.0.1), added `alarms`/`notifications`/`webRequest` (auto-cleanup + Set-Cookie interceptor), local storage list covers profiles/cleanup rules/intercepted cookies |
| CrumbKit terms | ✅ | Free, MIT license, no payment processing |
| ColorPeek product | ✅ | v1.0 maintenance: free (4 formats, 50-color history, auto-copy on pick), Pro (8 formats, 242-color Tailwind palette, unlimited history, custom palettes, global shortcut, clipboard image pick). Pricing (Free + $19 lifetime), comparison table (Sip/ColorSlurp/Pika), FAQ, DMG download. License server at `api.wayknow.tech/colorpeek`. Auto-copy feature added 2026-07-30. DMG updated 2026-08-04 (Pro visibility optimization + fixes). Email delivery migrated to Resend 2026-08-11 (was MailChannels — discontinued free service). |
| ColorPeek privacy | ✅ | Zero data collection, Pro license verification only. Structure aligned to `policy-content` layout 2026-08-07 |
| ColorPeek terms | ✅ | Lifetime-only, 3-Mac activation, 14-day refund. Structure aligned to `policy-content` layout 2026-08-07 |
| CSSPick product | ✅ | v0.2.0: hover inspect, 7 CSS groups (Color/Typography/Spacing/Size & Box/Background/Border & Shadow/Layout), single-property copy (free), Copy All CSS + Copy Selector (Pro $19 lifetime). Minimal permissions (activeTab + storage + scripting, no host_permissions). License server live at `api.wayknow.tech/csspick`. Creem checkout live. CWS approved. Page added 2026-08-11 |
| CSSPick privacy | ✅ | Zero data collection, license verification only (api.wayknow.tech), device UUID for 3-device binding |
| CSSPick terms | ✅ | Free + Pro tiers, Creem payment, 3-device license |
| CSSPick refund | ✅ | 14-day conditional refund, 2-device max activation for eligibility |
| Blog page | ✅ | 8 real posts, newsletter signup, proper SEO. `blog.html` |
| Blog: JSON Formatter Alternatives | ✅ | Competitive comparison → ClearJSON. 2026-08-12: fixed HN link (real thread item?id=47721946), added author-defense paragraph, corrected paid-competitor facts (JSONVault Pro free+IAP, JSON Formatter Pro by Zovo), unified name to JSON Pretty Pro, cross-linked to the 2026 comparison post. `blog/json-formatter-alternatives.html` |
| Blog: SnapMark Screenshot Tool | ✅ | Competitive comparison → SnapMark. Data corrected 2026-08-03: undo 100 steps both Free and Pro (v1.4.0 aligned free undo from 20→100). `blog/snapmark-screenshot-tool.html` |
| Blog: CrumbKit Cookie Editor | ✅ | EditThisCookie story → CrumbKit. Feature list synced to v1.2.0 2026-08-07 (6 export formats, batch ops, profiles, auto-cleanup, interceptor, CHIPS, side panel; removed outdated "1,700 lines" claim). `blog/crumbkit-cookie-editor.html` |
| Blog: ColorPeek Mac Picker | ✅ | Product launch → ColorPeek. `blog/colorpeek-mac-color-picker.html` |
| Blog: Local-First Matters | ✅ | Brand philosophy → all products. `blog/local-first-matters.html` |
| Blog: CSSPick CSS Inspector | ✅ | Competitive comparison → CSSPick. CSS Scan $95 price critique, DevTools slowness, 7 groups, $19 lifetime. 2026-08-11. `blog/csspick-css-inspector.html` |
| Blog: Best JSON Viewer Chrome Extensions | ✅ | Competitive comparison → ClearJSON. 8 extensions tested on 47MB file, TL;DR table, FAQ, MCP angle. 2026-08-12. `blog/best-json-viewer-chrome-extensions-2026.html` |
| Blog: How to Decode a JWT | ✅ | Tutorial → ClearJSON Pro (JWT auto-decode) + MCP. 5 methods (hand/terminal/jwt.io/extension/AI agent), claims reference, security gotcha. 2026-08-12. `blog/how-to-decode-jwt.html` |
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
| Feature accuracy | ✅ | SnapMark v1.4.0: 7 capture modes, 8 annotation tools, text tool IME + 17 fonts + 9 sizes, free undo 100 steps (was 20), Timer/color picker Pro-only. ClearJSON: JWT decode, regex search, 10 free themes. CrumbKit v1.2.0: batch edit, one-click copy, cookie profiles, auto-cleanup, Set-Cookie interceptor, CHIPS, 6 export formats, privacy score, classification, undo, whitelist. Permissions: cookies, storage, activeTab + alarms/notifications/webRequest (auto-cleanup + interceptor). |
| CrumbKit logo | ✅ | 128px PNG from extension icons |
| Email consistency | ✅ | All pages use `support@wayknow.tech` |
| Date consistency | ✅ | Privacy policies "Last updated: July 3, 2026"; other pages "Last updated: June 25, 2026" |
| UI design system compliance | ✅ | 2026-08-07 sweep: all 7 legal pages use `<article class="policy-content">` layout (ColorPeek privacy/terms converted), blog styles moved from per-page inline `<style>` blocks to `.blog-article` component in `style.css`, hardcoded values tokenized (4px→`--space-1`, 13px→`--text-sm`, 24px→`--text-2xl`, 0.875rem→`--text-sm`), crumbkit nav indentation fixed |

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
| SnapMark Edge Add-ons | ✅ | v1.4.0 approved 2026-08-11（v1.2.1 曾因测试 key 设备数超限被拒，已修复）。Chrome + Edge 双平台均为 v1.4.0。Edge Store ID: `0RDCKBDS022S`. [Edge link](https://microsoftedge.microsoft.com/addons/detail/eodjafakbolkcgjnhjhekfmnnghblfhj) |
| SnapMark License API | ✅ | `api.wayknow.tech/snapmark` (Cloudflare Workers + D1), 4 endpoints |
| ClearJSON License API | ✅ | `api.wayknow.tech/clearjson` (Cloudflare Workers + D1), v0.3.0, 136 tests passing |
| CSSPick License API | ✅ | `api.wayknow.tech/csspick` (Cloudflare Workers + D1), verify/generate/webhook/checkout/admin, 21 e2e tests passing |
| CSSPick CWS submission | ✅ | v0.2.0 approved 2026-08-12. [CWS link](https://chromewebstore.google.com/detail/csspick-inspect-copy-css/kadcnmgmnjnjcggfbphjnbndkoadkghj). Page buttons live (removed Coming Soon placeholders) |
| ClearJSON CWS submission | ✅ | v1.0.0 published 2026-07-10. [CWS link](https://chromewebstore.google.com/detail/clearjson/bgcicghmdpefapfdeghgealacphkgobk) |
| ClearJSON Edge Add-ons | ✅ | v1.1.4 approved 2026-08-10. Edge Store ID: `kdebbkdldjhhboafpflimanekmhinelg`. [Edge link](https://microsoftedge.microsoft.com/addons/detail/clearjson/kdebbkdldjhhboafpflimanekmhinelg) |
| CrumbKit CWS submission | ✅ | v1.0.0 published 2026-07-20, v1.0.1 published 2026-07-29, v1.1.0 published 2026-08-06, v1.2.0 published 2026-08-07. [CWS link](https://chromewebstore.google.com/detail/crumbkit/ggnfjnagciaomejccfjceniohpdkcbjl). v1.0.0 submitted with `tabs` in manifest — passed review anyway. `tabs` removed in v1.0.1 (design system alignment + cross-promo). v1.1.0 adds table view, profiles, side panel. v1.2.0 adds batch edit, auto-cleanup, Set-Cookie interceptor, CHIPS, 6 export formats. |

### 2026-08-12 策略与获客（决策详见 DECISIONS.md #42-45）
| Item | Status | Notes |
|------|:------:|-------|
| 获客策略转向 | ✅ | 放弃 Reddit/Show HN/CWS 社区 launch（新账号结构性不可行）→ 只走自有/算法渠道：官网 SEO、CWS 店内搜索、dev.to（canonical 回流）、MCP 生态收录 |
| 主攻方向（双轨） | ✅ | 轨道 A：ClearJSON SEO 内容引擎（每周 2 篇）；轨道 B：浏览器 AI 产品（自然语言网页数据提取，订阅 $9.99-29.99/月）。Mac 本地 AI 工具降级为 SEO 起量后的产品线扩展 |
| 博客发布管道 | ✅ | `blog-template.html` + 检查清单（部署清单存于 `project-survey/website/`）。流程：本地 → git push → 服务器 pull → GSC 收录 |
| 博客事实审计 | ✅ | 真实 HN 链接（item?id=47721946）、时间线（early 2026）、JSONVault Pro 竞品事实、竞品名统一 JSON Pretty Pro；两篇文章互链闭环 |
| dev.to canonical 回流 | ✅ | 5 篇 dev.to 文章 canonical 全部指回官网对应文章（API 验证） |
| 数据基线（2026-08-12） | ✅ | ClearJSON 安装 ~51；博客 8 篇；GSC 已注册+提交 sitemap；30 天检查点：第 3 个月 GSC 长尾词 ≥10 个进前 50，第 6 个月 ClearJSON 月安装 ≥500 或博客月自然访问 ≥2000 |

## 🚧 Pending

| Item | Notes |
|------|-------|
| 第 3 篇文章 | EditThisCookie Alternatives（蹭 3M 用户搜索量）→ CrumbKit。内容日历见 `project-survey/content-calendar.md` |
| 30 天检查点 | 2026-09-12：GSC 展示量、扩展自然安装趋势 |
| 浏览器 AI 产品 MVP | 立项：落地页 + 定价 + Creem 收款方案（轨道 B） |
| 发布节奏 | 每周 2 篇，周四前上线（队列：EditThisCookie / CSS Scan / Sip / No-Watermark） |

## 🔮 Future Ideas

| Idea | Notes |
|------|-------|
| Blog section ✅ | Product updates, Chrome extension tips. Blog page created with CWS install buttons on product cards and newsletter signup (2026-07-22) |
| Product Hunt launch page | ❌ Won't do — all 4 products already launched on PH. No new products in pipeline. |
| More product cards | Add new WayKnow products as they ship |
| Privacy-friendly analytics | ✅ Cloudflare Web Analytics enabled — zero-code, privacy-first. LCP 956ms, INP 100% Good, CLS 0. All Core Web Vitals pass. (2026-07-30) |
| SnapMark Pro price raise | Consider raising to $49 after initial traction (still well below FireShot $99.95). Currently $39 with full payment pipeline live |
