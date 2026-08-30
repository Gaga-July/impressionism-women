export type Language = "zh" | "fr";
export const isFrench = (lang?: string): lang is "fr" => lang === "fr";
export const languageFrom = (params: { lang?: string } | undefined): Language => isFrench(params?.lang) ? "fr" : "zh";
export const localize = (lang: Language, zh: string, fr: string) => lang === "fr" ? fr : zh;
export const withLanguage = (href: string, lang: Language) => {
  if (lang !== "fr") return href;
  const [pathname, query = ""] = href.split("?");
  const params = new URLSearchParams(query); params.set("lang", "fr");
  return `${pathname}?${params}`;
};

export const primarySpaceLabel = (code: string, lang: Language) => ({
  PUBLIC: localize(lang, "公共空间", "Espace public"),
  PRIVATE: localize(lang, "私人空间", "Espace privé"),
  BOUNDARY: localize(lang, "边界／阈限空间", "Espace liminal"),
  UNKNOWN: localize(lang, "其他／待研究", "Autre / à étudier"),
}[code] ?? code);
