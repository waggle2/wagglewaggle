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
  이모지?: avatarItem | null
  '프로필 배경'?: avatarItem | null
  프레임?: avatarItem | null
  벽지?: avatarItem | null
}
