# Key Decisions & Rationale

> A record of major decisions made while building the WayKnow website.
> Read this before making changes that might conflict with past reasoning.

---

## 1. No Hero Section on Homepage

**Decision**: Removed the "Privacy-First Browser Tools" hero section. Homepage now starts directly with product cards.

**Why**: The user plans to launch more products beyond the current two. A branded hero with "Browser Tools" would become redundant as the product line grows. Product cards as the first thing visitors see is more practical and scalable.

---

## 2. No Subscription — Lifetime Only

**Decision**: Both SnapMark and ClearJSON offer Free + Lifetime only. No monthly/annual subscriptions.

**Why**: The user explicitly chose this model. All competitors are either subscription-only (Awesome $24-72/yr, Nimbus $30-60/yr) or have higher lifetime prices (FireShot $99.95). "One-time payment, no subscription" is a core differentiator.

**Impact**: Removed subscription cards from both product pages and terms of service. All pages now consistently communicate "pay once, own forever."

---

## 3. SnapMark Pro: $39 (not $29)

**Decision**: SnapMark Pro lifetime price is $39, not $29 as initially written on the website.

**Why**: The extension's PRODUCT.md and STATUS.md both specify $39. The website had a copy error ($29 was carried over from ClearJSON). Corrected after cross-referencing with extension source of truth.

**Competitive context**: FireShot lifetime is $99.95. $39 is 60% cheaper while offering more features (8 annotation tools, privacy, no watermark). Room to increase to $49 later if justified.

---

## 4. ClearJSON Pro: $29

**Decision**: ClearJSON Pro remains at $29 lifetime.

**Why**: Per the 企划书.md (business plan). Developer tools at this price point are impulse purchases. CSS Scan sold 1,450+ copies at $69. $29 is deliberately low for market entry.

---

## 5. Feature Accuracy: Free vs Pro

**Decision**: Updated the website to accurately reflect what's actually in the extension.

**Key corrections (SnapMark)**:
- Delayed Capture is **Pro-only** (was incorrectly listed as free)
- JPEG and WebP export are **Pro-only** (was "all export formats free")
- PDF has a "SnapMark" watermark in free version (was "no watermark")
- 8 annotation tools, not 7 (added Crop)
- Color picker is **Pro-only** (was "Color picker with free selection" in free tier). Free has 6 color presets only.
- Free: PNG + clipboard + 6 color presets; Pro: JPEG + WebP + watermark-free PDF + free color picker

**Key corrections (ClearJSON, July 2026)**:
- JSONPath query → JWT Auto-Decode (actual Pro feature)
- JSON Diff → Advanced Search (regex + fuzzy matching)
- 5 Base Themes → 10 Free Themes; 30 themes total (was "30 themes" unclear)
- Pro export: CSV/TSV only → CSV/TSV/YAML/TypeScript
- Added custom keyboard shortcuts (Pro feature)

**Why**: The website must match the actual product. Chrome Web Store and Creem will review for accuracy.

---

## 6. English Only

**Decision**: All content in English. No Chinese version.

**Why**: Global audience. Server in Singapore. Both products target international developers. Originally written in Chinese, then fully rewritten in English.

---

## 7. Privacy Policy: Sync with Extension

**Decision**: The website's privacy policy should match the extension's built-in privacy policy exactly.

**Why**: Chrome Web Store requires the privacy policy URL to match what's in the extension. If someone checks the extension's linked policy against what's on the website, they should be identical.

**SnapMark**: Synced the website version with `work/snapmark/snapmark-privacy.html`.

**ClearJSON**: Updated July 3, 2026. Added Section 6 "Pro License Verification" — documents the one-time license check to `api.wayknow.tech` (license key + device identifier + OS/Chrome version). This is the only network request ClearJSON ever makes. Free users never make any network requests.

---

## 8. Email: `support@wayknow.tech`

**Decision**: Unified all contact emails to `support@wayknow.tech`.

**Why**: The extension originally used `hi@wayknow.tech`, but `support@` is more standard for customer-facing communication. Cloudflare Email Routing is configured for `support@wayknow.tech` → Gmail. Updated both the website and the extension's privacy policy.

---

## 9. Cloudflare for DNS + SSL + CDN

**Decision**: Migrated DNS from Tencent Cloud DNSPod to Cloudflare.

**Why**:
- Free SSL via Flexible mode (no server-side cert needed)
- Global CDN for faster overseas access (330+ edge nodes)
- Email Routing for `support@wayknow.tech`
- DDoS protection
- Hides server origin IP

**Trade-off**: Adds one more service to manage, but the benefits (SSL, CDN, email) at $0 cost make it worthwhile.

---

## 10. Git-Based Deployment

**Decision**: Server updates via `git pull` instead of rsync.

**Why**: Version control, rollback capability, and a single source of truth. Future workflow is `git push` locally → `git pull` on server. The website code lives in `github.com/wayknow/website` (private repo).

---

## 11. Values Section: Generalized

**Decision**: Replaced product-specific values with brand-level principles.

**Changes**:
- "Open & Auditable" → "Trustworthy" (code is private, not open source)
- "Both products share" → "Every tool we build follows"
- Removed specific references to screenshots/JSON from value descriptions

**Why**: The brand may grow beyond two Chrome extensions. Values should apply to future products too.

---

## 12. ClearJSON: GitHub References Removed

**Decision**: Removed GitHub button and open-source claims from ClearJSON page.

**Why**: The user stated all code is private. "View Source on GitHub" button was misleading. Retained the "MIT" and "open source" text originally, then later clarified — all code is private for now.

**Impact**: ClearJSON now emphasizes "local-first" and "zero tracking" as its privacy story, rather than "open source."

---

## 13. SnapMark Logo: Real Icon Replaced Placeholder

**Decision**: Use the actual extension icon (`icon-128.png` from `work/snapmark/icons/`) instead of the placeholder SVG.

**Why**: More professional and consistent with what users will see in Chrome Web Store.

---

## 14. ClearJSON Pro License Verification

**Decision**: Documented the Pro license verification mechanism in ClearJSON's privacy policy (Section 6).

**Details**:
- License verification is the **only** network request ClearJSON ever makes
- Endpoint: `api.wayknow.tech`
- Payload: license key, random device identifier, OS + Chrome version
- Frequency: at most once every 7 days
- Purpose: validate license key + enforce 3-device limit
- Free users: zero network requests

**Why**: Chrome Web Store requires transparency about all network activity. Being explicit about this single request builds trust — users know exactly what data leaves their machine and why.

---

## 15. SnapMark License Server: Cloudflare Workers + D1

**Decision**: Use Cloudflare Workers + D1 (SQLite) for SnapMark license verification, not a traditional VPS.

**Details**:
- Endpoint: `api.wayknow.tech/snapmark`
- 4 API routes: `/api/license/verify`, `/api/license/generate`, `/api/webhook/creem`, `/api/admin/licenses`
- Database: D1 `snapmark-license-db` (3 tables: licenses, activations, api_tokens)
- Free tier: 100K requests/day + 5GB D1 storage — sufficient for thousands of Pro users

**Verification strategy** (3 tiers):
1. Local format check (`SMP-XXXX-XXXX-XXXX`, 0ms)
2. Cached result (7-day TTL in `chrome.storage.local`)
3. Online verification (~200ms to `api.wayknow.tech`)
4. Offline fallback: network failure → use cached result; already-activated users unaffected

**Device binding**: Max 3 devices per license. `device_id` = `crypto.randomUUID()` stored in `chrome.storage.local`.

**Why**: Free tier covers MVP scale, edge deployment minimizes latency, no server to maintain. The 3-tier verification ensures paying users are never blocked by network issues.

---

## 16. Shared API Domain: `/snapmark` Path Prefix

**Decision**: Mount all product API Workers under a single domain (`api.wayknow.tech`) with path-based routing, rather than separate subdomains.

**How it works**:
- Worker route: `api.wayknow.tech/snapmark/*`
- Worker strips `/snapmark` prefix internally, so endpoints remain `/api/license/verify` etc.
- Extension config: `LICENSE_API_BASE = 'https://api.wayknow.tech/snapmark'`

**Future pattern**: `api.wayknow.tech/clearjson/*` for ClearJSON license server, `api.wayknow.tech/telemetry` for optional analytics, etc.

**Why**: Single domain is simpler to manage (one SSL cert, one DNS record). Path-based routing lets each product's Worker be deployed independently. Scales horizontally — add new products by adding new routes, not new domains.

---

## 17. CookieClear: Completely Free (No Pro Tier)

**Decision**: CookieClear is completely free — no Pro tier, no subscription, no ads, no paid features.

**Why**: The cookie editor market has no validated paid demand:
- The former market-leader cookie editor had 3M free users for a decade
- The leading open-source alternative has 2M free users
- The two paid competitors ($3–5/mo) have unknown conversion rates and no public revenue data
- Users are accustomed to free cookie editors

**Strategy**: CookieClear serves as a **free acquisition channel** for the product family:
- CookieClear → top of funnel (free, mass appeal, 3M+ addressable market)
- ClearJSON → monetization ($29 lifetime)
- SnapMark → monetization ($39 lifetime)

**Cross-promotion**: CookieClear promotes ClearJSON and SnapMark within the extension. Three products cover three high-frequency developer needs, cross-promoting each other.

---

## 18. CookieClear: Competitor-Replacement Positioning ❌ REVERSED

**Decision**: ~~Position CookieClear explicitly as the safe replacement for the removed market-leader cookie editor in SEO, store listing, and website copy.~~

**Reversed (2026-07-07)**: CWS rejected first submission for keyword spam. Competitor names are prohibited in CWS store listing metadata (title, description, keywords). All competitor references removed from:
- Store listing (title, description, keywords)
- README and website product pages
- Extension screenshots and metadata

**New approach**: Position CookieClear on its own merits — privacy-first, MV3 native, open source, free. Competitor comparison content moved to off-store channels (Reddit, blog posts, social media) where CWS policies don't apply.

**Original rationale** (for historical record): The former market-leader cookie editor was removed from CWS (3M+ users stranded). A malicious copycat scammed 50K+ users. Search volume for replacement/alternative queries is high. However, CWS policy prohibits using competitor names in store metadata.

---

## 19. CrumbKit: Clean Rebrand for CWS Resubmission

**Decision**: Create a new brand ("CrumbKit") and new CWS item instead of waiting for CookieClear's appeal verdict.

**Why**: CookieClear's CWS item was hard-blocked (resubmission disabled, appeal only). The appeal was submitted 2026-07-09 with no response after 8+ days. Rather than wait indefinitely for a single-appeal verdict, we created a clean rebrand with a new CWS item ID.

**What changed**:
- Name: CookieClear → CrumbKit ("crumb" = cookie crumb, "kit" = developer toolkit)
- New GitHub repo: `wayknow/crumbkit`
- New website pages: `crumbkit.html`, `crumbkit-privacy.html`, `crumbkit-terms.html`
- All store assets regenerated with CrumbKit branding
- Zero competitor names or "replacement" wording — positioned purely on its own merits

**Codebase**: Derived from CookieClear (same features, same 76-test suite). All branding, URLs, storage keys, and export headers use CrumbKit.

**Outcome**: CrumbKit v1.0.0 was published on Chrome Web Store on 2026-07-20. Submitted with `tabs` permission in manifest — passed review. v1.0.1 published 2026-07-29 with `tabs` removed (design system alignment + accessibility fixes + cross-promo). Website permissions text corrected 2026-07-30. [CWS link](https://chromewebstore.google.com/detail/crumbkit/ggnfjnagciaomejccfjceniohpdkcbjl).

---

## 20. ClearJSON: No Subscription — Lifetime Only

**Decision**: ClearJSON Pro is $29 lifetime only. Removed the subscription option ($2/mo, $20/yr) that appeared in early planning.

**Why**: Pure client-side tool with no server costs (license verification only). Developers hate "yet another subscription." $2/mo revenue wouldn't cover the overhead of managing a subscription system (user accounts, payment retry logic, churn).

---

## 20. ClearJSON: No JSONPath Query, No JSON Diff

**Decision**: Removed JSONPath query and JSON Diff from the Pro feature set.

**Why**:
- **JSONPath**: JSON Query Tool and Rahul Baruri's Viewer Pro already do this well for free. No differentiation.
- **JSON Diff**: Just JSON and JsonKing already offer this for free. No differentiation.

**Replaced with**: JWT auto-decode (no competitor has it), advanced search with regex + fuzzy matching, multi-format export (CSV/TSV/YAML/TypeScript).

---

## 21. ClearJSON: No AI Integration

**Decision**: ClearJSON will never include AI features (LLM-based JSON analysis, auto-completion, etc.).

**Why**: Contradicts the core privacy promise ("data never leaves your device"). AI API costs are unpredictable — a single heavy user could burn $5-10/month. Developers already use ChatGPT/Claude alongside the tool anyway.

---

## 22. SnapMark: Creem Payment Pipeline Activated (2026-07-11)

**Decision**: SnapMark's full payment pipeline is now live: Creem checkout → webhook → license generation → email delivery → extension activation. Payout account fully activated (can receive funds).

**Details**:
- **Payment processor**: Creem (selected over Paddle due to lower barrier for Chrome extensions)
- **Checkout URL**: `creem.io/payment/prod_6nImGVxcMKQqPKdooVA8ro` (Live mode)
- **Webhook**: HMAC-SHA256 signature verification enabled (`creem-signature` header, hex digest)
- **License generation**: Automatic on `checkout.completed` event, stored in D1
- **Email delivery**: Resend API (100 free emails/day), from `noreply@wayknow.tech`
- **Payout**: Paysway bank account linked, KYC passed (ID + face recognition)

**Why Creem**: Lower barrier for indie developers; better suited for Chrome extensions (no website integration required); supports lifetime one-time purchases natively.

**Website impact**: Updated `snapmark.html` Buy Now button from `#` placeholder to actual Creem payment link. Updated CWS link to v1.2.0 URL (`snapmark-full-page-screen`).

---

## 23. SnapMark v1.2.0: SEO Optimization (2026-07-11)

**Decision**: Optimized manifest.json title and description for CWS search ranking before submitting the v1.2.0 update.

**Changes**:
- Title: `SnapMark - Screenshot & Annotate` → `SnapMark - Full Page Screenshot, Screen Capture & Annotation Tool` (65/75 chars)
- Description: `Capture, annotate and export screenshots...` → `Full page screenshot & screen capture tool for Chrome. 5 capture modes, 7 annotation tools. 100% local, no watermark, free.` (123/132 chars)
- Version: `1.1.0` → `1.2.0`

**Target search terms**: `Full Page`, `Screen Capture`, `Annotation Tool`, `Chrome`, `screenshot`

**Result**: Approved 2026-07-11. URL slug updated to `snapmark-full-page-screen`, confirming SEO title is indexed.

---

## 24. Refund Pages: Conditional Refund, .policy-content Layout (2026-07-13)

**Decision**: All refund pages (SnapMark, ClearJSON, ColorPeek) use the same `<article class="policy-content">` layout as the privacy/terms pages, with a consistent conditional refund policy.

**Why**: The `.policy-content` class provides `margin-top: var(--space-10)` on h2s plus a bottom border separator.

**Refund policy**: 14-day conditional (not no-questions-asked). Eligible reasons: technical issues (can't resolve within 5 business days), feature discrepancies, billing errors. Non-refundable: over 14 days, key sharing/abuse, fraud, external factors outside our control.

**Impact**: 3 standalone refund pages (SnapMark, ClearJSON, ColorPeek) with identical structure and policy logic. CrumbKit is free — no refund page needed. `support.html` has summary for all products.

---

## 25. Blog, Newsletter, and CWS Links on Homepage (2026-07-22)

**Decision**: Added blog page, email newsletter signup, and direct CWS install links to product cards on the homepage.

**Changes**:
1. **Blog link** in nav and footer on all 18 pages. Blog page (`blog.html`) with 3 placeholder posts and newsletter signup.
2. **Newsletter signup** on homepage (between products and values) and blog page. Form posts to `api.wayknow.tech/subscribe` (Cloudflare Worker endpoint to be created).
3. **Product card CTA** on homepage, iterated through 3 designs:
   - v1: Two buttons stacked vertically ("Learn More" + "Install Free") — cluttered, non-standard
   - v2: Two buttons side-by-side — still competing CTAs, industry standard is single button
   - **v3 (final)**: Single "Install Free →" / "Download Free →" button per card. Product name + icon are clickable links to product page. Matches CWS pattern — card educates, one CTA converts.

**Why**: Blog is key for SEO — product pages alone can't rank for comparison keywords like "GoFullPage alternative." Newsletter captures visitor emails for future product launches (own traffic, not dependent on platforms). Direct CWS links reduce bounce rate — visitors can install without navigating through the product page. Single-button CTA avoids competing CTAs; the card's content (description, feature tags, icon, name) already does the "Learn More" job.

---

## 26. Product Card Icon as Clickable Link (2026-07-22)

**Decision**: Made product card icons (`<a class="product-icon">`) clickable, linking to the product detail page — not just the product name text.

**Why**: Larger click target (Fitts's Law). Users naturally click icons; if only the text is clickable, they'll miss it. Chrome Web Store itself makes icons clickable. The `.product-icon` class uses `display: flex` so changing from `<div>` to `<a>` had zero visual impact.

---

## 27. SnapMark v1.3.0: Clean & Capture + Edge Store (2026-07-23)

**Decision**: Updated SnapMark from v1.2.0 (5 capture modes) to v1.3.0 (7 capture modes). Added Clean & Capture feature and Microsoft Edge Add-ons store link.

**Changes**:
1. **6th capture mode: Clean & Capture** (Pro-only) — Click to remove ads, banners, sidebars from screenshots. Red highlight + fade animation + Undo.
2. **Edge store link** — Added "Get for Microsoft Edge (coming soon)" button on product page hero. [Edge Add-ons link](https://microsoftedge.microsoft.com/addons/detail/eodjafakbolkcgjnhjhekfmnnghblfhj). **Update (2026-07-30)**: v1.2.1 Edge 审核未通过，v1.3.2 已重新提交审核。
3. **CWS listing updated** to v1.3.0 with Clean & Capture in the feature set.

**Website impact**:
- `snapmark.html`: Meta descriptions (5→7 capture modes), feature grid (added Clean & Capture), pricing table (added Clean & Capture line), FAQ updated, Edge store button added
- `index.html`: SnapMark card tag (5→7 capture modes)
- `README.md`: Product table updated (7 capture modes)
- `STATUS.md`: Feature accuracy and CWS submission updated

---

## 28. SnapMark: Batch Capture (7th Mode) (2026-07-25)

**Decision**: Added Batch Capture as the 7th capture mode in SnapMark (Pro-only). Capture mode count: 5→6→7.

**What it does**: Paste multiple URLs (up to 20) and capture them all automatically. Use cases: competitive analysis, design inspiration collection, batch documentation.

**Website impact**:
- `snapmark.html`: Meta descriptions 6→7, section title "Seven Capture Modes", feature grid (added Batch Capture card), pricing table (free: "no Timer, Clean, Batch" / Pro: added "Batch Capture"), comparison table (added row), FAQ updated
- `index.html`: SnapMark card tag 6→7 capture modes
- `README.md`: Product table updated
- `STATUS.md`: Updated all capture mode references

---

## 29. Blog Content Strategy: Competitive Comparison + Brand Philosophy (2026-07-27)

**Decision**: Publish 5 blog posts, each targeting a specific search intent:

| Post | Type | Target Search |
|------|------|------|
| JSON Formatter Alternatives After the Original Was Sold | Competitive comparison | "json formatter alternative", "json formatter chrome" |
| Why Every Screenshot Extension Has a Catch | Competitive comparison | "screenshot chrome extension", "full page screenshot" |
| CrumbKit — Why We Rebuilt Our Cookie Editor | Competitive comparison + lessons learned | "editthiscookie alternative", "cookie editor chrome" |
| ColorPeek Is Here — A macOS Color Picker for Developers | Product launch | "macos color picker", "color picker for developers" |
| Why "Local-First" Matters — No Servers, No Tracking, No BS | Brand philosophy | "local-first developer tools", privacy-conscious audience |

**Rationale**:
- HN Show HN is blocked for new accounts, PH didn't perform well. Content marketing is the remaining zero-cost acquisition channel
- Each post is SEO-optimized for long-tail search queries with high purchase intent (people searching "alternative to X" are ready to switch)
- Posts are permanent assets — once indexed by Google, they generate traffic indefinitely
- Competitive comparison posts name competitors and their flaws honestly, building credibility
- The Local-First post ties all four products together under a unified philosophy, giving the brand depth beyond individual tools
- All posts cross-link to product pages and other blog posts, creating an internal link graph that helps SEO

**Website impact**:
- 5 new pages in `blog/` directory: `json-formatter-alternatives.html`, `snapmark-screenshot-tool.html`, `crumbkit-cookie-editor.html`, `colorpeek-mac-color-picker.html`, `local-first-matters.html`
- `blog.html` updated with real links (all `#` placeholders removed)
- `sitemap.xml` updated with 5 new blog post URLs
- Total page count: 18 → 23

---

## 30. Design System Alignment: Color Migration & Animation (2026-07-29)

**Decision**: Aligned the CSS implementation with the design system spec in `CLAUDE.md`. Migrated the color palette from deep blue+teal to near-black+emerald green.

**Color changes**:
| Variable | Before | After | Reason |
|----------|--------|-------|--------|
| `--color-bg` | `#0f172a` (slate-900) | `#080A10` (blue-black) | Near-black with subtle blue, matches Linear/Raycast tier |
| `--color-bg-alt` | `#1e293b` (slate-800) | `#0E1016` | Subtle blue-grey, layered above bg |
| `--color-accent` | `#06b6d4` (cyan) | `#10b981` (emerald) | Green = success/trust, per spec |
| `--color-gradient` | blue→cyan | blue→emerald | Follows accent change |
| `--color-border` | `#334155` | `#1E2028` | Subtle blue-grey border hierarchy |

**Other fixes**:
- `--space-20`: 5rem (80px) → 6rem (96px) — matches spec
- `.card` / `.pricing-card` border-radius: 12px → 16px (`--radius-xl`)
- Added `prefers-reduced-motion: reduce` media query (accessibility)
- Added `IntersectionObserver` scroll-triggered reveal animations with `.reveal` class
- Added stagger animation support (100ms interval, up to 8 children)
- Added `.tag-free`, `.section-alt`, `.btn-block` utility classes
- Replaced inline `style="width:100%"` and `style="background: var(--color-bg-alt);"` with CSS classes across all 20 HTML pages
- Fixed footer Products column CrumbKit indentation across all pages

**Why**: The design system spec in `CLAUDE.md` defined the target state; the CSS was lagging behind. Green accent signals trust/success better than teal cyan for a privacy-first brand. Motion accessibility (`prefers-reduced-motion`) is a baseline web standard. Extracting inline styles to CSS classes improves maintainability.

**Impact**: 20 files modified. All pages share the updated design system via `style.css`. Zero visual regressions — the layout structure is unchanged, only colors and spacing adjusted.

---

## 31. Cross-Project Sync: SnapMark, ClearJSON, CrumbKit (2026-07-30)

**Decision**: Periodic sync of website product pages against their extension repos (source of truth). Updated SnapMark product page copy, fixed blog inaccuracies, corrected CrumbKit permissions.

**Changes**:

1. **SnapMark product page** (`snapmark.html`) synced from `snapmark/snapmark-landing.html`:
   - Clean & Capture description: more specific ("ads, popups, cookie banners" vs "ads, banners, sidebars")
   - Batch Capture icon: 📋 → 📦 (package icon fits "batch" better)
   - Batch Capture description: added technical detail ("Navigates, waits, and saves each one")

2. **Blog post corrections** (`blog/snapmark-screenshot-tool.html`):
   - Annotation tools: "9 tools" → "8 tools" (Crop is the 8th tool, undo/redo are editing capabilities)
   - Undo steps: "50 steps" → "20 steps free, 100 steps Pro" (2026-07-30); later updated to "100 steps both Free and Pro" (2026-08-03, v1.4.0 aligned free undo from 20→100)
   - Free capture modes: "5 modes" → "4 modes"
   - Free annotation tools: "7 tools" → "8 tools"

3. **CrumbKit permissions fix** (`crumbkit.html`):
   - Removed "tabs" from permissions list — `tabs` permission was removed in CrumbKit v1.0.1
   - Now correctly states: "cookies, storage, and activeTab"

4. **ClearJSON**: Product page already up-to-date (MCP server section, JSON Pretty Pro in comparison table, npm package link). v1.1.2 changes were internal UI only — no copy changes needed.

5. **ColorPeek**: Added "Auto-copy on pick" to free features — ColorPeek v1.0 added auto-copy (Settings toggle, copies selected format immediately after picking) on 2026-07-27. Website feature grid and free tier pricing card updated.

**Why**: Extension repos are the source of truth for product features. The website must reflect actual product capabilities. Periodic sync prevents drift between what the website claims and what the product actually does.

**Impact**: 4 files modified (`snapmark.html`, `crumbkit.html`, `colorpeek.html`, `blog/snapmark-screenshot-tool.html`). Corresponding `.md` files (STATUS.md, DECISIONS.md, README.md) updated.

---

## 32. SnapMark v1.4.0: Text Tool IME + Website Sync (2026-08-03)

**Decision**: Synced website product page and blog to reflect SnapMark v1.4.0 changes — text tool IME support, font/size selection, free undo 100 steps.

**Changes**:

1. **Text tool description** on `snapmark.html`: "Click anywhere to add a text label" → "Drag to create a text box, type directly. Full IME support for Chinese/Japanese/Korean. 17 system fonts, 9 font sizes (12–144px)."

2. **Free undo steps**: 20 → 100 (aligned with Pro). Updated in:
   - Editing capabilities section
   - Free pricing card
   - FAQ (removed "100 undo steps" from Pro differentiators)
   - Blog post (`blog/snapmark-screenshot-tool.html`)

3. **Permissions**: Added `contextMenus` (added in v1.3.2 for right-click menu).

4. **STATUS.md**: Updated SnapMark version references, blog data corrections, CWS submission status, Edge Add-ons status.

**Why**: v1.4.0 submitted to CWS with significant text tool upgrade. Free undo was bumped from 20→100 to match competitors (Awesome Screenshot, FireShot, Nimbus all have unlimited undo). Website must accurately reflect product capabilities.

**Impact**: 4 files modified (`snapmark.html`, `blog/snapmark-screenshot-tool.html`, `STATUS.md`, `DECISIONS.md`).
