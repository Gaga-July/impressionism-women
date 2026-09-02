"use client";

import { useSearchParams } from "next/navigation";
import { CollectionExplorer } from "@/components/collection-explorer";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { languageFrom, localize } from "@/lib/i18n";
import { collectionHeading } from "@/lib/public-copy";
import type { CollectionPainting } from "@/lib/static-data";

export function StaticCollectionView({ paintings }: { paintings: CollectionPainting[] }) {
  const params = useSearchParams(); const lang = languageFrom({ lang: params.get("lang") ?? undefined });
  const scope = ["ALL", "PUBLIC", "PRIVATE", "BOUNDARY", "UNKNOWN"].includes(params.get("scope") ?? "") ? params.get("scope")! : "ALL";
  const sort = ["default", "year-asc", "year-desc", "artist", "title"].includes(params.get("sort") ?? "") ? params.get("sort")! : "default";
  const initialFilters = { scope, space: params.get("space") ?? "", role: params.get("role") ?? "", artist: params.get("artist") ?? "", decade: params.get("decade") ?? "", q: params.get("q") ?? "", sort };
  return <><SiteHeader /><main className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8"><p className="eyebrow">COLLECTION · {localize(lang, "作品库", "COLLECTION")}</p><h1 className="mt-2 text-4xl font-semibold tracking-tight text-[var(--text-primary)]">{localize(lang, collectionHeading.zh, collectionHeading.fr)}</h1><p className="mt-4 max-w-2xl leading-7 text-[var(--text-secondary)]">{localize(lang, `共 ${paintings.length} 件正式作品。以空间、社会角色、艺术家与年代为线索，展开一次可追溯的视觉研究。`, `${paintings.length} œuvres documentées : une exploration visuelle par espace, rôle social, artiste et période.`)}</p><div className="mt-9"><CollectionExplorer key={params.toString()} paintings={paintings} initialFilters={initialFilters} lang={lang} /></div></main><SiteFooter lang={lang} /></>;
}
