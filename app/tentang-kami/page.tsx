import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { CTASection } from '@/components/home/CTASection'
import { Building2, Target, Heart, Eye, Zap, Users, Landmark, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Page Header */}
      <section className="pt-40 pb-24 bg-primary text-white overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-[2px] w-8 bg-accent" />
              <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs md:text-sm">
                About Satya Ganita
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Lebih Dari Sekadar <br />
              <span className="text-accent italic">Konsultan Pajak.</span>
            </h1>
            <p className="text-lg md:text-xl text-accent font-bold mb-8">
              Build the System, Empower the Team, Secure the Growth
            </p>
            <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
              Kami adalah mitra strategis di bidang Keuangan, Perpajakan, dan Manajemen Operasional yang hadir dengan pendekatan berbeda.
            </p>
          </div>
        </div>
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 -skew-x-12 transform translate-x-1/2" />
      </section>

      {/* Tentang Kami Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <div className="h-[2px] w-6 bg-accent" />
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                Tentang Kami
              </span>
              <div className="h-[2px] w-6 bg-accent" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-12 leading-tight text-center">
              Pendekatan Yang Berbeda
            </h2>

            <div className="bg-secondary rounded-[2.5rem] p-10 md:p-16 shadow-xl">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Kami percaya bahwa <strong className="text-primary">pertumbuhan bisnis yang berkelanjutan</strong> hanya bisa dicapai jika tim internal Anda memiliki sistem yang kuat dan kompetensi yang mumpuni.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Berbeda dengan konsultan tradisional yang hanya memberikan laporan jadi, kami <strong className="text-primary">membangun sistem di dalam perusahaan Anda</strong> dan mendampingi tim Anda hingga mereka mampu mengelola keuangan secara mandiri, akurat, dan patuh pajak.
              </p>
              <div className="flex items-center gap-4 p-6 bg-white rounded-2xl mt-8">
                <CheckCircle2 className="h-8 w-8 text-accent shrink-0" />
                <p className="text-primary font-medium">
                  Data milik Anda, kami hanya mengawasi dan staf Anda akan menjadi asset perusahaan yang pintar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                  alt="Corporate Office"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-accent text-primary p-12 rounded-3xl z-20 shadow-xl hidden md:block">
                <Building2 className="h-10 w-10 mb-4" />
                <div className="text-2xl font-bold mb-1">Managed By</div>
                <div className="text-sm font-bold tracking-widest uppercase">PT. AYEM TENTREM ANGREMBOKO</div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-12 tracking-tight">
                Visi & Misi
              </h2>
              <div className="space-y-12">
                <div className="flex gap-6">
                   <div className="shrink-0 p-4 rounded-2xl bg-secondary h-fit">
                     <Target className="h-7 w-7 text-primary" />
                   </div>
                   <div>
                      <h4 className="text-xl font-bold text-primary mb-3 uppercase tracking-wider">Visi</h4>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        Menjadi katalisator bagi UMKM dan Perusahaan Menengah di Indonesia untuk memiliki standar tata kelola keuangan kelas dunia.
                      </p>
                   </div>
                </div>
                <div className="flex gap-6">
                   <div className="shrink-0 p-4 rounded-2xl bg-secondary h-fit">
                     <Zap className="h-7 w-7 text-primary" />
                   </div>
                   <div>
                      <h4 className="text-xl font-bold text-primary mb-3 uppercase tracking-wider">Misi</h4>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        Menghilangkan ketergantungan klien pada pihak eksternal dengan menciptakan tim keuangan internal yang profesional dan sistem yang terdigitalisasi.
                      </p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bidang Usaha Klien Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-[2px] w-6 bg-accent" />
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                  Pengalaman Kami
                </span>
                <div className="h-[2px] w-6 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                Bidang Usaha Klien Kami
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Kami telah dipercaya oleh berbagai sektor industri untuk membantu transformasi keuangan dan perpajakan mereka.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Retail Sepatu Wanita',
                'Outsourcing Tenaga Kerja',
                'Importir dan Perdagangan Aksesoris Kendaraan Bermotor',
                'Importir dan Perdagangan Aksesoris Handphone',
                'Karoseri Niaga',
                'Konstruksi Sipil, Baja, M/E',
                'General Trading',
              ].map((industry, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="p-3 rounded-xl bg-accent/10">
                    <CheckCircle2 className="h-6 w-6 text-accent" />
                  </div>
                  <span className="font-medium text-primary">{industry}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metodologi Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-[2px] w-6 bg-accent" />
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                  Cara Kerja Kami
                </span>
                <div className="h-[2px] w-6 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                Metodologi Kami
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Kami bekerja dengan prinsip pendampingan bertahap untuk memastikan tim Anda benar-benar siap dan mandiri.
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  step: '01',
                  title: 'I Do',
                  description: 'Kami merancang sistem dan memberikan contoh standar kerja untuk perusahaan Anda.',
                  icon: <Users className="h-8 w-8 text-accent" />,
                },
                {
                  step: '02',
                  title: 'We Do',
                  description: 'Kami membimbing tim Anda melakukan pekerjaan tersebut bersama-sama untuk transfer knowledge.',
                  icon: <Users className="h-8 w-8 text-accent" />,
                },
                {
                  step: '03',
                  title: 'You Do',
                  description: 'Kami mengawasi dan memberikan arahan strategis, sementara tim Anda mengeksekusi dengan sempurna.',
                  icon: <Users className="h-8 w-8 text-accent" />,
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-secondary rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="shrink-0">
                      <div className="text-6xl md:text-7xl font-bold text-accent/20">
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-white">
                          {item.icon}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-primary">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Managed By PT Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
           <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-[3rem] shadow-xl border-t-8 border-accent">
              <Landmark className="h-16 w-16 text-accent mx-auto mb-8" />
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">Mitra yang Terpercaya</h3>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Satya Ganita beroperasi di bawah manajemen <strong>PT. Ayem Tentrem Angremboko</strong>, memastikan tata kelola yang profesional, aman, dan berlandaskan pada struktur hukum yang kokoh. Nama kami mencerminkan ketenangan (Ayem Tentrem) dan perlindungan (Angremboko) bagi setiap aset dan strategi bisnis klien kami.
              </p>
              <div className="h-[2px] w-24 bg-accent mx-auto" />
           </div>
        </div>
      </section>

      <CTASection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
