import api from '@/app/_api/commonApi'
import { IPostMessage } from '@/app/_types/messageTypes'
import { IErrorResponse } from '@/app/_types/userFormTypes'
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
