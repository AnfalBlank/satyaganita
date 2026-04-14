import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Updates | Satya Ganita",
  description: "Update regulasi terbaru, strategi manajemen keuangan, dan tips praktis perpajakan untuk pertumbuhan bisnis Anda.",
  openGraph: {
    title: "Satya Ganita Insights | Update Bisnis & Pajak",
    description: "Kumpulan artikel dan panduan strategis seputar pajak dan manajemen bisnis untuk UMKM dan perusahaan.",
    url: "https://satyaganita.co.id/insights",
    siteName: "Satya Ganita",
    images: [
      {
        url: "https://images.unsplash.com/photo-1565688527174-775059ac429c?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "Satya Ganita Insights",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
