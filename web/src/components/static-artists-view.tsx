"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { languageFrom, localize, withLanguage } from "@/lib/i18n";
import type { StaticArtist } from "@/lib/static-types";

export function StaticArtistsView({ artists }: { artists: StaticArtist[] }) {
  const params = useSearchParams(); const lang = languageFrom({ lang: params.get("lang") ?? undefined });
  return <><SiteHeader /><main className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8"><p className="eyebrow">ARTISTS</p><h1 className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">{localize(lang, "艺术家", "Artistes")}</h1><div className="mt-8 grid gap-4 sm:grid-cols-2">{artists.map(artist => <Link key={artist.code} href={withLanguage(`/artists/${artist.code}`, lang)} className="artist-list-card rounded-[var(--radius-card)] border p-6"><h2 className="text-xl font-medium text-[var(--text-primary)]">{lang === "fr" ? artist.nameFr ?? artist.nameOriginal : artist.nameZh}</h2>{lang === "zh" && <p className="mt-1 italic text-[var(--text-secondary)]">{artist.nameFr}</p>}<p className="mt-4 text-sm text-[var(--text-tertiary)]">{artist.birthYear ?? "—"}–{artist.deathYear ?? "—"} · {artist.paintingCodes.length} {localize(lang, "件作品", "œuvres")}</p></Link>)}</div></main></>;
}
