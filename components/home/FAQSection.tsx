'use client'

import { useState, useEffect } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const defaultFaqs = [
  {
    id: "1",
    question: "Bagaimana jika pajak bisnis saya ternyata belum tertib?",
    answer: "Banyak bisnis merasa “aman” sampai akhirnya menerima surat teguran atau pemeriksaan. Kami dapat melakukan review menyeluruh untuk mengidentifikasi potensi risiko dan membantu merapikannya sesuai ketentuan yang berlaku."
  },
  {
    id: "2",
    question: "Apakah menggunakan konsultan pajak benar-benar menghemat biaya?",
    answer: "Ya. Kesalahan pelaporan dapat menyebabkan denda dan sanksi yang nilainya jauh lebih besar daripada biaya jasa konsultan. Dengan perencanaan pajak yang tepat dan legal, beban pajak bisa lebih efisien serta terhindar dari risiko yang tidak perlu."
  },
  {
    id: "3",
    question: "Apakah Satya Ganita hanya membantu saat pelaporan saja?",
    answer: "Tidak. Kami mendampingi mulai dari pembukuan, perencanaan pajak, hingga monitoring berkala. Tujuannya agar sistem keuangan dan pajak bisnis Anda tertata, bukan sekadar “lapor lalu selesai”."
  },
  {
    id: "4",
    question: "Apakah data keuangan perusahaan kami aman?",
    answer: "Kerahasiaan data adalah prioritas utama kami. Seluruh informasi klien dijaga secara profesional dan tidak dibagikan tanpa izin. Kepercayaan adalah fondasi kerja sama jangka panjang."
  },
  {
    id: "5",
    question: "Bagaimana cara mengetahui apakah bisnis saya sudah aman secara pajak?",
    answer: "Langkah terbaik adalah melakukan evaluasi awal. Kami menyediakan sesi konsultasi gratis untuk membantu Anda memahami kondisi pajak bisnis saat ini dan solusi yang tepat."
  }
]

export function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>(defaultFaqs)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const res = await fetch('/api/faqs')
        const data = await res.json()
        if (data && data.length > 0) {
          setFaqs(data)
        }
      } catch (error) {
        console.error("Failed to fetch FAQs:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchFaqs()
  }, [])

  const whatsappNumber = "6281120192076"
  const message = encodeURIComponent("Halo Satya Ganita Advisor, saya ingin menjadwalkan sesi konsultasi gratis untuk mengevaluasi kondisi pajak bisnis saya.")
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-[2px] w-6 bg-accent" />
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                FAQ
              </span>
              <div className="h-[2px] w-6 bg-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-muted-foreground">
              Temukan jawaban atas pertanyaan umum mengenai layanan dan pendampingan kami.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={faq.id} 
                value={`item-${index}`}
                className="bg-white border rounded-2xl px-6 py-2 shadow-sm data-[state=open]:border-accent transition-all"
              >
                <AccordionTrigger className="text-left font-bold text-primary hover:no-underline text-lg py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                  {index === faqs.length - 1 && (
                    <div className="mt-6 pt-6 border-t">
                      <p className="mb-4 font-medium text-primary">
                        Klik “Konsultasi Gratis” dan jadwalkan sesi Anda hari ini.
                      </p>
                      <Button asChild className="rounded-full px-8 bg-accent hover:bg-accent/90 text-primary font-bold">
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4" />
                          Konsultasi Gratis
                        </a>
                      </Button>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
