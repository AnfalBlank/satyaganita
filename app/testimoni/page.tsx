import { TestimonialForm } from "@/components/home/TestimonialForm";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Berikan Testimoni | Satya Ganita",
  description: "Bagikan pengalaman Anda bekerja sama dengan Satya Ganita. Masukan Anda sangat berarti bagi kami untuk terus meningkatkan layanan.",
  openGraph: {
    title: "Berikan Testimoni | Satya Ganita",
    description: "Bagikan pengalaman Anda bekerja sama dengan Satya Ganita.",
    images: [{ url: "https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=2069&auto=format&fit=crop" }],
  }
};

export default function TestimonialPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Suara Anda Berharga</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Kami berkomitmen untuk memberikan layanan terbaik. Testimoni Anda membantu kami tumbuh dan membantu orang lain menemukan solusi yang tepat bagi bisnis mereka.
          </p>
        </div>

        <TestimonialForm />
      </main>

      <Footer />
    </div>
  );
}
