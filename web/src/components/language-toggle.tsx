"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Language } from "@/lib/i18n";

export function LanguageToggle({ onChange }: { onChange?: () => void } = {}) {
  const pathname = usePathname(); const router = useRouter(); const searchParams = useSearchParams();
  const lang: Language = searchParams.get("lang") === "fr" ? "fr" : "zh";
  const change = (next: Language) => { const params = new URLSearchParams(searchParams.toString()); if (next === "fr") params.set("lang", "fr"); else params.delete("lang"); router.replace(params.size ? `${pathname}?${params}` : pathname, { scroll: false }); onChange?.(); };
  return <div className="language-toggle" aria-label="Language"><button type="button" onClick={() => change("zh")} className={lang === "zh" ? "language-active" : ""}>中文</button><span>｜</span><button type="button" onClick={() => change("fr")} className={lang === "fr" ? "language-active" : ""}>Français</button></div>;
}
