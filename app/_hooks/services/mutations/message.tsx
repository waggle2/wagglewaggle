import api from '@/app/_api/commonApi'
import { IErrorResponse, IResponse } from '@/app/_types/apiTypes'
import { IPostMessage } from '@/app/_types/messageTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const sendMessage = async ({ receiver, content }: IPostMessage) => {
  const response = await api.post('/messages', { receiver, content })
  return response.data
}

export const useSendMessage = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, IErrorResponse, IPostMessage>({
    mutationFn: ({ receiver, content }) => sendMessage({ receiver, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['message-room'] }) // Updated to pass an array of strings
    },
  })
}

const deleteMessagesRoom = async (RoomId: number) => {
  const response = await api.delete(`/messages/${RoomId}`)
  return response.data
}

export const useDeleteMessagesRoom = () => {
  const queryClient = useQueryClient()
  return useMutation<IResponse, IErrorResponse, number>({
    mutationFn: (RoomId) => deleteMessagesRoom(RoomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['message-rooms'] }) // Updated to pass an array of strings
    },
  })
}
