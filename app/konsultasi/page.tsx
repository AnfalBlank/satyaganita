'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { CTASection } from '@/components/home/CTASection'
import { Phone, Mail, MapPin, Send, CheckCircle2, User, Building2, MessageSquare, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { toast } from 'sonner'

export default function ConsultationPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      companyName: formData.get('companyName'),
      email: formData.get('email'),
      whatsapp: formData.get('whatsapp'),
      service: formData.get('service'),
      description: formData.get('description'),
    }

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitted(true)
        toast.success('Pesan Anda telah terkirim!')
      } else {
        toast.error('Gagal mengirim pesan. Silakan coba lagi.')
      }
    } catch (error) {
      toast.error('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Contact Header */}
      <section className="pt-48 pb-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-[2px] w-6 bg-accent" />
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                Mulai Kerjasama Strategis
              </span>
              <div className="h-[2px] w-6 bg-accent" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">Konsultasi Awal Gratis</h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Lengkapi formulir di bawah ini untuk menjadwalkan pertemuan dengan tim ahli kami.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="pb-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
            
            {/* Contact Info */}
            <div className="lg:col-span-4 space-y-8">
              <Card className="border-none shadow-2xl bg-primary text-white p-8 rounded-3xl overflow-hidden relative group">
                {/* Background accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-accent/30 transition-all duration-500" />
                
                <CardHeader className="p-0 mb-12">
                   <CardTitle className="text-2xl font-bold mb-4">Informasi Kontak</CardTitle>
                   <CardDescription className="text-white/60 text-base">Tim kami akan merespons permintaan Anda dalam waktu maksimal 1x24 jam kerja.</CardDescription>
                </CardHeader>
                <CardContent className="p-0 space-y-8">
                   <div className="flex gap-4 items-start">
                      <div className="p-3 bg-white/10 rounded-2xl h-fit">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <div className="text-xs text-white/50 font-bold tracking-widest uppercase mb-1">Telepon / WhatsApp</div>
                        <div className="text-lg font-bold">
                          <a href="https://wa.me/6281120192076" className="hover:text-accent transition-colors">
                            +62 811-2019-2076
                          </a>
                        </div>
                      </div>
                   </div>
                   <div className="flex gap-4 items-start">
                      <div className="p-3 bg-white/10 rounded-2xl h-fit">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <div className="text-xs text-white/50 font-bold tracking-widest uppercase mb-1">Email Resmi</div>
                        <div className="text-lg font-bold">
                          <a href="mailto:admin@satyaganita.id" className="hover:text-accent transition-colors">
                            admin@satyaganita.id
                          </a>
                        </div>
                      </div>
                   </div>
                   <div className="flex gap-4 items-start">
                      <div className="p-3 bg-white/10 rounded-2xl h-fit">
                        <MapPin className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <div className="text-xs text-white/50 font-bold tracking-widest uppercase mb-1">Kantor Pusat</div>
                        <div className="text-lg font-bold">Menara Cakrawala Lt. 12, Unit 05A, Jl. MH. Thamrin No. 9, Kebon Sirih, Menteng, Jakarta Pusat.</div>
                      </div>
                   </div>
                </CardContent>
              </Card>

              {/* Company Note */}
              <div className="p-8 bg-secondary/50 rounded-3xl border border-muted">
                 <h4 className="font-bold text-primary mb-2 tracking-tight">Managed By</h4>
                 <p className="text-sm font-bold text-primary tracking-widest uppercase mb-4">PT. Ayem Tentrem Angremboko</p>
                 <p className="text-sm text-muted-foreground leading-relaxed">
                   Setiap kerjasama dilakukan di bawah pengawasan legal PT. Ayem Tentrem Angremboko untuk menjamin profesionalitas dan keamanan data klien.
                 </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              {submitted ? (
                <div className="bg-white p-12 md:p-20 rounded-[3rem] shadow-2xl border border-muted text-center flex flex-col items-center">
                   <div className="h-24 w-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8">
                      <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                   </div>
                   <h2 className="text-3xl font-bold text-primary mb-6 tracking-tight">Pesan Anda Telah Terkirim!</h2>
                   <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg">
                      Terima kasih telah mempercayai Satya Ganita. Tim strategi kami akan segera menghubungi Anda untuk menjadwalkan pertemuan awal.
                   </p>
                   <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-full h-14 px-10">Kirim Pesan Baru</Button>
                </div>
              ) : (
                <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-muted">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-bold tracking-widest uppercase text-muted-foreground ml-1 flex items-center gap-2">
                          <User className="h-4 w-4" /> Nama Lengkap <span className="text-destructive">*</span>
                        </Label>
                        <Input id="name" name="name" placeholder="Masukkan nama Anda" required className="h-14 rounded-2xl px-6 bg-secondary/30 border-none focus-visible:ring-accent" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companyName" className="text-sm font-bold tracking-widest uppercase text-muted-foreground ml-1 flex items-center gap-2">
                          <Building2 className="h-4 w-4" /> Nama Perusahaan
                        </Label>
                        <Input id="companyName" name="companyName" placeholder="Contoh: PT Maju Bersama" className="h-14 rounded-2xl px-6 bg-secondary/30 border-none focus-visible:ring-accent" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-bold tracking-widest uppercase text-muted-foreground ml-1 flex items-center gap-2">
                          <Mail className="h-4 w-4" /> Email <span className="text-destructive">*</span>
                        </Label>
                        <Input id="email" name="email" type="email" placeholder="email@contoh.com" required className="h-14 rounded-2xl px-6 bg-secondary/30 border-none focus-visible:ring-accent" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="whatsapp" className="text-sm font-bold tracking-widest uppercase text-muted-foreground ml-1 flex items-center gap-2">
                          <Phone className="h-4 w-4" /> No. WhatsApp <span className="text-destructive">*</span>
                        </Label>
                        <Input id="whatsapp" name="whatsapp" placeholder="Contoh: 0812XXXXXXXX" required className="h-14 rounded-2xl px-6 bg-secondary/30 border-none focus-visible:ring-accent" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-sm font-bold tracking-widest uppercase text-muted-foreground ml-1 flex items-center gap-2">
                        <ChevronDown className="h-4 w-4" /> Jenis Layanan <span className="text-destructive">*</span>
                      </Label>
                      <Select name="service" required>
                        <SelectTrigger className="h-14 rounded-2xl px-6 bg-secondary/30 border-none focus-visible:ring-accent">
                          <SelectValue placeholder="Pilih Layanan Utama" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pajak">Konsultasi & Pelaporan Pajak</SelectItem>
                          <SelectItem value="digitalisasi">Digitalisasi Pembukuan</SelectItem>
                          <SelectItem value="advisory">Advisory Manajemen</SelectItem>
                          <SelectItem value="audit">Persiapan Audit & Compliance</SelectItem>
                          <SelectItem value="lainnya">Lainnya / Konsultasi Umum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-bold tracking-widest uppercase text-muted-foreground ml-1 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" /> Deskripsi Kebutuhan <span className="text-destructive">*</span>
                      </Label>
                      <Textarea 
                        id="description" 
                        name="description" 
                        placeholder="Jelaskan tantangan bisnis Anda saat ini..." 
                        required 
                        className="min-h-[160px] rounded-2xl px-6 py-5 bg-secondary/30 border-none focus-visible:ring-accent"
                      />
                    </div>

                    <Button type="submit" disabled={loading} className="w-full rounded-full h-16 font-bold text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all active:scale-95 flex items-center gap-3">
                      {loading ? 'Mengirim...' : (
                        <>Kirim Permintaan Konsultasi <Send className="h-6 w-6" /></>
                      )}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground font-medium uppercase tracking-widest">
                       Data Anda aman dan terjaga kerahasiaannya bersama kami.
                    </p>
                  </form>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
