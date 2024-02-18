import { atom } from 'recoil'

type AnimalTab = '고양이' | '곰' | '개' | '여우'

// 선택된 탭 상태
export const selectedTabState = atom<AnimalTab>({
  key: 'selectedTabState',
  default: '고양이', // 초기값
})

// 선택된 아이템 타입 상태
export const selectedItemTypeState = atom<string>({
  key: 'selectedItemTypeState',
  default: 'emoji', // 초기값
})
