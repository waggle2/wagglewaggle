import api from '@/app/_api/commonApi'
import { IMessageRooms } from '@/app/_types/messageTypes'
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

const getMessageRoom = async (roomId: number) => {
  const response = await api.get(`/messages/${roomId}`)
  return response.data
}

export const useGetMessageRoom = (roomId: number) => {
  return useQuery<number, Error, IMessageRooms>({
    queryKey: ['message-room', roomId],
    queryFn: () => getMessageRoom(roomId),
  })
}
