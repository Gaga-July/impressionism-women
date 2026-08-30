import { Suspense } from "react";
import { notFound } from "next/navigation";
import { StaticArtworkDetailView } from "@/components/static-artwork-detail-view";
import { getStaticPaintingByCode, getStaticPaintings, getStaticRelatedPaintings } from "@/lib/static-data";
export const dynamicParams = false;
export function generateStaticParams() { return getStaticPaintings().map(painting => ({ code: painting.code })); }
export default async function Page({ params }: { params: Promise<{ code: string }> }) { const { code } = await params; const painting = getStaticPaintingByCode(code); if (!painting) notFound(); return <Suspense fallback={null}><StaticArtworkDetailView painting={painting} related={getStaticRelatedPaintings(painting)} /></Suspense>; }
