'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download, Calendar, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Logo } from '@/components/layout/Logo'

export function Hero() {
  const [companyProfileUrl, setCompanyProfileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        if (!res.ok) {
          console.warn("Settings API not available");
          return;
        }
        const data = await res.json();
        if (data && data.company_profile_url) {
          setCompanyProfileUrl(data.company_profile_url);
        }
      } catch (error) {
        console.warn("Failed to fetch settings:", error);
      }
    }
    fetchSettings();
  }, []);

  const handleDownload = () => {
    if (!companyProfileUrl) {
      toast.error("File Company Profile belum tersedia saat ini.");
      return;
    }
    window.open(companyProfileUrl, "_blank");
  };

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1761114611865-7a5b6fcfee8c?auto=format&fit=crop&q=80&w=1920"
          alt="Satya Ganita Office"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/80 backdrop-blur-[2px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-20 md:py-32">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Logo variant="full" showTagline={true} className="scale-100" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-[2px] w-12 bg-accent" />
            <span className="text-accent font-bold tracking-[0.2em] uppercase text-sm md:text-base">
              Strategic Financial Partner
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6"
          >
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl lg:text-3xl font-bold text-accent leading-tight mb-4"
            >
              Build the System, Empower the Team, Secure the Growth
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]"
            >
              Pajak Tertib. Bisnis Tumbuh. <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-accent underline underline-offset-8 decoration-[3px]"
              >
                Sistem Lebih Modern.
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl leading-relaxed"
          >
            Satya Ganita adalah mitra strategis di bidang Keuangan, Perpajakan, dan Manajemen Operasional.
            Kami membangun sistem di internal perusahaan Anda dan mendampingi tim hingga mandiri.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6"
          >
            <Button asChild size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-primary font-bold px-8 h-14 text-base shadow-xl">
              <Link href="/konsultasi">
                Konsultasi Gratis <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full border-white text-white hover:bg-white/10 px-8 h-14 text-base backdrop-blur-sm"
              onClick={handleDownload}
            >
              <Download className="mr-2 h-5 w-5" /> Company Profile
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-white hover:bg-white/10 px-6 h-14 text-base font-medium">
              <Link href="https://wa.me/6281120192076?text=Halo%20Satya%20Ganita%20Advisor%2C%20saya%20ingin%20berkonsultasi%20mengenai%20solusi%20bisnis%20saya.">
                <Calendar className="mr-2 h-5 w-5" /> Jadwalkan Meeting
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Stats/Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="hidden lg:flex absolute bottom-12 right-12 z-10 bg-white p-8 rounded-2xl shadow-2xl flex-col items-center"
      >
        <div className="text-4xl font-bold text-primary mb-1">100+</div>
        <div className="text-xs font-bold text-muted-foreground tracking-widest uppercase text-center">
          Klien UMKM & <br /> Korporasi
        </div>
      </motion.div>
    </section>
  )
}
