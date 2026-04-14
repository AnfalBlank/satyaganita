"use client";

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { CTASection } from '@/components/home/CTASection'
import { Calendar, User, ArrowLeft, Share2, Tag, Clock, Linkedin, Twitter, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { calculateReadingTime, formatContent, formatDate } from "@/lib/utils";

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  coverImage: string | null;
  createdAt: string | Date | null;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  published: boolean | null;
  category: string | null;
  categoryName: string;
  createdAt: string | Date | null;
  relatedPosts?: RelatedPost[];
}

export function InsightDetailClient({ post }: { post: Post }) {
  const readingTime = calculateReadingTime(post.content);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = encodeURIComponent(post.title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${shareTitle}%20${encodeURIComponent(currentUrl)}`
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-48 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
           <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
              <Link href="/insights" className="inline-flex items-center text-muted-foreground hover:text-accent font-bold text-[10px] uppercase tracking-widest transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Insights
              </Link>
              <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-accent font-bold text-[10px] uppercase tracking-widest transition-colors">
                Home <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Link>
           </div>
           
           <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-widest mb-6">
              <span className="bg-accent text-white px-4 py-2 rounded-full shadow-lg shadow-accent/20">
                {post.categoryName}
              </span>
              <div className="flex items-center gap-1.5 text-muted-foreground bg-secondary/50 px-4 py-2 rounded-full">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.createdAt || new Date())}
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground bg-secondary/50 px-4 py-2 rounded-full">
                <Clock className="h-3.5 w-3.5" />
                {readingTime} Menit Baca
              </div>
           </div>

           <h1 className="text-4xl md:text-6xl font-black text-primary mb-8 tracking-tight leading-[1.1]">
             {post.title}
           </h1>

           <div className="flex items-center gap-4 py-8 border-y border-secondary/50 mb-12 group">
              <div className="h-14 w-14 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10 overflow-hidden">
                <User className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="text-sm font-black text-primary">Satya Ganita Team</p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">Business & Tax Experts</p>
              </div>
              
              <div className="ml-auto flex items-center gap-2">
                <p className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-muted-foreground mr-2">Share This</p>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-full hover:bg-accent/10 hover:text-accent transition-all duration-300"
                    onClick={() => window.open(shareLinks.linkedin, '_blank')}
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-full hover:bg-accent/10 hover:text-accent transition-all duration-300"
                    onClick={() => window.open(shareLinks.twitter, '_blank')}
                    title="Share on Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-full hover:bg-accent/10 hover:text-accent transition-all duration-300"
                    onClick={() => window.open(shareLinks.whatsapp, '_blank')}
                    title="Share on WhatsApp"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
           {post.coverImage && (
             <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden mb-16 shadow-2xl ring-1 ring-primary/5">
                <Image 
                  src={post.coverImage} 
                  alt={post.title} 
                  fill
                  className="object-cover"
                  priority
                />
             </div>
           )}

           <div 
             className="prose prose-xl prose-primary max-w-none 
                        prose-headings:text-primary prose-headings:font-black 
                        prose-headings:tracking-tight
                        prose-p:text-muted-foreground prose-p:leading-[1.8]
                        prose-p:mb-8
                        prose-strong:text-primary prose-strong:font-black
                        prose-a:text-accent prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                        prose-img:rounded-[2rem] prose-img:shadow-xl"
             dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
           />
           
           <div className="mt-24 pt-12 border-t border-secondary/50 flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest mr-2">
                  <Tag className="h-3.5 w-3.5" /> Tags
                </div>
                <span className="bg-secondary/50 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors cursor-pointer">Pajak UMKM</span>
                <span className="bg-secondary/50 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors cursor-pointer">Bisnis</span>
              </div>
              
              <div className="flex items-center gap-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Bagikan Artikel</p>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={() => window.open(shareLinks.linkedin, '_blank')}><Linkedin className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={() => window.open(shareLinks.twitter, '_blank')}><Twitter className="h-4 w-4" /></Button>
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={() => window.open(shareLinks.whatsapp, '_blank')}><MessageCircle className="h-4 w-4" /></Button>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Related Posts Section */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="py-24 bg-secondary/10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-between mb-16">
              <div>
                <h2 className="text-3xl font-black text-primary mb-2 tracking-tight">Mungkin Anda Suka</h2>
                <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Rekomendasi artikel untuk Anda</p>
              </div>
              <Link href="/insights" className="text-accent font-black text-[10px] uppercase tracking-widest border-b-2 border-accent/20 hover:border-accent transition-colors pb-1">
                Lihat Semua Insights
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {post.relatedPosts.map((related) => (
                <Link key={related.id} href={`/insights/${related.slug}`} className="group">
                  <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 shadow-lg shadow-primary/5 group-hover:shadow-2xl transition-all duration-500">
                    {related.coverImage ? (
                      <Image 
                        src={related.coverImage} 
                        alt={related.title} 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary flex items-center justify-center">
                        <Tag className="h-12 w-12 text-primary/10" />
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-3">
                    {formatDate(related.createdAt || new Date())}
                  </p>
                  <h3 className="text-xl font-black text-primary group-hover:text-accent transition-colors leading-tight line-clamp-2">
                    {related.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
