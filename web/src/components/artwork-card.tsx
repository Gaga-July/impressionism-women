import Link from "next/link";
import Image from "next/image";
import { cardImageUrl } from "@/lib/presentation";
import { primarySpaceLabel, type Language } from "@/lib/i18n";
import { frenchRole } from "@/lib/french";

type ArtworkCardProps = {
  painting: {
    code: string; titleZh: string; titleFr: string | null; titleOriginal?: string; dateDisplay: string;
    primarySpaceClassification: string; images: { relativePath: string; cardStaticPath?: string }[];
    artist: { nameZh: string; nameFr: string; nameOriginal?: string };
    socialRoles?: { socialRole: { nameZh: string } }[];
  };
};

export function ArtworkCard({ painting, lang = "zh", collectionHref }: ArtworkCardProps & { lang?: Language; collectionHref?: string }) {
  const image = cardImageUrl(painting.images[0]);
  const detailParams = new URLSearchParams();
  if (lang === "fr") detailParams.set("lang", "fr");
  if (collectionHref) detailParams.set("from", collectionHref);
  const detailHref = detailParams.size ? `/artworks/${painting.code}?${detailParams.toString()}` : `/artworks/${painting.code}`;
  return (
    <article className="artwork-card group overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]">
      <Link href={detailHref} className="block">
        <div className="image-frame aspect-[4/3] bg-[var(--accent-soft)]">
          {image ? <Image src={image} alt={painting.titleZh} width={800} height={600} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center px-5 text-center text-sm text-[var(--text-secondary)]">暂未关联图片<br />Image à venir</div>}
        </div>
        <div className="space-y-2.5 p-5">
          <p className="text-xs tracking-[0.12em] text-[var(--text-tertiary)]">{painting.code}</p>
          <h2 className="font-medium text-[var(--text-primary)]">{lang === "fr" ? painting.titleFr ?? painting.titleOriginal ?? painting.titleZh : painting.titleZh}</h2>
          {lang === "zh" && painting.titleFr && <p className="line-clamp-1 text-sm italic text-[var(--text-secondary)]">{painting.titleFr}</p>}
          <p className="text-sm text-[var(--text-secondary)]">{lang === "fr" ? painting.artist.nameFr ?? painting.artist.nameOriginal ?? painting.artist.nameZh : painting.artist.nameZh} · {painting.dateDisplay}</p>
          <div className="flex flex-wrap gap-1.5"><span className="chip">{primarySpaceLabel(painting.primarySpaceClassification, lang)}</span>{painting.socialRoles?.slice(0, 2).map(({ socialRole }) => <span className="chip chip-muted" key={socialRole.nameZh}>{lang === "fr" ? frenchRole(socialRole.nameZh) : socialRole.nameZh}</span>)}</div>
        </div>
      </Link>
    </article>
  );
}
