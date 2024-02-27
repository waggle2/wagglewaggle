import api from '@/app/_api/commonApi'
import { ISticker } from '@/app/_types/stickerTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const addStikers = async (
  commentId: number,
  animal: string,
): Promise<{
  data: { id: number }
  message: string
}> => {
  const response = await api.post(`/stickers/${commentId}`, { animal: animal })
  return response
}
const modifyStikers = async (
  id: number,
  animal: string,
): Promise<{
  data: { id: number }
  message: string
}> => {
  const response = await api.patch(`/stickers/${id}`, { animal: animal })
  return response
}
const deleteStikers = async (
  id: number,
): Promise<{
  message: string
}> => {
  const response = await api.delete(`/stickers/${id}`)
  return response
}
export function useAddStikers(commentId: number) {
  return useMutation({
    mutationFn: (animal: string) => addStikers(commentId, animal),
  })
}
export function useModifyStikers() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, animal }: ISticker) => modifyStikers(id, animal),
    onSuccess: (response) => {
      alert(response.message)
      queryClient.invalidateQueries({ queryKey: ['get-comments'] })
    },
    onError: (response) => {
      alert(response.message)
    },
  })
}
export function useDeleteStikers() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteStikers(id),
    onSuccess: (response) => {
      alert(response.message)
      queryClient.invalidateQueries({ queryKey: ['get-comments'] })
    },
    onError: (response) => {
      alert(response.message)
    },
  })
}
