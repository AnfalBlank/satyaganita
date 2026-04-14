import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audit & Compliance | Satya Ganita",
  description: "Memastikan setiap aspek keuangan dan operasional bisnis Anda selalu sesuai dengan regulasi yang berlaku melalui mitigasi risiko.",
  openGraph: {
    title: "Mitigasi Risiko & Audit Readiness | Satya Ganita",
    description: "Persiapan audit eksternal, review risiko operasional, dan kepatuhan pajak tanpa celah.",
    url: "https://satyaganita.co.id/solusi/audit",
    images: [
      {
        url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "Audit & Compliance Satya Ganita",
      },
    ],
  },
};

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
