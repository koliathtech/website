import { toast as toastify } from "react-toastify"

export function useToast() {
  return {
    toast: ({ title, description, variant }: { title: string; description?: string; variant?: "destructive" }) => {
      toastify(
        <div>
          <strong>{title}</strong>
          {description && <div>{description}</div>}
        </div>,
        { type: variant === "destructive" ? "error" : "success" }
      )
    },
  }
}