'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Quote, Star, Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Testimonial {
  id: string;
  name: string;
  company: string;
  role?: string;
  content: string;
  rating: number;
}

const defaultTestimonials = [
  {
    id: '1',
    name: 'Budi Santoso',
    company: 'CEO PT Maju Berjaya',
    content: 'Satya Ganita bukan sekadar membantu lapor pajak, tapi memberikan insight strategis yang membantu kami melakukan penghematan legal secara signifikan.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Sari Wijaya',
    company: 'Owner UMKM Fashion',
    content: 'Dulu bingung sekali dengan aturan pajak UMKM. Sejak didampingi Satya Ganita, pembukuan rapi dan hati jadi tenang karena semua sudah sesuai aturan.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Andi Pratama',
    company: 'Direktur Operasional CV Tech Solution',
    content: 'Digitalisasi sistem keuangan yang mereka implementasikan sangat membantu kami memonitor arus kas dan kewajiban pajak secara real-time.',
    rating: 5,
  },
]

export function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch('/api/testimonials')
        const data = await res.json()
        if (data && data.length > 0) {
          setTestimonials(data)
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  return (
    <section className="py-24 bg-secondary/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-[2px] w-6 bg-accent" />
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                Testimoni Klien
              </span>
              <div className="h-[2px] w-6 bg-accent" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-primary">Apa Kata Mereka?</h2>
          </div>
          <Button asChild variant="outline" className="rounded-full border-accent text-accent hover:bg-accent hover:text-white">
            <Link href="/testimoni" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Beri Testimoni
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full border-none shadow-lg rounded-[2rem] bg-white p-4">
                <CardContent className="pt-8 flex flex-col h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <Quote className="h-10 w-10 text-accent/20 mb-4" />
                  <p className="text-muted-foreground leading-relaxed italic mb-8 flex-grow">
                    "{t.content}"
                  </p>
                  <div className="border-t pt-6">
                    <div className="font-bold text-primary">{t.name}</div>
                    <div className="text-xs font-bold text-accent uppercase tracking-widest">
                      {t.role ? `${t.role} - ` : ""}{t.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
