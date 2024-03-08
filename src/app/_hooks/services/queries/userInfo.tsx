import api from '@/app/_api/commonApi'
import { useQuery } from '@tanstack/react-query'

const getUserInfo = async () => {
  const response = await api.get('/users')
  return response.data
}

export default function useGetUserInfo() {
  return useQuery({
    queryKey: ['get-user-info'],
    queryFn: () => getUserInfo(),
  })
}
