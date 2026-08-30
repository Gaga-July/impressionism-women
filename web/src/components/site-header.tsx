"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LanguageToggle } from "@/components/language-toggle";
import { withLanguage } from "@/lib/i18n";

export function SiteHeader() {
  const params = useSearchParams(); const lang = params.get("lang") === "fr" ? "fr" : "zh";
  const labels = lang === "fr" ? { home: "Accueil", collection: "Collection", artists: "Artistes", name: "Base visuelle des femmes dans l’impressionnisme" } : { home: "首页", collection: "作品库", artists: "艺术家", name: "印象派女性题材视觉数据库" };
  const links = [["/", labels.home], ["/collection", labels.collection], ["/artists", labels.artists]] as const;
  return <header className="site-header border-b"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8"><Link href={withLanguage("/", lang)} className="site-brand leading-tight"><span className="block text-lg font-semibold tracking-wide">{labels.name}</span><span className="site-subtitle block text-xs tracking-[0.12em]">FEMMES DANS L&apos;IMPRESSIONNISME</span></Link><div className="flex flex-wrap items-center gap-x-5 gap-y-3"><nav aria-label="主导航" className="site-nav flex flex-wrap gap-x-4 gap-y-2 text-sm">{links.map(([href, label]) => <Link key={href} href={withLanguage(href, lang)}>{label}</Link>)}</nav><LanguageToggle /></div></div></header>;
}
