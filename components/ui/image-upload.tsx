"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  className?: string;
  disabled?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  multiple = false,
  maxFiles = 4,
  className,
  disabled = false,
}: ImageUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);
  const [fakeProgress, setFakeProgress] = React.useState(0);

  // Normalize value to array
  const images = React.useMemo(() => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return [value];
  }, [value]);

  const uploadFiles = async (filesToUpload: File[]) => {
    if (filesToUpload.length === 0) return;
    setIsPending(true);
    setFakeProgress(10);
    
    // Simulate progress animation
    const progressInterval = setInterval(() => {
      setFakeProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 200);

    try {
      const formData = new FormData();
      filesToUpload.forEach((f) => formData.append("files", f));

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      if (data.urls && data.urls.length > 0) {
        if (multiple) {
          onChange([...images, ...data.urls]);
        } else {
          onChange(data.urls[0] as string);
        }
      }
      toast.success("Gambar berhasil diunggah!");
    } catch (error) {
      console.error("Image upload failed", error);
      toast.error("Gagal mengunggah gambar. Silakan coba lagi.");
    } finally {
      clearInterval(progressInterval);
      setFakeProgress(100);
      setTimeout(() => {
        setIsPending(false);
        setFakeProgress(0);
      }, 500);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const filesToUpload = multiple
        ? Array.from(files).slice(0, maxFiles - images.length)
        : [files[0]!];
      uploadFiles(filesToUpload);
    }
    // Reset input
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled || isPending) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const filesToUpload = multiple
        ? Array.from(files).slice(0, maxFiles - images.length)
        : [files[0]!];
      uploadFiles(filesToUpload);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && !isPending) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeImage = (index: number) => {
    if (multiple) {
      const newImages = images.filter((_, i) => i !== index);
      onChange(newImages);
    } else {
      onChange("");
    }
  };

  const canAddMore = multiple ? images.length < maxFiles : images.length === 0;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Image previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {images.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="group bg-muted relative aspect-[4/3] overflow-hidden rounded-2xl border"
            >
              <Image
                src={url}
                alt={`Upload ${index + 1}`}
                fill
                className="object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 size-6 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => removeImage(index)}
                disabled={disabled || isPending}
              >
                <X className="size-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Upload area */}
      {canAddMore && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "relative rounded-2xl border-2 border-dashed transition-all",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <label
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center p-8",
              (disabled || isPending) && "cursor-not-allowed"
            )}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple={multiple}
              onChange={handleFileChange}
              disabled={disabled || isPending}
              className="sr-only"
            />

            {isPending ? (
              <>
                <Loader2 className="text-muted-foreground mb-3 size-10 animate-spin" />
                <p className="text-sm font-medium">Uploading...</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {fakeProgress}% complete
                </p>
              </>
            ) : (
              <>
                <div className="bg-muted mb-3 flex size-12 items-center justify-center rounded-full">
                  {isDragging ? (
                    <ImageIcon className="text-primary size-6" />
                  ) : (
                    <Upload className="text-muted-foreground size-6" />
                  )}
                </div>
                <p className="text-sm font-medium">
                  {isDragging
                    ? "Drop images here"
                    : "Click or drag images to upload"}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {multiple
                    ? `Up to ${maxFiles} images • PNG, JPG, WebP`
                    : "PNG, JPG, WebP"}
                </p>
              </>
            )}
          </label>
        </div>
      )}

      {/* Progress bar */}
      {isPending && fakeProgress > 0 && (
        <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${fakeProgress}%` }}
          />
        </div>
      )}
    </div>
  );
}
