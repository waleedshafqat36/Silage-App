"use client";

import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onClose: (id: string) => void;
}

function SingleToast({ id, message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 4000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }[type];

  const icon = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  }[type];

  return (
    <div
      className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slideIn`}
      role="alert"
    >
      <span className="text-xl font-bold">{icon}</span>
      <span>{message}</span>
    </div>
  );
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handleToast = (event: CustomEvent) => {
      const toast: Toast = {
        id: Date.now().toString(),
        message: event.detail.message,
        type: event.detail.type,
      };
      setToasts((prev) => [...prev, toast]);
    };

    const toastListener = handleToast as EventListener;
    window.addEventListener("toast", toastListener);
    return () => window.removeEventListener("toast", toastListener);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className="fixed bottom-5 right-5 space-y-3 z-50 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <SingleToast
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={removeToast}
          />
        </div>
      ))}
    </div>
  );
}

export function showToast(message: string, type: ToastType = "info") {
  const event = new CustomEvent("toast", {
    detail: { message, type },
  });
  window.dispatchEvent(event);
}
