'use client'

import { useState, useEffect } from 'react'
import { Shield, Award, TrendingUp, Star, Zap, CheckCircle2, Heart, Target, Lightbulb } from 'lucide-react'
import { motion } from 'framer-motion'

interface Guarantee {
  id: string
  title: string
  description: string
  icon: string | null
  order: number
}

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="h-8 w-8 text-accent" />,
  Award: <Award className="h-8 w-8 text-accent" />,
  TrendingUp: <TrendingUp className="h-8 w-8 text-accent" />,
  Star: <Star className="h-8 w-8 text-accent" />,
  Zap: <Zap className="h-8 w-8 text-accent" />,
  CheckCircle2: <CheckCircle2 className="h-8 w-8 text-accent" />,
  Heart: <Heart className="h-8 w-8 text-accent" />,
  Target: <Target className="h-8 w-8 text-accent" />,
  Lightbulb: <Lightbulb className="h-8 w-8 text-accent" />,
}

const defaultGuarantees: Guarantee[] = [
  {
    id: '1',
    title: 'Transfer Knowledge',
    description: 'Tim Anda naik level secara kompetensi melalui coaching intensif dan pendampingan berkelanjutan.',
    icon: 'Award',
    order: 0,
  },
  {
    id: '2',
    title: 'Compliance',
    description: 'Ketenangan pikiran karena administrasi pajak sesuai aturan dan terhindar dari denda administrasi.',
    icon: 'Shield',
    order: 1,
  },
  {
    id: '3',
    title: 'Efficiency',
    description: 'Biaya yang lebih rendah dibandingkan merekrut Manajer Keuangan full-time dengan hasil yang lebih baik.',
    icon: 'TrendingUp',
    order: 2,
  },
]

export function GuaranteeSection() {
  const [guarantees, setGuarantees] = useState<Guarantee[]>(defaultGuarantees)

  useEffect(() => {
    async function fetchGuarantees() {
      try {
        const res = await fetch('/api/admin/guarantees')
        const data = await res.json()
        if (data && data.length > 0) {
          setGuarantees(data)
        }
      } catch (error) {
        console.error('Failed to fetch guarantees:', error)
      }
    }
    fetchGuarantees()
  }, [])

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-[2px] w-6 bg-accent" />
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
              Garansi Layanan
            </span>
            <div className="h-[2px] w-6 bg-accent" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            Apa Yang Anda Dapatkan?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Dengan memilih Satya Ganita Advisor, Anda mendapatkan jaminan layanan yang memberikan nilai nyata bagi bisnis Anda.
          </p>
        </motion.div>

        {/* Guarantee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {guarantees.map((guarantee, idx) => (
            <motion.div
              key={guarantee.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-secondary rounded-[2rem] p-10 text-center hover:shadow-2xl transition-all duration-300 cursor-default"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1, type: "spring" }}
                className="flex justify-center mb-6"
              >
                <div className="p-4 rounded-2xl bg-white shadow-lg">
                  {iconMap[guarantee.icon || 'Shield'] || <Shield className="h-8 w-8 text-accent" />}
                </div>
              </motion.div>
              <h3 className="text-xl font-bold text-primary mb-4">
                {guarantee.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {guarantee.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Investasi cerdas untuk masa depan bisnis Anda dengan tim internal yang kompeten dan sistem yang kuat.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
