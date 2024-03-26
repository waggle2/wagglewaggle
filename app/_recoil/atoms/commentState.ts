import { atom } from 'recoil'

export const commentState = atom<{
  commentId: number | null
  comment: string
  isAnonymous: boolean
}>({
  key: 'comment',
  default: {
    commentId: null,
    comment: '',
    isAnonymous: false,
  },
})
export const commentEditState = atom({
  key: 'commentEdit',
  default: false,
})
