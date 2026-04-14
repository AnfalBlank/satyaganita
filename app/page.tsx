import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { Hero } from '@/components/home/Hero'
import { TrustBar } from '@/components/home/TrustBar'
import { ProblemSection } from '@/components/home/ProblemSection'
import { SolutionSection } from '@/components/home/SolutionSection'
import { TestimonialSection } from '@/components/home/TestimonialSection'
import { CTASection } from '@/components/home/CTASection'
import { FAQSection } from '@/components/home/FAQSection'
import { ComparisonSection } from '@/components/home/ComparisonSection'
import { GuaranteeSection } from '@/components/home/GuaranteeSection'
import { CheckCircle2, Award, Zap, Shield, Users, Landmark } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <TrustBar />
      <ProblemSection />
      
      {/* Keunggulan Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-[2px] w-6 bg-accent" />
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                  Mengapa Kami?
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-8 leading-tight">
                Partner Strategis, Bukan Sekadar Administrasi.
              </h2>
              <div className="space-y-8">
                {[
                  { title: 'Pendekatan Strategis', desc: 'Kami membantu Anda merumuskan kebijakan fiskal yang mendukung pertumbuhan jangka panjang.', icon: <Zap className="h-6 w-6 text-accent" /> },
                  { title: 'Update Regulasi Terbaru', desc: 'Memastikan bisnis Anda selalu patuh terhadap perubahan aturan perpajakan di Indonesia.', icon: <Landmark className="h-6 w-6 text-accent" /> },
                  { title: 'Tim Profesional & Berpengalaman', desc: 'Dipimpin oleh tenaga ahli yang bersertifikasi dan berpengalaman di berbagai sektor industri.', icon: <Award className="h-6 w-6 text-accent" /> },
                  { title: 'Sistem Digital Terintegrasi', desc: 'Digitalisasi sistem pelaporan untuk efisiensi, transparansi, dan kontrol penuh.', icon: <Zap className="h-6 w-6 text-accent" /> },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="shrink-0 p-3 rounded-2xl bg-secondary/50 h-fit">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-primary mb-2 tracking-tight">{item.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
               <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10">
                 <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000" 
                    alt="Tim Satya Ganita"
                    className="w-full h-full object-cover"
                 />
               </div>
               {/* Decorative elements */}
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent rounded-3xl -z-0" />
               <div className="absolute -top-10 -right-10 w-64 h-64 border-2 border-muted rounded-full -z-0" />
            </div>
          </div>
        </div>
      </section>

      <SolutionSection />
      <ComparisonSection />
      <GuaranteeSection />
      <FAQSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
