import { useState, useCallback } from 'react'

interface ToastOptions {
  title: string
  description?: string
  duration?: number
  variant?: 'default' | 'destructive'
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastOptions[]>([])

  const toast = useCallback((options: ToastOptions) => {
    const id = Date.now()
    const newToast = { ...options, id }
    setToasts((prevToasts) => [...prevToasts, newToast])

    if (options.duration !== Infinity) {
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
      }, options.duration || 5000)
    }
  }, [])

  return { toast, toasts }
}

export { useToast as toast }