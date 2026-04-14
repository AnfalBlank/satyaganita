import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { CTASection } from '@/components/home/CTASection'
import { CheckCircle2, ShieldCheck, ClipboardList, Scale, Briefcase, FileSearch } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function TaxSolutionPage() {
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
                  Layanan Perpajakan
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-8 leading-tight tracking-tight">
                Tax Care Program: <br />
                <span className="text-accent underline underline-offset-8 decoration-[3px]">Kepatuhan Maksimal.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
                Layanan pendampingan pajak menyeluruh mulai dari konsultasi strategis, pelaporan rutin, hingga persiapan audit demi memastikan bisnis Anda tetap aman dan berkembang.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold px-10 h-16">
                  <Link href="https://wa.me/6281120192076?text=Halo%20Satya%20Ganita%20Advisor%2C%20saya%20tertarik%20dengan%20layanan%20Konsultasi%20%26%20Pelaporan%20Pajak.">Mulai Konsultasi</Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full border-primary text-primary hover:bg-primary/5 px-10 h-16">
                  Unduh Katalog Layanan
                </Button>
              </div>
            </div>
            <div className="w-full md:w-2/5">
              <div className="aspect-square bg-white rounded-[3rem] shadow-2xl p-12 flex flex-col items-center justify-center text-center relative border border-muted">
                <ShieldCheck className="h-24 w-24 text-accent mb-8 animate-bounce duration-[3000ms]" />
                <h3 className="text-3xl font-bold text-primary mb-4">100% Compliance</h3>
                <p className="text-muted-foreground">Kami memastikan setiap pelaporan sesuai dengan regulasi terbaru PMK & UU HPP.</p>
                {/* Decoration */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature List */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Konsultasi Pajak Rutin', desc: 'Diskusi mendalam mengenai kewajiban pajak bulanan dan tahunan perusahaan Anda.', icon: <ClipboardList className="h-8 w-8 text-primary" /> },
                { title: 'Pelaporan SPT Masa & Tahunan', desc: 'Pemrosesan dan pelaporan SPT PPh 21, 23, 25, PPN, dan SPT Tahunan Badan.', icon: <Scale className="h-8 w-8 text-primary" /> },
                { title: 'Tax Planning Strategy', desc: 'Strategi efisiensi beban pajak secara legal dan terstruktur.', icon: <Briefcase className="h-8 w-8 text-primary" /> },
                { title: 'Persiapan Audit Pajak', desc: 'Pendampingan dan penyiapan dokumen dalam menghadapi pemeriksaan pajak.', icon: <FileSearch className="h-8 w-8 text-primary" /> },
                { title: 'Review Kepatuhan Pajak', desc: 'Analisis menyeluruh terhadap pelaporan pajak masa lalu untuk meminimalisir risiko.', icon: <ShieldCheck className="h-8 w-8 text-primary" /> },
                { title: 'Restitusi Pajak', desc: 'Pendampingan dalam proses pengajuan pengembalian kelebihan bayar pajak.', icon: <CheckCircle2 className="h-8 w-8 text-primary" /> },
              ].map((service, idx) => (
                <div key={idx} className="p-10 rounded-3xl bg-secondary/30 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-accent">
                   <div className="mb-6">{service.icon}</div>
                   <h4 className="text-xl font-bold text-primary mb-4 tracking-tight">{service.title}</h4>
                   <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Bagaimana Kami Bekerja?</h2>
            <p className="text-white/60 text-lg">Proses terstruktur untuk hasil yang akurat dan tepat waktu.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2 z-0" />
            
            {[
              { step: '01', title: 'Assesment', desc: 'Analisis kondisi keuangan dan kewajiban pajak awal.' },
              { step: '02', title: 'Strategy', desc: 'Penyusunan rencana kerja dan timeline pelaporan.' },
              { step: '03', title: 'Execution', desc: 'Pemrosesan data keuangan dan pelaporan sistematis.' },
              { step: '04', title: 'Review', desc: 'Evaluasi berkala dan penyesuaian strategi.' },
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                 <div className="h-16 w-16 rounded-full bg-accent text-primary font-bold text-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {step.step}
                 </div>
                 <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                 <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
