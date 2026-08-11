# WayKnow 官网

> 静态网站，展示 WayKnow 浏览器工具产品线。部署在 `wayknow.tech`。

## 项目概览

- **技术栈**：纯静态 HTML/CSS/JS，零框架，零构建步骤
- **设计系统**：CSS 自定义属性，深蓝 + teal 暗色主题，768px 响应式断点
- **部署**：`git push` → 服务器 `git pull`，Tencent Cloud 新加坡 + Cloudflare CDN
- **当前状态**：28 个页面（含 6 篇博客），5 款产品，SEO 已优化
- **详细状态**：[STATUS.md](STATUS.md)
- **决策记录**：[DECISIONS.md](DECISIONS.md)
- **部署指南**：[DEPLOY.md](DEPLOY.md)

## 网站结构

```
wayknow/
├── index.html                  # 首页 — 产品卡片 + 品牌价值观
├── snapmark.html               # SnapMark 产品页（截图+标注，$39 终身）
├── clearjson.html              # ClearJSON 产品页（JSON 查看器，$29 终身）
├── snapmark-privacy.html       # SnapMark 隐私政策
├── snapmark-terms.html         # SnapMark 服务条款
├── snapmark-refund.html        # SnapMark 退款政策
├── clearjson-privacy.html      # ClearJSON 隐私政策
├── clearjson-terms.html        # ClearJSON 服务条款
├── clearjson-refund.html       # ClearJSON 退款政策
├── crumbkit.html               # CrumbKit 产品页（Cookie 编辑器，完全免费，原 CookieClear 的合规新版）
├── crumbkit-privacy.html       # CrumbKit 隐私政策
├── crumbkit-terms.html         # CrumbKit 服务条款
├── colorpeek.html              # ColorPeek 产品页（macOS 取色器，$19 终身）
├── colorpeek-privacy.html      # ColorPeek 隐私政策
├── colorpeek-terms.html        # ColorPeek 服务条款
├── colorpeek-refund.html       # ColorPeek 退款政策
├── csspick.html                # CSSPick 产品页（CSS 检查器，$19 终身）
├── csspick-privacy.html        # CSSPick 隐私政策
├── csspick-terms.html          # CSSPick 服务条款
├── csspick-refund.html         # CSSPick 退款政策
├── support.html                 # 通用支持页面
├── blog.html                   # Blog 列表页（6 篇博文 + newsletter signup）
├── blog/                       # 博客文章
│   ├── json-formatter-alternatives.html
│   ├── snapmark-screenshot-tool.html
│   ├── crumbkit-cookie-editor.html
│   ├── colorpeek-mac-color-picker.html
│   ├── local-first-matters.html
│   └── csspick-css-inspector.html
├── css/style.css               # ~1200 行 CSS 设计系统
├── js/main.js                  # 导航高亮、移动端菜单、FAQ accordion、平滑滚动
├── assets/                     # 产品图标
├── download/                   # 产品下载文件
│   └── ColorPeek.dmg
├── robots.txt                  # SEO
├── sitemap.xml                 # SEO（27 个 URL）
├── README.md
├── STATUS.md
├── DECISIONS.md
├── DEPLOY.md
└── SEO.md
```

## 产品线

| 产品 | 定位 | 定价 | 官网页面 | 扩展仓库 |
|------|------|------|----------|----------|
| SnapMark | 截图 + 标注 | 免费 + $39 终身 | `snapmark.html` | `../snapmark` |
| ClearJSON | JSON 查看器 | 免费 + $29 终身 | `clearjson.html` | `../clearjson` |
| CrumbKit | Cookie 编辑器（合规新版） | 完全免费 | `crumbkit.html` | `../crumbkit` |
| CSSPick | CSS 检查器 | 免费 + $19 终身 | `csspick.html` | `../csspick` |
| ColorPeek | macOS 取色器 | 免费 + $19 终身 | `colorpeek.html` | `../colorpeek` |


## 设计系统

**所有 UI 相关任务必须遵循以下规范。**

### 技术选型

- 纯静态 HTML/CSS/JS，零框架，零构建步骤
- 可用外部字体（Google Fonts / Bunny Fonts），需预加载。当前使用 system-ui 栈
- 图标：内联 SVG 或 emoji，禁止 Font Awesome
- 图片：WebP 优先，有 `width`/`height` 属性防 CLS

### 品牌色彩

| Token | 值 | 用途 |
|---|---|---|
| 主色 | `#3B82F6` | 按钮、链接、强调 |
| 强调 | `#10B981` | 成功状态、价格标签、激活态 |
| 深色背景 | `#0f172a` | 主站底色（slate-900，深蓝灰） |
| 浅色背景 | `#FFFFFF` | 浅色落地页（未来可选） |
| 深色文字 | `#F5F5F5` | 深色背景上的正文 |
| 浅色文字 | `#171717` | 浅色背景上的正文 |

> **注意：当前 `css/style.css` 使用的是深蓝 + teal 暗色主题（`--color-primary: #3b82f6`，`--color-accent: #10b981`）。新页面应逐步对齐上面的品牌规范。**

### 字体

| 用途 | 字体 | 当前栈 |
|------|------|--------|
| 标题 | Inter 或 Geist | `system-ui, -apple-system, sans-serif` |
| 正文 | Inter 或 system-ui | `system-ui, -apple-system, sans-serif` |

### 圆角

| 元素 | 值 | CSS 变量 |
|------|-----|---------|
| 按钮 | 8px | `--radius` |
| 卡片 | 16px | `--radius-xl` |
| 大模块 | 24px | 暂无，用 `--radius-xl` 代替 |

### 间距（8px 基数）

| Token | 值 | CSS 变量 |
|------|-----|---------|
| 2xs | 8px | `--space-2` |
| xs | 16px | `--space-4` |
| sm | 24px | `--space-6` |
| md | 32px | `--space-8` |
| lg | 48px | `--space-12` |
| xl | 64px | `--space-16` |
| 2xl | 96px | `--space-20` |

### 页面结构

- **导航**：固定顶部，背景色 → 滚动后可选 `backdrop-filter` 模糊（现有设计不使用 blur）
- **Hero 区**：大标题 + 产品截图/动图 + CTA 按钮
- **产品卡片**：图标 + 名称 + 一句话描述 + 价格标签
- **页脚**：WayKnow 品牌 + 四个产品链接 + Legal 列 + 版权

### 动画规范

- 首屏加载：内容 stagger 淡入（100ms 间隔）
- 滚动触发：`IntersectionObserver` + CSS transition，禁止 heavy JS 动画
- 按钮 hover：`scale(1.02)` 或 `translateY(-1px)` + 阴影加深，`200ms ease-out`
- 移动：禁止 `transition` 或 `animation`（尊重 `prefers-reduced-motion`）
- 当前实现：`.animate-in` class + `fadeInUp` keyframe（600ms ease）

### 性能目标

- Lighthouse 性能分 ≥ 90
- 首屏 < 1.5s（3G 模拟）
- 无布局偏移（CLS ≈ 0）
- 图片有 `width`/`height` 属性防抖动

---

## 关键约定

- **header/footer 是静态 HTML**：每个页面直接包含 `<header>` 和 `<footer>`，不再通过 JS 注入
- **`main.js` 只负责交互**：导航高亮、移动端菜单、FAQ accordion、平滑滚动、动态年份
- **每个产品页有 canonical + OG + Twitter Card 标签**
- **所有页面共享相同的 header/footer 结构**：新增产品页面时需要同步更新 nav 链接和 footer 的 Products + Legal 列
- **对应关系的 .md 文件需要同步更新**：`README.md`、`STATUS.md`、`DECISIONS.md`

## 基础设施

```
User → Cloudflare DNS/CDN (SSL) → Tencent Cloud Singapore 2C2G Ubuntu → Nginx → /var/www/html
                                              ↓
                         api.wayknow.tech → Cloudflare Workers → D1 (SQLite)
```

- **网站服务器**：Tencent Cloud 轻量服务器 2C2G，Ubuntu，新加坡
- **API 服务器**：Cloudflare Workers + D1（`api.wayknow.tech`）
  - `/snapmark/*` → SnapMark 许可证验证（已上线）
  - `/clearjson/*` → ClearJSON 许可证验证（已上线）
- **域名**：`wayknow.tech`（腾讯云注册，Cloudflare DNS）
- **SSL**：Cloudflare Flexible 模式 + Always Use HTTPS
- **Email**：Cloudflare Email Routing（`support@wayknow.tech` → Gmail）
- **仓库**：`github.com/wayknow/website`（私有）

## 部署

```bash
# 本地：编辑 → git 提交 → 推送
git add -A && git commit -m "message" && git push

# 服务器：拉取最新
ssh ubuntu@43.160.219.45 "cd /var/www/html && sudo git pull"
```

## 新增产品页面的 checklist

当有新扩展需要上官网时：

1. 创建产品页（`product.html`）、隐私政策（`product-privacy.html`）、服务条款（`product-terms.html`）
2. 复制 `assets/product-logo.png`（128px）
3. 更新 `index.html`：产品卡片 + nav + footer
4. 更新其他所有 HTML 的 nav 和 footer（加新产品的导航链接和 legal 链接）
5. 更新 `sitemap.xml`（添加新 URL）
6. 更新 `README.md`、`STATUS.md`、`DECISIONS.md`
7. git commit + push + 服务器 pull

## 工作约定

- 改页面内容后更新对应的 `.md` 文件（STATUS.md、DECISIONS.md、README.md）
- 提交信息包含改动说明 + `Co-Authored-By: Claude <noreply@anthropic.com>`
- 新增产品页面时检查 SEO.md 确保 SEO 配置完整
- 推送前检查是否有残留的 `#` 占位符（CWS 链接、Creem 链接）
- 子项目（snapmark/clearjson/crumbkit）的 `.md` 和 `CLAUDE.md` 是官网内容的最新参考源
