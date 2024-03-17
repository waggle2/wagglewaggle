import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()
export const voteState = atom({
  key: 'voteItems',
  default: {
    title: '',
    items: [
      {
        content: '',
      },
      { content: '' },
    ],
    endedDate: '',
  },
  effects_UNSTABLE: [persistAtom],
})

export const contentState = atom({
  key: 'contentItems',
  default: {
    title: '',
    content: '',
    category: 0,
    tag: 0,
    isAnonymous: false,
  },
  effects_UNSTABLE: [persistAtom],
})
