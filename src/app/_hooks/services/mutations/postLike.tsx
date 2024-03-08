import api from '@/app/_api/commonApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const addPostLike = async (postId: number): Promise<{ message: string }> => {
  const response = await api.post(`/likes/${postId}`, {})
  return response
}
const deletePostLike = async (postId: number): Promise<{ message: string }> => {
  const response = await api.delete(`/likes/${postId}`, {})
  return response
}
export function useAddPostLike() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (postId: number) => addPostLike(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-post-like'] })
    },
  })
}
export function useDeletePostLike() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (postId: number) => deletePostLike(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-post-like'] })
    },
  })
}
