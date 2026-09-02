import type { Language } from "@/lib/i18n";

export function SiteFooter({ lang }: { lang: Language }) {
  return <footer className="site-footer mt-auto"><div className="mx-auto grid w-full max-w-7xl gap-3 px-5 py-8 sm:px-8 md:grid-cols-[1fr_auto] md:items-end">
    <div className="space-y-1.5"><p>获厦门大学大学生创新训练计划项目资助</p><p className="text-sm text-[var(--text-secondary)]">Supported by XMU Undergraduate Innovation Training Programs</p></div>
    <div className="space-y-1.5 text-sm text-[var(--text-secondary)] md:text-right"><p>{lang === "fr" ? "Numéro du projet : 2026X916" : "项目编号：2026X916"}</p>
      <a href="mailto:2042644991@qq.com" className="footer-email"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.75 6.75h16.5v10.5H3.75zM4.5 7.5l7.5 5.25 7.5-5.25" /></svg>{lang === "fr" ? "Contact : 2042644991@qq.com" : "反馈邮箱：2042644991@qq.com"}</a></div>
  </div></footer>;
}
