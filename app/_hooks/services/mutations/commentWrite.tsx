import api from '@/app/_api/commonApi'
import { IComment } from '@/app/_types/commentTypes'
import { useMutation } from '@tanstack/react-query'

const commentWrite = async (
  commentData: IComment,
  postId: number,
): Promise<{ data: { id: number }; message: string }> => {
  const response = await api.post(`/comments/${postId}`, commentData)
  return response
}
export function useCommentWrite(postId: number) {
  return useMutation({
    mutationFn: (commentData: IComment) => commentWrite(commentData, postId),
    onSuccess: (response) => {
      alert(response.message)
    },
  })
}
