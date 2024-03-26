import { atom } from 'recoil'

export const commentState = atom<{
  commentId: number | null
  comment: string
  isAnonymous: boolean
  authorId: string
}>({
  key: 'comment',
  default: {
    commentId: null,
    comment: '',
    isAnonymous: false,
    authorId: '',
  },
})
export const commentEditState = atom({
  key: 'commentEdit',
  default: false,
})
