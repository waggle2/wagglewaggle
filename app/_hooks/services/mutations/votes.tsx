import api from '@/app/_api/commonApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const addVotes = async (
  postId: number,
  title: string,
  items: {
    content: string
  }[],
  endedDate: string,
): Promise<{
  message: string
}> => {
  const response = await api.post(`/polls/${postId}`, {
    title: title,
    poll_item_dtos: items,
    ended_at: endedDate,
  })
  return response
}
const deleteVotes = async (postId: number): Promise<{ message: string }> => {
  const response = await api.delete(`/polls/${postId}`)
  return response
}
export function useAddVotes() {
  return useMutation({
    mutationFn: ({ title, items, endedDate, postId }: IVote) =>
      addVotes(postId, title, items, endedDate),
  })
}
export function useDeleteVotes() {
  return useMutation({
    mutationFn: (postId: number) => deleteVotes(postId),
  })
}
