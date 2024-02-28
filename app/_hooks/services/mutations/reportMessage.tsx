import api from '@/app/_api/commonApi'
import { IReportMessageRequestBody } from '@/app/_types/messageTypes'
import { IErrorResponse } from '@/app/_types/userFormTypes'
import { useMutation } from '@tanstack/react-query'

const postReportMessage = async ({
  reason,
  content,
  messageRoomId,
}: IReportMessageRequestBody) => {
  const { data } = await api.post(`/reports/messages/${messageRoomId}`, {
    reason,
    content,
  })
  return data
}

export const usePostReportMessage = () => {
  return useMutation<unknown, IErrorResponse, IReportMessageRequestBody>({
    mutationFn: ({ reason, content, messageRoomId }) =>
      postReportMessage({ reason, content, messageRoomId }),
  })
}
