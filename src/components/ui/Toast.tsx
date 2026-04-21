import { AnimatePresence, motion } from 'framer-motion'
import { useToastStore } from '../../store/toastStore'

export function ToastViewport() {
  const toasts = useToastStore((s) => s.toasts)
  const dismiss = useToastStore((s) => s.dismiss)

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[300] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto max-w-sm rounded-xl border border-ink/[0.08] bg-paper px-5 py-3 text-sm text-ink shadow-lg shadow-black/10"
          >
            <div className="flex items-start justify-between gap-4">
              <p
                className={
                  t.kind === 'success' ? 'text-ink' : 'text-gold-dark'
                }
              >
                {t.message}
              </p>
              <button
                type="button"
                className="shrink-0 text-xs text-muted hover:text-ink"
                onClick={() => dismiss(t.id)}
              >
                ✕
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
