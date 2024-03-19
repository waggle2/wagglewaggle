export type avatarItem = {
  id: number
  animal: string
  itemType: string
  name: string
  price: number
  image: string
  purchasedCount: number
  createdAt: string
  updatedAt: string
  deletedAt: string
}
export type avatarItemList = avatarItem[]

export type wearingItem = {
  id?: number
  animal?: string
  user?: {
    id: string
  }
  emoji?: avatarItem | null
  background?: avatarItem | null
  frame?: avatarItem | null
  wallpaper?: avatarItem | null
}
