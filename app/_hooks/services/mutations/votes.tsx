import api from '@/app/_api/commonApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const addVotes = async (
  postId: number | undefined,
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
const addUserVotes = async (
  pollItemId: string,
): Promise<{
  message: string
}> => {
  const response = await api.post(`/polls/poll-items/${pollItemId}`, {})
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

export function useAddUserVotes() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (pollItemId: string) => addUserVotes(pollItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-votes'] })
    },
  })
}
