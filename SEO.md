# SEO 改进清单

> wayknow.tech 的 SEO 配置与优化记录。最后更新：2026-07-06。

---

## 问题总览

| # | 问题 | 严重度 | 状态 |
|---|------|:------:|:----:|
| 1 | 提交到 Google Search Console | 🔴 必需 | ✅ 已完成 |
| 2 | 缺少 `robots.txt` | 🔴 严重 | ✅ 已完成 |
| 3 | 缺少 `sitemap.xml` | 🔴 严重 | ✅ 已完成 |
| 4 | 导航栏是 JS 动态注入的 | 🟡 中等 | ✅ 已完成 |
| 5 | 缺少 Open Graph / Twitter Card 标签 | 🟡 中等 | ✅ 已完成 |
| 6 | 缺少 canonical 链接 | 🟡 中等 | ✅ 已完成 |
| 7 | 缺少结构化数据 (JSON-LD) | 🟢 建议 | ✅ 已完成 |

---

## 当前 SEO 配置状态

### 全局

- **robots.txt**：允许所有爬虫，禁止 `/assets/`，指向 sitemap
- **sitemap.xml**：11 个 URL（首页 + 3 个产品页 + 1 个支持页 + 6 个 legal 页）
- **header/footer**：所有页面使用静态 HTML，搜索引擎可直接解析导航链接

### 各页面 SEO 覆盖

| 页面 | canonical | OG 标签 | Twitter Card | JSON-LD | favicon |
|------|:---------:|:-------:|:------------:|:-------:|:-------:|
| index.html | ✅ | ✅ | ✅ | Organization | wayknow-logo.svg |
| snapmark.html | ✅ | ✅ | ✅ | SoftwareApplication | snapmark-logo.png |
| clearjson.html | ✅ | ✅ | ✅ | SoftwareApplication | clearjson-logo.svg |
| cookieclear.html | ✅ | ✅ | ✅ | SoftwareApplication | cookieclear-logo.png |
| snapmark-privacy.html | ✅ | — | — | — | snapmark-logo.png |
| snapmark-terms.html | ✅ | — | — | — | snapmark-logo.png |
| clearjson-privacy.html | ✅ | — | — | — | clearjson-logo.svg |
| clearjson-terms.html | ✅ | — | — | — | clearjson-logo.svg |
| cookieclear-privacy.html | ✅ | — | — | — | cookieclear-logo.png |
| cookieclear-terms.html | ✅ | — | — | — | cookieclear-logo.png |
| support.html | ✅ | ✅ | ✅ | — | wayknow-logo.svg |

> Privacy 和 Terms 页面不需要 OG/Twitter Card（不需要在社交媒体上分享这些页面）。

---

## 1. Google Search Console（需要手动操作）

### 操作步骤

1. 打开 [Google Search Console](https://search.google.com/search-console)
2. 选择「添加资源」，输入 `wayknow.tech`
3. 验证域名所有权（推荐 DNS 验证：在 Cloudflare 添加一条 TXT 记录）
4. 验证通过后，在左侧菜单「站点地图」提交 `sitemap.xml` 的完整 URL
5. 在「URL 检查」中输入 `https://wayknow.tech/`，点击「请求编入索引」

如果域名在 Cloudflare 上，Cloudflare DNS 面板可以直接添加 TXT 验证记录，Google 会实时检测到。

---

## 2. robots.txt

```txt
User-agent: *
Allow: /
Disallow: /assets/

Sitemap: https://wayknow.tech/sitemap.xml
```

---

## 3. sitemap.xml

包含全部 10 个页面 URL，含 `changefreq` 和 `priority`。产品页 priority 0.9（weekly），legal 页 priority 0.3（monthly），首页 priority 1.0。

---

## 4. header/footer 静态化

所有 10 个 HTML 页面的 `<header>` 和 `<footer>` 都是静态 HTML。`main.js` 只负责导航高亮、移动端菜单、FAQ accordion、平滑滚动、动态年份。

---

## 5. Open Graph / Twitter Card 标签

### index.html

```html
<!-- Open Graph -->
<meta property="og:title" content="WayKnow — Browser Tools You Can Trust">
<meta property="og:description" content="Privacy-first browser tools. 100% local processing, no sign-up, one-time purchase.">
<meta property="og:url" content="https://wayknow.tech/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="WayKnow">
<meta property="og:image" content="https://wayknow.tech/assets/wayknow-logo.svg">
<meta property="og:image:width" content="128">
<meta property="og:image:height" content="128">
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="WayKnow — Browser Tools You Can Trust">
<meta name="twitter:description" content="Privacy-first browser tools. 100% local processing, no sign-up, one-time purchase.">
<meta name="twitter:image" content="https://wayknow.tech/assets/wayknow-logo.svg">
```

### 产品页（snapmark / clearjson / cookieclear）

结构与首页相同，各有产品特定的 title、description、image。均包含 `og:image:width` 和 `og:image:height`。

---

## 6. canonical 链接

全部 10 个页面都有 canonical，指向各自的标准 URL（`https://wayknow.tech/` + 路径）。防止 `www.wayknow.tech` 被当作重复内容。

---

## 7. JSON-LD 结构化数据

### index.html — Organization

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

### 产品页 — SoftwareApplication

snapmark（$39）、clearjson（$29）、cookieclear（$0）各有 SoftwareApplication + Offer 结构化数据。

---

## 后续优化建议

| 优先级 | 事项 | 说明 |
|:------:|------|------|
| 🟡 | Bing Webmaster Tools | 导入 sitemap，覆盖 Bing + DuckDuckGo 搜索流量 |
| 🟢 | 创建 1200×630 OG 图片 | 当前 OG 图片是 128px 产品图标，社交平台推荐 1200×630 |
| 🟢 | 添加 BreadcrumbList JSON-LD | 帮助 Google 在搜索结果中显示面包屑导航 |
| 🟢 | 定期检查 Search Console | 关注索引覆盖率、Core Web Vitals、手动操作 |

---

## 验证方法

部署后可以用这些工具检查：

- [Google Rich Results Test](https://search.google.com/test/rich-results) — 检查结构化数据
- `curl -I https://wayknow.tech/robots.txt` — 验证 robots.txt 可访问
- [Google Search Console URL 检查](https://search.google.com/search-console) — 查看 Google 看到的页面
- [Bing Webmaster Tools](https://www.bing.com/webmasters) — 提交到 Bing
- [Open Graph Debugger](https://www.opengraph.xyz/) — 检查 OG 标签效果

---

## 预期效果

- 提交 sitemap 后，Google 通常 **1-3 天**内开始抓取
- 首页编入索引需要 **几天到 2 周**
- 排名提升需要更长时间（取决于内容质量和竞争度）
