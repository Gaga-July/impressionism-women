import type { Metadata } from "next";
import "../../src/app/globals.css";
export const metadata: Metadata = { title: "印象派女性题材视觉数据库", description: "Base de données visuelle sur les femmes dans l'impressionnisme" };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="zh-CN" className="h-full antialiased"><body className="min-h-full flex flex-col">{children}</body></html>; }
