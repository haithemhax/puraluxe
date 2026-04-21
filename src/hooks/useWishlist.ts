import { useWishlistStore } from '../store/wishlistStore'

export function useWishlist() {
  const ids = useWishlistStore((s) => s.ids)
  const toggle = useWishlistStore((s) => s.toggle)
  const clear = useWishlistStore((s) => s.clear)
  return {
    ids,
    toggle,
    clear,
    has: (productId: string) => ids.includes(productId),
    count: ids.length,
  }
}
