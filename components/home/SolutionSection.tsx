'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, MonitorSmartphone, LineChart, ClipboardCheck, ArrowUpRight, Briefcase } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
  features?: string[]; // We'll mock some for now or handle them
}

const iconMap: Record<string, any> = {
  ShieldCheck: ShieldCheck,
  MonitorSmartphone: MonitorSmartphone,
  LineChart: LineChart,
  Briefcase: Briefcase,
};

const defaultServices = [
  {
    id: '1',
    title: 'Tax Care Program',
    description: 'Pendampingan pajak dari konsultasi, pelaporan rutin, hingga audit readiness untuk kepatuhan maksimal.',
    icon: 'ShieldCheck',
    slug: 'pajak',
    accent: 'emerald',
    features: ['Konsultasi & Pelaporan Rutin', 'Tax Planning Strategy', 'Audit Readiness'],
  },
  {
    id: '2',
    title: 'Digital Tax & Accounting',
    description: 'Implementasi sistem pembukuan & compliance berbasis digital untuk efisiensi operasional bisnis.',
    icon: 'MonitorSmartphone',
    slug: 'digitalisasi',
    accent: 'gold',
    features: ['Implementasi Software', 'Otomasi Pelaporan', 'Digital Compliance'],
  },
  {
    id: '3',
    title: 'Business Management Advisory',
    description: 'Strategi efisiensi biaya, penguatan kontrol internal, dan peningkatan profitabilitas berkelanjutan.',
    icon: 'LineChart',
    slug: 'advisory',
    accent: 'primary',
    features: ['Strategi Efisiensi Biaya', 'Kontrol Internal', 'Peningkatan Profit'],
  },
]

export function SolutionSection() {
  const [services, setServices] = useState<any[]>(defaultServices)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('/api/services')
        const data = await res.json()
        if (data && data.length > 0) {
          // Merge features since they aren't in DB yet or handle them
          const merged = data.map((s: any, idx: number) => ({
            ...s,
            features: defaultServices[idx]?.features || ['Consultation', 'Reporting', 'Strategy'],
            accent: idx === 0 ? 'emerald' : idx === 1 ? 'gold' : 'primary'
          }))
          setServices(merged)
        }
      } catch (error) {
        console.error("Failed to fetch services:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="h-[2px] w-6 bg-accent" />
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
              Produk Premium Kami
            </span>
            <div className="h-[2px] w-6 bg-accent" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-primary mb-6"
          >
            Solusi Strategis untuk Pertumbuhan Bisnis
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground"
          >
            Kami bukan sekadar konsultan administratif, melainkan mitra strategis yang memahami ekosistem bisnis Anda.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((sol, idx) => {
            const Icon = iconMap[sol.icon] || Briefcase;
            return (
              <motion.div
                key={sol.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <Card className={cn(
                  "h-full border border-muted hover:shadow-2xl transition-all duration-500 flex flex-col group p-2",
                  sol.accent === 'emerald' ? 'hover:border-emerald' : 'hover:border-accent'
                )}>
                  <CardHeader className="p-8">
                    <div className={cn(
                      "mb-6 p-4 rounded-2xl bg-secondary/50 transition-all duration-500 w-fit",
                      sol.accent === 'emerald' ? 'text-emerald group-hover:bg-emerald group-hover:text-white' : 
                      sol.accent === 'gold' ? 'text-accent group-hover:bg-accent group-hover:text-primary' :
                      'text-primary group-hover:bg-primary group-hover:text-white'
                    )}>
                      <Icon className="h-10 w-10" />
                    </div>
                    <CardTitle className="text-2xl font-bold mb-4 tracking-tight">{sol.title}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground leading-relaxed mb-6">
                      {sol.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-8 pb-10 mt-auto">
                    <ul className="space-y-3 mb-8">
                      {sol.features?.map((f: string, i: number) => (
                        <li key={i} className="flex items-center text-sm font-medium text-primary/80">
                          <ClipboardCheck className={cn(
                            "h-4 w-4 mr-3",
                            sol.accent === 'emerald' ? 'text-emerald' : 'text-accent'
                          )} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/solusi/${sol.slug}`}
                      className="flex items-center text-primary font-bold text-sm uppercase tracking-widest hover:text-accent transition-colors mt-auto"
                    >
                      Detail Solusi <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
