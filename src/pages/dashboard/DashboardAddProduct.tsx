import { useState, useRef, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { useCatalogStore } from '../../store/catalogStore'
import { useToastStore } from '../../store/toastStore'
import { compressImageFile } from '../../utils/imageCompress'
import type { ProductCategory } from '../../types/product'
import { useShopCategoryStore } from '../../store/shopCategoryStore'

const MAX_FILE_MB = 8

export default function DashboardAddProduct() {
  const navigate = useNavigate()
  const addOwnerProduct = useCatalogStore((s) => s.addOwnerProduct)
  const push = useToastStore((s) => s.push)
  const shopCategories = useShopCategoryStore((s) => s.categories)
  const firstCat = shopCategories[0]?.id ?? 'face'

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [tagline, setTagline] = useState('')
  const [price10, setPrice10] = useState('')
  const [price30, setPrice30] = useState('')
  const [category, setCategory] = useState<ProductCategory>(firstCat)
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (
      shopCategories.length > 0 &&
      !shopCategories.some((c) => c.id === category)
    ) {
      setCategory(firstCat)
    }
  }, [shopCategories, category, firstCat])

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      push(`Image must be under ${MAX_FILE_MB}MB.`, 'info')
      return
    }
    setBusy(true)
    try {
      const dataUrl = await compressImageFile(file)
      setImageDataUrl(dataUrl)
      setPreview(dataUrl)
    } catch {
      push('Could not process that image. Try JPG or PNG.', 'info')
    } finally {
      setBusy(false)
      e.target.value = ''
    }
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const p10 = Number(price10)
    const p30 = Number(price30)
    if (!name.trim() || !description.trim()) {
      push('Name and description are required.', 'info')
      return
    }
    if (!imageDataUrl) {
      push('Please upload a product photo.', 'info')
      return
    }
    if (!Number.isFinite(p10) || !Number.isFinite(p30) || p10 < 0 || p30 < 0) {
      push('Enter valid prices for 10ml and 30ml.', 'info')
      return
    }
    const product = addOwnerProduct({
      name: name.trim(),
      description: description.trim(),
      tagline: tagline.trim() || undefined,
      price10: p10,
      price30: p30,
      imageDataUrl,
      category,
    })
    push(`“${product.name}” is now in the catalog.`, 'success')
    navigate('/dashboard/products')
  }

  return (
    <div>
      <Helmet>
        <title>Add product | PURALUXE console</title>
      </Helmet>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-cormorant)] text-3xl italic text-charcoal md:text-4xl">
            Add product
          </h1>
          <p className="mt-2 font-[family-name:var(--font-jost)] text-sm text-ink/50">
            Photo, name, description, and prices for 10ml & 30ml. Saved on this device only.
          </p>
        </div>
        <Link to="/dashboard/products">
          <Button variant="outline">← Back to products</Button>
        </Link>
      </div>

      <form
        onSubmit={submit}
        className="mx-auto max-w-2xl space-y-8 border border-gold-dark/20 bg-paper p-6 md:p-8 rounded-[2px]"
      >
        <div>
          <label className="font-[family-name:var(--font-cinzel)] text-[9px] uppercase tracking-[0.2em] text-gold-dark">
            Product photo
          </label>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="mt-2 block w-full text-sm text-ink file:mr-4 file:border file:border-gold-dark/40 file:bg-cream file:px-4 file:py-2 file:font-[family-name:var(--font-cinzel)] file:text-[9px] file:uppercase file:tracking-wider"
            onChange={onFile}
            disabled={busy}
          />
          {preview && (
            <div className="mt-4 overflow-hidden rounded-[2px] border border-gold-dark/25 bg-cream">
              <img
                src={preview}
                alt="Preview"
                className="mx-auto max-h-72 w-auto object-contain"
              />
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="own-name"
            className="font-[family-name:var(--font-cinzel)] text-[9px] uppercase tracking-[0.2em] text-gold-dark"
          >
            Product name
          </label>
          <input
            id="own-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full border border-gold-dark/30 bg-cream px-4 py-3 text-ink outline-none focus:border-gold-dark rounded-[2px] font-[family-name:var(--font-jost)]"
            placeholder="e.g. Orange Blossom Serum"
          />
        </div>

        <div>
          <label
            htmlFor="own-tag"
            className="font-[family-name:var(--font-cinzel)] text-[9px] uppercase tracking-[0.2em] text-gold-dark"
          >
            Tagline <span className="text-ink/40">(optional)</span>
          </label>
          <input
            id="own-tag"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="mt-2 w-full border border-gold-dark/30 bg-cream px-4 py-3 text-ink outline-none focus:border-gold-dark rounded-[2px] font-[family-name:var(--font-jost)]"
            placeholder="One line under the name"
          />
        </div>

        <div>
          <label
            htmlFor="own-desc"
            className="font-[family-name:var(--font-cinzel)] text-[9px] uppercase tracking-[0.2em] text-gold-dark"
          >
            Description
          </label>
          <textarea
            id="own-desc"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full border border-gold-dark/30 bg-cream px-4 py-3 text-ink outline-none focus:border-gold-dark rounded-[2px] font-[family-name:var(--font-jost)]"
            placeholder="Full description for the product page"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="p10"
              className="font-[family-name:var(--font-cinzel)] text-[9px] uppercase tracking-[0.2em] text-gold-dark"
            >
              Price — 10ml (DZD)
            </label>
            <input
              id="p10"
              type="number"
              min={0}
              step={50}
              value={price10}
              onChange={(e) => setPrice10(e.target.value)}
              className="mt-2 w-full border border-gold-dark/30 bg-cream px-4 py-3 text-ink outline-none focus:border-gold-dark rounded-[2px] font-[family-name:var(--font-jost)]"
            />
          </div>
          <div>
            <label
              htmlFor="p30"
              className="font-[family-name:var(--font-cinzel)] text-[9px] uppercase tracking-[0.2em] text-gold-dark"
            >
              Price — 30ml (DZD)
            </label>
            <input
              id="p30"
              type="number"
              min={0}
              step={50}
              value={price30}
              onChange={(e) => setPrice30(e.target.value)}
              className="mt-2 w-full border border-gold-dark/30 bg-cream px-4 py-3 text-ink outline-none focus:border-gold-dark rounded-[2px] font-[family-name:var(--font-jost)]"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="own-cat"
            className="font-[family-name:var(--font-cinzel)] text-[9px] uppercase tracking-[0.2em] text-gold-dark"
          >
            Category
          </label>
          <select
            id="own-cat"
            value={category}
            onChange={(e) => setCategory(e.target.value as ProductCategory)}
            className="mt-2 w-full border border-gold-dark/30 bg-cream px-4 py-3 text-ink outline-none focus:border-gold-dark rounded-[2px] font-[family-name:var(--font-jost)]"
          >
            {shopCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button variant="solid" type="submit" disabled={busy}>
            Save product
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={busy}
          >
            Choose photo
          </Button>
        </div>
      </form>
    </div>
  )
}
