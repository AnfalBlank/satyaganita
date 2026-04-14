import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami | Satya Ganita",
  description: "Profil Satya Ganita (PT. Ayem Tentrem Angremboko), partner strategis untuk solusi pajak, digitalisasi, dan manajemen bisnis modern.",
  openGraph: {
    title: "Tentang Kami Satya Ganita | Visi & Misi",
    description: "Kenali lebih dalam mengenai nilai-nilai, integritas, dan inovasi yang mendorong layanan kami.",
    url: "https://satyaganita.co.id/tentang-kami",
    images: [
      {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "Satya Ganita Office",
      },
    ],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
