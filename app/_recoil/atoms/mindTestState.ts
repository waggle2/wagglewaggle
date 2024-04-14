import { atom } from 'recoil'

export const mindTestState = atom<number>({
  key: 'mindTestResult',
  default: 0,
})
