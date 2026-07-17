# WayKnow 官网

> 静态网站，展示 WayKnow 浏览器工具产品线。部署在 `wayknow.tech`。

## 项目概览

- **技术栈**：纯静态 HTML/CSS/JS，零框架，零构建步骤
- **设计系统**：CSS 自定义属性，深蓝 + teal 暗色主题，768px 响应式断点
- **部署**：`git push` → 服务器 `git pull`，Tencent Cloud 新加坡 + Cloudflare CDN
- **当前状态**：10 个页面，3 款产品，SEO 已优化
- **详细状态**：[STATUS.md](STATUS.md)
- **决策记录**：[DECISIONS.md](DECISIONS.md)
- **部署指南**：[DEPLOY.md](DEPLOY.md)

## 网站结构

```
wayknow/
├── index.html                  # 首页 — 产品卡片 + 品牌价值观
├── snapmark.html               # SnapMark 产品页（截图+标注，$39 终身）
├── clearjson.html              # ClearJSON 产品页（JSON 查看器，$29 终身）
├── cookieclear.html            # CookieClear 产品页（Cookie 编辑器，完全免费）
├── snapmark-privacy.html       # SnapMark 隐私政策
├── snapmark-terms.html         # SnapMark 服务条款
├── clearjson-privacy.html      # ClearJSON 隐私政策
├── clearjson-terms.html        # ClearJSON 服务条款
├── cookieclear-privacy.html    # CookieClear 隐私政策
├── cookieclear-terms.html      # CookieClear 服务条款
├── crumbkit.html               # CrumbKit 产品页（Cookie 编辑器，完全免费，CookieClear 的合规新版）
├── crumbkit-privacy.html       # CrumbKit 隐私政策
├── crumbkit-terms.html         # CrumbKit 服务条款
├── colorpeek.html              # ColorPeek 产品页（macOS 取色器，$19 终身）
├── colorpeek-privacy.html      # ColorPeek 隐私政策
├── colorpeek-terms.html        # ColorPeek 服务条款
├── support.html                 # 通用支持页面
├── css/style.css               # ~1000 行 CSS 设计系统
├── js/main.js                  # 导航高亮、移动端菜单、FAQ accordion、平滑滚动
├── assets/                     # 产品图标
├── robots.txt                  # SEO
├── sitemap.xml                 # SEO（14 个 URL）
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
| CookieClear | Cookie 编辑器 | 完全免费 | `cookieclear.html` | `../cookieclear` |
| CrumbKit | Cookie 编辑器（合规新版） | 完全免费 | `crumbkit.html` | `../crumbkit` |
| ColorPeek | macOS 取色器 | 免费 + $19 终身 | `colorpeek.html` | `../colorpeek` |

CookieClear 因 CWS spam 政策被屏蔽（申诉中）。CrumbKit 是全新品牌的合规版本。CookieClear/CrumbKit 是获客渠道（免费），SnapMark 和 ClearJSON 是收入来源（买断制）。

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
4. 更新其他 9 个 HTML 的 nav 和 footer（加新产品的导航链接和 legal 链接）
5. 更新 `sitemap.xml`（3 个新 URL）
6. 更新 `README.md`、`STATUS.md`、`DECISIONS.md`
7. git commit + push + 服务器 pull

## 工作约定

- 改页面内容后更新对应的 `.md` 文件（STATUS.md、DECISIONS.md、README.md）
- 提交信息包含改动说明 + `Co-Authored-By: Claude <noreply@anthropic.com>`
- 新增产品页面时检查 SEO.md 确保 SEO 配置完整
- 推送前检查是否有残留的 `#` 占位符（CWS 链接、Creem 链接）
- 子项目（snapmark/clearjson/cookieclear）的 `.md` 和 `CLAUDE.md` 是官网内容的最新参考源
