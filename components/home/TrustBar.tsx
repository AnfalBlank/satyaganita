import { CheckCircle2 } from 'lucide-react'

export function TrustBar() {
  const items = [
    '100+ UMKM & Perusahaan Telah Didampingi',
    'Klien dari seluruh Indonesia',
    'Fokus pada Pendampingan Kepatuhan, Efisiensi Pajak Legal, Dan Konsultasi Perbaikan Management',
  ]

  return (
    <section className="bg-primary py-10 border-y border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-4 group">
              <div className="shrink-0 h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/40 transition-colors">
                <CheckCircle2 className="h-6 w-6 text-accent" />
              </div>
              <p className="text-white font-medium text-sm md:text-base leading-snug">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
