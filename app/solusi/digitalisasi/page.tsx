import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { CTASection } from '@/components/home/CTASection'
import { Cloud, Database, LineChart, Smartphone, Settings, RefreshCw, Layers, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DigitalAccountingPage() {
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
                  Transformasi Keuangan
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-8 leading-tight tracking-tight">
                Digital Tax & Accounting: <br />
                <span className="text-accent underline underline-offset-8 decoration-[3px]">Sistem Modern.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
                Implementasi sistem pembukuan dan kepatuhan pajak berbasis digital yang terintegrasi, memberikan Anda kendali penuh atas data keuangan secara real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold px-10 h-16">
                  <Link href="https://wa.me/6281120192076?text=Halo%20Satya%20Ganita%20Advisor%2C%20saya%20ingin%20tahu%20lebih%20lanjut%20tentang%20Digitalisasi%20Pembukuan%20bisnis%20saya.">Mulai Digitalisasi</Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full border-primary text-primary hover:bg-primary/5 px-10 h-16">
                  Demo Sistem
                </Button>
              </div>
            </div>
            <div className="w-full md:w-2/5">
              <div className="aspect-square bg-white rounded-[3rem] shadow-2xl p-12 flex flex-col items-center justify-center text-center relative border border-muted">
                <Cloud className="h-24 w-24 text-accent mb-8 animate-pulse" />
                <h3 className="text-3xl font-bold text-primary mb-4">Cloud Integrated</h3>
                <p className="text-muted-foreground">Akses data pembukuan Anda kapan saja, di mana saja dengan aman.</p>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature List */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
           <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Layanan Digitalisasi Kami</h2>
              <p className="text-muted-foreground text-lg">Membangun ekosistem keuangan yang efisien dan transparan untuk bisnis Anda.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Setup Cloud Accounting', desc: 'Pemilihan dan konfigurasi software akuntansi cloud (Xero, Jurnal, QuickBooks) sesuai kebutuhan bisnis.', icon: <Database className="h-8 w-8 text-primary" /> },
                { title: 'Integrasi Sistem Pajak', desc: 'Penyelarasan data pembukuan dengan sistem pelaporan pajak elektronik (e-Faktur, e-Bupot).', icon: <Layers className="h-8 w-8 text-primary" /> },
                { title: 'Dashboard Real-time', desc: 'Visualisasi data keuangan melalui dashboard interaktif untuk pengambilan keputusan cepat.', icon: <LineChart className="h-8 w-8 text-primary" /> },
                { title: 'Otomatisasi Laporan', desc: 'Setting otomatisasi untuk laporan laba rugi, neraca, dan arus kas yang akurat.', icon: <RefreshCw className="h-8 w-8 text-primary" /> },
                { title: 'Training & Support', desc: 'Pelatihan intensif bagi tim internal Anda untuk mengoperasikan sistem baru secara mandiri.', icon: <Monitor className="h-8 w-8 text-primary" /> },
                { title: 'Mobile Accessibility', desc: 'Konfigurasi akses melalui perangkat mobile untuk monitoring keuangan di mana saja.', icon: <Smartphone className="h-8 w-8 text-primary" /> },
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

      {/* Benefits Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
               <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">Mengapa Harus <br /> Berpindah ke Digital?</h2>
               <div className="space-y-6">
                 {[
                   { title: 'Efisiensi Waktu', desc: 'Kurangi pekerjaan manual hingga 70% dengan otomatisasi input data.' },
                   { title: 'Akurasi Data', desc: 'Minimalisir human error dalam pencatatan dan kalkulasi saldo.' },
                   { title: 'Keamanan Tinggi', desc: 'Enkripsi data tingkat tinggi dan backup otomatis di server cloud.' },
                   { title: 'Kepatuhan Otomatis', desc: 'Sistem yang selalu terupdate dengan aturan pajak terbaru.' },
                 ].map((item, idx) => (
                   <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent flex items-center justify-center mt-1">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                        <p className="text-white/60">{item.desc}</p>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
            <div className="w-full lg:w-1/2">
               <div className="relative">
                 <div className="bg-white/10 p-8 rounded-[2rem] border border-white/20 backdrop-blur-sm">
                   <div className="flex items-center gap-4 mb-8">
                      <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
                        <Monitor className="text-primary h-6 w-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-accent">Status Implementasi</h3>
                   </div>
                   <div className="space-y-6">
                      <div className="space-y-2">
                         <div className="flex justify-between text-sm">
                            <span>Sistem Migrasi</span>
                            <span>95%</span>
                         </div>
                         <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-accent w-[95%]" />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <div className="flex justify-between text-sm">
                            <span>Otomatisasi Pajak</span>
                            <span>88%</span>
                         </div>
                         <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-accent w-[88%]" />
                         </div>
                      </div>
                   </div>
                   <p className="mt-8 text-white/50 text-sm italic">*Visualisasi performa sistem setelah digitalisasi.</p>
                 </div>
                 {/* Decoration */}
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-[80px]" />
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
