type ToastType = "success" | "error" | "info";

export const showToast = (message: string, type: ToastType = "info") => {
  const event = new CustomEvent("toast", {
    detail: { message, type },
  });
  window.dispatchEvent(event);
};
