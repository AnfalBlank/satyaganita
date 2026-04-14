import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { CTASection } from '@/components/home/CTASection'
import { FileSearch, ShieldCheck, ListChecks, History, BookOpen, Briefcase, Scale, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AuditCompliancePage() {
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
                  Kepatuhan Tanpa Celah
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-8 leading-tight tracking-tight">
                Audit & Compliance: <br />
                <span className="text-accent underline underline-offset-8 decoration-[3px]">Mitigasi Risiko.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
                Memastikan setiap aspek keuangan dan operasional bisnis Anda selalu sesuai dengan regulasi yang berlaku melalui proses review yang teliti dan mendalam.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold px-10 h-16">
                  <Link href="https://wa.me/6281120192076?text=Halo%20Satya%20Ganita%20Advisor%2C%20saya%20memerlukan%20bantuan%20untuk%20persiapan%20Audit%20%26%20Compliance.">Konsultasi Kepatuhan</Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full border-primary text-primary hover:bg-primary/5 px-10 h-16">
                  Checklist Kesiapan Audit
                </Button>
              </div>
            </div>
            <div className="w-full md:w-2/5">
              <div className="aspect-square bg-white rounded-[3rem] shadow-2xl p-12 flex flex-col items-center justify-center text-center relative border border-muted">
                <FileSearch className="h-24 w-24 text-accent mb-8" />
                <h3 className="text-3xl font-bold text-primary mb-4">Audit Ready</h3>
                <p className="text-muted-foreground">Persiapan matang untuk menghadapi segala bentuk pemeriksaan audit.</p>
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
                { title: 'Persiapan Audit Eksternal', desc: 'Pendampingan dan penyiapan dokumen dalam menghadapi pemeriksaan audit dari kantor akuntan publik.', icon: <Briefcase className="h-8 w-8 text-primary" /> },
                { title: 'Audit Kepatuhan Pajak', desc: 'Analisis mendalam untuk memastikan seluruh pelaporan pajak telah sesuai regulasi PMK terbaru.', icon: <Scale className="h-8 w-8 text-primary" /> },
                { title: 'Review Risiko Operasional', desc: 'Identifikasi potensi risiko finansial dan operasional yang dapat merugikan perusahaan.', icon: <AlertCircle className="h-8 w-8 text-primary" /> },
                { title: 'Verifikasi Aset & Inventaris', desc: 'Audit fisik dan pencocokan data aset tetap untuk menjaga nilai kekayaan perusahaan.', icon: <ListChecks className="h-8 w-8 text-primary" /> },
                { title: 'Audit Laporan Keuangan Internal', desc: 'Pemeriksaan integritas laporan keuangan bulanan untuk keperluan manajemen.', icon: <History className="h-8 w-8 text-primary" /> },
                { title: 'Edukasi Regulasi Baru', desc: 'Update berkala mengenai perubahan undang-undang dan aturan perpajakan terbaru.', icon: <BookOpen className="h-8 w-8 text-primary" /> },
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

      {/* Methodology Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Alur Kerja Kepatuhan Kami</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">Kami mengedepankan akurasi dan ketelitian dalam setiap langkah audit.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              { step: '01', title: 'Data Collection', desc: 'Pengumpulan seluruh data transaksi dan bukti pendukung.' },
              { step: '02', title: 'Verification', desc: 'Pemeriksaan keabsahan dokumen dan kalkulasi angka.' },
              { step: '03', title: 'Gap Analysis', desc: 'Identifikasi ketidaksesuaian antara data dan regulasi.' },
              { step: '04', title: 'Action Plan', desc: 'Rekomendasi perbaikan dan strategi pencegahan risiko.' },
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                 <div className="h-16 w-16 rounded-full bg-accent text-primary font-bold text-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,193,7,0.3)]">
                    {step.step}
                 </div>
                 <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                 <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
           <div className="bg-secondary/30 rounded-[3rem] p-12 md:p-20 relative border border-accent">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                 <div className="w-full lg:w-1/2">
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mb-8">Ketenangan Pikiran untuk Pemilik Bisnis.</h2>
                    <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                       Dengan Satya Ganita, Anda tidak perlu lagi khawatir dengan pemeriksaan mendadak atau risiko sanksi administratif. Tim kami memastikan setiap angka dalam pembukuan Anda memiliki dasar yang kuat dan dapat dipertanggungjawabkan.
                    </p>
                    <div className="flex items-center gap-6">
                       <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <ShieldCheck className="h-6 w-6" />
                       </div>
                       <p className="font-bold text-primary">Managed by PT. Ayem Tentrem Angremboko</p>
                    </div>
                 </div>
                 <div className="w-full lg:w-1/2">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-8 bg-white rounded-3xl shadow-lg text-center transform hover:-rotate-3 transition-transform">
                          <h4 className="text-4xl font-bold text-primary mb-2">0%</h4>
                          <p className="text-sm text-muted-foreground uppercase font-bold tracking-tighter">Sanksi Denda</p>
                       </div>
                       <div className="p-8 bg-white rounded-3xl shadow-lg text-center transform translate-y-8 hover:rotate-3 transition-transform">
                          <h4 className="text-4xl font-bold text-primary mb-2">100%</h4>
                          <p className="text-sm text-muted-foreground uppercase font-bold tracking-tighter">Compliant</p>
                       </div>
                    </div>
                 </div>
              </div>
              {/* Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
           </div>
        </div>
      </section>

      <CTASection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
