'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-primary text-white">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 L100 0 L100 100 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-accent font-bold tracking-[0.2em] uppercase text-xs mb-8">
            Konsultasi Strategis
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1]">
            Siap Membawa Bisnis Anda ke <br />
            <span className="text-accent underline underline-offset-[12px] decoration-[3px]">Level Berikutnya?</span>
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Dapatkan konsultasi awal gratis bersama tim ahli Satya Ganita untuk membedah tantangan pajak dan manajerial bisnis Anda.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-primary font-bold px-10 h-16 text-lg shadow-xl shadow-accent/20">
              <Link href="/konsultasi">
                Jadwalkan Konsultasi <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
            <div className="flex items-center gap-6 mt-4 sm:mt-0">
              <a href="https://wa.me/6281120192076?text=Halo%20Satya%20Ganita%20Advisor%2C%20saya%20ingin%20berkonsultasi%20mengenai%20solusi%20bisnis%20saya." className="flex items-center gap-3 hover:text-accent transition-colors">
                <div className="p-3 bg-white/10 rounded-full">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs text-white/50 uppercase font-bold tracking-widest">Telepon</div>
                  <div className="font-bold">+62 811-2019-2076</div>
                </div>
              </a>
              <a href="mailto:admin@satyaganita.id" className="flex items-center gap-3 hover:text-accent transition-colors">
                <div className="p-3 bg-white/10 rounded-full">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs text-white/50 uppercase font-bold tracking-widest">Email</div>
                  <div className="font-bold">admin@satyaganita.id</div>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
