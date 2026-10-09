import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Educação Física | Sagrado",
  description: "Sua plataforma de estudo para Educação Física no ENEM.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
