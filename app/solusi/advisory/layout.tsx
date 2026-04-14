import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Advisory & Growth | Satya Ganita",
  description: "Layanan pendampingan manajemen bisnis strategis untuk efisiensi biaya, penguatan kontrol internal, dan peningkatan profitabilitas yang berkelanjutan.",
  openGraph: {
    title: "Strategic Business Advisory | Satya Ganita",
    description: "Partner strategis UMKM untuk pertumbuhan terukur, efisiensi biaya, dan manajemen arus kas.",
    url: "https://satyaganita.co.id/solusi/advisory",
    images: [
      {
        url: "https://images.unsplash.com/photo-1454165833762-02e5060f10d5?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "Business Advisory Satya Ganita",
      },
    ],
  },
};

export default function AdvisoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
