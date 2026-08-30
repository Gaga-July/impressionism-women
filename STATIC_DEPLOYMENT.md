# 静态发布架构

本公开仓库只包含经过审核的静态发布输入和公开前台源码。完整本地研究项目继续以 Prisma + SQLite 为主数据源，并在本地从数据库和原始研究图片生成发布快照；数据库、原始图片和研究工作文件不进入公开仓库。

## 公开构建输入

- `web/generated/static-data/*.json`：审核后的只读公开数据快照。
- `web/public/static-images/artworks/*.webp`：保持比例、无滤镜、无裁剪的网页展示派生图。
- `web/static-site/app`：只包含公开页面的 Next.js 静态入口。
- `web/src/components` 与 `web/src/lib`：静态入口实际依赖的共享公开代码。

公开入口不包含 Admin、Prisma 数据访问、SQLite、动态图片 Route Handler 或 Server Actions。

## CI-safe 构建

在 `web` 目录运行：

```powershell
pnpm install --frozen-lockfile
pnpm static:validate:ci
pnpm static:build:ci
pnpm static:serve
```

`static:validate:ci` 检查 355 件作品、7 位艺术家、321 条图片记录、2 个保留编号、642 张 WebP、manifest 路径安全、文件存在性和静态源码的服务器运行时依赖。

`static:build:ci` 只验证已提交的公开快照并执行 Next.js static export，不访问数据库或原始图片。结果写入 `web/out/`，该目录由 GitHub Actions 作为 Pages artifact 上传，不提交 Git。

## 页面与图片

- Home、Collection 和 Artists 使用 committed JSON。
- 7 个 Artist Detail 和 355 个 Artwork Detail 通过 `generateStaticParams()` 生成。
- 搜索、组合筛选、语言和 query 恢复在浏览器端运行。
- Card 使用 manifest 的 `cardStaticPath`，详情使用 `detailStaticPath`。
- 静态运行时不会请求 Prisma、SQLite、`/api/*`、动态 `/images/*` 或 Next Image Optimization API。

## GitHub Pages 子路径

`web/static-site/next.config.ts` 将 `NEXT_PUBLIC_BASE_PATH` 作为 base path 的单一来源。GitHub workflow 从 `actions/configure-pages` 的 `base_path` 输出注入该变量，因此不会写死用户名或仓库名，也不会重复添加 repository path。

本地根路径构建时变量留空。模拟项目子路径时可临时设为 `/test-repo` 后运行 `pnpm static:build:ci`。

## 数据更新流程

研究数据更新必须在完整本地项目中完成：更新 SQLite，经本地导出和图片派生流程生成新快照，人工检查 JSON 和 WebP，再把审核后的公开文件同步到 clean public history。GitHub Actions 只验证和构建，不能重新生成研究数据。

项目尚未在 GitHub Pages 上线，实际 repository 和 Pages URL 将在部署成功后记录。
