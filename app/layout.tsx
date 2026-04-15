import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
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
  metadataBase: new URL("https://satyaganita.id"),
  title: {
    default: "Satya Ganita | Konsultan Pajak & Manajemen Bisnis",
    template: "%s | Satya Ganita",
  },
  description: "Satya Ganita adalah mitra strategis konsultan pajak dan manajemen bisnis untuk UMKM dan perusahaan menengah di Indonesia. Layanan pengelolaan pajak, digitalisasi sistem keuangan, dan peningkatan performa manajemen secara strategis.",
  keywords: [
    "konsultan pajak", "konsultan pajak jakarta", "jasa konsultan pajak",
    "pajak UMKM", "pelaporan pajak", "tax planning", "tax compliance indonesia",
    "digitalisasi pembukuan", "konsultan manajemen bisnis", "pajak tertib",
    "bisnis tumbuh", "Satya Ganita", "advisor solution",
    "pendampingan pajak", "audit pajak", "konsultasi pajak gratis",
  ],
  authors: [{ name: "Satya Ganita Advisor Solution" }],
  creator: "Satya Ganita",
  publisher: "PT. AYEM TENTREM ANGREMBOKO",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://satyaganita.id",
  },
  openGraph: {
    title: "Satya Ganita | Konsultan Pajak & Manajemen Bisnis",
    description: "Mitra strategis konsultan pajak dan manajemen bisnis. Pendampingan UMKM dan perusahaan menengah untuk pengelolaan pajak, digitalisasi sistem keuangan, dan strategi bisnis.",
    url: "https://satyaganita.id",
    siteName: "Satya Ganita",
    images: [
      {
        url: "https://images.unsplash.com/photo-1565688527174-775059ac429c?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "Satya Ganita - Konsultan Pajak & Manajemen Bisnis",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Satya Ganita | Konsultan Pajak & Manajemen Bisnis",
    description: "Mitra strategis UMKM untuk pengelolaan pajak, digitalisasi keuangan, dan manajemen bisnis.",
    images: ["https://images.unsplash.com/photo-1565688527174-775059ac429c?auto=format&fit=crop&q=80&w=1200&h=630"],
  },
  verification: {
    google: "google-site-verification=PLACEHOLDER",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Satya Ganita Advisor Solution",
              description: "Konsultan pajak dan manajemen bisnis untuk UMKM dan perusahaan menengah di Indonesia.",
              url: "https://satyaganita.id",
              logo: "https://satyaganita.id/logo.png",
              image: "https://images.unsplash.com/photo-1565688527174-775059ac429c?auto=format&fit=crop&q=80&w=1200&h=630",
              telephone: "+6281120192076",
              email: "admin@satyaganita.id",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Menara Cakrawala Lt. 12, Unit 05A, Jl. MH. Thamrin No. 9",
                addressLocality: "Jakarta Pusat",
                addressRegion: "DKI Jakarta",
                postalCode: "10340",
                addressCountry: "ID",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -6.1861,
                longitude: 106.8346,
              },
              areaServed: {
                "@type": "Country",
                name: "Indonesia",
              },
              serviceType: ["Konsultan Pajak", "Digitalisasi Pembukuan", "Advisory Manajemen", "Tax Planning", "Tax Compliance"],
              priceRange: "$$",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "08:00",
                closes: "17:00",
              },
              sameAs: [],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "100",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
