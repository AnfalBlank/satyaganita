import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layanan Perpajakan (Tax Care) | Satya Ganita",
  description: "Layanan pendampingan pajak menyeluruh mulai dari konsultasi strategis, pelaporan rutin, hingga persiapan audit demi memastikan bisnis Anda tetap aman dan berkembang.",
  openGraph: {
    title: "Tax Care Program Satya Ganita | Kepatuhan Pajak Maksimal",
    description: "Pendampingan pajak profesional untuk UMKM dan Perusahaan. Pelaporan SPT, Tax Planning, dan Mitigasi Risiko Pajak.",
    url: "https://satyaganita.co.id/solusi/pajak",
    images: [
      {
        url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "Layanan Pajak Satya Ganita",
      },
    ],
  },
};

export default function TaxLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
