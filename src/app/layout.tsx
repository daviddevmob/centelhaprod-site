import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "CentelhaProd",
  description: "Transformando eventos em narrativas visuais.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "CentelhaProd",
    description: "Transformando eventos em narrativas visuais.",
    url: "https://centelha.com.br", // Replace with real domain when deployed
    siteName: "CentelhaProd",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "CentelhaProd Logo",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${syne.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
