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
const deleteVotes = async (voteId: number): Promise<{ message: string }> => {
  const response = await api.delete(`/polls/${voteId}`)
  return response
}
const modifyVotes = async (
  voteId: number,
  title: string,
  endedAt: string,
  createPollItemDtos: { content: string }[],
  deletePollItemIds: number[],
): Promise<{ message: string }> => {
  const response = await api.patch(`/polls/${voteId}`, {
    title: title,
    endedAt: endedAt,
    createPollItemDtos: createPollItemDtos,
    deletePollItemIds: deletePollItemIds,
  })
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
    mutationFn: (voteId: number) => deleteVotes(voteId),
  })
}
export function useModifyVotes() {
  return useMutation({
    mutationFn: ({
      voteId,
      title,
      endedAt,
      createPollItemDtos,
      deletePollItemIds,
    }: IModifyVote) =>
      modifyVotes(
        voteId,
        title,
        endedAt,
        createPollItemDtos,
        deletePollItemIds,
      ),
  })
}
