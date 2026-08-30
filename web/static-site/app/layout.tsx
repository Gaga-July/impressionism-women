import type { Metadata } from "next";
import { PublicRootLayout } from "@/components/public-root-layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "印象派女性题材视觉数据库",
  description: "Base de données visuelle sur les femmes dans l'impressionnisme",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <PublicRootLayout>{children}</PublicRootLayout>;
}
