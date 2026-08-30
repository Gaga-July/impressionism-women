import { Suspense } from "react";
import { StaticArtistsView } from "@/components/static-artists-view";
import { getStaticArtists } from "@/lib/static-data";
export default function Page() { return <Suspense fallback={null}><StaticArtistsView artists={getStaticArtists()} /></Suspense>; }
