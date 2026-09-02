"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArtworkCard } from "@/components/artwork-card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { languageFrom, localize, withLanguage } from "@/lib/i18n";
import type { PublicPainting } from "@/lib/static-data";
import type { StaticArtist } from "@/lib/static-types";

export function StaticArtistDetailView({ artist }: { artist: StaticArtist & { paintings: PublicPainting[] } }) {
  const params = useSearchParams(); const lang = languageFrom({ lang: params.get("lang") ?? undefined }); const name = lang === "fr" ? artist.nameFr ?? artist.nameOriginal : artist.nameZh; const biography = lang === "fr" ? artist.biographyFr ?? artist.biographyZh : artist.biographyZh;
  return <><SiteHeader /><main className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8"><Link href={withLanguage("/artists", lang)} className="back-link text-sm hover:underline">← {localize(lang, "返回艺术家", "Retour aux artistes")}</Link><h1 className="mt-5 text-3xl font-semibold text-[var(--text-primary)]">{name}</h1>{lang === "zh" && <p className="mt-2 italic text-[var(--text-secondary)]">{artist.nameFr}</p>}{biography && <p className="mt-5 max-w-3xl leading-7 text-[var(--text-secondary)]">{biography}</p>}<h2 className="mt-10 text-2xl font-semibold text-[var(--text-primary)]">{localize(lang, "作品", "Œuvres")}</h2><div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{artist.paintings.map(painting => <ArtworkCard key={painting.code} painting={painting} lang={lang} />)}</div></main><SiteFooter lang={lang} /></>;
}
