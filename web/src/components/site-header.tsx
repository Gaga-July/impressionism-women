"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { LanguageToggle } from "@/components/language-toggle";
import { withLanguage } from "@/lib/i18n";

export function SiteHeader() {
  const params = useSearchParams(); const lang = params.get("lang") === "fr" ? "fr" : "zh";
  const [open, setOpen] = useState(false);
  const labels = lang === "fr" ? { home: "Accueil", collection: "Collection", artists: "Artistes", name: "Base visuelle des femmes dans l’impressionnisme" } : { home: "首页", collection: "作品库", artists: "艺术家", name: "印象派女性题材视觉数据库" };
  const links = [["/", labels.home], ["/collection", labels.collection], ["/artists", labels.artists]] as const;
  return <header className="site-header border-b"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8"><Link href={withLanguage("/", lang)} className="site-brand min-w-0 leading-tight"><span className="block text-base font-semibold tracking-wide sm:text-lg">{labels.name}</span><span className="site-subtitle block text-[.65rem] tracking-[0.12em] sm:text-xs">FEMMES DANS L&apos;IMPRESSIONNISME</span></Link><button type="button" className="menu-toggle md:hidden" aria-expanded={open} aria-controls="public-navigation" aria-label={open ? (lang === "fr" ? "Fermer le menu" : "关闭菜单") : (lang === "fr" ? "Ouvrir le menu" : "打开菜单")} onClick={() => setOpen(value => !value)}><span /><span /><span /></button><div id="public-navigation" className={`${open ? "flex" : "hidden"} mobile-menu w-full flex-col gap-4 md:flex md:w-auto md:flex-row md:items-center md:gap-5`}><nav aria-label={lang === "fr" ? "Navigation principale" : "主导航"} className="site-nav flex flex-col gap-3 text-sm md:flex-row md:gap-4">{links.map(([href, label]) => <Link key={href} href={withLanguage(href, lang)} onClick={() => setOpen(false)}>{label}</Link>)}</nav><LanguageToggle onChange={() => setOpen(false)} /></div></div></header>;
}
