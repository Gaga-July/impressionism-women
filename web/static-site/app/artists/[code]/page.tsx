import { Suspense } from "react";
import { notFound } from "next/navigation";
import { StaticArtistDetailView } from "@/components/static-artist-detail-view";
import { getStaticArtistByCode, getStaticArtists } from "@/lib/static-data";
export const dynamicParams = false;
export function generateStaticParams() { return getStaticArtists().map(artist => ({ code: artist.code })); }
export default async function Page({ params }: { params: Promise<{ code: string }> }) { const { code } = await params; const artist = getStaticArtistByCode(code); if (!artist) notFound(); return <Suspense fallback={null}><StaticArtistDetailView artist={artist} /></Suspense>; }
