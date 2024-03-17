import { atom } from 'recoil'

export const voteState = atom({
  key: 'voteItems',
  default: {
    title: '',
    items: ['', ''],
    endedDate: '',
  },
})
