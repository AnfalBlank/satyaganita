'use client'

import { CheckCircle2, XCircle, Building2, Users, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export function ComparisonSection() {
  return (
    <section className="py-24 bg-secondary overflow-hidden">
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
              Mengapa Memilih Kami
            </span>
            <div className="h-[2px] w-6 bg-accent" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            Bedanya Apa?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Kami memiliki pendekatan yang berbeda dari konsultan tradisional. Fokus kami adalah membangun ke mandirian tim Anda.
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Conventional Model */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-[2.5rem] p-10 shadow-lg border-2 border-muted hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-muted">
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-1">Model Konvensional</h3>
                <p className="text-sm text-muted-foreground">Pendekatan Tradisional</p>
              </div>
            </div>

            <div className="space-y-8">
              {[
                { title: 'Ketergantungan Penuh', desc: 'Ketergantungan pada konsultan luar yang memegang data mentah dan proses pembukuan.' },
                { title: 'Staf Kurang Kompeten', desc: 'Staf administrasi belum tentu bisa pembukuan dan kurang paham aturan pajak terbaru.' },
                { title: 'Kurang Pemahaman', desc: 'Staff admin perusahaan sering tidak paham proses pembukuan dan perpajakannya secara menyeluruh.' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                  className="flex gap-4"
                >
                  <XCircle className="h-6 w-6 text-red-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-primary mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Satya Ganita Model */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-primary rounded-[2.5rem] p-10 shadow-2xl border-2 border-accent relative hover:scale-105 transition-transform duration-300"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="absolute top-0 right-8 -translate-y-1/2 bg-accent text-primary px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg"
            >
              Pilihan Cerdas
            </motion.div>

            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-accent/20">
                <Zap className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Satya Ganita</h3>
                <p className="text-sm text-white/70">Pendekatan Transformasional</p>
              </div>
            </div>

            <div className="space-y-8">
              {[
                { title: 'Sistem Cloud/Offline Internal', desc: 'Kami membangun sistem di internal perusahaan Anda. Data milik Anda, kami hanya mengawasi dan staf Anda menjadi asset perusahaan yang pintar.' },
                { title: 'Coaching Rutin', desc: 'Kami melakukan coaching rutin kepada staf Anda agar mereka bisa melakukan pembukuan dan pajak secara mandiri.' },
                { title: 'Pemahaman A-Z', desc: 'Staf Anda akan mengerti dan memahami dari A – Z terkait pembukuan dan pajak untuk kemandirian jangka panjang.' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                  className="flex gap-4"
                >
                  <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-sm text-white/80 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Bersama Satya Ganita, tim Anda bukan hanya dilayani, tapi juga diberdayakan untuk menjadi profesional yang kompeten.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
