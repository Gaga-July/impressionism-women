import paintingsJson from "../../generated/static-data/paintings.json";
import artistsJson from "../../generated/static-data/artists.json";
import summaryJson from "../../generated/static-data/site-summary.json";
import imageManifestJson from "../../generated/static-data/image-manifest.json";
import type { StaticArtist, StaticImage, StaticImageManifestEntry, StaticNamedValue, StaticPainting, StaticSiteSummary, StaticSpace } from "@/lib/static-types";

const imageBySource = new Map((imageManifestJson.images as StaticImageManifestEntry[]).map(image => [image.sourceRelativePath, image]));

type StaticPublishedImage = StaticImage & { detailStaticPath: string; cardStaticPath: string };
export type PublicPainting = Omit<StaticPainting, "socialRoles" | "spaces" | "images"> & { id: number; images: StaticPublishedImage[];
  socialRoles: Array<{ socialRole: StaticNamedValue }>;
  spaces: Array<{ spaceCategory: StaticSpace & { parent: { code: string } | null } }>;
};
export type CollectionPainting = PublicPainting;

const paintings: PublicPainting[] = (paintingsJson as StaticPainting[]).map((painting, index) => ({
  ...painting,
  id: index + 1,
  images: painting.images.map(image => {
    const manifest = imageBySource.get(image.relativePath);
    if (!manifest) throw new Error(`Static image manifest entry missing: ${image.relativePath}`);
    return { ...image, detailStaticPath: manifest.detailStaticPath, cardStaticPath: manifest.cardStaticPath };
  }),
  socialRoles: painting.socialRoles.map(socialRole => ({ socialRole })),
  spaces: painting.spaces.map(spaceCategory => ({ spaceCategory: { ...spaceCategory, parent: spaceCategory.parentCode ? { code: spaceCategory.parentCode } : null } })),
}));
const paintingByCode = new Map(paintings.map(painting => [painting.code, painting]));
const artists = artistsJson as StaticArtist[];
const artistByCode = new Map(artists.map(artist => [artist.code, artist]));

export function getStaticPaintings() { return paintings; }
export function getStaticPaintingByCode(code: string) { return paintingByCode.get(code) ?? null; }
export function getStaticArtists() { return artists; }
export function getStaticArtistByCode(code: string) {
  const artist = artistByCode.get(code);
  return artist ? { ...artist, paintings: artist.paintingCodes.map(item => paintingByCode.get(item)).filter((painting): painting is PublicPainting => painting !== undefined) } : null;
}
export function getStaticRelatedPaintings(painting: PublicPainting) {
  return painting.relatedArtworkCodes.map(code => paintingByCode.get(code)).filter((item): item is PublicPainting => item !== undefined);
}
export function getStaticSiteSummary() { return summaryJson as StaticSiteSummary; }
export function getStaticFeaturedPaintings() { return paintings.slice(0, 6); }
export function getStaticCollectionPaintings(): CollectionPainting[] {
  return paintings;
}
