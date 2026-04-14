"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { FileText, Save, Loader2, Download } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";
import { UploadDropzone } from "@/components/ui/upload-dropzone";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [companyProfileUrl, setCompanyProfileUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  const handleLogoUpload = (urls: string[]) => {
    if (urls && urls.length > 0) {
      setLogoUrl(urls[0]);
      toast.success("Logo berhasil diunggah!");
    }
  };

  const handleProfileUpload = (urls: string[]) => {
    if (urls && urls.length > 0) {
      setCompanyProfileUrl(urls[0]);
      toast.success("File profile berhasil diunggah!");
    }
  };

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.company_profile_url) {
          setCompanyProfileUrl(data.company_profile_url);
        }
        if (data.logo_url) {
          setLogoUrl(data.logo_url);
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      // Save logo URL
      if (logoUrl) {
        await fetch("/api/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            key: "logo_url",
            value: logoUrl,
          }),
        });
      }

      // Save company profile URL
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "company_profile_url",
          value: companyProfileUrl,
        }),
      });

      if (res.ok) {
        toast.success("Pengaturan berhasil disimpan!");
      } else {
        toast.error("Gagal menyimpan pengaturan.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Pengaturan Website</h1>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Simpan Perubahan
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Logo Upload Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Logo Website</CardTitle>
            <CardDescription>
              Unggah logo perusahaan. Logo akan ditampilkan di header, hero section, dan footer. Rekomendasi: format PNG dengan background transparan, rasio 1:1.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {logoUrl ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center rounded-2xl border bg-muted/50 p-6">
                  <img
                    src={logoUrl}
                    alt="Logo Preview"
                    className="h-24 w-24 object-contain"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={() => setLogoUrl("")}
                  >
                    Hapus Logo
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-2 text-center">
                <UploadDropzone
                  onUploadComplete={handleLogoUpload}
                  accept="image/png,image/jpeg,image/svg+xml"
                  description={{
                    maxFiles: 1,
                    maxFileSize: "5MB",
                    fileTypes: "PNG, JPG, SVG",
                  }}
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  Format: PNG, JPG, SVG (Maks. 5MB)<br />
                  Rasio ideal: 1:1 (kotak)
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-full md:col-span-2">
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
            <CardDescription>
              Unggah file PDF Company Profile Satya Ganita. File ini akan tersedia untuk diunduh oleh klien di halaman Beranda.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4">
              {companyProfileUrl ? (
                <div className="flex items-center justify-between rounded-2xl border bg-muted/50 p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Company Profile Terunggah</p>
                      <p className="max-w-xs truncate text-xs text-muted-foreground">
                        {companyProfileUrl}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={companyProfileUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Pratinjau
                      </a>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setCompanyProfileUrl("")}
                    >
                      Hapus
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-2 text-center">
                  <UploadDropzone
                    onUploadComplete={handleProfileUpload}
                    accept="application/pdf"
                    description={{
                      maxFiles: 1,
                      maxFileSize: "10MB",
                      fileTypes: "PDF",
                    }}
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Format: PDF (Maks. 10MB)
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
