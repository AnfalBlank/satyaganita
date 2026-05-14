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
import { Plus, Pencil, Trash2, Shield, Loader2, Save } from "lucide-react";
import { toast } from "sonner";

interface Guarantee {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  order: number;
}

export default function AdminGuaranteesPage() {
  const [guarantees, setGuarantees] = useState<Guarantee[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Guarantee | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("Shield");
  const [order, setOrder] = useState(0);

  const fetchGuarantees = async () => {
    try {
      const res = await fetch("/api/admin/guarantees");
      const data = await res.json();
      setGuarantees(data);
    } catch {
      toast.error("Gagal memuat data garansi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuarantees();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setIcon("Shield");
    setOrder(0);
  };

  const openCreateDialog = () => {
    setEditingItem(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: Guarantee) => {
    setEditingItem(item);
    setTitle(item.title);
    setDescription(item.description);
    setIcon(item.icon || "Shield");
    setOrder(item.order);
    setIsDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const method = editingItem ? "PUT" : "POST";
    const payload = { id: editingItem?.id, title, description, icon, order };

    try {
      const res = await fetch("/api/admin/guarantees", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();
      toast.success(editingItem ? "Garansi diperbarui" : "Garansi ditambahkan");
      setIsDialogOpen(false);
      resetForm();
      fetchGuarantees();
    } catch {
      toast.error("Gagal menyimpan garansi");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus garansi ini?")) return;
    try {
      const res = await fetch(`/api/admin/guarantees?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Garansi dihapus");
      fetchGuarantees();
    } catch {
      toast.error("Gagal menghapus garansi");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Garansi Layanan</h1>
          <p className="text-muted-foreground">
            Kelola poin garansi yang ditampilkan di halaman utama.
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Garansi
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Semua Garansi</CardTitle>
          <CardDescription>
            Garansi layanan yang ditampilkan di section "Apa Yang Anda Dapatkan?".
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Urutan</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  </TableCell>
                </TableRow>
              ) : guarantees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                    Belum ada garansi. Klik "Tambah Garansi" untuk memulai.
                  </TableCell>
                </TableRow>
              ) : (
                guarantees.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.order}</TableCell>
                    <TableCell className="font-semibold">{item.title}</TableCell>
                    <TableCell className="max-w-xs truncate text-muted-foreground">
                      {item.description}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{item.icon || "-"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDelete(item.id)}
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
              <DialogTitle>{editingItem ? "Edit Garansi" : "Tambah Garansi"}</DialogTitle>
              <DialogDescription>
                Isi detail poin garansi layanan.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Judul</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Transfer Knowledge"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan manfaat garansi ini..."
                  className="min-h-[100px]"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="icon">
                    Icon (Lucide){" "}
                    <span className="text-xs text-muted-foreground">
                      e.g. Shield, Award, TrendingUp
                    </span>
                  </Label>
                  <Input
                    id="icon"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    placeholder="Shield"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="order">Urutan Tampil</Label>
                  <Input
                    id="order"
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
