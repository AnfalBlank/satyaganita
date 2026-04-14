import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Tax & Accounting | Satya Ganita",
  description: "Implementasi sistem pembukuan dan kepatuhan pajak berbasis digital yang terintegrasi untuk kendali penuh data keuangan secara real-time.",
  openGraph: {
    title: "Digitalisasi Pembukuan & Pajak | Satya Ganita",
    description: "Transformasi keuangan bisnis Anda dengan sistem cloud integrated yang modern, akurat, dan transparan.",
    url: "https://satyaganita.co.id/solusi/digitalisasi",
    images: [
      {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "Digital Accounting Satya Ganita",
      },
    ],
  },
};

export default function DigitalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
