import { Suspense } from "react";
import { StaticCollectionView } from "@/components/static-collection-view";
import { getStaticCollectionPaintings } from "@/lib/static-data";
export default function Page() { return <Suspense fallback={null}><StaticCollectionView paintings={getStaticCollectionPaintings()} /></Suspense>; }
