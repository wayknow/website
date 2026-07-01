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

**Key corrections**:
- Delayed Capture is **Pro-only** (was incorrectly listed as free)
- JPEG and WebP export are **Pro-only** (was "all export formats free")
- PDF has a "SnapMark" watermark in free version (was "no watermark")
- 8 annotation tools, not 7 (added Crop)
- Free: PNG + clipboard only; Pro: JPEG + WebP + watermark-free PDF

**Why**: The website must match the actual product. Chrome Web Store and Creem will review for accuracy.

---

## 6. English Only

**Decision**: All content in English. No Chinese version.

**Why**: Global audience. Server in Singapore. Both products target international developers. Originally written in Chinese, then fully rewritten in English.

---

## 7. Privacy Policy: Sync with Extension

**Decision**: The website's privacy policy should match the extension's built-in privacy policy exactly.

**Why**: Chrome Web Store requires the privacy policy URL to match what's in the extension. If someone checks the extension's linked policy against what's on the website, they should be identical. Synced the website version with `work/snapmark/snapmark-privacy.html`.

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
