'use client'

import Link from 'next/link'
import { Mail, MapPin, Phone, Instagram, Linkedin, Facebook } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Footer() {
  const [logoUrl, setLogoUrl] = useState<string>('/logo-v2.png')

  useEffect(() => {
    async function fetchLogo() {
      try {
        const res = await fetch('/api/settings')
        if (res.ok) {
          const data = await res.json()
          if (data.logo_url) {
            setLogoUrl(data.logo_url)
          }
        }
      } catch {
        // fallback to default
      }
    }
    fetchLogo()
  }, [])

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand & Mission */}
        <div className="md:col-span-2">
          <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-4">
              {/* Logo with rounded frame */}
              <div className="rounded-2xl bg-white/95 backdrop-blur-md p-3 shadow-xl border border-white/20">
                <img
                  src={logoUrl}
                  alt="Satya Ganita Advisor"
                  className="h-14 w-auto object-contain"
                />
              </div>
              {/* Company name */}
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold tracking-tight leading-none text-white">
                  SATYA GANITA
                </span>
                <span className="text-xs font-medium tracking-[0.2em] uppercase mt-1 text-white/70">
                  Advisor Solution
                </span>
              </div>
            </div>
          </Link>
          <p className="text-white/70 text-sm max-w-sm mb-6">
            Mitra strategis dalam pengelolaan pajak, digitalisasi sistem keuangan, dan peningkatan performa manajemen secara strategis.
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="https://satyaganita.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accent font-medium tracking-wide hover:underline"
            >
              www.satyaganita.id
            </a>
            <div className="text-xs text-white/50 font-medium tracking-wide">
              Managed by PT. AYEM TENTREM ANGREMBOKO
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-accent">Layanan</h4>
          <ul className="space-y-4 text-sm text-white/70">
            <li>
              <Link href="/solusi/pajak" className="hover:text-accent transition-colors">
                Konsultasi & Pelaporan Pajak
              </Link>
            </li>
            <li>
              <Link href="/solusi/digitalisasi" className="hover:text-accent transition-colors">
                Digitalisasi Pembukuan
              </Link>
            </li>
            <li>
              <Link href="/solusi/advisory" className="hover:text-accent transition-colors">
                Advisory Manajemen
              </Link>
            </li>
            <li>
              <Link href="/ruang-lingkup" className="hover:text-accent transition-colors">
                Ruang Lingkup Kerja
              </Link>
            </li>
            <li>
              <Link href="/testimoni" className="hover:text-accent transition-colors">
                Beri Testimoni
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-accent">Kontak</h4>
          <ul className="space-y-4 text-sm text-white/70">
            <li className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 text-accent shrink-0" />
              <span>Menara Cakrawala Lt. 12, Unit 05A, Jl. MH. Thamrin No. 9, Kebon Sirih, Menteng, Jakarta Pusat.</span>
            </li>
            <li className="flex items-center">
              <Phone className="h-5 w-5 mr-3 text-accent shrink-0" />
              <span>+62 811-2019-2076</span>
            </li>
            <li className="flex items-center">
              <Mail className="h-5 w-5 mr-3 text-accent shrink-0" />
              <a href="mailto:admin@satyaganita.id" className="hover:text-accent transition-colors">
                admin@satyaganita.id
              </a>
            </li>
          </ul>
          <div className="flex space-x-4 mt-8">
            <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent hover:scale-110 transition-all">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent hover:scale-110 transition-all">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-accent hover:scale-110 transition-all">
              <Facebook className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/50 space-y-4 md:space-y-0">
        <p>© 2024 Satya Ganita. All Rights Reserved.</p>
        <div className="flex space-x-6">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Kebijakan Privasi
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Syarat & Ketentuan
          </Link>
        </div>
      </div>
    </footer>
  )
}
