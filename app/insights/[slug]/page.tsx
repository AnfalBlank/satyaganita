import { Metadata } from "next";
import { db } from "@/server/db";
import { posts, categories } from "@/server/db/schema";
import { eq, and, ne, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import { InsightDetailClient } from "@/components/insights/InsightDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  const post = await db.query.posts.findFirst({
    where: eq(posts.slug, slug),
  });

  if (!post) return null;

  // Fetch the category name if it exists
  let categoryName = "Insight";
  if (post.category) {
    const cat = await db.query.categories.findFirst({
      where: eq(categories.id, post.category),
    });
    if (cat) categoryName = cat.name;
  }

  // Fetch related posts
  const relatedPosts = await db.query.posts.findMany({
    where: and(
      ne(posts.id, post.id),
      eq(posts.published, true),
      post.category ? eq(posts.category, post.category) : undefined
    ),
    limit: 3,
    orderBy: [desc(posts.createdAt)],
  });

  // Fallback for related posts
  if (relatedPosts.length < 3) {
    const recentPosts = await db.query.posts.findMany({
      where: and(
        ne(posts.id, post.id),
        eq(posts.published, true),
        ...relatedPosts.map(rp => ne(posts.id, rp.id))
      ),
      limit: 3 - relatedPosts.length,
      orderBy: [desc(posts.createdAt)],
    });
    relatedPosts.push(...recentPosts);
  }

  return {
    ...post,
    categoryName,
    relatedPosts: relatedPosts.map(rp => ({
      ...rp,
      createdAt: rp.createdAt || new Date(),
    })),
    createdAt: post.createdAt || new Date(),
    published: !!post.published,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan",
    };
  }

  const title = `${post.title} | Satya Ganita Insights`;
  const description = post.excerpt || "Baca artikel terbaru dari Satya Ganita seputar pajak, bisnis, dan manajemen keuangan.";
  const ogImage = post.coverImage || "https://images.unsplash.com/photo-1565688527174-775059ac429c?auto=format&fit=crop&q=80&w=1200&h=630";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://satyaganita.co.id/insights/${slug}`,
      siteName: "Satya Ganita",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "id_ID",
      type: "article",
      publishedTime: post.createdAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: ["Satya Ganita Team"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return notFound();
  }

  return <InsightDetailClient post={post} />;
}
