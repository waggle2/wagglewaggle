import { atom } from 'recoil'

export const commentState = atom<{
  commentId: number | null
  parentId: number | null
  comment: string
  isAnonymous: boolean
  authorId: string
}>({
  key: 'comment',
  default: {
    commentId: null,
    parentId: null,
    comment: '',
    isAnonymous: false,
    authorId: '',
  },
})
export const isReplyState = atom({
  key: 'isReply',
  default: false,
})
export const commentEditState = atom({
  key: 'commentEdit',
  default: false,
})
