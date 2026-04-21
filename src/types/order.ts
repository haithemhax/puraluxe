export interface OrderLineSnapshot {
  name: string
  slug: string
  quantity: number
  volumeMl: number
  unitPrice: number
  lineTotal: number
  image: string
}

export type OrderStatus = 'new' | 'processing' | 'shipped' | 'delivered'

export interface OrderRecord {
  id: string
  createdAt: string
  customer: {
    fullName: string
    phone: string
    wilaya: string
    city: string
    address: string
    notes: string
  }
  cod: boolean
  items: OrderLineSnapshot[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  status: OrderStatus
}
