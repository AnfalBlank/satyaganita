import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paket Layanan Strategis | Satya Ganita",
  description: "Daftar paket layanan konsultasi pajak dan manajemen untuk UMKM dan perusahaan menengah dengan harga terjangkau dan hasil maksimal.",
  openGraph: {
    title: "Investasi Bisnis Cerdas Bersama Satya Ganita | Paket Layanan",
    description: "Pilih paket Starter, Growth, atau Corporate sesuai skala dan profil kebutuhan bisnis Anda.",
    url: "https://satyaganita.co.id/paket",
    images: [
      {
        url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "Paket Layanan Satya Ganita",
      },
    ],
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
