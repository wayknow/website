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
- Free: PNG + clipboard only; Pro: JPEG + WebP + watermark-free PDF

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
- EditThisCookie had 3M free users for a decade
- Cookie-Editor has 2M free users
- CookieJar ($4.99/mo) and Cookie Editor ($3/mo) have unknown conversion rates and no public revenue data
- Users are accustomed to free cookie editors

**Strategy**: CookieClear serves as a **free acquisition channel** for the product family:
- CookieClear → top of funnel (free, mass appeal, 3M+ addressable market)
- ClearJSON → monetization ($29 lifetime)
- SnapMark → monetization ($39 lifetime)

**Cross-promotion**: CookieClear promotes ClearJSON and SnapMark within the extension. Three products cover three high-frequency developer needs, cross-promoting each other.

---

## 18. CookieClear: EditThisCookie Replacement Positioning ❌ REVERSED

**Decision**: ~~Position CookieClear explicitly as the safe EditThisCookie replacement in SEO, store listing, and website copy.~~

**Reversed (2026-07-07)**: CWS rejected first submission for keyword spam. Competitor names are prohibited in CWS store listing metadata (title, description, keywords). All competitor references removed from:
- Store listing (title, description, keywords)
- README and website product pages
- Extension screenshots and metadata

**New approach**: Position CookieClear on its own merits — privacy-first, MV3 native, open source, free. Competitor comparison content moved to off-store channels (Reddit, blog posts, social media) where CWS policies don't apply.

**Original rationale** (for historical record): EditThisCookie was removed from CWS (3M+ users stranded). A malicious copycat scammed 50K+ users. Search volume for "EditThisCookie replacement" and "EditThisCookie alternative" is high. However, CWS policy prohibits using competitor names in store metadata.

---

## 19. ClearJSON: No Subscription — Lifetime Only

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
