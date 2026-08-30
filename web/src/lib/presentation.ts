export const spaceLabels: Record<string, string> = { PUBLIC: "公共空间", PRIVATE: "私人空间", BOUNDARY: "边界／阈限空间", UNKNOWN: "其他／待研究" };

export function withBasePath(value: string) {
  if (!value || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)) return value;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim().replace(/\/+$/, "") ?? "";
  const pathname = value.startsWith("/") ? value : `/${value}`;
  return basePath && !pathname.startsWith(`${basePath}/`) && pathname !== basePath ? `${basePath}${pathname}` : pathname;
}

export function imageUrl(relativePath?: string) {
  if (!relativePath) return null;
  const encodedPath = relativePath.split("/").map(encodeURIComponent).join("/");
  const ossBase = process.env.NEXT_PUBLIC_OSS_IMAGE_BASE_URL?.trim().replace(/\/+$/, "");
  return ossBase ? `${ossBase}/${encodedPath}` : `/images/${encodedPath}`;
}

export function cardImageUrl(image?: { relativePath: string; cardStaticPath?: string }) {
  return image?.cardStaticPath ? withBasePath(image.cardStaticPath) : imageUrl(image?.relativePath);
}

export function detailImageUrl(image?: { relativePath: string; detailStaticPath?: string }) {
  return image?.detailStaticPath ? withBasePath(image.detailStaticPath) : imageUrl(image?.relativePath);
}
