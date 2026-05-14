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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Loader2, Save, Building2 } from "lucide-react";
import { toast } from "sonner";

interface IndustrySector {
  id: string;
  name: string;
  order: number;
}

export default function AdminIndustrySectorsPage() {
  const [sectors, setSectors] = useState<IndustrySector[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<IndustrySector | null>(null);

  const [name, setName] = useState("");
  const [order, setOrder] = useState(0);

  const fetchSectors = async () => {
    try {
      const res = await fetch("/api/admin/industry-sectors");
      const data = await res.json();
      setSectors(data);
    } catch {
      toast.error("Gagal memuat sektor industri");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSectors();
  }, []);

  const resetForm = () => {
    setName("");
    setOrder(0);
  };

  const openCreateDialog = () => {
    setEditingItem(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: IndustrySector) => {
    setEditingItem(item);
    setName(item.name);
    setOrder(item.order);
    setIsDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const method = editingItem ? "PUT" : "POST";
    const payload = { id: editingItem?.id, name, order };

    try {
      const res = await fetch("/api/admin/industry-sectors", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();
      toast.success(editingItem ? "Sektor diperbarui" : "Sektor ditambahkan");
      setIsDialogOpen(false);
      resetForm();
      fetchSectors();
    } catch {
      toast.error("Gagal menyimpan sektor");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus sektor industri ini?")) return;
    try {
      const res = await fetch(`/api/admin/industry-sectors?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Sektor dihapus");
      fetchSectors();
    } catch {
      toast.error("Gagal menghapus sektor");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sektor Industri</h1>
          <p className="text-muted-foreground">
            Kelola bidang usaha klien yang ditampilkan di trust bar halaman utama.
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Sektor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Semua Sektor Industri</CardTitle>
          <CardDescription>
            Bidang usaha yang dilayani Satya Ganita Advisor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Urutan</TableHead>
                <TableHead>Nama Sektor</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center h-24">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  </TableCell>
                </TableRow>
              ) : sectors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                    Belum ada sektor. Klik "Tambah Sektor" untuk memulai.
                  </TableCell>
                </TableRow>
              ) : (
                sectors.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.order}</TableCell>
                    <TableCell className="font-semibold">{item.name}</TableCell>
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
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Sektor" : "Tambah Sektor Industri"}</DialogTitle>
              <DialogDescription>
                Masukkan nama bidang usaha / sektor industri.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Sektor</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Perdagangan & Retail"
                  required
                />
              </div>
              <div className="grid gap-2 w-32">
                <Label htmlFor="order">Urutan Tampil</Label>
                <Input
                  id="order"
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                />
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
