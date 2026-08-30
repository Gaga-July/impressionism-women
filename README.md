# 印象派绘画中的女性 / Femmes dans l’impressionnisme

这是一个研究印象派绘画中女性形象的中法双语数字艺术数据库网站，公开站点使用 Next.js 静态导出。

Live site: [https://gaga-july.github.io/impressionism-women/](https://gaga-july.github.io/impressionism-women/)

公开页面由本地研究数据库生成的审核后 JSON 快照构建。此仓库不包含原始 SQLite 数据库、Excel 源工作簿或 `source-images` 高清原图；`web/public/static-images/artworks/` 只保存网站展示用的 WebP 派生图。

在完整本地研究项目中，动态版本继续使用 Prisma + SQLite。生成数据快照和派生图片后，可在 `web` 目录运行 `pnpm static:build`。本公开发布树不含本地数据库，因此使用：

```powershell
cd web
pnpm install --frozen-lockfile
pnpm static:build:ci
pnpm static:serve
```

版权与授权状态可能因网站源码、研究数据和艺术图片而不同；本仓库暂未附加统一开源许可证。
