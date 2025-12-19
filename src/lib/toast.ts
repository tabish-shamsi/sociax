import { toast } from "sonner";

export const showErrorToast = (message: string) => {
  toast.error(message, {
    style: {
      "--normal-bg": "color-mix(in oklab, var(--destructive) 10%, var(--background))",
      "--normal-text": "var(--destructive)",
      "--normal-border": "var(--destructive)",
    } as React.CSSProperties,
  });
};

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    style: {
      "--normal-bg": "color-mix(in oklab, var(--success) 10%, var(--background))",
      "--normal-text": "var(--success)",
      "--normal-border": "var(--success)",
    } as React.CSSProperties,
  });
};