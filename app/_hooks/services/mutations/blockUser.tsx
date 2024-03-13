import api from '@/app/_api/commonApi'
import { IErrorResponse } from '@/app/_types/apiTypes'
import { useMutation } from '@tanstack/react-query'

const postblockUser = async (blockedUserId: string) => {
  const response = await api.post(`/blocks/${blockedUserId}`, {})
  return response.data
}

export const usePostBlockUser = () => {
  return useMutation<unknown, IErrorResponse, string>({
    mutationFn: (blockedUserId: string) => postblockUser(blockedUserId),
  })
}
