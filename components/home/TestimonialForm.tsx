"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  company: z.string().optional().default(""),
  role: z.string().optional().default(""),
  content: z.string().min(10, "Pesan minimal 10 karakter"),
  rating: z.number().min(1).max(5).default(5),
});

export function TestimonialForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      role: "",
      content: "",
      rating: 5,
    },
  });

  const ratingValue = watch("rating");

  const onSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Gagal mengirim testimoni");

      setSubmitted(true);
      toast.success("Testimoni berhasil dikirim! Terima kasih atas feedback Anda.");
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi nanti.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto text-center py-12">
        <CardHeader>
          <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-4">
            <Star className="h-10 w-10 text-green-600 fill-current" />
          </div>
          <CardTitle className="text-2xl">Terima Kasih!</CardTitle>
          <CardDescription className="text-lg">
            Testimoni Anda telah kami terima dan akan segera ditampilkan setelah proses verifikasi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setSubmitted(false)} variant="outline">
            Kirim Testimoni Lainnya
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Berikan Testimoni Anda</CardTitle>
        <CardDescription>
          Bagikan pengalaman Anda bekerja sama dengan Satya Ganita. Masukan Anda sangat berarti bagi kami.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" placeholder="Contoh: Budi Santoso" {...register("name")} />
              {errors.name && <p className="text-xs text-destructive">{(errors.name as any).message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Nama Perusahaan (Opsional)</Label>
              <Input id="company" placeholder="Contoh: PT. Maju Bersama" {...register("company")} />
              {errors.company && <p className="text-xs text-destructive">{(errors.company as any).message}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Jabatan (Opsional)</Label>
            <Input id="role" placeholder="Contoh: Direktur Utama" {...register("role")} />
            {errors.role && <p className="text-xs text-destructive">{(errors.role as any).message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setValue("rating", star)}
                  className={`focus:outline-none transition-colors ${
                    star <= ratingValue ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  <Star className="h-8 w-8 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Testimoni</Label>
            <Textarea
              id="content"
              placeholder="Bagaimana pengalaman Anda menggunakan layanan kami?"
              className="min-h-[120px]"
              {...register("content")}
            />
            {errors.content && <p className="text-xs text-destructive">{(errors.content as any).message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Mengirim..." : "Kirim Testimoni"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
