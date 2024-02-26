import api from '@/app/_api/commonApi'
import { useQuery } from '@tanstack/react-query'

const getAllMessageBoxes = async () => {
  const response = await api.get('/messages')
  return response.data
}

export const useGetAllMessageRooms = () => {
  return useQuery({
    queryKey: ['message-rooms'],
    queryFn: getAllMessageBoxes,
  })
}
