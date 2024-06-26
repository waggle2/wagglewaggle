import api from '@/app/_api/commonApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const commentDelete = async (
  commentId: number,
): Promise<{ message: string }> => {
  const response = await api.delete(`/comments/${commentId}`, {})
  return response.message
}
export function useCommentDelete() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (commentId: number) => commentDelete(commentId),
    onSuccess: (response) => {
      alert(response)
      queryClient.invalidateQueries({ queryKey: ['get-comments'] })
    },
    onError: (response) => {
      alert(response)
    },
  })
}
