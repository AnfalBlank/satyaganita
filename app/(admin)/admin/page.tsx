import { db } from "@/server/db";
import { inquiries, posts, services, faqs, testimonials } from "@/server/db/schema";
import { sql, desc, eq } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageSquare, 
  Briefcase, 
  FileText, 
  HelpCircle, 
  Plus, 
  Eye, 
  PlusCircle, 
  CheckCircle2, 
  Clock,
  Settings,
  Star
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

async function getStats() {
  const [inquiryCount] = await db.select({ count: sql<number>`count(*)` }).from(inquiries);
  const [postCount] = await db.select({ count: sql<number>`count(*)` }).from(posts);
  const [serviceCount] = await db.select({ count: sql<number>`count(*)` }).from(services);
  const [faqCount] = await db.select({ count: sql<number>`count(*)` }).from(faqs);
  const [testimonialCount] = await db.select({ count: sql<number>`count(*)` }).from(testimonials);
  const [pendingTestimonials] = await db.select({ count: sql<number>`count(*)` }).from(testimonials).where(eq(testimonials.approved, false));

  const latestInquiries = await db.query.inquiries.findMany({
    limit: 5,
    orderBy: [desc(inquiries.createdAt)],
  });

  const latestPosts = await db.query.posts.findMany({
    limit: 5,
    orderBy: [desc(posts.createdAt)],
  });

  const latestTestimonials = await db.query.testimonials.findMany({
    limit: 5,
    orderBy: [desc(testimonials.createdAt)],
  });

  return {
    inquiries: inquiryCount.count,
    posts: postCount.count,
    services: serviceCount.count,
    faqs: faqCount.count,
    testimonials: testimonialCount.count,
    pendingTestimonials: pendingTestimonials.count,
    latestInquiries,
    latestPosts,
    latestTestimonials,
  };
}

export default async function AdminDashboardPage() {
  const data = await getStats();

  const statCards = [
    {
      title: "Total Inquiries",
      value: data.inquiries,
      icon: MessageSquare,
      color: "text-blue-600",
      description: "Leads from consultation form",
    },
    {
      title: "Blog Posts",
      value: data.posts,
      icon: FileText,
      color: "text-purple-600",
      description: "Published articles",
    },
    {
      title: "Testimonials",
      value: data.testimonials,
      icon: Star,
      color: "text-yellow-600",
      description: `${data.pendingTestimonials} pending approval`,
    },
    {
      title: "FAQs",
      value: data.faqs,
      icon: HelpCircle,
      color: "text-orange-600",
      description: "Frequently asked questions",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Welcome to Satya Ganita Advisor management panel.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/" target="_blank">
              <Eye className="mr-2 h-4 w-4" />
              Lihat Website
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8 max-h-[600px] overflow-y-auto pr-2">
              {data.latestInquiries.length === 0 && data.latestPosts.length === 0 && data.latestTestimonials.length === 0 ? (
                <p className="text-sm text-muted-foreground">No recent activity found.</p>
              ) : (
                <>
                  {data.latestInquiries.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Latest Inquiries</h3>
                      {data.latestInquiries.map((inquiry) => (
                        <div key={inquiry.id} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <MessageSquare className="h-5 w-5" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">{inquiry.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {inquiry.service || "General Inquiry"} • {inquiry.createdAt?.toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={inquiry.status === "completed" ? "default" : "secondary"}>
                            {inquiry.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}

                  {data.latestTestimonials.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Latest Testimonials</h3>
                      {data.latestTestimonials.map((t) => (
                        <div key={t.id} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                            <Star className="h-5 w-5" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">{t.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {t.company || "Personal"} • {t.createdAt?.toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={t.approved ? "default" : "outline"}>
                            {t.approved ? "Approved" : "Pending"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}

                  {data.latestPosts.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Latest Blog Posts</h3>
                      {data.latestPosts.map((post) => (
                        <div key={post.id} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">{post.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {post.published ? "Published" : "Draft"} • {post.createdAt?.toLocaleDateString()}
                            </p>
                          </div>
                          {post.published ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <Clock className="h-4 w-4 text-orange-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/admin/posts">
                <PlusCircle className="mr-2 h-4 w-4 text-purple-600" />
                Buat Insight Baru
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/admin/inquiries">
                <MessageSquare className="mr-2 h-4 w-4 text-blue-600" />
                Lihat Semua Konsultasi
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/admin/testimonials">
                <Star className="mr-2 h-4 w-4 text-yellow-600" />
                Kelola Testimoni
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/admin/services">
                <PlusCircle className="mr-2 h-4 w-4 text-green-600" />
                Tambah Layanan Bisnis
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/admin/faqs">
                <PlusCircle className="mr-2 h-4 w-4 text-orange-600" />
                Tambah Pertanyaan (FAQ)
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/admin/categories">
                <Settings className="mr-2 h-4 w-4 text-gray-600" />
                Kelola Kategori
              </Link>
            </Button>
            <div className="rounded-lg bg-muted p-4 mt-4">
              <p className="text-xs text-muted-foreground">
                <strong>Tips:</strong> Pastikan untuk memverifikasi testimoni baru dari klien sebelum menampilkannya secara publik di website.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
