"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Loader2, Save, Eye, ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/ui/image-upload";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  published: boolean;
  category: string | null;
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [published, setPublished] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  async function fetchPosts() {
    try {
      const res = await fetch("/api/posts?admin=true");
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Gagal memuat artikel");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch {
      console.error("Failed to fetch categories");
    }
  }

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

  const handleOpenDialog = (post?: Post) => {
    if (post) {
      setEditingPost(post);
      setTitle(post.title);
      setSlug(post.slug);
      setContent(post.content);
      setExcerpt(post.excerpt || "");
      setCoverImage(post.coverImage || "");
      setPublished(post.published);
      setCategoryId(post.category || "");
    } else {
      setEditingPost(null);
      setTitle("");
      setSlug("");
      setContent("");
      setExcerpt("");
      setCoverImage("");
      setPublished(false);
      setCategoryId("");
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Judul artikel wajib diisi");
      return;
    }
    if (!content.trim()) {
      toast.error("Konten artikel wajib diisi");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        id: editingPost?.id,
        title,
        slug: slug || generateSlug(title),
        content,
        excerpt,
        coverImage,
        published,
        category: categoryId || null,
      };
      const method = editingPost ? "PUT" : "POST";

      const res = await fetch("/api/posts", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Gagal menyimpan");
      }

      toast.success(`Artikel ${editingPost ? "diperbarui" : "dibuat"} berhasil`);
      fetchPosts();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus artikel ini? Tindakan ini tidak dapat dibatalkan.")) return;

    try {
      const res = await fetch("/api/posts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error();

      toast.success("Artikel dihapus");
      fetchPosts();
    } catch {
      toast.error("Gagal menghapus artikel");
    }
  };

  const handleTogglePublish = async (post: Post) => {
    try {
      const res = await fetch("/api/posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...post, published: !post.published }),
      });
      if (!res.ok) throw new Error();
      toast.success(post.published ? "Artikel dijadikan draft" : "Artikel dipublikasikan");
      fetchPosts();
    } catch {
      toast.error("Gagal mengubah status artikel");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Artikel / Insights</h1>
          <p className="text-muted-foreground">Kelola artikel dan insight pajak untuk website.</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          Tulis Artikel
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cover</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                  </TableCell>
                </TableRow>
              ) : posts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    Belum ada artikel. Klik "Tulis Artikel" untuk memulai.
                  </TableCell>
                </TableRow>
              ) : (
                posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-16 h-10 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-16 h-10 bg-muted rounded-md flex items-center justify-center">
                          <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium max-w-[200px]">
                      <div className="truncate">{post.title}</div>
                      <div className="text-xs text-muted-foreground truncate">/insights/{post.slug}</div>
                    </TableCell>
                    <TableCell>
                      {categories.find((c) => c.id === post.category)?.name || (
                        <span className="text-muted-foreground text-xs">Tanpa Kategori</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <button onClick={() => handleTogglePublish(post)}>
                        <Badge
                          className={
                            post.published
                              ? "bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer"
                              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 cursor-pointer"
                          }
                        >
                          {post.published ? "Dipublikasikan" : "Draft"}
                        </Badge>
                      </button>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild title="Lihat artikel">
                          <a href={`/insights/${post.slug}`} target="_blank">
                            <Eye className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleOpenDialog(post)} title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(post.id)} title="Hapus">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPost ? "Edit Artikel" : "Tulis Artikel Baru"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 py-2">
            {/* Title & Slug */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Judul Artikel <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!editingPost) setSlug(generateSlug(e.target.value));
                  }}
                  placeholder="e.g. Cara Menghemat Pajak Secara Legal"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">
                  Slug URL{" "}
                  <span className="text-xs text-muted-foreground">(auto-generate dari judul)</span>
                </Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="cara-menghemat-pajak-secara-legal"
                />
              </div>
            </div>

            {/* Category & Publish */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Kategori</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Tanpa Kategori</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status Publikasi</Label>
                <div className="flex items-center gap-3 pt-2 border rounded-md px-3 py-2">
                  <Switch
                    id="published"
                    checked={published}
                    onCheckedChange={setPublished}
                  />
                  <Label htmlFor="published" className="cursor-pointer">
                    {published ? (
                      <span className="text-green-600 font-medium">Dipublikasikan</span>
                    ) : (
                      <span className="text-yellow-600 font-medium">Draft (tidak tampil)</span>
                    )}
                  </Label>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className="space-y-2">
              <Label>
                Gambar Cover{" "}
                <span className="text-xs text-muted-foreground">
                  (Rekomendasi: 1200×675px, rasio 16:9)
                </span>
              </Label>
              {coverImage ? (
                <div className="relative rounded-xl overflow-hidden border">
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7"
                    onClick={() => setCoverImage("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <ImageUpload
                  value={coverImage}
                  onChange={(val) => setCoverImage(Array.isArray(val) ? val[0] || "" : val)}
                />
              )}
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label htmlFor="excerpt">
                Ringkasan / Excerpt{" "}
                <span className="text-xs text-muted-foreground">
                  (ditampilkan di daftar artikel, maks. 200 karakter)
                </span>
              </Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Ringkasan singkat artikel ini..."
                maxLength={200}
                rows={2}
              />
              <p className="text-xs text-muted-foreground text-right">{excerpt.length}/200</p>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label>
                Konten Artikel <span className="text-destructive">*</span>
              </Label>
              <p className="text-xs text-muted-foreground">
                Gunakan tombol <strong>Upload</strong> di toolbar untuk menyisipkan gambar dari komputer, atau tombol gambar untuk URL.
              </p>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Tulis atau paste konten artikel dari Word di sini..."
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {editingPost ? "Perbarui Artikel" : "Simpan Artikel"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
