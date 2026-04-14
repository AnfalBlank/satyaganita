"use client";

import { cn } from "@/lib/utils";
import { Loader2, Upload } from "lucide-react";
import { useId, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export type UploadDropzoneProps = {
  onUploadComplete?: (urls: string[]) => void;
  id?: string;
  accept?: string;
  description?:
    | {
        fileTypes?: string;
        maxFileSize?: string;
        maxFiles?: number;
      }
    | string;
};

export function UploadDropzone({
  onUploadComplete,
  id: _id,
  accept,
  description,
}: UploadDropzoneProps) {
  const id = useId();
  const [isPending, setIsPending] = useState(false);

  const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({
    onDrop: async (files) => {
      if (files.length > 0 && !isPending) {
        setIsPending(true);
        try {
          const formData = new FormData();
          files.forEach((file) => formData.append("files", file));

          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!res.ok) throw new Error("Upload failed");

          const data = await res.json();
          if (data.urls && onUploadComplete) {
            onUploadComplete(data.urls);
          }
          toast.success("Berkas berhasil diunggah!");
        } catch (error) {
          console.error("Upload error:", error);
          toast.error("Gagal mengunggah berkas. Silakan coba lagi.");
        } finally {
          setIsPending(false);
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        }
      }
    },
    noClick: true,
  });

  return (
    <div
      className={cn(
        "border-input text-foreground relative rounded-2xl border-2 border-dashed transition-all",
        {
          "border-primary bg-primary/5": isDragActive,
          "hover:border-primary/50": !isDragActive,
        }
      )}
    >
      <label
        {...getRootProps()}
        className={cn(
          "dark:bg-input/10 flex w-full min-w-72 cursor-pointer flex-col items-center justify-center rounded-2xl bg-transparent px-2 py-8 transition-colors",
          {
            "text-muted-foreground cursor-not-allowed": isPending,
            "hover:bg-accent/40": !isPending,
            "opacity-0": isDragActive,
          }
        )}
        htmlFor={_id || id}
      >
        <div className="my-2">
          {isPending ? (
            <Loader2 className="size-6 animate-spin" />
          ) : (
            <Upload className="size-6" />
          )}
        </div>

        <div className="mt-3 space-y-1 text-center">
          <p className="text-sm font-semibold">Drag and drop files here</p>

          <p className="text-muted-foreground max-w-64 text-xs">
            {typeof description === "string" ? (
              description
            ) : (
              <>
                {description?.maxFiles &&
                  `You can upload ${description.maxFiles} file${description.maxFiles !== 1 ? "s" : ""}.`}{" "}
                {description?.maxFileSize &&
                  `${description.maxFiles !== 1 ? "Each u" : "U"}p to ${description.maxFileSize}.`}{" "}
                {description?.fileTypes && `Accepted ${description.fileTypes}.`}
              </>
            )}
          </p>
        </div>

        <input
          {...getInputProps()}
          type="file"
          multiple
          id={_id || id}
          accept={accept}
          disabled={isPending}
        />
      </label>

      {isDragActive && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl">
          <div className="dark:bg-accent/40 bg-accent/20 flex size-full flex-col items-center justify-center rounded-2xl">
            <div className="my-2">
              <Upload className="size-6" />
            </div>

            <p className="mt-3 text-sm font-semibold">Drop files here</p>
          </div>
        </div>
      )}
    </div>
  );
}
