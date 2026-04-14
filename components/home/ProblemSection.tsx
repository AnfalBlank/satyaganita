'use client'

import { motion } from 'framer-motion'
import { HelpCircle, AlertCircle, TrendingUp, ShieldAlert, FileWarning, Search, Landmark } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const problems = [
  {
    target: 'Untuk UMKM',
    icon: <AlertCircle className="h-10 w-10 text-destructive mb-4" />,
    items: [
      { text: 'Bingung aturan pajak terbaru?', icon: <HelpCircle className="h-5 w-5" /> },
      { text: 'Takut salah lapor & kena denda?', icon: <ShieldAlert className="h-5 w-5" /> },
      { text: 'Pembukuan belum rapi & terkontrol?', icon: <FileWarning className="h-5 w-5" /> },
      { text: 'Tidak tahu kewajiban pajak yang benar?', icon: <Landmark className="h-5 w-5" /> },
    ],
  },
  {
    target: 'Untuk Perusahaan Menengah',
    icon: <TrendingUp className="h-10 w-10 text-primary mb-4" />,
    items: [
      { text: 'Ingin efisiensi pajak secara legal?', icon: <Search className="h-5 w-5" /> },
      { text: 'Butuh sistem keuangan terkontrol?', icon: <Search className="h-5 w-5" /> },
      { text: 'Persiapan audit & compliance?', icon: <Search className="h-5 w-5" /> },
      { text: 'Ingin naik kelas secara manajerial?', icon: <TrendingUp className="h-5 w-5" /> },
    ],
  },
]

export function ProblemSection() {
  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="h-[2px] w-6 bg-primary" />
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
              Tantangan Bisnis Anda
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-primary leading-tight"
          >
            Seringkali pajak dan pembukuan menjadi hambatan pertumbuhan bisnis.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {problems.map((prob, idx) => (
            <motion.div
              key={prob.target}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <Card className="h-full border-none shadow-xl bg-white overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="h-2 w-full bg-accent" />
                <CardHeader className="pt-8 pb-4">
                  <div className="flex flex-col items-center md:items-start">
                    {prob.icon}
                    <CardTitle className="text-2xl font-bold text-primary mb-2">
                      {prob.target}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pb-10">
                  <ul className="space-y-4">
                    {prob.items.map((item, i) => (
                      <li key={i} className="flex items-center text-muted-foreground font-medium group-hover:text-primary transition-colors">
                        <div className="mr-3 p-1 rounded-full bg-secondary/50 text-accent">
                          {item.icon}
                        </div>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
