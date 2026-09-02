"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { detailImageUrl } from "@/lib/presentation";
import { withLanguage, type Language } from "@/lib/i18n";

type CarouselPainting = {
  code: string;
  titleZh: string;
  titleFr: string | null;
  titleOriginal?: string;
  artist: { nameZh: string; nameFr: string | null; nameOriginal?: string };
  images: Array<{ relativePath: string; detailStaticPath?: string }>;
};

export function HomeCarousel({ paintings, lang }: { paintings: CarouselPainting[]; lang: Language }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || paintings.length < 2) return;
    const timer = window.setInterval(() => setIndex(current => (current + 1) % paintings.length), 5000);
    return () => window.clearInterval(timer);
  }, [paintings.length, paused, reducedMotion]);

  if (!paintings.length) return null;
  const painting = paintings[index];
  const image = detailImageUrl(painting.images[0]);
  const title = lang === "fr" ? painting.titleFr ?? painting.titleOriginal ?? painting.titleZh : painting.titleZh;
  const artist = lang === "fr" ? painting.artist.nameFr ?? painting.artist.nameOriginal ?? painting.artist.nameZh : painting.artist.nameZh;
  const previous = () => setIndex(current => (current - 1 + paintings.length) % paintings.length);
  const next = () => setIndex(current => (current + 1) % paintings.length);

  return (
    <section className="home-carousel" aria-roledescription="carousel" aria-label={lang === "fr" ? "Œuvres représentatives" : "代表作品轮播"}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
      <Link href={withLanguage(`/artworks/${painting.code}`, lang)} className="home-carousel-artwork">
        <div className="home-carousel-image">
          {image ? <Image key={painting.code} src={image} alt={title} width={1200} height={1500} priority={index === 0}
            sizes="(max-width: 768px) 92vw, 42vw" className="h-full w-full object-contain" /> : null}
        </div>
        <div className="home-carousel-caption" aria-live="polite">
          <span>{painting.code}</span><strong>{title}</strong><small>{artist}</small>
        </div>
      </Link>
      <button type="button" className="carousel-arrow carousel-previous" onClick={previous} aria-label={lang === "fr" ? "Œuvre précédente" : "上一件作品"}>←</button>
      <button type="button" className="carousel-arrow carousel-next" onClick={next} aria-label={lang === "fr" ? "Œuvre suivante" : "下一件作品"}>→</button>
      <div className="carousel-dots" aria-label={lang === "fr" ? "Choisir une œuvre" : "选择作品"}>
        {paintings.map((item, itemIndex) => <button key={item.code} type="button" onClick={() => setIndex(itemIndex)}
          className={itemIndex === index ? "carousel-dot carousel-dot-active" : "carousel-dot"}
          aria-label={`${lang === "fr" ? "Afficher" : "查看"} ${item.code}`} aria-current={itemIndex === index ? "true" : undefined} />)}
      </div>
    </section>
  );
}
