# SEO 改进清单

> wayknow.tech 当前未被搜索引擎收录的原因分析与修复方案

---

## 问题总览

| # | 问题 | 严重度 | 类型 |
|---|------|:------:|------|
| 1 | 未提交到 Google Search Console | ✅ 已完成 | 操作 |
| 2 | 缺少 `robots.txt` | 🔴 严重 | 文件 |
| 3 | 缺少 `sitemap.xml` | 🔴 严重 | 文件 |
| 4 | 导航栏是 JS 动态注入的 | 🟡 中等 | 代码 |
| 5 | 缺少 Open Graph / Twitter Card 标签 | 🟡 中等 | 代码 |
| 6 | 缺少 canonical 链接 | 🟡 中等 | 代码 |
| 7 | 缺少结构化数据 (JSON-LD) | 🟢 建议 | 代码 |

---

## 1. Google Search Console（需要手动操作）

这是**最直接**的原因 — 你没有主动告诉 Google 网站存在。

### 操作步骤

1. 打开 [Google Search Console](https://search.google.com/search-console)
2. 选择「添加资源」，输入 `wayknow.tech`
3. 验证域名所有权（推荐 DNS 验证：在 Cloudflare 添加一条 TXT 记录）
4. 验证通过后，在左侧菜单「站点地图」提交 `sitemap.xml` 的完整 URL
5. 在「URL 检查」中输入 `https://wayknow.tech/`，点击「请求编入索引」

### 如果域名在 Cloudflare 上

Cloudflare DNS 面板可以直接添加 TXT 验证记录，Google 会实时检测到，比文件验证方便。

---

## 2. 创建 `robots.txt`

新建文件 `robots.txt`，放在网站根目录（`/var/www/html/robots.txt`）：

```txt
User-agent: *
Allow: /
Disallow: /assets/

Sitemap: https://wayknow.tech/sitemap.xml
```

说明：
- 允许所有爬虫抓取所有页面
- 禁止抓取 `/assets/` 目录（图片等静态资源不需要被索引）
- 指向 sitemap 的位置

---

## 3. 创建 `sitemap.xml`

新建文件 `sitemap.xml`，放在网站根目录（`/var/www/html/sitemap.xml`）：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://wayknow.tech/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://wayknow.tech/snapmark.html</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://wayknow.tech/clearjson.html</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://wayknow.tech/snapmark-privacy.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://wayknow.tech/snapmark-terms.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://wayknow.tech/clearjson-privacy.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://wayknow.tech/clearjson-terms.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

`changefreq` 和 `priority` 告诉搜索引擎哪些页面更重要、更新频率如何。

---

## 4. 把 header/footer 改成静态 HTML（推荐）

### 问题

当前 `js/main.js` 通过 JavaScript 动态生成 `<header>` 和 `<footer>`：

```javascript
var headerTarget = document.getElementById('site-header');
if (headerTarget) {
  headerTarget.innerHTML = headerHTML;
}
```

Googlebot 虽然能执行部分 JavaScript，但：
- 渲染延迟（可能几小时到几周后才渲染 JS）
- 导航链接可能完全被忽略
- 其他搜索引擎（Bing、DuckDuckGo）基本不执行 JS

这意味着搜索引擎可能**看不到任何页面间的导航链接**，无法发现 `/snapmark.html` 和 `/clearjson.html`。

### 修复方案

在每个 HTML 文件中，把 `<div id="site-header"></div>` 和 `<div id="site-footer"></div>` 替换为静态 HTML。同时从 `main.js` 中删除注入逻辑。

以 `index.html` 为例，`<div id="site-header"></div>` 替换为：

```html
<header class="site-header">
  <nav class="nav">
    <a href="/" class="nav-logo">
      <span class="dot"></span> WayKnow
    </a>
    <button class="nav-toggle" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-links">
      <li><a href="/">Home</a></li>
      <li><a href="/snapmark.html">SnapMark</a></li>
      <li><a href="/clearjson.html">ClearJSON</a></li>
    </ul>
  </nav>
</header>
```

`<div id="site-footer"></div>` 替换为：

```html
<footer class="site-footer">
  <div class="footer-grid">
    <div class="footer-brand">
      <a href="/" class="nav-logo">
        <span class="dot"></span> WayKnow
      </a>
      <p>Privacy-first browser tools.<br>100% local processing, zero data uploads, no sign-up required.</p>
    </div>
    <div class="footer-col">
      <h4>Products</h4>
      <ul>
        <li><a href="/snapmark.html">SnapMark</a></li>
        <li><a href="/clearjson.html">ClearJSON</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Legal</h4>
      <ul>
        <li><a href="/snapmark-privacy.html">SnapMark Privacy</a></li>
        <li><a href="/snapmark-terms.html">SnapMark Terms</a></li>
        <li><a href="/clearjson-privacy.html">ClearJSON Privacy</a></li>
        <li><a href="/clearjson-terms.html">ClearJSON Terms</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 WayKnow. All rights reserved.</p>
  </div>
</footer>
```

> 需要改的文件：`index.html`、`snapmark.html`、`clearjson.html`、`snapmark-privacy.html`、`snapmark-terms.html`、`clearjson-privacy.html`、`clearjson-terms.html`（共 7 个）。

改完后 `main.js` 只保留导航高亮、移动端菜单、FAQ accordion、平滑滚动这四部分功能（即删除 header/footer 注入代码，保留其余）。

---

## 5. 添加 Open Graph / Twitter Card 标签

这些标签控制网站在社交媒体（Twitter/X、Facebook、LinkedIn、Slack）上分享时的预览卡片。

在每个 HTML 页面的 `<head>` 中添加。以下是各页面的标签：

### `index.html`

```html
<!-- Open Graph -->
<meta property="og:title" content="WayKnow — Browser Tools You Can Trust">
<meta property="og:description" content="Privacy-first browser tools. 100% local processing, no sign-up, one-time purchase.">
<meta property="og:url" content="https://wayknow.tech/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="WayKnow">
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="WayKnow — Browser Tools You Can Trust">
<meta name="twitter:description" content="Privacy-first browser tools. 100% local processing, no sign-up, one-time purchase.">
```

### `snapmark.html`

```html
<!-- Open Graph -->
<meta property="og:title" content="SnapMark — Screenshot & Annotation Tool">
<meta property="og:description" content="Capture, annotate, export. 5 capture modes, 8 annotation tools, 100% local. Free tier available, Pro $39 lifetime.">
<meta property="og:url" content="https://wayknow.tech/snapmark.html">
<meta property="og:type" content="website">
<meta property="og:site_name" content="WayKnow">
<meta property="og:image" content="https://wayknow.tech/assets/snapmark-logo.png">
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="SnapMark — Screenshot & Annotation Tool">
<meta name="twitter:description" content="Capture, annotate, export. 5 capture modes, 8 annotation tools, 100% local. Free tier available, Pro $39 lifetime.">
<meta name="twitter:image" content="https://wayknow.tech/assets/snapmark-logo.png">
```

### `clearjson.html`

```html
<!-- Open Graph -->
<meta property="og:title" content="ClearJSON — A JSON Viewer You Can Trust">
<meta property="og:description" content="Open source (MIT), 100% local, zero tracking. Handles 100MB+ files, JWT decode, CSV export. $29 lifetime.">
<meta property="og:url" content="https://wayknow.tech/clearjson.html">
<meta property="og:type" content="website">
<meta property="og:site_name" content="WayKnow">
<meta property="og:image" content="https://wayknow.tech/assets/clearjson-logo.svg">
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="ClearJSON — A JSON Viewer You Can Trust">
<meta name="twitter:description" content="Open source (MIT), 100% local, zero tracking. Handles 100MB+ files, JWT decode, CSV export. $29 lifetime.">
<meta name="twitter:image" content="https://wayknow.tech/assets/clearjson-logo.svg">
```

> Privacy 和 Terms 页面可以省略 OG 标签（不需要在社交媒体上分享这些页面）。

---

## 6. 添加 canonical 链接

防止 `wayknow.tech` 和 `www.wayknow.tech` 被当作重复内容惩罚。

在每个 HTML 页面的 `<head>` 中添加对应页面的 canonical URL：

### `index.html`
```html
<link rel="canonical" href="https://wayknow.tech/">
```

### `snapmark.html`
```html
<link rel="canonical" href="https://wayknow.tech/snapmark.html">
```

### `clearjson.html`
```html
<link rel="canonical" href="https://wayknow.tech/clearjson.html">
```

> 其他页面同理，用各自页面的 URL。

---

## 7. 添加结构化数据 (JSON-LD)（可选，锦上添花）

在 `index.html` 的 `<head>` 中添加，帮助 Google 生成 Rich Results（增强搜索结果的展示效果）：

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "WayKnow",
  "url": "https://wayknow.tech",
  "description": "Privacy-first browser tools. 100% local processing, zero data uploads, no sign-up required.",
  "sameAs": [
    "https://github.com/wayknow"
  ]
}
</script>
```

在 `snapmark.html` 和 `clearjson.html` 的 `<head>` 中添加 SoftwareApplication 结构化数据：

### `snapmark.html`
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SnapMark",
  "applicationCategory": "BrowserApplication",
  "operatingSystem": "Chrome",
  "description": "Screenshot and annotation Chrome extension. 5 capture modes, 8 annotation tools, 100% local processing.",
  "url": "https://wayknow.tech/snapmark.html",
  "offers": {
    "@type": "Offer",
    "price": "39.00",
    "priceCurrency": "USD"
  }
}
</script>
```

### `clearjson.html`
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ClearJSON",
  "applicationCategory": "BrowserApplication",
  "operatingSystem": "Chrome",
  "description": "A JSON viewer you can trust. Open source (MIT), 100% local, zero tracking.",
  "url": "https://wayknow.tech/clearjson.html",
  "offers": {
    "@type": "Offer",
    "price": "29.00",
    "priceCurrency": "USD"
  }
}
</script>
```

---

## 实施顺序建议

```
第 1 步：添加 robots.txt + sitemap.xml（2 个新文件，5 分钟）
第 2 步：所有 HTML 加 canonical + OG 标签（改 7 个文件，15 分钟）
第 3 步：header/footer 静态化（改 7 个 HTML + 1 个 JS，20 分钟）
第 4 步：添加 JSON-LD 结构化数据（改 3 个 HTML，10 分钟，可选）
第 5 步：部署到服务器
第 6 步：Google Search Console 验证域名 + 提交 sitemap + 请求索引
```

第 1-4 步是代码改动，在本地完成。第 5 步 `git push` + 服务器 `git pull`。第 6 步需要你手动登录 Google Search Console 操作。

---

## 验证方法

部署后可以用这些工具检查：

- [Google Rich Results Test](https://search.google.com/test/rich-results) — 检查结构化数据
- `curl -I https://wayknow.tech/robots.txt` — 验证 robots.txt 可访问
- [Google Search Console URL 检查](https://search.google.com/search-console) — 查看 Google 看到的页面

---

## 预期效果

- 提交 sitemap 后，Google 通常 **1-3 天**内开始抓取
- 首页编入索引需要 **几天到 2 周**
- 排名提升需要更长时间（取决于内容质量和竞争度）
