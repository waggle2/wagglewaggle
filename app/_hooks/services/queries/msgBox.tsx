import api from '@/app/_api/commonApi'
import { useQuery } from '@tanstack/react-query'

const getAllMessageBoxes = async () => {
  const data = await api.get('messages')
  return data
}

export const useGetAllMessageRooms = () => {
  return useQuery({
    queryKey: ['message-rooms'],
    queryFn: getAllMessageBoxes,
  })
}
