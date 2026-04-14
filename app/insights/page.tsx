"use client";

import { useState, useEffect } from "react";
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { CTASection } from '@/components/home/CTASection'
import { Search, Calendar, User, ArrowRight, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  published: boolean;
  category: string | null;
  createdAt: string;
  authorId: string | null;
}

interface Category {
  id: string;
  name: string;
}

export default function InsightsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsRes, catsRes] = await Promise.all([
          fetch("/api/posts"),
          fetch("/api/categories")
        ]);
        const postsData = await postsRes.json();
        const catsData = await catsRes.json();
        
        // Only show published posts for public view
        setPosts(postsData.filter((p: Post) => p.published));
        setCategories([{ id: "all", name: "Semua" }, ...catsData]);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "Semua" || 
      categories.find(c => c.name === selectedCategory)?.id === post.category;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-48 pb-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
           <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-[2px] w-6 bg-accent" />
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                Insights & Updates
              </span>
              <div className="h-[2px] w-6 bg-accent" />
           </div>
           <h1 className="text-4xl md:text-6xl font-bold text-primary mb-8 tracking-tight">Professional Insights</h1>
           <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12">
             Update regulasi, strategi manajemen, dan tips praktis untuk pertumbuhan bisnis berkelanjutan.
           </p>

           {/* Search & Categories */}
           <div className="max-w-2xl mx-auto relative flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Cari topik atau artikel..." 
                  className="h-14 pl-14 rounded-full bg-secondary/50 border-none shadow-sm focus-visible:ring-accent" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="h-14 rounded-full px-8 bg-primary hover:bg-primary/90">Cari</Button>
           </div>

           <div className="flex flex-wrap justify-center gap-2 mt-12">
              {categories.map(cat => (
                <Button 
                  key={cat.id} 
                  variant={cat.name === selectedCategory ? 'default' : 'outline'} 
                  className="rounded-full px-6 h-10 text-xs font-bold uppercase tracking-widest transition-all"
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  {cat.name}
                </Button>
              ))}
           </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-24 bg-white">
        <div className="container mx-auto px-4">
           {isLoading ? (
             <div className="flex flex-col items-center justify-center py-20">
               <Loader2 className="w-12 h-12 animate-spin text-accent mb-4" />
               <p className="text-muted-foreground font-medium">Memuat artikel...</p>
             </div>
           ) : filteredPosts.length === 0 ? (
             <div className="text-center py-20">
               <p className="text-xl text-muted-foreground">Belum ada artikel yang dipublikasikan.</p>
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="group flex flex-col h-full">
                     <Link href={`/insights/${post.slug}`} className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 block bg-secondary">
                        {post.coverImage ? (
                          <Image 
                            src={post.coverImage} 
                            alt={post.title} 
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-secondary">
                            <span className="text-muted-foreground">No image</span>
                          </div>
                        )}
                        <div className="absolute top-6 left-6">
                           <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg">
                             {categories.find(c => c.id === post.category)?.name || "Insight"}
                           </span>
                        </div>
                     </Link>
                     <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5" />
                          Satya Ganita Team
                        </div>
                     </div>
                     <h3 className="text-2xl font-bold text-primary mb-4 leading-snug group-hover:text-accent transition-colors">
                        <Link href={`/insights/${post.slug}`}>{post.title}</Link>
                     </h3>
                     <p className="text-muted-foreground leading-relaxed mb-8 line-clamp-3">
                        {post.excerpt}
                     </p>
                     <div className="mt-auto">
                        <Link href={`/insights/${post.slug}`} className="inline-flex items-center text-primary font-bold text-xs uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform">
                          Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                     </div>
                  </article>
                ))}
             </div>
           )}
        </div>
      </section>

      <CTASection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
