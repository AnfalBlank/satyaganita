"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  approved: boolean;
  createdAt: string;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [approved, setApproved] = useState(false);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials?all=true");
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      toast.error("Failed to fetch testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { id: editingTestimonial?.id, name, company, role, content, rating, approved };
    const method = editingTestimonial ? "PUT" : "POST";

    try {
      const res = await fetch("/api/testimonials", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingTestimonial ? "Testimonial updated" : "Testimonial created");
        setIsDialogOpen(false);
        setEditingTestimonial(null);
        resetForm();
        fetchTestimonials();
      } else {
        toast.error("Failed to save testimonial");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const toggleApproval = async (t: Testimonial) => {
    try {
      const res = await fetch("/api/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...t, approved: !t.approved }),
      });

      if (res.ok) {
        toast.success(t.approved ? "Testimonial unapproved" : "Testimonial approved");
        fetchTestimonials();
      } else {
        toast.error("Failed to update testimonial status");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const res = await fetch("/api/testimonials", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        toast.success("Testimonial deleted");
        fetchTestimonials();
      } else {
        toast.error("Failed to delete testimonial");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const resetForm = () => {
    setName("");
    setCompany("");
    setRole("");
    setContent("");
    setRating(5);
    setApproved(false);
  };

  const openCreateDialog = () => {
    setEditingTestimonial(null);
    resetForm();
    setApproved(true); // Default to approved for admin creation
    setIsDialogOpen(true);
  };

  const openEditDialog = (t: Testimonial) => {
    setEditingTestimonial(t);
    setName(t.name);
    setCompany(t.company || "");
    setRole(t.role || "");
    setContent(t.content);
    setRating(t.rating);
    setApproved(t.approved);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Testimoni</h1>
          <p className="text-muted-foreground">
            Kelola feedback dari klien untuk ditampilkan di website.
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Testimoni
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Semua Testimoni</CardTitle>
          <CardDescription>
            Testimoni yang masuk dari user maupun yang diinput admin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Klien</TableHead>
                <TableHead>Perusahaan / Jabatan</TableHead>
                <TableHead>Isi Testimoni</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    Memuat testimoni...
                  </TableCell>
                </TableRow>
              ) : testimonials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    Tidak ada testimoni.
                  </TableCell>
                </TableRow>
              ) : (
                testimonials.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>
                      <Badge variant={t.approved ? "default" : "secondary"}>
                        {t.approved ? "Disetujui" : "Menunggu"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">{t.name}</TableCell>
                    <TableCell>
                      <div className="text-sm">{t.company}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      "{t.content}"
                    </TableCell>
                    <TableCell>{t.rating} / 5</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          title={t.approved ? "Batalkan Persetujuan" : "Setujui"}
                          onClick={() => toggleApproval(t)}
                        >
                          {t.approved ? (
                            <XCircle className="h-4 w-4 text-orange-500" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(t)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDelete(t.id)}
                        >
                          <Trash2 className="h-4 w-4" />
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
        <DialogContent className="sm:max-w-[525px]">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? "Edit Testimoni" : "Tambah Testimoni"}</DialogTitle>
              <DialogDescription>
                Isi detail testimoni klien.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Klien</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Budi Santoso"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="company">Perusahaan</Label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. PT Maju Bersama"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Jabatan</Label>
                  <Input
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. CEO"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Isi Testimoni</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Apa yang dikatakan klien?"
                  className="min-h-[100px]"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="grid gap-2 w-32">
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="approved"
                    checked={approved}
                    onCheckedChange={setApproved}
                  />
                  <Label htmlFor="approved">Tampilkan di Web</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
