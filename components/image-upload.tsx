"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Upload, X } from "lucide-react"
import Image from "next/image"
import { getSupabaseBrowser } from "@/lib/supabase"

interface ImageUploadProps {
  onImageUploaded: (url: string) => void
  existingImageUrl?: string
  businessId?: string
}

export function ImageUpload({ onImageUploaded, existingImageUrl, businessId }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(existingImageUrl || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Create a local preview
      const localPreview = URL.createObjectURL(file)
      setPreviewUrl(localPreview)

      // Upload to Supabase Storage
      const supabase = getSupabaseBrowser()

      // Create a unique filename
      const fileExt = file.name.split(".").pop()
      const fileName = `${businessId || "temp"}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `business-images/${fileName}`

      const { data, error } = await supabase.storage.from("images").upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (error) throw error

      // Get the public URL
      const { data: urlData } = supabase.storage.from("images").getPublicUrl(filePath)

      // Call the callback with the URL
      onImageUploaded(urlData.publicUrl)

      toast({
        title: "Image uploaded successfully",
        description: "Your image has been uploaded and will be displayed on your business listing.",
      })
    } catch (error: any) {
      console.error("Error uploading image:", error)
      toast({
        title: "Upload failed",
        description: error.message || "There was a problem uploading your image. Please try again.",
        variant: "destructive",
      })
      // Reset preview if upload failed
      setPreviewUrl(existingImageUrl || null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setPreviewUrl(null)
    onImageUploaded("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        id="image-upload"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={isUploading}
      />

      {previewUrl ? (
        <div className="relative rounded-md overflow-hidden">
          <div className="relative aspect-video w-full">
            <Image src={previewUrl || "/placeholder.svg"} alt="Business image preview" fill className="object-cover" />
          </div>
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemoveImage}
            disabled={isUploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          {isUploading ? (
            <>
              <Loader2 className="h-8 w-8 text-muted-foreground mb-2 animate-spin" />
              <p className="text-sm text-muted-foreground">Uploading image...</p>
            </>
          ) : (
            <>
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload an image</p>
              <p className="text-xs text-muted-foreground mt-1">JPG, PNG, GIF up to 5MB</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
