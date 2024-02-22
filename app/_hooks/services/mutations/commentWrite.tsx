import api from '@/app/_api/commonApi'
import { IComment } from '@/app/_types/commentTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const commentWrite = async (
  commentData: IComment,
  postId: number,
): Promise<{ data: { id: number }; message: string }> => {
  const response = await api.post(`/comments/${postId}`, commentData)
  return response
}
export function useCommentWrite(postId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (commentData: IComment) => commentWrite(commentData, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-comments'] })
    },
  })
}
