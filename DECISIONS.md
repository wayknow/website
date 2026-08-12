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

**Why**: v1.4.0 submitted to CWS with significant text tool upgrade. Free undo was bumped from 20→100 to match competitors (Awesome Screenshot, FireShot, Nimbus all have unlimited undo). Website must accurately reflect product capabilities. **Update (2026-08-04)**: v1.4.0 approved by CWS.

**Impact**: 4 files modified (`snapmark.html`, `blog/snapmark-screenshot-tool.html`, `STATUS.md`, `DECISIONS.md`).

---

## 33. ClearJSON Edge Add-ons Link (2026-08-04)

**Decision**: Added Microsoft Edge Add-ons links to ClearJSON product page (`clearjson.html`) — matching the existing SnapMark Edge link pattern.

**Changes**:

1. **Hero section**: Added "Get for Microsoft Edge" button alongside CWS button.
2. **Free pricing card**: Added "Edge Add-ons" button alongside CWS button.
3. **Footer CTA**: Added Edge button and kept Privacy Policy link.
4. **STATUS.md**: Added dedicated ClearJSON Edge Add-ons tracking entry (published).

**Why**: ClearJSON was already submitted to Edge Add-ons. Product page should surface the Edge store link just like SnapMark does — consistent cross-store presence improves discoverability.

**Impact**: 1 file modified (`clearjson.html`). STATUS.md and DECISIONS.md updated for tracking.

---

## 34. CrumbKit v1.1.0: Table View, Profiles, Side Panel (2026-08-06)

**Decision**: Updated CrumbKit product page to reflect v1.1.0 features — table view, multi-select & batch delete, one-click copy, cookie profiles, side panel support.

**Changes**:

1. **Hero description**: Updated to mention table view, profiles, privacy score.
2. **Feature grid**: Added Multi-Select & Batch Delete, One-Click Copy, and Cookie Profiles as new feature cards. Updated existing Search & Filter card to mention compact table view.
3. **At a Glance section**: Replaced "MV3 Native" with "Table View", added "Cookie Profiles" and "Import & Export" cards. Updated "Actively Maintained" to "Updated August 2026".
4. **FAQ**: Added two new items — "What are Cookie Profiles?" and "Does CrumbKit support Chrome's Side Panel?"

**Why**: v1.1.0 is a significant feature release. Cookie profiles and side panel support are differentiating features vs competitors like EditThisCookie. Website must accurately reflect current product capabilities.

**Impact**: 1 file modified (`crumbkit.html`). STATUS.md, DECISIONS.md, and README.md updated for tracking.

---

## 35. CrumbKit v1.2.0: Batch Edit, Auto-Cleanup, Interceptor, CHIPS (2026-08-07)

**Decision**: Updated CrumbKit product page and homepage to reflect v1.2.0 features — batch operations, 6 export formats, scheduled auto-cleanup, Set-Cookie interceptor, CHIPS partitioned cookies.

**Changes**:

1. **Product page hero**: Updated to mention batch edit, auto-cleanup, 6 export formats.
2. **Feature grid**: "Multi-Select & Batch Delete" → "Batch Operations" (bulk-edit domain/path/attributes). Import & Export updated to 6 formats. Added Scheduled Auto-Cleanup, Set-Cookie Interceptor, CHIPS Partitioned Cookies cards.
3. **At a Glance**: "Import & Export" → "6 Export Formats" (JSON, Netscape, cURL, CSV, Puppeteer, Set-Cookie). Added Auto-Cleanup card.
4. **Permissions section**: Documented `alarms`/`notifications`/`webRequest` usage for auto-cleanup and interceptor.
5. **FAQ**: Added 3 entries — Scheduled Auto-Cleanup, Set-Cookie Interceptor, CHIPS support.
6. **Homepage card**: Updated description and tags (Batch edit, 6 export formats, Auto-cleanup).
7. **Privacy policy** (`crumbkit-privacy.html`): Removed obsolete `tabs` permission (dropped in v1.0.1); documented `alarms`, `notifications`, `webRequest` with usage justification.

**Why**: v1.2.0 adds significant power-user features (auto-cleanup, interceptor, CHIPS). New permissions require privacy policy updates for transparency and CWS compliance.

**Impact**: 3 files modified (`crumbkit.html`, `index.html`, `crumbkit-privacy.html`). STATUS.md, DECISIONS.md, and README.md updated for tracking.

---

## 36. UI Design System Compliance Sweep (2026-08-07)

**Decision**: Aligned remaining pages with the project design system — legal page structure, blog styles, token usage, and broken anchor links.

**Changes**:

1. **Legal pages structure** (`colorpeek-privacy.html`, `colorpeek-terms.html`): Converted from old `page-header` + inline-styled section layout to the standard `<article class="policy-content">` layout used by all 5 other legal pages. Titles now include product name ("ColorPeek Privacy Policy"). All 7 legal pages now share one structure.

2. **Blog styles componentized** (`css/style.css` + 5 blog posts): Moved the duplicated per-page inline `<style>` blocks (13–18 lines × 5 copies) into a shared `.blog-article` component in `style.css` — single source of truth. Hardcoded values tokenized: `1.5rem`→`--text-2xl`, `1.125rem`→`--text-lg`, `0.875rem`→`--text-sm`, `0.8125rem`→`--text-xs`, `border-radius: 8px`→`--radius`. 11 inline `font-size: 0.875rem` occurrences → `var(--text-sm)`.

3. **CrumbKit page** (`crumbkit.html`): Fixed nav indentation; tokenized At a Glance hardcoded values (`4px`→`--space-1`, `13px`→`--text-sm`, `24px`→`--text-2xl`); simplified Built for Trust inline styles.

4. **Support page FAQ links** (`support.html` + 4 product pages): Added `id="faq"` to FAQ sections on snapmark/clearjson/crumbkit/colorpeek pages — 8 dead `#faq` links from support.html now work.

5. **CrumbKit privacy policy** (`crumbkit-privacy.html`): Updated "Last updated" to August 7, 2026; expanded local storage list (cookie profiles, auto-cleanup rules, intercepted cookies); header aligned with SnapMark format (removed parenthetical definition, added "developed and operated by wayknow").

6. **CrumbKit blog content** (`blog/crumbkit-cookie-editor.html`): Feature list synced to v1.2.0 (6 export formats, batch operations, profiles, auto-cleanup, interceptor, CHIPS, side panel); removed outdated "1,700 lines" claim.

**Why**: Pages drifted from the design system — legal pages used an older layout, blog styles were duplicated per-page with hardcoded values, and support page had dead FAQ links. One sweep to restore consistency.

**Impact**: 8 files modified (`css/style.css`, 5 blog posts, `colorpeek-privacy.html`, `colorpeek-terms.html`, `crumbkit.html`, `support.html`, 4 product pages for anchors, `crumbkit-privacy.html`, `blog/crumbkit-cookie-editor.html`). STATUS.md and DECISIONS.md updated for tracking.

---

## 37. SnapMark + ClearJSON Edge Add-ons Approved (2026-08-10)

**Decision**: Both Edge Add-ons submissions approved. SnapMark page Edge button updated from "(coming soon)" secondary to primary.

**Changes**:

1. **SnapMark Edge** (`snapmark.html`): v1.3.2 approved on Edge Add-ons. Hero button "Get for Microsoft Edge (coming soon)" → "Get for Microsoft Edge" (btn-primary, matching ClearJSON's pattern). v1.4.0 Edge zip ready, submission pending.
2. **ClearJSON Edge**: v1.1.4 approved on Edge Add-ons.
3. **STATUS.md**: Both Edge rows → ✅, ClearJSON product version v1.1.2 → v1.1.4, date → 2026-08-10.

**Why**: Both stores live means both products now have full cross-store presence (CWS + Edge). Page buttons should reflect live availability.

**Impact**: 2 files modified (`snapmark.html`, `STATUS.md`). DECISIONS.md updated for tracking.

---

## 38. ColorPeek Email Delivery Migrated to Resend (2026-08-11)

**Decision**: ColorPeek license server email delivery migrated from MailChannels to Resend.

**Changes** (in `../colorpeek` repo):

1. **Email provider**: MailChannels → Resend API (`api.resend.com/emails`). Reason: MailChannels discontinued its free service in 2024, delivery was unreliable.
2. **Config**: API key read from `env.RESEND_API_KEY` (set via `npx wrangler secret put`). Domain `wayknow.tech` verified in Resend (DKIM DNS records).
3. **Email content**: Added HTML version of the activation email (inline styles, light theme), in addition to the existing plain-text version.
4. **ColorPeek STATUS.md**: Updated email delivery description and Changelog.

**Why**: MailChannels' free service shutdown created delivery risk for license emails — the most critical email (activation key after payment). Resend aligns ColorPeek with SnapMark, which has used Resend since 2026-07-11 (Decision #22).

**Impact**: Website repo — documentation only (STATUS.md). ColorPeek repo: `server/src/index.js`, `server/wrangler.toml`, `STATUS.md`.

---

## 39. CSSPick Added to Website (2026-08-11)

**Decision**: Added CSSPick (CSS inspector Chrome extension, $19 lifetime) to the website — 4 new pages, nav/footer updates across all pages, homepage card, sitemap, and docs.

**Changes**:

1. **Product page** (`csspick.html`): Full product page in website design system — hero (Buy Pro $19 via Creem `prod_2WIFmjutxgl3tYNbQoFgHu`, "Coming Soon" for CWS since not yet published), 8 feature cards (one-click inspect, hover highlight, 7 CSS groups, single-property copy free, Copy All CSS / Copy Selector Pro, minimal permissions, 100% local), pricing (Free / Pro $19 lifetime), comparison table (vs CSS Scan $95 / UI-Ray $39 / free tools), privacy by design, FAQ (with `id="faq"` anchor), CTA.

2. **Legal pages** (`csspick-privacy.html`, `csspick-terms.html`, `csspick-refund.html`): Converted the CWS standalone light-theme versions (added by another agent, commit 98b581e) to the website's `policy-content` layout with site header/footer.

3. **Logo** (`assets/csspick-logo.png`): 128px icon from `../csspick/icons/icon-128.png`.

4. **Homepage** (`index.html`): Added CSSPick product card (Hover inspect / 7 CSS groups / Copy All CSS / $19 lifetime).

5. **Navigation & footer** (all 27 pages): Added CSSPick to nav (after ColorPeek) and footer Products + Legal columns via batch script.

6. **Support page** (`support.html`): Added CSSPick to Product Help, Refund Policy sections, and FAQ links.

7. **Sitemap**: Added 4 URLs (23 → 27).

8. **Docs**: README (Products table + structure), STATUS (product rows, License API, page count 23→27), CLAUDE.md (product line table).

**Why**: CSSPick is the 5th WayKnow product with a live license server (api.wayknow.tech/csspick) and Creem checkout. Standard new-product checklist per CLAUDE.md.

**Impact**: 27 HTML files + sitemap.xml + 4 .md files.

---

## 40. CSSPick Blog Post (2026-08-11)

**Decision**: Published the 6th blog post — "CSS Inspection Shouldn't Cost $95 — Meet CSSPick" (`blog/csspick-css-inspector.html`).

**Content**: Competitive comparison angle, matching the blog series pattern:
- CSS Scan $95 price critique (3.5★ rating, $900 "Pro" tier)
- DevTools slowness (30s vs 3s per lookup)
- Abandonware free alternatives (biggest has 345 users)
- CSSPick features: hover inspect, 7 CSS groups, single-property copy (free), Copy All CSS / Copy Selector (Pro)
- Comparison table (CSSPick $19 vs CSS Scan $95 vs UI-Ray $39)
- Minimal permissions story (3 permissions, no host permissions)
- SnapMark/ClearJSON reuse story

**Why**: Every product launch gets a blog post (pattern: snapmark, crumbkit, colorpeek, clearjson). Drives organic search traffic from "CSS Scan alternative" and "CSS inspector" queries.

**Impact**: `blog/csspick-css-inspector.html` (new), `blog.html` (card added at top), `sitemap.xml` (+1 URL), STATUS/README/CLAUDE.md (5→6 posts).

---

## 41. CSSPick CWS Approved (2026-08-12)

**Decision**: CSSPick v0.2.0 approved on Chrome Web Store. Replaced all "Coming Soon" placeholders with the real CWS link.

**Changes**:

1. **Product page** (`csspick.html`): Hero "Coming Soon on Chrome Web Store" (disabled span) → "Install from Chrome Web Store" (btn-primary, real link `kadcnmgmnjnjcggfbphjnbndkoadkghj`). Free pricing card "Coming Soon — Install Free" → "Install Free" (btn-outline).
2. **Homepage** (`index.html`): CSSPick card button "Learn More →" → "Install Free →" (CWS link, matching other extension cards).
3. **STATUS.md**: CWS submitted → approved.

**Why**: Standard flow — page placeholders go live once the store listing is approved. CSSPick is now fully live: CWS install, Creem checkout, license server.

**Impact**: 3 files modified (`csspick.html`, `index.html`, `STATUS.md`). DECISIONS.md updated for tracking.

---

## 42. 获客策略转向：放弃社区 launch 渠道 (2026-08-12)

**Decision**: 不再依赖 Reddit / Show HN / Product Hunt 等社区 launch 渠道获客。全部精力转向自有/算法分发渠道。

**Why**: 用户实测 Reddit、Show HN 对新账号极不友好（Show HN 需账号满 1 年；多数 subreddit 自动过滤低 karma 新号）。CWS 搜索排名按安装量+评分增速加权，新扩展排不上去；GitHub 0 star 无人信——"先有权威才能获得权威"的渠道全部走不通（这是结构性障碍，不是内容质量问题）。

**How**: 获客只依赖：官网 SEO（低竞争词文章，3-6 个月周期）+ GSC + Chrome Web Store 店内搜索 + dev.to 同步（canonical 指回官网）+ MCP 生态收录（mcp.so/Smithery）+ 扩展内评分收集。社区账号（Reddit/HN）注册养龄作长期备用，不当主力。

---

## 43. 主攻方向：浏览器 AI 产品 + ClearJSON SEO 引擎（双轨）(2026-08-12)

**Decision**: 放弃"下一个 Mac 本地 AI 工具"作为立即主攻（survey 通用建议），改为双轨：轨道 A = ClearJSON SEO 内容引擎（每周 2 篇，3-6 个月养流量）；轨道 B = 浏览器 AI 产品（自然语言网页数据提取，订阅制 $9.99-29.99/月，MVP 4-6 周）。

**Why**: 用户核心瓶颈是分发而非产品形态。现有资产（WayKnow 品牌、官网、4 个扩展、DOM 技术栈、dev.to 声音、MCP 经验）全部在浏览器侧；换 Mac 方向等于全部作废重新冷启动（ColorPeek 1 条评分已验证 Mac 不解决分发）。浏览器 DOM 技术栈（CSSPick 元素定位 + SnapMark 页面捕获 + CrumbKit 会话 + ClearJSON 解析）恰好是 2026 年 AI agent 需要的能力底座。Mac 方向保留为 SEO 引擎起量后的产品线扩展。

---

## 44. 博客事实审计与修正 (2026-08-12)

**Decision**: 文章上线前必须事实核验；发现的问题全部修复。

**Why**: 首篇对比文初稿的竞品名单来自搜索摘要，核实后：NextJSON（1 star 无 license）与 BestJSONViewer/PayloadScope/JSON Keeper（无法证实）全部删除；JSON Formatter Pro 确认为 Zovo 的 20 扩展套件（价格各来源矛盾，不做价格声称）；JSONVault Pro 确认为真实正面竞品（免费层+Pro 内购，声称 500MB 虚拟渲染，弱化了 "the only viewer" 的绝对化声称）。旧文章修复：真实 HN 链接（item?id=47721946，2026-04-10，289 分，Algolia API 验证）、时间线（实际 2026 年 1 月注入/4 月曝光，非 2025）、"exactly one paid" 事实错误、竞品名统一为 JSON Pretty Pro、新增作者辩护段。新文章同样修正时间线并新增 JSONVault Pro 条目。

**Impact**: 站内两篇文章互为链接；竞品事实与产品页对比表（TreeJSON/JSON Alexander/arnav-kr/Just JSON/JSON Pretty Pro）统一。

---

## 45. dev.to 全量设置 canonical 回流官网 (2026-08-12)

**Decision**: 5 篇 dev.to 文章的 canonical_url 全部改为指向对应官网文章。

**Why**: 此前 canonical 全部指向 dev.to 自己，Google 会把 dev.to（高权重）当原文来源，与自己官网抢同一关键词排名。设置 canonical 后权重回流官网，dev.to 只承担分发。

**How**: dev.to 编辑器（齿轮图标/省略号按钮/基础编辑器 front matter 三选一）填入对应官网 URL。已用 API 验证 5 篇全部生效。JSON Viewer 那篇的 "2025" 经查是版本日期（JSON Viewer Pro v7.1 as of October 2025），非时间线错误，无需修改。
