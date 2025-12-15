"use client";

import { useState, useEffect, useRef } from "react";
import { showToast } from "@/components/Toast/Toast";

interface Image {
  _id: string;
  name: string;
  data: string;
  mimeType: string;
  size: number;
  uploadedBy: {
    name: string;
    email: string;
  };
  uploadedAt: string;
}

interface DeleteConfirmDialog {
  isOpen: boolean;
  imageId: string;
  imageName: string;
}

export default function ManageImages() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteDialog, setDeleteDialog] = useState<DeleteConfirmDialog>({
    isOpen: false,
    imageId: "",
    imageName: "",
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/images", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch images");
      const data = await res.json();
      setImages(Array.isArray(data) ? data : data.images || []);
    } catch (error) {
      console.error("[Fetch Images Error]:", error);
      showToast("Failed to load images", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    showToast("Uploading image...", "info");

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!file.type.startsWith("image/")) {
          showToast(`❌ ${file.name} is not an image`, "error");
          continue;
        }

        if (file.size > 5 * 1024 * 1024) {
          showToast(`❌ ${file.name} is too large (max 5MB)`, "error");
          continue;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
          const base64 = event.target?.result as string;

          try {
            const res = await fetch("/api/admin/images", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: file.name,
                data: base64,
                mimeType: file.type,
                size: file.size,
              }),
            });

            if (!res.ok) throw new Error("Failed to upload image");

            const data = await res.json();
            setImages((prev) => [data.image, ...prev]);
            showToast(`✅ ${file.name} uploaded successfully!`, "success");
          } catch (error) {
            console.error("Upload error:", error);
            showToast(`❌ Failed to upload ${file.name}`, "error");
          }
        };
        reader.readAsDataURL(file);
      }
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const openDeleteDialog = (id: string, name: string) => {
    setDeleteDialog({
      isOpen: true,
      imageId: id,
      imageName: name,
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({
      isOpen: false,
      imageId: "",
      imageName: "",
    });
  };

  const handleDeleteImage = async (id: string) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/admin/images/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete image");
      }

      setImages((prevImages) => prevImages.filter((img) => img._id !== id));
      showToast("✅ Image deleted successfully", "success");
      closeDeleteDialog();

      setTimeout(() => {
        fetchImages();
      }, 500);
    } catch (error) {
      console.error("[Delete Image Error]:", error);
      showToast(`❌ Failed to delete image: ${error}`, "error");
    } finally {
      setLoadingId(null);
    }
  };

  const filteredImages = images.filter((image) =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          🖼️ Image Gallery
        </h1>
        <p className="text-gray-600 mt-2">
          Manage and organize your blog images
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-dashed border-blue-300">
        <div className="flex flex-col items-center gap-4">
          <div className="text-5xl">📤</div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Upload Images
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop images here or click the button below (Max 5MB per image)
            </p>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
              uploading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed opacity-75"
                : "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg active:scale-95"
            }`}
          >
            {uploading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Choose Images
              </>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-gray-900"
        />
      </div>

      {/* Images Grid */}
      {filteredImages.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <div className="text-5xl mb-4">🏜️</div>
          <p className="text-gray-600 text-lg">No images found</p>
          <p className="text-gray-500 text-sm mt-2">
            {searchTerm
              ? "Try adjusting your search"
              : "Upload your first image to get started"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 group"
            >
              {/* Image Preview */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img
                  src={image.data}
                  alt={image.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => {
                      // Copy to clipboard
                      navigator.clipboard.writeText(image.data);
                      showToast("✅ Image data copied to clipboard!", "success");
                    }}
                    className="hidden group-hover:flex bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold gap-2 items-center hover:bg-gray-100"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </button>
                </div>
              </div>

              {/* Image Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-gray-900 line-clamp-2 text-sm">
                    {image.name}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">
                    {(image.size / 1024).toFixed(2)} KB
                  </p>
                </div>

                <div className="border-t pt-3 space-y-1">
                  <p className="text-xs text-gray-600">
                    <strong>Uploaded by:</strong> {image.uploadedBy.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(image.uploadedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {/* Actions */}
                <button
                  onClick={() => openDeleteDialog(image._id, image.name)}
                  disabled={loadingId === image._id}
                  className={`w-full px-3 py-2 font-semibold text-sm rounded-lg transition-all duration-300 ${
                    loadingId === image._id
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed opacity-75"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                  }`}
                >
                  {loadingId === image._id ? "..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteDialog.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Icon */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 flex justify-center">
              <div className="text-5xl">🗑️</div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Delete Image?</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Are you sure you want to delete "{deleteDialog.imageName}"?
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-xs text-red-700 font-semibold">
                  ⚠️ This action cannot be undone. The image will be permanently removed.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-gray-50 px-6 py-4 flex gap-3 border-t">
              <button
                onClick={closeDeleteDialog}
                disabled={loadingId === deleteDialog.imageId}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteImage(deleteDialog.imageId)}
                disabled={loadingId === deleteDialog.imageId}
                className={`flex-1 px-4 py-2 font-semibold rounded-lg transition-all duration-300 ${
                  loadingId === deleteDialog.imageId
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed opacity-50"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {loadingId === deleteDialog.imageId ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
