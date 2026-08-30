import { Suspense } from "react";
import { StaticHomeView } from "@/components/static-home-view";
import { getStaticFeaturedPaintings, getStaticSiteSummary } from "@/lib/static-data";
export default function Page() { return <Suspense fallback={null}><StaticHomeView paintings={getStaticFeaturedPaintings()} summary={getStaticSiteSummary()} /></Suspense>; }
