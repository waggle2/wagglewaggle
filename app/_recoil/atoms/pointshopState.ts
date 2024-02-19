import { atom } from 'recoil'

type AnimalTab = '고냥이' | '곰돌이' | '댕댕이' | '폭스'

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
