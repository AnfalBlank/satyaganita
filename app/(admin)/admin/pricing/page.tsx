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
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Loader2, Save, Star } from "lucide-react";
import { toast } from "sonner";

interface PricingPackage {
  id: string;
  name: string;
  revenue: string;
  price: string;
  period: string | null;
  focus: string;
  icon: string | null;
  popular: boolean;
  color: string | null;
  buttonColor: string | null;
  order: number;
}

export default function AdminPricingPage() {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PricingPackage | null>(null);

  const [name, setName] = useState("");
  const [revenue, setRevenue] = useState("");
  const [price, setPrice] = useState("");
  const [period, setPeriod] = useState("/bulan");
  const [focus, setFocus] = useState("");
  const [icon, setIcon] = useState("Package");
  const [popular, setPopular] = useState(false);
  const [color, setColor] = useState("border-primary");
  const [buttonColor, setButtonColor] = useState("bg-primary hover:bg-primary/90");
  const [order, setOrder] = useState(0);

  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/admin/pricing-packages");
      const data = await res.json();
      setPackages(data);
    } catch {
      toast.error("Gagal memuat paket harga");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const resetForm = () => {
    setName("");
    setRevenue("");
    setPrice("");
    setPeriod("/bulan");
    setFocus("");
    setIcon("Package");
    setPopular(false);
    setColor("border-primary");
    setButtonColor("bg-primary hover:bg-primary/90");
    setOrder(0);
  };

  const openCreateDialog = () => {
    setEditingItem(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: PricingPackage) => {
    setEditingItem(item);
    setName(item.name);
    setRevenue(item.revenue);
    setPrice(item.price);
    setPeriod(item.period || "/bulan");
    setFocus(item.focus);
    setIcon(item.icon || "Package");
    setPopular(item.popular);
    setColor(item.color || "border-primary");
    setButtonColor(item.buttonColor || "bg-primary hover:bg-primary/90");
    setOrder(item.order);
    setIsDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const method = editingItem ? "PUT" : "POST";
    const payload = {
      id: editingItem?.id,
      name,
      revenue,
      price,
      period,
      focus,
      icon,
      popular,
      color,
      buttonColor,
      order,
    };

    try {
      const res = await fetch("/api/admin/pricing-packages", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();
      toast.success(editingItem ? "Paket diperbarui" : "Paket ditambahkan");
      setIsDialogOpen(false);
      resetForm();
      fetchPackages();
    } catch {
      toast.error("Gagal menyimpan paket");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus paket harga ini?")) return;
    try {
      const res = await fetch(`/api/admin/pricing-packages?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Paket dihapus");
      fetchPackages();
    } catch {
      toast.error("Gagal menghapus paket");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paket Harga</h1>
          <p className="text-muted-foreground">
            Kelola paket layanan dan harga yang ditampilkan di halaman Paket.
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Paket
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Semua Paket</CardTitle>
          <CardDescription>
            Paket harga layanan Satya Ganita Advisor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Urutan</TableHead>
                <TableHead>Nama Paket</TableHead>
                <TableHead>Omzet Target</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Fokus</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  </TableCell>
                </TableRow>
              ) : packages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                    Belum ada paket. Klik "Tambah Paket" untuk memulai.
                  </TableCell>
                </TableRow>
              ) : (
                packages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell className="font-medium">{pkg.order}</TableCell>
                    <TableCell className="font-semibold">{pkg.name}</TableCell>
                    <TableCell className="text-sm">{pkg.revenue}</TableCell>
                    <TableCell className="font-medium">
                      {pkg.price}
                      <span className="text-xs text-muted-foreground">{pkg.period}</span>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                      {pkg.focus}
                    </TableCell>
                    <TableCell>
                      {pkg.popular ? (
                        <Badge className="bg-accent text-primary">
                          <Star className="h-3 w-3 mr-1" /> Populer
                        </Badge>
                      ) : (
                        <Badge variant="outline">Standar</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(pkg)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDelete(pkg.id)}
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
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Paket" : "Tambah Paket Harga"}</DialogTitle>
              <DialogDescription>
                Isi detail paket layanan dan harga.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nama Paket</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Micro Mentoring"
                    required
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

              <div className="grid gap-2">
                <Label htmlFor="revenue">Target Omzet</Label>
                <Input
                  id="revenue"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  placeholder="e.g. < Rp 8 Miliar / tahun"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Harga</Label>
                  <Input
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. Rp 2.000.000"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="period">Periode</Label>
                  <Input
                    id="period"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    placeholder="e.g. /bulan"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="focus">Fokus Layanan</Label>
                <Textarea
                  id="focus"
                  value={focus}
                  onChange={(e) => setFocus(e.target.value)}
                  placeholder="Jelaskan fokus utama paket ini..."
                  className="min-h-[80px]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="icon">
                    Icon{" "}
                    <span className="text-xs text-muted-foreground">(Lucide icon name)</span>
                  </Label>
                  <Input
                    id="icon"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    placeholder="e.g. Package, Zap, Crown"
                  />
                </div>
                <div className="grid gap-2 justify-end">
                  <Label htmlFor="popular">Tandai sebagai Populer</Label>
                  <div className="flex items-center gap-2 pt-2">
                    <Switch
                      id="popular"
                      checked={popular}
                      onCheckedChange={setPopular}
                    />
                    <span className="text-sm text-muted-foreground">
                      {popular ? "Ya, tampilkan badge Populer" : "Tidak"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="color">
                    Warna Border{" "}
                    <span className="text-xs text-muted-foreground">(Tailwind class)</span>
                  </Label>
                  <Input
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="e.g. border-emerald-500"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="buttonColor">
                    Warna Tombol{" "}
                    <span className="text-xs text-muted-foreground">(Tailwind class)</span>
                  </Label>
                  <Input
                    id="buttonColor"
                    value={buttonColor}
                    onChange={(e) => setButtonColor(e.target.value)}
                    placeholder="e.g. bg-emerald-500 hover:bg-emerald-600"
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
