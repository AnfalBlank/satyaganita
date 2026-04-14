import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { CTASection } from '@/components/home/CTASection'
import { TrendingUp, BarChart3, Users, Target, PieChart, Zap, Rocket, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function BusinessAdvisoryPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Solution Header */}
      <section className="pt-48 pb-32 bg-secondary/50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-3/5">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-[2px] w-8 bg-primary" />
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs md:text-sm">
                  Mitra Strategis Bisnis
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-8 leading-tight tracking-tight">
                Business Advisory: <br />
                <span className="text-accent underline underline-offset-8 decoration-[3px]">Tumbuh Terukur.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
                Layanan pendampingan manajemen bisnis strategis untuk efisiensi biaya, penguatan kontrol internal, dan peningkatan profitabilitas yang berkelanjutan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold px-10 h-16">
                  <Link href="https://wa.me/6281120192076?text=Halo%20Satya%20Ganita%20Advisor%2C%20saya%20ingin%20berkonsultasi%20mengenai%20Advisory%20Manajemen%20untuk%20perusahaan%20saya.">Jadwalkan Sesi Advisory</Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full border-primary text-primary hover:bg-primary/5 px-10 h-16">
                  Lihat Studi Kasus
                </Button>
              </div>
            </div>
            <div className="w-full md:w-2/5">
              <div className="aspect-square bg-white rounded-[3rem] shadow-2xl p-12 flex flex-col items-center justify-center text-center relative border border-muted">
                <TrendingUp className="h-24 w-24 text-accent mb-8" />
                <h3 className="text-3xl font-bold text-primary mb-4">Strategic Growth</h3>
                <p className="text-muted-foreground">Mengarahkan bisnis Anda menuju performa puncak melalui analisis tajam.</p>
                <div className="absolute top-10 right-10 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Efisiensi Biaya (Cost Control)', desc: 'Analisis struktur biaya dan identifikasi area penghematan operasional.', icon: <Zap className="h-8 w-8 text-primary" /> },
                { title: 'Penguatan Kontrol Internal', desc: 'SOP dan sistem kontrol untuk meminimalkan risiko kecurangan dan inefisiensi.', icon: <ShieldCheck className="h-8 w-8 text-primary" /> },
                { title: 'Optimasi Profitabilitas', desc: 'Strategi peningkatan profit melalui analisis margin dan performa produk.', icon: <TrendingUp className="h-8 w-8 text-primary" /> },
                { title: 'Manajemen Arus Kas', desc: 'Perencanaan dan monitoring cash flow agar likuiditas tetap terjaga.', icon: <PieChart className="h-8 w-8 text-primary" /> },
                { title: 'Budgeting & Forecasting', desc: 'Penyusunan anggaran tahunan dan proyeksi keuangan masa depan.', icon: <BarChart3 className="h-8 w-8 text-primary" /> },
                { title: 'Analisis Kelayakan Bisnis', desc: 'Evaluasi mendalam untuk ekspansi atau peluncuran produk baru.', icon: <Target className="h-8 w-8 text-primary" /> },
                { title: 'Penyusunan SOP Keuangan', desc: 'Dokumentasi standar operasional untuk konsistensi kerja tim.', icon: <Users className="h-8 w-8 text-primary" /> },
                { title: 'Restrukturisasi Bisnis', desc: 'Pembenahan struktur organisasi dan alur kerja untuk performa lebih baik.', icon: <Rocket className="h-8 w-8 text-primary" /> },
              ].map((service, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-secondary/30 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-accent">
                   <div className="mb-6">{service.icon}</div>
                   <h4 className="text-lg font-bold text-primary mb-3 tracking-tight">{service.title}</h4>
                   <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
               <div className="relative p-1 bg-white rounded-[3rem] shadow-xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" alt="Strategy Session" className="rounded-[3rem] w-full h-[400px] object-cover" />
               </div>
            </div>
            <div className="w-full md:w-1/2">
               <h2 className="text-3xl md:text-5xl font-bold text-primary mb-8 leading-tight">Pendekatan <br /> Konsultatif Kami</h2>
               <div className="space-y-12">
                  <div className="flex gap-6">
                     <span className="text-5xl font-bold text-accent/30 italic">01.</span>
                     <div>
                        <h4 className="text-xl font-bold text-primary mb-2">Identifikasi Akar Masalah</h4>
                        <p className="text-muted-foreground">Kami tidak hanya melihat gejala, tapi mencari penyebab utama inefisiensi dalam bisnis Anda.</p>
                     </div>
                  </div>
                  <div className="flex gap-6">
                     <span className="text-5xl font-bold text-accent/30 italic">02.</span>
                     <div>
                        <h4 className="text-xl font-bold text-primary mb-2">Solusi Tailor-Made</h4>
                        <p className="text-muted-foreground">Setiap bisnis unik. Kami memberikan rekomendasi strategi yang khusus dirancang untuk situasi Anda.</p>
                     </div>
                  </div>
                  <div className="flex gap-6">
                     <span className="text-5xl font-bold text-accent/30 italic">03.</span>
                     <div>
                        <h4 className="text-xl font-bold text-primary mb-2">Implementasi & Monitoring</h4>
                        <p className="text-muted-foreground">Kami mendampingi proses eksekusi strategi hingga menunjukkan hasil nyata pada laporan keuangan.</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
