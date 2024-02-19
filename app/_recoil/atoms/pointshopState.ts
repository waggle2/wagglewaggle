import { atom } from 'recoil'

export type AnimalTab = '고냥이' | '곰돌이' | '댕댕이' | '폭스'

export type ItemData = {
  id: number
  animal: string
  itemType: string
  name: string
  price: number
  image: string
  purchasedCount: number
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  isOwned: boolean
}

// 선택된 탭 상태
export const selectedTabState = atom<AnimalTab>({
  key: 'selectedTabState',
  default: '고냥이', // 초기값
})

// 선택된 아이템 타입 상태
export const selectedItemTypeState = atom<string>({
  key: 'selectedItemTypeState',
  default: 'emoji', // 초기값
})
