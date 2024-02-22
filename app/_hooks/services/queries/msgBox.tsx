import api from '@/app/_api/commonApi'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const getAllMessageBoxes = async () => {
  const { data } = await axios.get('http://localhost:3000/api/messages')
  return data
}

export const useGetAllMessageRooms = () => {
  return useQuery({
    queryKey: ['message-rooms'],
    queryFn: async () => await getAllMessageBoxes(),
  })
}
