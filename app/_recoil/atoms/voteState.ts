import { atom } from 'recoil'

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
})
