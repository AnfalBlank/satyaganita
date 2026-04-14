import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Konsultasi Gratis | Satya Ganita",
  description: "Jadwalkan konsultasi awal gratis dengan tim ahli kami untuk kebutuhan pajak, pembukuan digital, dan manajemen bisnis Anda.",
  openGraph: {
    title: "Konsultasi Gratis Satya Ganita | Mulai Kerjasama Strategis",
    description: "Hubungi kami hari ini untuk diskusi mendalam mengenai tantangan bisnis Anda. Respon cepat 1x24 jam kerja.",
    url: "https://satyaganita.co.id/konsultasi",
    images: [
      {
        url: "https://images.unsplash.com/photo-1565688527174-775059ac429c?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "Konsultasi Satya Ganita",
      },
    ],
  },
};

export default function ConsultationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
