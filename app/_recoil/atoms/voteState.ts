import { atom } from 'recoil'

export const voteState = atom<{
  title: string
  items: {
    id: null | number
    content: string
    isNew: boolean
  }[]
  endedDate: string
}>({
  key: 'voteItems',
  default: {
    title: '',
    items: [
      {
        id: null,
        content: '',
        isNew: true,
      },
      { id: null, content: '', isNew: true },
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

export const newVoteState = atom<
  {
    content: string
  }[]
>({
  key: 'newItems',
  default: [],
})
export const deleteVoteState = atom<number[]>({
  key: 'deleteItems',
  default: [],
})
