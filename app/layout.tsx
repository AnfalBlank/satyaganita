import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Satya Ganita | Pajak Tertib. Bisnis Tumbuh.",
  description: "Satya Ganita mendampingi UMKM dan perusahaan menengah dalam pengelolaan pajak, digitalisasi sistem keuangan, dan peningkatan performa manajemen secara strategis.",
  icons: {
    icon: [
      { url: "/logo-v2.png", type: "image/png" },
    ],
    apple: "/logo-v2.png",
    shortcut: "/logo-v2.png",
  },
  openGraph: {
    title: "Satya Ganita | Konsultan Pajak & Manajemen Bisnis",
    description: "Pendampingan UMKM dan perusahaan menengah dalam pengelolaan pajak, digitalisasi sistem keuangan, dan strategi bisnis.",
    url: "https://satyaganita.co.id",
    siteName: "Satya Ganita",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Satya Ganita Business Consulting",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Satya Ganita | Pajak Tertib. Bisnis Tumbuh.",
    description: "Partner Strategis UMKM untuk Pajak dan Manajemen Keuangan.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}

