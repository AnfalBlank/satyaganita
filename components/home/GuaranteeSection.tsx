'use client'

import { Shield, Award, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

export function GuaranteeSection() {
  const guarantees = [
    {
      icon: <Award className="h-8 w-8 text-accent" />,
      title: 'Transfer Knowledge',
      description: 'Tim Anda naik level secara kompetensi melalui coaching intensif dan pendampingan berkelanjutan.',
    },
    {
      icon: <Shield className="h-8 w-8 text-accent" />,
      title: 'Compliance',
      description: 'Ketenangan pikiran karena administrasi pajak sesuai aturan dan terhindar dari denda administrasi.',
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-accent" />,
      title: 'Efficiency',
      description: 'Biaya yang lebih rendah dibandingkan merekrut Manajer Keuangan full-time dengan hasil yang lebih baik.',
    },
  ]

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
              key={idx}
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
                  {guarantee.icon}
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
