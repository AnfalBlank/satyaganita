import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { CTASection } from '@/components/home/CTASection'
import { BookOpen, FileText, Settings, Eye, CheckCircle2, TrendingUp, Shield } from 'lucide-react'

export default function ScopeOfWorkPage() {
  const pembukuanItems = [
    {
      icon: <Settings className="h-6 w-6 text-accent" />,
      title: 'Penyelarasan Sistem (Initial Setup)',
      description: 'Merapikan daftar akun (CoA), Saldo Awal, dan Migrasi data ke sistem digital.',
    },
    {
      icon: <BookOpen className="h-6 w-6 text-accent" />,
      title: 'Mengajari',
      description: 'Cara entry data di software accounting, membuat jurnal umum, jurnal penyesuaian, pengakuan penyusutan aset, dan klasifikasi biaya yang tepat.',
    },
    {
      icon: <FileText className="h-6 w-6 text-accent" />,
      title: 'Mereview',
      description: 'Mengarahkan dan memeriksa hasil input data di buku besar di software Accounting yang dilakukan staff perusahaan untuk memastikan akurasi jurnal.',
    },
    {
      icon: <Eye className="h-6 w-6 text-accent" />,
      title: 'Mengawasi',
      description: 'Memastikan staff melakukan tutup buku (closing) tepat waktu setiap awal bulan.',
    },
  ]

  const perpajakanItems = [
    {
      icon: <BookOpen className="h-6 w-6 text-accent" />,
      title: 'Mengajari',
      description: 'Cara menghitung PPh 21, membuat Faktur Pajak, PPh Unifikasi (PPh Pasal 23, 4-2), dan menggunakan aplikasi Cortax.',
    },
    {
      icon: <FileText className="h-6 w-6 text-accent" />,
      title: 'Mereview',
      description: 'Memeriksa draf SPT Masa sebelum dilaporkan oleh staff untuk meminimalisir kesalahan setor/lapor.',
    },
    {
      icon: <Shield className="h-6 w-6 text-accent" />,
      title: 'Mengawasi',
      description: 'Memantau jatuh tempo pembayaran pajak agar perusahaan terhindar dari denda administrasi.',
    },
  ]

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
                Scope of Work
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Ruang Lingkup Kerja
            </h1>
            <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
              Kami mengusulkan model supervisory & Coaching untuk memastikan tim Anda memiliki kompetensi yang mumpuni.
            </p>
          </div>
        </div>
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 -skew-x-12 transform translate-x-1/2" />
      </section>

      {/* Aspek Pembukuan Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-[2px] w-6 bg-accent" />
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                Aspek 1
              </span>
              <div className="h-[2px] w-6 bg-accent" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight text-center">
              Aspek Pembukuan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16 text-center">
              Edukasi & Review untuk memastikan sistem pembukuan yang akurat dan terstruktur.
            </p>

            <div className="space-y-8">
              {pembukuanItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-secondary rounded-[2rem] p-8 md:p-12 flex gap-6 items-start hover:shadow-lg transition-shadow"
                >
                  <div className="shrink-0 p-4 rounded-2xl bg-white">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-primary mb-3">
                      {item.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Aspek Perpajakan Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-[2px] w-6 bg-accent" />
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                Aspek 2
              </span>
              <div className="h-[2px] w-6 bg-accent" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight text-center">
              Aspek Perpajakan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16 text-center">
              Edukasi & Review untuk memastikan kepatuhan pajak dan menghindari denda administrasi.
            </p>

            <div className="space-y-8">
              {perpajakanItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-[2rem] p-8 md:p-12 flex gap-6 items-start hover:shadow-lg transition-shadow"
                >
                  <div className="shrink-0 p-4 rounded-2xl bg-secondary">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-primary mb-3">
                      {item.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-[2px] w-6 bg-accent" />
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                  Manfaat
                </span>
                <div className="h-[2px] w-6 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                Yang Anda Dapatkan
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <CheckCircle2 className="h-8 w-8 text-accent" />,
                  title: 'Tim Menjadi Kompeten',
                  description: 'Staf Anda memiliki kemampuan pembukuan dan perpajakan yang mumpuni.',
                },
                {
                  icon: <TrendingUp className="h-8 w-8 text-accent" />,
                  title: 'Sistem Terdigitalisasi',
                  description: 'Pembukuan dan pelaporan pajak menjadi lebih efisien dan terstruktur.',
                },
                {
                  icon: <Shield className="h-8 w-8 text-accent" />,
                  title: 'Terhindar dari Denda',
                  description: 'Kepatuhan pajak terjamin dengan pengawasan yang berkala.',
                },
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-secondary rounded-[2rem] p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-2xl bg-white">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
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
