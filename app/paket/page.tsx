'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { CTASection } from '@/components/home/CTASection'
import { Check, ArrowRight, Zap, TrendingUp, Landmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

const packages = [
  {
    name: 'Micro Mentoring',
    revenue: '< Rp 8 Miliar',
    price: 'Rp 2.000.000',
    period: '/bulan',
    focus: 'Ajarkan input dasar, review kepatuhan PPh Final, pastikan staff tidak salah catat kas/bank.',
    icon: <Zap className="h-10 w-10 text-emerald-500" />,
    popular: false,
    color: 'border-emerald-500',
    buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
  },
  {
    name: 'Small Oversight',
    revenue: 'Rp 8 - 25 Miliar',
    price: 'Rp 3.500.000',
    period: '/bulan',
    focus: 'Ajarkan manajemen piutang/utang, review PPN & PPh Unifikasi, supervisi tutup buku bulanan.',
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    popular: true,
    color: 'border-accent shadow-2xl scale-105',
    buttonColor: 'bg-primary hover:bg-primary/90',
  },
  {
    name: 'Medium Supervision',
    revenue: 'Rp 25M - 70 M',
    price: 'Rp 5.500.000',
    period: '/bulan',
    focus: 'Ajarkan akuntansi biaya/HPP, review equalization pajak, mitigasi risiko SP2DK, analisis margin.',
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    popular: false,
    color: 'border-primary',
    buttonColor: 'bg-primary hover:bg-primary/90',
  },
  {
    name: 'Growth Controller',
    revenue: 'Rp 70M - 100 M',
    price: 'Rp 10.000.000',
    period: '/bulan',
    focus: 'Supervisi tim (lebih dari 1 staff), review kepatuhan pajak kompleks, strategi tax planning tahunan.',
    icon: <Landmark className="h-10 w-10 text-primary" />,
    popular: false,
    color: 'border-primary',
    buttonColor: 'bg-primary hover:bg-primary/90',
  },
  {
    name: 'Corporate Lead',
    revenue: '> Rp 100 Miliar',
    price: 'Nego',
    period: '',
    focus: 'Pengawasan komprehensif, evaluasi SOP keuangan, pendampingan audit, dan edukasi level manajerial.',
    icon: <Landmark className="h-10 w-10 text-accent" />,
    popular: false,
    color: 'border-accent',
    buttonColor: 'bg-accent hover:bg-accent/90 text-primary',
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Pricing Header */}
      <section className="pt-48 pb-24 bg-white text-center">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-[2px] w-6 bg-accent" />
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
              Pilih Investasi Bisnis Anda
            </span>
            <div className="h-[2px] w-6 bg-accent" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">Paket Layanan Strategis</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-16 leading-relaxed">
            Investasi cerdas untuk keamanan hukum, efisiensi operasional, dan pertumbuhan bisnis jangka panjang.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto">
            {packages.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`relative p-10 bg-white border-2 rounded-[2.5rem] text-left transition-all duration-500 flex flex-col h-full ${pkg.color} ${idx === 4 ? 'lg:col-start-2' : ''}`}
              >
                {pkg.popular && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + idx * 0.1, type: "spring" }}
                    className="absolute top-0 right-10 -translate-y-1/2 bg-accent text-primary px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg"
                  >
                    Paling Populer
                  </motion.div>
                )}

                <div className="mb-8">{pkg.icon}</div>
                <h3 className="text-2xl font-bold text-primary mb-1 uppercase tracking-tight">{pkg.name}</h3>
                <div className="text-sm font-bold text-muted-foreground tracking-widest uppercase mb-6">{pkg.revenue}</div>

                <div className="mb-8 min-h-[60px]">
                   <div className="text-xl font-bold text-primary">{pkg.price}<span className="text-sm font-normal text-muted-foreground"> {pkg.period}</span></div>
                   <p className="text-sm text-muted-foreground leading-relaxed mt-3">{pkg.focus}</p>
                </div>

                <div className="h-[1px] w-full bg-muted mb-8" />

                <div className="flex-1 mb-8">
                  <div className="text-sm font-medium text-primary/80 mb-2">Fokus Pengajaran & Pengawasan:</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pkg.focus}</p>
                </div>

                <Button asChild className={`w-full rounded-full h-14 font-bold text-base shadow-xl transition-all duration-300 ${pkg.buttonColor}`}>
                  <Link href="/konsultasi">Pilih Paket <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4 text-center max-w-4xl">
           <h2 className="text-3xl font-bold text-primary mb-8 leading-tight">Butuh Penyesuaian Khusus?</h2>
           <p className="text-lg text-muted-foreground mb-12">
             Kami memahami bahwa setiap bisnis memiliki kebutuhan unik. Hubungi tim kami untuk mendiskusikan penyesuaian layanan yang paling sesuai dengan profil risiko dan tujuan strategis perusahaan Anda.
           </p>
           <Button asChild variant="outline" size="lg" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white px-12 h-16 font-bold text-lg">
             <Link href="/konsultasi">Hubungi Tim Kami</Link>
           </Button>
        </div>
      </section>

      <CTASection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
