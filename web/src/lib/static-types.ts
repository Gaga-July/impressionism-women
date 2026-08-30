export const STATIC_DATA_SCHEMA_VERSION = 1 as const;

export type StaticArtistSummary = {
  code: string;
  nameOriginal: string;
  nameZh: string;
  nameFr: string;
  birthYear: number | null;
  deathYear: number | null;
};

export type StaticNamedValue = {
  code: string;
  nameZh: string;
  nameFr: string | null;
};

export type StaticSpace = StaticNamedValue & {
  parentCode: string | null;
  isPrimary: boolean;
};

export type StaticImage = {
  relativePath: string;
  originalFilename: string;
  mimeType: string | null;
  altZh: string | null;
  altFr: string | null;
  credit: string | null;
  rightsStatement: string | null;
  isPrimary: boolean;
  sortOrder: number;
  detailStaticPath?: string;
  cardStaticPath?: string;
};

export type StaticSource = {
  label: string;
};

export type StaticPainting = {
  code: string;
  titleOriginal: string;
  titleZh: string;
  titleFr: string | null;
  dateDisplay: string;
  yearStart: number | null;
  yearEnd: number | null;
  mediumOriginal: string | null;
  mediumZh: string | null;
  mediumFr: string | null;
  dimensions: string | null;
  collectionOriginal: string | null;
  collectionZh: string | null;
  collectionFr: string | null;
  primarySpaceClassification: string;
  verificationStatus: string;
  artist: StaticArtistSummary;
  spaces: StaticSpace[];
  socialRoles: StaticNamedValue[];
  socialClasses: StaticNamedValue[];
  personRelations: StaticNamedValue[];
  tags: StaticNamedValue[];
  images: StaticImage[];
  sources: StaticSource[];
  relatedArtworkCodes: string[];
};

export type StaticArtist = StaticArtistSummary & {
  biographyZh: string | null;
  biographyFr: string | null;
  paintingCodes: string[];
};

export type StaticSiteSummary = {
  dataSchemaVersion: typeof STATIC_DATA_SCHEMA_VERSION;
  generatedAt: string;
  paintingCount: number;
  artistCount: number;
  imageCount: number;
  artworkCodeReservationCount: number;
  artworkCodeReservations: Array<{ code: string; reason: string }>;
};

export type StaticImageManifestEntry = {
  artworkCode: string;
  imageIndex: number;
  sourceRelativePath: string;
  detailStaticPath: string;
  cardStaticPath: string;
  sourceWidth: number;
  sourceHeight: number;
  detailWidth: number;
  detailHeight: number;
  cardWidth: number;
  cardHeight: number;
  sourceBytes: number;
  detailBytes: number;
  cardBytes: number;
  sourceSha256: string;
};
